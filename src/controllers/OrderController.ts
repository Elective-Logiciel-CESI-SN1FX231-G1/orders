import OrderModel, { IOrder } from '../models/OrderModel'
import { Handler } from 'express'
import client from '../mqtt'
import { INotification } from '../models/NotificationModel'
import shortid from 'shortid'
import { FilterQuery } from 'mongoose'

export const getAll: Handler = async (req, res) => {
  const query: FilterQuery<IOrder> = {}
  if (req.user?.role === 'client') query['client._id'] = req.user._id
  if (req.user?.role === 'restaurateur') query['restaurant.owner._id'] = req.user._id
  //  if (req.user?.role === 'deliverer') query['deliverer._id'] = req.user._id
  if (req.user?.role === 'deliverer') {
    query.$or = [
      { 'deliverer._id': req.user._id },
      { 'deliverer._id': { $exists: false }, status: { $in: ['preparating', 'waitingDelivery'] } }
    ]
    if (req.query.deliverer === 'me') query['deliverer._id'] = req.user?._id
    if (req.query.deliverer === 'none') query['deliverer._id'] = { $exists: false }
  }
  if (typeof (req.query.status) === 'string') query.status = { $in: req.query.status.split(',') }
  const [results, count] = await Promise.all([
    OrderModel.find(query).skip(req.pagination.skip).limit(req.pagination.size).exec(),
    OrderModel.countDocuments(query).exec()
  ])
  res.send({
    count,
    results
  })
}

export const getOne: Handler = async (req, res) => {
  const Order = await OrderModel.findOne({ _id: req.params.id })
  if (req.user?.role === 'client' && req.user._id !== Order?.client._id) return res.sendStatus(403)
  if (req.user?.role === 'deliverer' && req.user._id !== Order?.deliverer._id) return res.sendStatus(403)
  if (req.user?.role === 'restaurateur' && req.user._id !== Order?.restaurant.owner._id) return res.sendStatus(403)
  if (Order) res.send(Order)
  else res.status(404).send('Order Not Found')
}

export const processOrder = async (order: IOrder) => {
  order._id = shortid()
  order.status = 'validating'
  const newOrder = new OrderModel(order)
  await newOrder.save()
  const notif:INotification = {
    topic: 'restaurant/order',
    body: {
      msg: order._id
    },
    users: [order.restaurant.owner._id]
  }
  await client.publish('notify', JSON.stringify(notif))
}

export const acceptOrder: Handler = async (req, res) => {
  const currentOrder = await OrderModel.findOne({ _id: req.params.id })
  if (!currentOrder) return res.sendStatus(404)
  if (req.user?._id !== currentOrder?.restaurant.owner._id) return res.sendStatus(403)
  if (currentOrder.status !== 'validating') return res.sendStatus(400)
  const Order = await OrderModel.findOneAndUpdate({ _id: req.params.id }, { status: 'preparating' })
  return res.send(Order)
}

export const declineOrder: Handler = async (req, res) => {
  const currentOrder = await OrderModel.findOne({ _id: req.params.id })
  if (!currentOrder) return res.sendStatus(404)
  if (req.user?._id !== currentOrder?.restaurant.owner._id) return res.sendStatus(403)
  if (currentOrder.status !== 'validating') return res.sendStatus(400)
  const Order = await OrderModel.findOneAndUpdate({ _id: req.params.id }, { status: 'cancelled' })
  return res.send(Order)
}

export const acceptDelivererOrder: Handler = async (req, res) => {
  const currentOrder = await OrderModel.findOne({ _id: req.params.id, deliverer: { $exists: false } })
  if (!currentOrder) return res.sendStatus(404)
  if (currentOrder.status !== 'preparating' && currentOrder.status !== 'waitingDelivery') return res.sendStatus(400)
  const Order = await OrderModel.findOneAndUpdate({ _id: req.params.id, deliverer: { $exists: false } }, { deliverer: req.user })
  return res.send(Order)
}

export const readyOrder: Handler = async (req, res) => {
  const currentOrder = await OrderModel.findOne({ _id: req.params.id })
  if (!currentOrder) return res.sendStatus(404)
  if (req.user?._id !== currentOrder?.restaurant.owner._id) return res.sendStatus(403)
  if (currentOrder.status !== 'preparating') return res.sendStatus(400)
  const Order = await OrderModel.findOneAndUpdate({ _id: req.params.id }, { status: 'waitingDelivery' })
  return res.send(Order)
}

export const deliverOrder: Handler = async (req, res) => {
  const currentOrder = await OrderModel.findOne({ _id: req.params.id })
  if (!currentOrder) return res.sendStatus(404)
  if (currentOrder.status !== 'waitingDelivery') return res.sendStatus(400)
  const Order = await OrderModel.findOneAndUpdate({ _id: req.params.id }, { status: 'delivering' })
  return res.send(Order)
}

export const completedOrder: Handler = async (req, res) => {
  const currentOrder = await OrderModel.findOne({ _id: req.params.id })
  if (!currentOrder) return res.sendStatus(404)
  if (req.user?._id !== currentOrder?.deliverer._id) return res.sendStatus(403)
  if (currentOrder.status !== 'delivering') return res.sendStatus(400)
  const Order = await OrderModel.findOneAndUpdate({ _id: req.params.id }, { status: 'completed' })
  return res.send(Order)
}

export default {
  getAll,
  getOne,
  processOrder,
  acceptDelivererOrder,
  acceptOrder,
  declineOrder,
  readyOrder,
  deliverOrder,
  completedOrder
}

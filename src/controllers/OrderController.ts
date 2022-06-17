import OrderModel, { IOrder } from '../models/OrderModel'
import { Handler } from 'express'
import client from '../mqtt'
import { INotification } from '../models/NotificationModel'
import shortid from 'shortid'

enum params {
  'status',
  'restaurant',
  'client'
}

export const getAll: Handler = async (req, res) => {
  let invalidParam = false
  for (const param in req.query) {
    if (!Object.values(params).includes(param)) invalidParam = true
  }
  if(!invalidParam){
    let newQuery = new Map()
    if (req.query.client){
      newQuery.set('client._id', req.query.client)
    }
    if (req.query.restaurant){
      newQuery.set('restaurant._id', req.query.restaurant)
    }
    const Orders = await OrderModel.find(Object.fromEntries(newQuery))
    res.send(Orders)
  }
  else {
    res.status(400).send('Invalid Params')
  }
}

export const getOne: Handler = async (req, res) => {
  const Order = await OrderModel.findOne({ _id: req.params.id })
  if (Order) res.send(Order)
  else res.status(404).send('Order Not Found')
}

export const modify: Handler = async (req, res) => {
  try {
    const Order = await OrderModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    if (Order) res.send(Order)
    else res.status(404).send('Order Not Found')
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
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
  // console.log(order)
}

export default {
  getAll,
  getOne,
  modify,
  processOrder
}

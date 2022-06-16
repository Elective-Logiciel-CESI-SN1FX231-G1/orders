import OrderModel from '../models/OrderModel'
import { Handler } from 'express'

export const getAll: Handler = async (req, res) => {
  const Orders = await OrderModel.find()
  res.send(Orders)
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

export const processOrder = async (order: any) => {
  console.log(order)
}

export default {
  getAll,
  getOne,
  modify,
  processOrder
}

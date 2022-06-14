import OrderModel from '../models/OrderModel'
import { Handler } from 'express'

export const getAll: Handler = async (req, res) => {
  try {
    const Orders = await OrderModel.find()
    res.send(Orders)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getOne: Handler = async (req, res) => {
  try {
    const Order = await OrderModel.findOne({ _id: req.params.id })
    res.send(Order)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const modify: Handler = async (req, res) => {
  try {
    const Order = await OrderModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.send(Order)
  } catch (err) {
    res.status(400).json(err)
  }
}

export default {
  getAll,
  getOne,
  modify
}

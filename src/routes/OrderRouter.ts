import express from 'express'
import OrderController from '../controllers/OrderController'
const OrderRouter = express.Router()

OrderRouter.get('/', OrderController.getAll)

OrderRouter.get('/:id', OrderController.getOne)

OrderRouter.patch('/:id', express.json(), OrderController.modify)

export default OrderRouter

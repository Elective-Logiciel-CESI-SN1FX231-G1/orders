import express from 'express'
import { authNeeded, restrictedToRoles } from '../auth'
import OrderController from '../controllers/OrderController'
import paginate from '../utils/pagination'
const OrderRouter = express.Router()

OrderRouter.get('/', authNeeded, paginate, OrderController.getAll)

OrderRouter.get('/:id', authNeeded, OrderController.getOne)

OrderRouter.patch('/:id', authNeeded, express.json(), OrderController.modify)

OrderRouter.post('/:id/accept', restrictedToRoles('restaurateur'), OrderController.acceptOrder)

OrderRouter.post('/:id/decline', restrictedToRoles('restaurateur'), OrderController.declineOrder)

OrderRouter.post('/:id/ready', restrictedToRoles('restaurateur'), OrderController.readyOrder)

OrderRouter.post('/:id/deliver', restrictedToRoles('deliverer'), OrderController.deliverOrder)

OrderRouter.post('/:id/completed', restrictedToRoles('deliverer'), OrderController.completedOrder)

export default OrderRouter

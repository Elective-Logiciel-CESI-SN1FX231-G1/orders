import express from 'express'
import { restrictedToRoles } from '../auth'
import OrderController from '../controllers/OrderController'
import paginate from '../utils/pagination'
const OrderRouter = express.Router()

OrderRouter.get('/', restrictedToRoles(['client', 'restaurateur', 'deliverer', 'commercial', 'technician']), paginate, OrderController.getAll)

OrderRouter.get('/:id', restrictedToRoles(['client', 'restaurateur', 'deliverer', 'commercial', 'technician']), OrderController.getOne)

OrderRouter.post('/:id/accept', restrictedToRoles('restaurateur'), OrderController.acceptOrder)

OrderRouter.post('/:id/decline', restrictedToRoles('restaurateur'), OrderController.declineOrder)

OrderRouter.post('/:id/ready', restrictedToRoles('restaurateur'), OrderController.readyOrder)

OrderRouter.post('/:id/accept', restrictedToRoles('deliverer'), OrderController.acceptDelivererOrder)

OrderRouter.post('/:id/deliver', restrictedToRoles('deliverer'), OrderController.deliverOrder)

OrderRouter.post('/:id/completed', restrictedToRoles('deliverer'), OrderController.completedOrder)

export default OrderRouter

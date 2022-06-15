import express from 'express'
import 'express-async-errors'
import OrderRouter from './routes/OrderRouter'

const app = express()

app.use('/api/orders', OrderRouter)

export default app

import express from 'express'
import 'express-async-errors'
import OrderRouter from './routes/OrderRouter'
import { auth } from './auth'

const app = express()

app.use(auth)
app.use('/api/orders', OrderRouter)

export default app

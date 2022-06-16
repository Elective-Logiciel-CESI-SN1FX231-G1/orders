import mqtt from 'async-mqtt'
import config from 'config'
import { processOrder } from './controllers/OrderController'

const client = mqtt.connect(config.get('mqtt.url'))

client.on('message', function (topic, message) {
  try {
    const msg = JSON.parse(message.toString())
    if (topic === 'shop/orders') return processOrder(msg)
  } catch (error) {
    console.error(error)
  }
})

export const connect = async function () {
  if (!client.connected) { await new Promise(resolve => client.once('connect', resolve)) }
  await client.subscribe('shop/orders')
}

export default client

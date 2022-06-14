import mqtt from 'mqtt'
import config from 'config'

const client = mqtt.connect(config.get('mqtt.url'))

export const connect = async function () {
  if (client.connected) return
  await new Promise(resolve => client.once('connect', resolve))
}

export default client

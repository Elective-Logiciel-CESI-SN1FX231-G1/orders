// import { Schema, model } from 'mongoose'

import { Role } from './OrderModel'

export interface INotification {
  topic: string,
  body: {
    msg: string,
    url?: string
  },
  roles?: [Role],
  users?: [string]
}

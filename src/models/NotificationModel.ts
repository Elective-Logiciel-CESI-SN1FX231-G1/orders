// import { Schema, model } from 'mongoose'

export interface INotification {
  body: {
    msg: string,
    url?: string
  },
  user?: string
}

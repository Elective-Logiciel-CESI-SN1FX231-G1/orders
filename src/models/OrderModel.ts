import { Schema, model } from 'mongoose'

export type Role = 'client'| 'restaurateur'| 'deliverer'| 'developer'| 'commercial'| 'technician'| 'admin'
type Status = 'completed'|'cancelled'|'delivering'|'preparating'|'validating'|'waitingDelivery'

export interface IUser {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  role: Role
}

export interface IRestaurant {
  owner: IUser,
  name: string,
  description: string,
  address: string,
  position:{
    lon:number,
    lat:number
  },
  openingHours:[
    {from:Date, to:Date}
  ]
  types: Array<string>,
  isClosed: boolean
}

export interface IProduct {
  name: string,
  price: number,
  description: string,
  image: string,
  restaurant: IRestaurant
}

export interface IMenu {
  name: string,
  price: number,
  description: string,
  image: string,
  products: IProduct[],
  restaurant: IRestaurant
}

export interface IOrder {
  _id: string,
  products: IProduct[],
  menus: IMenu[],
  price: number,
  deliveryPrice: number,
  commissionPrice: number,
  client: IUser,
  restaurant: IRestaurant,
  comment: string,
  address: string,
  position:{
    lon:number,
    lat:number
  },
  status: Status,
  deliverer: IUser
}

const rawProductSchema = {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  restaurant: { type: String, required: true },
  _id: { type: String, required: true }
}

const rawMenuModel = {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  products: [rawProductSchema],
  restaurant: { type: String, required: true, unique: true },
  _id: { type: String, required: true }
}

const rawUser = {
  _id: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true }
}

const rawRestaurant = {
  owner: rawUser,
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  position: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  openingHours: [
    {
      from: { type: Date, required: true },
      to: { type: Date, required: true }
    }
  ],
  types: [{ type: String, required: true }],
  isClosed: { type: Boolean, required: true },
  _id: { type: String, required: true }
}

const OrderSchema = new Schema<IOrder>({
  _id: { type: String, required: true },
  products: [rawProductSchema],
  menus: [rawMenuModel],
  price: { type: Number, required: true },
  deliveryPrice: { type: Number, required: true },
  commissionPrice: { type: Number, required: true },
  client: rawUser,
  restaurant: rawRestaurant,
  comment: { type: String, required: false },
  address: { type: String, required: true },
  position: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  status: { type: String, required: true },
  deliverer: { type: rawUser, required: false }
})

export default model('Orders', OrderSchema)

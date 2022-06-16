import { Schema, model } from 'mongoose'

type Role = 'client'| 'restaurateur'| 'deliverer'| 'developer'| 'commercial'| 'technician'| 'admin'

interface IUser {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  phone: string,
  role: Role
}

interface IRestaurant {
  owner: {
    firstName: string,
    lastName: string,
    phone: string,
    email: string
  },
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

interface IProduct {
  name: string,
  price: number,
  description: string,
  image: string,
  restaurant: IRestaurant
}

interface IMenu {
  name: string,
  price: number,
  description: string,
  image: string,
  products: IProduct[],
  restaurant: IRestaurant
}

interface IOrder {
  products: IProduct[]
  menus: IMenu[]
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
  state: string
  deliverer: IUser,
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

const rawRestaurant = {
  owner: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
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

const rawUser = {
  _id: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true }
}

const OrderSchema = new Schema<IOrder>({
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
  state: { type: String, required: true },
  deliverer: rawUser
})

export default model('Orders', OrderSchema)

import { Schema, model } from 'mongoose'

interface IOrder {
    // products: IProduct[]
    // menus: IMenu[]
    price: number,
    deliveryPrice: number,
    commissionPrice: number,
    // client: IUser,
    // restaurant: IRestaurant,
    comment: string,
    address: string,
    position:{
      lon:number,
      lat:number
    },
    state: string
    // deliverer: IUser,
  }

const OrderSchema = new Schema<IOrder>({
  // products: IProduct[]
  // menus: IMenu[]
  price: { type: Number, required: true },
  deliveryPrice: { type: Number, required: true },
  commissionPrice: { type: Number, required: true },
  // client: IUser,
  // restaurant: IRestaurant,
  comment: { type: String, required: false },
  address: { type: String, required: true },
  position: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  state: { type: String, required: true }
  // deliverer: IUser,
})

export default model('Orders', OrderSchema)

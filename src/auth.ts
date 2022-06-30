import config from 'config'
import axios, { AxiosError } from 'axios'
import { Handler } from 'express'

export type Role = 'client'| 'restaurateur'| 'deliverer'| 'developer'| 'commercial'| 'technician'| 'admin'

export interface User {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  role: Role
}

declare module 'express-serve-static-core' {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    user?: User
  }
}

export const auth: Handler = async (req, res, next) => {
  if (!req.headers.authorization?.startsWith('Bearer ')) return next()
  try {
    const user = await axios.get<User>(config.get('auth.verifyUrl'), {
      headers: { authorization: req.headers.authorization }
    })
    req.user = user.data
    return next()
  } catch (error: any) {
    if (!(error instanceof AxiosError)) throw error
    return res.status(error.response?.status || 500).send(error.response?.data)
  }
}

export const authNeeded: Handler = function (req, res, next) {
  if (!req.user) return res.sendStatus(401)
  return next()
}

export const restrictedToRoles = function (roles: Role | Array<Role>) : Handler {
  const authorizedRoles = [roles].flat()
  return async function (req, res, next) {
    if (!req.user) return res.sendStatus(401)
    if (!authorizedRoles.includes(req.user.role)) return res.sendStatus(403)
    return next()
  }
}

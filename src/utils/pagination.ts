import { Handler } from 'express'

declare module 'express-serve-static-core' {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    pagination: {
      size: number,
      skip: number
    }
  }
}

export const paginate : Handler = (req, res, next) => {
  req.pagination = { skip: 0, size: 10 }
  if (!isNaN(Number(req.query.size))) req.pagination.size = Number(req.query.size)

  if (!isNaN(Number(req.query.skip))) req.pagination.skip = Number(req.query.skip)
  else if (!isNaN(Number(req.query.page))) req.pagination.skip = (Number(req.query.page) - 1) * req.pagination.size

  next()
}

export default paginate

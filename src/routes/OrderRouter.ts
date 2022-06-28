import express from 'express'
import { restrictedToRoles } from '../auth'
import OrderController from '../controllers/OrderController'
import paginate from '../utils/pagination'
const OrderRouter = express.Router()

/**
 * @api {get} /orders/api/orders/:id Request Orders information
 * @apiName GetAll
 * @apiGroup Order
 *
 * @apiSuccess {Number} count Number of restaurants returned.
 * @apiSuccess {Array} results Array of restaurants.
 * @apiSuccess {Array} results.products List of products.
 * @apiSuccess {Array} results.menus List of menus.
 * @apiSuccess {Object} results.restaurant Restaurant information of the order.
 * @apiSuccess {String} results.comment Comment of the user.
 * @apiSuccess {String} results.address Address of the client.
 * @apiSuccess {Object} results.position Longitude and latitude of the client.
 * @apiSuccess {String} results.coupon Coupon code of the user.
 * @apiSuccess {Number} results.price Price of the order.
 * @apiSuccess {Number} results.deliveryPrice Price of the delivery.
 * @apiSuccess {Number} results.comissionPrice Price of the comission.
 * @apiSuccess {Object} results.client Client information of the order.
 * @apiSuccess {String} results.status Status of the command
 * @apiSuccess {Object} results.deliverer Deliverer information
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "count": 1,
 *      "results": [
 *          "products": [
 *              {
 *                  "_id": "tBmfGjVbB",
 *                  "name": "Plat - Restaurant 3",
 *                  "price": 19.99,
 *                  "description": "Plat de sushi",
 *                  "image": "link",
 *                  "restaurant": "6A1tVGhHG",
 *                  "__v": 0
 *              }
 *          ],
 *          "menus": [
 *              ""
 *          ],
 *          "restaurant": {
 *              "owner": {
 *                  "_id": "Wp4vULfGv",
 *                  "firstname": "Restaurant - 2",
 *                  "lastname": "Test",
 *                  "phone": "0606060606",
 *                  "email": "2@restaurateur.com",
 *                  "role": "restaurateur"
 *              },
 *              "position": {
 *                  "lon": 15,
 *                  "lat": 15
 *              },
 *              "_id": "6A1tVGhHG",
 *              "name": "Restaurant 2",
 *              "description": "string",
 *              "address": "string",
 *              "openingHours": [
 *                  {
 *                      "from": "1970-01-01T00:00:00.012Z",
 *                      "to": "1970-01-01T00:00:00.012Z",
 *                      "_id": "62ad989ceb8587569c264d51"
 *                  }
 *              ],
 *              "types": [
 *                  "Array<string>"
 *              ],
 *              "isClosed": false,
 *              "__v": 0,
 *              "couponDate": "2022-07-18T09:26:43.105Z",
 *              "image": "shorturl.at/fldOI"
 *          },
 *          "comment": "Ceci est ma commande",
 *          "address": "100 boulevard de la mÃ¨re patrie",
 *          "position": {
 *               "lon": 12,
 *              "lat": 12
 *          },
 *          "price": 19.99,
 *          "deliveryPrice": 5,
 *          "commissionPrice": 3,
 *          "client": {
 *              "_id": "ATqLhA3i2",
 *              "firstname": "Client - 2",
 *              "lastname": "Test",
 *              "email": "2@client.com",
 *              "phone": "0606060606",
 *              "role": "client",
 *              "iat": 1655544747
 *          }
 *          "status": "validating",
 *          "deliverer":{}
 *      ]
 * }
 *
 */
OrderRouter.get('/', restrictedToRoles(['client', 'restaurateur', 'deliverer', 'commercial', 'technician']), paginate, OrderController.getAll)

/**
 * @api {get} /orders/api/orders/:id Request Order information
 * @apiName GetOne
 * @apiGroup Order
 *
 * @apiParam {String} id Order's unique ID
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {Array} menus List of menus.
 * @apiSuccess {Object} restaurant Restaurant information of the order.
 * @apiSuccess {String} comment Comment of the user.
 * @apiSuccess {String} address Address of the client.
 * @apiSuccess {Object} position Longitude and latitude of the client.
 * @apiSuccess {String} coupon Coupon code of the user.
 * @apiSuccess {Number} price Price of the order.
 * @apiSuccess {Number} deliveryPrice Price of the delivery.
 * @apiSuccess {Number} comissionPrice Price of the comission.
 * @apiSuccess {Object} client Client information of the order.
 * @apiSuccess {String} status Status of the command
 * @apiSuccess {Object} deliverer Deliverer information
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "products": [
 *          {
 *              "_id": "tBmfGjVbB",
 *              "name": "Plat - Restaurant 3",
 *              "price": 19.99,
 *              "description": "Plat de sushi",
 *              "image": "link",
 *              "restaurant": "6A1tVGhHG",
 *              "__v": 0
 *          }
 *      ],
 *      "menus": [
 *          ""
 *      ],
 *      "restaurant": {
 *          "owner": {
 *              "_id": "Wp4vULfGv",
 *              "firstname": "Restaurant - 2",
 *              "lastname": "Test",
 *              "phone": "0606060606",
 *              "email": "2@restaurateur.com",
 *              "role": "restaurateur"
 *          },
 *          "position": {
 *              "lon": 15,
 *              "lat": 15
 *          },
 *          "_id": "6A1tVGhHG",
 *          "name": "Restaurant 2",
 *          "description": "string",
 *          "address": "string",
 *          "openingHours": [
 *              {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62ad989ceb8587569c264d51"
 *              }
 *          ],
 *          "types": [
 *              "Array<string>"
 *          ],
 *          "isClosed": false,
 *          "__v": 0,
 *          "couponDate": "2022-07-18T09:26:43.105Z",
 *          "image": "shorturl.at/fldOI"
 *      },
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mÃ¨re patrie",
 *      "position": {
 *           "lon": 12,
 *          "lat": 12
 *      },
 *      "price": 19.99,
 *      "deliveryPrice": 5,
 *      "commissionPrice": 3,
 *      "client": {
 *          "_id": "ATqLhA3i2",
 *          "firstname": "Client - 2",
 *          "lastname": "Test",
 *          "email": "2@client.com",
 *          "phone": "0606060606",
 *          "role": "client",
 *          "iat": 1655544747
 *      }
 *      "status": "validating",
 *      "deliverer":{}
 * }
 *
 */
OrderRouter.get('/:id', restrictedToRoles(['client', 'restaurateur', 'deliverer', 'commercial', 'technician']), OrderController.getOne)

/**
 * @api {post} /orders/api/orders/:id Accept selected Order
 * @apiName AcceptOne
 * @apiGroup Order
 *
 * @apiParam {String} id Order's unique ID
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {Array} menus List of menus.
 * @apiSuccess {Object} restaurant Restaurant information of the order.
 * @apiSuccess {String} comment Comment of the user.
 * @apiSuccess {String} address Address of the client.
 * @apiSuccess {Object} position Longitude and latitude of the client.
 * @apiSuccess {String} coupon Coupon code of the user.
 * @apiSuccess {Number} price Price of the order.
 * @apiSuccess {Number} deliveryPrice Price of the delivery.
 * @apiSuccess {Number} comissionPrice Price of the comission.
 * @apiSuccess {Object} client Client information of the order.
 * @apiSuccess {String} status Status of the command
 * @apiSuccess {Object} deliverer Deliverer information
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "products": [
 *          {
 *              "_id": "tBmfGjVbB",
 *              "name": "Plat - Restaurant 3",
 *              "price": 19.99,
 *              "description": "Plat de sushi",
 *              "image": "link",
 *              "restaurant": "6A1tVGhHG",
 *              "__v": 0
 *          }
 *      ],
 *      "menus": [
 *          ""
 *      ],
 *      "restaurant": {
 *          "owner": {
 *              "_id": "Wp4vULfGv",
 *              "firstname": "Restaurant - 2",
 *              "lastname": "Test",
 *              "phone": "0606060606",
 *              "email": "2@restaurateur.com",
 *              "role": "restaurateur"
 *          },
 *          "position": {
 *              "lon": 15,
 *              "lat": 15
 *          },
 *          "_id": "6A1tVGhHG",
 *          "name": "Restaurant 2",
 *          "description": "string",
 *          "address": "string",
 *          "openingHours": [
 *              {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62ad989ceb8587569c264d51"
 *              }
 *          ],
 *          "types": [
 *              "Array<string>"
 *          ],
 *          "isClosed": false,
 *          "__v": 0,
 *          "couponDate": "2022-07-18T09:26:43.105Z",
 *          "image": "shorturl.at/fldOI"
 *      },
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mÃ¨re patrie",
 *      "position": {
 *           "lon": 12,
 *          "lat": 12
 *      },
 *      "price": 19.99,
 *      "deliveryPrice": 5,
 *      "commissionPrice": 3,
 *      "client": {
 *          "_id": "ATqLhA3i2",
 *          "firstname": "Client - 2",
 *          "lastname": "Test",
 *          "email": "2@client.com",
 *          "phone": "0606060606",
 *          "role": "client",
 *          "iat": 1655544747
 *      }
 *      "status": "preparating",
 *      "deliverer": {}
 * }
 *
 */
OrderRouter.post('/:id/accept', restrictedToRoles('restaurateur'), OrderController.acceptOrder)

/**
 * @api {post} /orders/api/orders/:id Decline selected Order
 * @apiName DeclineOne
 * @apiGroup Order
 *
 * @apiParam {String} id Order's unique ID
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {Array} menus List of menus.
 * @apiSuccess {Object} restaurant Restaurant information of the order.
 * @apiSuccess {String} comment Comment of the user.
 * @apiSuccess {String} address Address of the client.
 * @apiSuccess {Object} position Longitude and latitude of the client.
 * @apiSuccess {String} coupon Coupon code of the user.
 * @apiSuccess {Number} price Price of the order.
 * @apiSuccess {Number} deliveryPrice Price of the delivery.
 * @apiSuccess {Number} comissionPrice Price of the comission.
 * @apiSuccess {Object} client Client information of the order.
 * @apiSuccess {String} status Status of the command
 * @apiSuccess {Object} deliverer Deliverer information
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "products": [
 *          {
 *              "_id": "tBmfGjVbB",
 *              "name": "Plat - Restaurant 3",
 *              "price": 19.99,
 *              "description": "Plat de sushi",
 *              "image": "link",
 *              "restaurant": "6A1tVGhHG",
 *              "__v": 0
 *          }
 *      ],
 *      "menus": [
 *          ""
 *      ],
 *      "restaurant": {
 *          "owner": {
 *              "_id": "Wp4vULfGv",
 *              "firstname": "Restaurant - 2",
 *              "lastname": "Test",
 *              "phone": "0606060606",
 *              "email": "2@restaurateur.com",
 *              "role": "restaurateur"
 *          },
 *          "position": {
 *              "lon": 15,
 *              "lat": 15
 *          },
 *          "_id": "6A1tVGhHG",
 *          "name": "Restaurant 2",
 *          "description": "string",
 *          "address": "string",
 *          "openingHours": [
 *              {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62ad989ceb8587569c264d51"
 *              }
 *          ],
 *          "types": [
 *              "Array<string>"
 *          ],
 *          "isClosed": false,
 *          "__v": 0,
 *          "couponDate": "2022-07-18T09:26:43.105Z",
 *          "image": "shorturl.at/fldOI"
 *      },
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mÃ¨re patrie",
 *      "position": {
 *           "lon": 12,
 *          "lat": 12
 *      },
 *      "price": 19.99,
 *      "deliveryPrice": 5,
 *      "commissionPrice": 3,
 *      "client": {
 *          "_id": "ATqLhA3i2",
 *          "firstname": "Client - 2",
 *          "lastname": "Test",
 *          "email": "2@client.com",
 *          "phone": "0606060606",
 *          "role": "client",
 *          "iat": 1655544747
 *      }
 *      "status": "cancelled",
 *      "deliverer": {}
 * }
 *
 */
OrderRouter.post('/:id/decline', restrictedToRoles('restaurateur'), OrderController.declineOrder)

/**
 * @api {post} /orders/api/orders/:id Set ready for selected Order
 * @apiName ReadyOne
 * @apiGroup Order
 *
 * @apiParam {String} id Order's unique ID
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {Array} menus List of menus.
 * @apiSuccess {Object} restaurant Restaurant information of the order.
 * @apiSuccess {String} comment Comment of the user.
 * @apiSuccess {String} address Address of the client.
 * @apiSuccess {Object} position Longitude and latitude of the client.
 * @apiSuccess {String} coupon Coupon code of the user.
 * @apiSuccess {Number} price Price of the order.
 * @apiSuccess {Number} deliveryPrice Price of the delivery.
 * @apiSuccess {Number} comissionPrice Price of the comission.
 * @apiSuccess {Object} client Client information of the order.
 * @apiSuccess {String} status Status of the command
 * @apiSuccess {Object} deliverer Deliverer information
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "products": [
 *          {
 *              "_id": "tBmfGjVbB",
 *              "name": "Plat - Restaurant 3",
 *              "price": 19.99,
 *              "description": "Plat de sushi",
 *              "image": "link",
 *              "restaurant": "6A1tVGhHG",
 *              "__v": 0
 *          }
 *      ],
 *      "menus": [
 *          ""
 *      ],
 *      "restaurant": {
 *          "owner": {
 *              "_id": "Wp4vULfGv",
 *              "firstname": "Restaurant - 2",
 *              "lastname": "Test",
 *              "phone": "0606060606",
 *              "email": "2@restaurateur.com",
 *              "role": "restaurateur"
 *          },
 *          "position": {
 *              "lon": 15,
 *              "lat": 15
 *          },
 *          "_id": "6A1tVGhHG",
 *          "name": "Restaurant 2",
 *          "description": "string",
 *          "address": "string",
 *          "openingHours": [
 *              {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62ad989ceb8587569c264d51"
 *              }
 *          ],
 *          "types": [
 *              "Array<string>"
 *          ],
 *          "isClosed": false,
 *          "__v": 0,
 *          "couponDate": "2022-07-18T09:26:43.105Z",
 *          "image": "shorturl.at/fldOI"
 *      },
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mÃ¨re patrie",
 *      "position": {
 *           "lon": 12,
 *          "lat": 12
 *      },
 *      "price": 19.99,
 *      "deliveryPrice": 5,
 *      "commissionPrice": 3,
 *      "client": {
 *          "_id": "ATqLhA3i2",
 *          "firstname": "Client - 2",
 *          "lastname": "Test",
 *          "email": "2@client.com",
 *          "phone": "0606060606",
 *          "role": "client",
 *          "iat": 1655544747
 *      }
 *      "status": "waitingDelivery",
 *      "deliverer": {}
 * }
 *
 */
OrderRouter.post('/:id/ready', restrictedToRoles('restaurateur'), OrderController.readyOrder)

/**
 * @api {post} /orders/api/orders/:id Set deliverer for selected Order
 * @apiName AcceptDeliverOne
 * @apiGroup Order
 *
 * @apiParam {String} id Order's unique ID
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {Array} menus List of menus.
 * @apiSuccess {Object} restaurant Restaurant information of the order.
 * @apiSuccess {String} comment Comment of the user.
 * @apiSuccess {String} address Address of the client.
 * @apiSuccess {Object} position Longitude and latitude of the client.
 * @apiSuccess {String} coupon Coupon code of the user.
 * @apiSuccess {Number} price Price of the order.
 * @apiSuccess {Number} deliveryPrice Price of the delivery.
 * @apiSuccess {Number} comissionPrice Price of the comission.
 * @apiSuccess {Object} client Client information of the order.
 * @apiSuccess {String} status Status of the command
 * @apiSuccess {Object} deliverer Deliverer information
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "products": [
 *          {
 *              "_id": "tBmfGjVbB",
 *              "name": "Plat - Restaurant 3",
 *              "price": 19.99,
 *              "description": "Plat de sushi",
 *              "image": "link",
 *              "restaurant": "6A1tVGhHG",
 *              "__v": 0
 *          }
 *      ],
 *      "menus": [
 *          ""
 *      ],
 *      "restaurant": {
 *          "owner": {
 *              "_id": "Wp4vULfGv",
 *              "firstname": "Restaurant - 2",
 *              "lastname": "Test",
 *              "phone": "0606060606",
 *              "email": "2@restaurateur.com",
 *              "role": "restaurateur"
 *          },
 *          "position": {
 *              "lon": 15,
 *              "lat": 15
 *          },
 *          "_id": "6A1tVGhHG",
 *          "name": "Restaurant 2",
 *          "description": "string",
 *          "address": "string",
 *          "openingHours": [
 *              {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62ad989ceb8587569c264d51"
 *              }
 *          ],
 *          "types": [
 *              "Array<string>"
 *          ],
 *          "isClosed": false,
 *          "__v": 0,
 *          "couponDate": "2022-07-18T09:26:43.105Z",
 *          "image": "shorturl.at/fldOI"
 *      },
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mÃ¨re patrie",
 *      "position": {
 *           "lon": 12,
 *          "lat": 12
 *      },
 *      "price": 19.99,
 *      "deliveryPrice": 5,
 *      "commissionPrice": 3,
 *      "client": {
 *          "_id": "ATqLhA3i2",
 *          "firstname": "Client - 2",
 *          "lastname": "Test",
 *          "email": "2@client.com",
 *          "phone": "0606060606",
 *          "role": "client",
 *          "iat": 1655544747
 *      }
 *      "status": "waitingDelivery",
 *      "deliverer": {
 *          "_id": "FduJhA5s2",
 *          "firstname": "Deliverer - 1",
 *          "lastname": "Test",
 *          "email": "1@deliverer.com",
 *          "phone": "0707070707",
 *          "role": "deliverer"
 *      }
 * }
 *
 */
OrderRouter.post('/:id/delivererAccept', restrictedToRoles('deliverer'), OrderController.acceptDelivererOrder)

/**
 * @api {post} /orders/api/orders/:id Accept selected Order delivery
 * @apiName DeliverOne
 * @apiGroup Order
 *
 * @apiParam {String} id Order's unique ID
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {Array} menus List of menus.
 * @apiSuccess {Object} restaurant Restaurant information of the order.
 * @apiSuccess {String} comment Comment of the user.
 * @apiSuccess {String} address Address of the client.
 * @apiSuccess {Object} position Longitude and latitude of the client.
 * @apiSuccess {String} coupon Coupon code of the user.
 * @apiSuccess {Number} price Price of the order.
 * @apiSuccess {Number} deliveryPrice Price of the delivery.
 * @apiSuccess {Number} comissionPrice Price of the comission.
 * @apiSuccess {Object} client Client information of the order.
 * @apiSuccess {String} status Status of the command
 * @apiSuccess {Object} deliverer Deliverer information
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "products": [
 *          {
 *              "_id": "tBmfGjVbB",
 *              "name": "Plat - Restaurant 3",
 *              "price": 19.99,
 *              "description": "Plat de sushi",
 *              "image": "link",
 *              "restaurant": "6A1tVGhHG",
 *              "__v": 0
 *          }
 *      ],
 *      "menus": [
 *          ""
 *      ],
 *      "restaurant": {
 *          "owner": {
 *              "_id": "Wp4vULfGv",
 *              "firstname": "Restaurant - 2",
 *              "lastname": "Test",
 *              "phone": "0606060606",
 *              "email": "2@restaurateur.com",
 *              "role": "restaurateur"
 *          },
 *          "position": {
 *              "lon": 15,
 *              "lat": 15
 *          },
 *          "_id": "6A1tVGhHG",
 *          "name": "Restaurant 2",
 *          "description": "string",
 *          "address": "string",
 *          "openingHours": [
 *              {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62ad989ceb8587569c264d51"
 *              }
 *          ],
 *          "types": [
 *              "Array<string>"
 *          ],
 *          "isClosed": false,
 *          "__v": 0,
 *          "couponDate": "2022-07-18T09:26:43.105Z",
 *          "image": "shorturl.at/fldOI"
 *      },
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mÃ¨re patrie",
 *      "position": {
 *           "lon": 12,
 *          "lat": 12
 *      },
 *      "price": 19.99,
 *      "deliveryPrice": 5,
 *      "commissionPrice": 3,
 *      "client": {
 *          "_id": "ATqLhA3i2",
 *          "firstname": "Client - 2",
 *          "lastname": "Test",
 *          "email": "2@client.com",
 *          "phone": "0606060606",
 *          "role": "client",
 *          "iat": 1655544747
 *      }
 *      "status": "delivering",
 *      "deliverer": {
 *          "_id": "FduJhA5s2",
 *          "firstname": "Deliverer - 1",
 *          "lastname": "Test",
 *          "email": "1@deliverer.com",
 *          "phone": "0707070707",
 *          "role": "deliverer"
 *      }
 * }
 *
 */
OrderRouter.post('/:id/deliver', restrictedToRoles('deliverer'), OrderController.deliverOrder)

/**
 * @api {post} /orders/api/orders/:id Complete selected Order
 * @apiName CompleteOne
 * @apiGroup Order
 *
 * @apiParam {String} id Order's unique ID
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {Array} menus List of menus.
 * @apiSuccess {Object} restaurant Restaurant information of the order.
 * @apiSuccess {String} comment Comment of the user.
 * @apiSuccess {String} address Address of the client.
 * @apiSuccess {Object} position Longitude and latitude of the client.
 * @apiSuccess {String} coupon Coupon code of the user.
 * @apiSuccess {Number} price Price of the order.
 * @apiSuccess {Number} deliveryPrice Price of the delivery.
 * @apiSuccess {Number} comissionPrice Price of the comission.
 * @apiSuccess {Object} client Client information of the order.
 * @apiSuccess {String} status Status of the command
 * @apiSuccess {Object} deliverer Deliverer information
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "products": [
 *          {
 *              "_id": "tBmfGjVbB",
 *              "name": "Plat - Restaurant 3",
 *              "price": 19.99,
 *              "description": "Plat de sushi",
 *              "image": "link",
 *              "restaurant": "6A1tVGhHG",
 *              "__v": 0
 *          }
 *      ],
 *      "menus": [
 *          ""
 *      ],
 *      "restaurant": {
 *          "owner": {
 *              "_id": "Wp4vULfGv",
 *              "firstname": "Restaurant - 2",
 *              "lastname": "Test",
 *              "phone": "0606060606",
 *              "email": "2@restaurateur.com",
 *              "role": "restaurateur"
 *          },
 *          "position": {
 *              "lon": 15,
 *              "lat": 15
 *          },
 *          "_id": "6A1tVGhHG",
 *          "name": "Restaurant 2",
 *          "description": "string",
 *          "address": "string",
 *          "openingHours": [
 *              {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62ad989ceb8587569c264d51"
 *              }
 *          ],
 *          "types": [
 *              "Array<string>"
 *          ],
 *          "isClosed": false,
 *          "__v": 0,
 *          "couponDate": "2022-07-18T09:26:43.105Z",
 *          "image": "shorturl.at/fldOI"
 *      },
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mÃ¨re patrie",
 *      "position": {
 *           "lon": 12,
 *          "lat": 12
 *      },
 *      "price": 19.99,
 *      "deliveryPrice": 5,
 *      "commissionPrice": 3,
 *      "client": {
 *          "_id": "ATqLhA3i2",
 *          "firstname": "Client - 2",
 *          "lastname": "Test",
 *          "email": "2@client.com",
 *          "phone": "0606060606",
 *          "role": "client",
 *          "iat": 1655544747
 *      }
 *      "status": "delivering",
 *      "deliverer": {
 *          "_id": "FduJhA5s2",
 *          "firstname": "Deliverer - 1",
 *          "lastname": "Test",
 *          "email": "1@deliverer.com",
 *          "phone": "0707070707",
 *          "role": "deliverer"
 *      }
 * }
 *
 */
OrderRouter.post('/:id/completed', restrictedToRoles('deliverer'), OrderController.completedOrder)

export default OrderRouter

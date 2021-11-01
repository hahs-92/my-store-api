const express = require('express')
//ROUTERS
const routerProducts = require('./products.route')
const routerCtgs = require('./categories.route')
const routerUsers = require('./users.route')
const routerCustomer = require('./customers.route')
const routerOrders = require('./orders.router')
const routerAuth = require('./auth.route')

function routerApi(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/products',routerProducts)
  router.use('/categories', routerCtgs)
  router.use('/users', routerUsers)
  router.use('/customers', routerCustomer)
  router.use('/orders', routerOrders)
  router.use('/auth', routerAuth)
}

module.exports = routerApi

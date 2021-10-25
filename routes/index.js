const express = require('express')
//ROUTERS
const routerProducts = require('./products.route')
const routerCtgs = require('./categories.route')
const routerUsers = require('./users.route')

function routerApi(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/products',routerProducts)
  router.use('/categories', routerCtgs)
  router.use('/users', routerUsers)
}

module.exports = routerApi

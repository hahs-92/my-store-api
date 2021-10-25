//ROUTERS
const routerProducts = require('./products.route')
const routerCtgs = require('./categories.route')
const routerUsers = require('./users.route')

function routerApi(app) {
  app.use('/api/products',routerProducts)
  app.use('/api/categories', routerCtgs)
  app.use('/api/users', routerUsers)
}

module.exports = routerApi

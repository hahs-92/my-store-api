const { Sequelize } = require('sequelize')
//CONFIG
const { config } = require('../config/config')
//DB
const setupModels = require('../db/models')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI,{
  dialect: 'postgres',
  logging: true
})

setupModels(sequelize)

// ESTO SOLO ES PARA DESARROLLO
// AHORA SE REALIZA CON MIGRACIONES
// sequelize.sync()

module.exports = sequelize

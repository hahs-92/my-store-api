const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//env
const {config} = require('../config/config')
//SERVICE
const UserService = require('./users.service')


const service = new UserService()

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email)

    if(!user) {
      throw boom.unauthorized()
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      throw boom.unauthorized()
    }

    delete user.dataValues.password

    return user
  }

  signToken(user) {

    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecret)

    return { user, token }
  }

  //SIN IMPLEMENTAR CLASE 16
  sendEmil(email){

  }
}

module.exports = AuthService

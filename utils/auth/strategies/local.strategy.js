const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
//SERVICES
const UsersService = require('../../../services/users.service')

const service = new UsersService()

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
   async(email, password, done) => {
    try {
      const user = await service.findByEmail(email)

      if(!user) {
        done(boom.unauthorized(), false)
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) {
        done(boom.unauthorized(), false)
      }

      //NO DEVOLVEMOS EL PASSWORD
      delete user.dataValues.password

      done(null, user)//NO HAY ERROR Y ENVIAMOS EL USUARIO

    } catch (error) {
      done(error, false) //NO SE PUDO HACER LA VALIDACION
    }
  }
)

module.exports = LocalStrategy

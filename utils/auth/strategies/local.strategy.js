const { Strategy } = require('passport-local')
//SERVICES
const AuthService = require('../../../services/auth.service')

const service = new AuthService()

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
   async(email, password, done) => {
    try {
      const user = await service.getUser(email, password)

      done(null, user)//NO HAY ERROR Y ENVIAMOS EL USUARIO

    } catch (error) {
      done(error, false) //NO SE PUDO HACER LA VALIDACION
    }
  }
)

module.exports = LocalStrategy

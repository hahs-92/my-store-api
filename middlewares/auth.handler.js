const boom = require('@hapi/boom')

const {config} = require('../config/config')


function checkApiKey(req, res, next) {
  const apiKey = req.headers['api']

  if(apiKey === config.apiKey) {
    next()
  } else {
    next(boom.unauthorized())
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user //esta es la info firmada
  console.log("user: ", user)
  if(user.role === 'admin') {
    next()
  } else {
    next(boom.unauthorized())
  }
}

//2 VERSION DE LA FUNCION AANTERIOR
//CLOUSURE
//ROLES ES UN ARRAY
function checkRoles(roles) {
  return (req, res, next) => {
    console.log("roles: ", roles)
    const user = req.user //esta es la info firmada, la devuelve la autentificacion de jwt
    // console.log("user: ", user) // contiene sub - role

    if(roles.includes(user.role)) {
      next()
    } else {
      next(boom.unauthorized())
    }
  }
}


module.exports = {
  checkApiKey,
  checkAdminRole,
  checkRoles
}

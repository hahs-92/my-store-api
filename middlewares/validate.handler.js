const boom = require("@hapi/boom")

function validatorHandler (schema, property) {
  //retornamos un middleware personalizado
  //es una clousure
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, {abortEarly: false}) //!abortEarly para que envie todos los errores a la vez

    if(error) {
      next(boom.badRequest(error))
    }

    next()
  }
}

module.exports = validatorHandler

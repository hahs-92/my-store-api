function errorLog(err, req, res, next) {
  console.error(err) //NOT agregar mensajes junto al error
  next(err)
}

function errorHandler(err, req, res, next) {

  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function errorBoomHandler(err, req, res, next) {

  if(err.isBoom) {
    const { output} = err
    res.status(output.statusCode).json(output.payload)
  }

  next(err) //Iria a errorHandler
}


module.exports = {
  errorLog,
  errorHandler,
  errorBoomHandler
}
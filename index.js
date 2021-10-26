const express = require('express')
//ROUTES
const routerApi = require('./routes')
//ERRORS Functions
const { errorLog, errorHandler, errorBoomHandler} = require('./middlewares/error.handler.js')

const app = express()
const port = 3005;

app.use(express.json())


app.get('/', (req, res) => {
  res.send('hi there¡')
})

routerApi(app)

//error handler
app.use(errorLog)
app.use(errorBoomHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`el server esta corriendo en ele puerto ${port}`)
})

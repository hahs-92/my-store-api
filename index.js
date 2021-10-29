const express = require('express')
//ROUTES
const routerApi = require('./routes')
//ERRORS Functions
const {
  errorLog,
  errorHandler,
  errorBoomHandler,
  ormErrorHandler
} = require('./middlewares/error.handler.js')
//CORS
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3005;

const whiteList = ['http://localhost:3000', 'https://,yapp.co']
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not Allow it'))
    }
  }
}

app.use(express.json())
app.use(cors(options))


app.get('/', (req, res) => {
  res.send('hi there¡')
})

routerApi(app)

//error handler
app.use(errorLog)
app.use(ormErrorHandler)
app.use(errorBoomHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`el server esta corriendo en ele puerto ${port}`)
})

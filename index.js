const express = require('express')
const passport = require('passport')
//ROUTES
const routerApi = require('./routes')
//MIDDLEWARES ERRORS
const {
  errorLog,
  errorHandler,
  errorBoomHandler,
  ormErrorHandler
} = require('./middlewares/error.handler.js')
//MIDDLEWARES AUTH
const { checkApiKey } = require('./middlewares/auth.handler')
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
//auth
app.use(passport.initialize())
require('./utils/auth')


app.get('/', (req, res) => {
  res.send('hi there¡')
})

//ruta de prueba
app.get('/new-route',
  checkApiKey,
  (req, res) => {
    res.send('hi, i am a new route')
  }
)

routerApi(app)

//error handler
app.use(errorLog)
app.use(ormErrorHandler)
app.use(errorBoomHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`el server esta corriendo en ele puerto ${port}`)
})

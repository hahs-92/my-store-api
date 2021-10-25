const express = require('express')
//ROUTES
const routerApi = require('./routes')

const app = express()
const port = 3005;

app.use(express.json())


app.get('/', (req, res) => {
  res.send('hi there¡')
})

routerApi(app)

app.listen(port, () => {
  console.log(`el server esta corriendo en ele puerto ${port}`)
})

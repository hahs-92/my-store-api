const express = require('express')

const app = express()
const port = 3005;

app.get('/', (req, res) => {
  res.send('hi there¡')
})

app.get('/products', (req, res) => {
  res.json({
    name: 'Pc-Gamer',
    price: 4000
  })
})

app.listen(port, () => {
  console.log(`el server esta corriendo en ele puerto ${port}`)
})

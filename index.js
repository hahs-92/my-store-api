const express = require('express')
//API FAKE
const faker = require('faker')

const app = express()
const port = 3005;

const data = [
  {
    id: 1,
    name: 'Pc-Gamer',
    price: 4000,
    ctg: "Tech"
  },
  {
    id: 2,
    name: 'Pc-Home',
    price: 1000,
    ctg: "Tech"
  },
  {
    id: 3,
    name: 'Pc',
    price: 2000,
    ctg: "Tech"
  }
]

const ctgs = [
  {
    id: 1,
    name: "Tech"
  },
  {
    id: 2,
    name: "home"
  }
]

app.get('/', (req, res) => {
  res.send('hi there¡')
})

app.get('/products', (req, res) => {
  const products = []
  const { size } = req.query
  const limit = size || 10

  for(let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
  }

  res.json({
    data: products,
    count: products.length
  })
})

app.get('/products/filter', (req, res) => {
  res.send('hi, Los endpoints especificos deben declararsen antes de los endpoints dinamicos. ')
})

app.get('/products/:id', (req, res) => {
  const id_product = req.params.id

  const product = data.filter(item => item.id == id_product)

  res.json({
    data: product
  })
})


app.get('/categories', (req, res) => {
  res.json({
    data: ctgs
  })
})

app.get('/categories/:id_category', (req, res) => {

  const { id_category } = req.params

  const ctg = ctgs.filter(item => item.id == id_category)

  res.json({
    data: ctg
  })
})

app.get('/categories/:id_category/products/:id_product', (req, res) => {
  const { id_category } = req.params
  const { id_product } = req.params

  res.json({
    id_category: id_category,
    id_product: id_product
  })
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query

  if(limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('no hay query')
  }
})


app.listen(port, () => {
  console.log(`el server esta corriendo en ele puerto ${port}`)
})

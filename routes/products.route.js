const express = require('express')
//API FAKE
const faker = require('faker')

const router = express.Router()

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

router.get('/', (req, res) => {
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


router.get('/filter', (req, res) => {
  res.send('hi, Los endpoints especificos deben declararsen antes de los endpoints dinamicos. ')
})

router.get('/:id', (req, res) => {
  const id_product = req.params.id

  const product = data.filter(item => item.id == id_product)

  res.json({
    data: product
  })
})

module.exports = router

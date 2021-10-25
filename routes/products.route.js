const express = require('express')
//SERVICES
const ProductsService = require('../services/products.service')

//INSTANCIAS
const router = express.Router()
const service = new ProductsService()


router.get('/', (req, res) => {
  const products = service.find()

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

  const product = service.findOne(id_product)

  res.json({
    data: product
  })
})

router.post('/',(req, res) => {
  const body = req.body
  const newProduct = service.create(body)

  res.status(201).json({
    message: 'created',
    newProduct
  })
})

router.patch('/:id',(req, res) => {
  const { id } = req.params
  const body = req.body
  const product = service.update(id, body)

  res.json(product)
})

router.delete('/:id',(req, res) => {
  const { id } = req.params

  const product = service.delete(id)

  res.json(product)
})

module.exports = router

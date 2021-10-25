const express = require('express')
//SERVICES
const ProductsService = require('../services/products.service')

//INSTANCIAS
const router = express.Router()
const service = new ProductsService()


router.get('/', async(req, res) => {
  try {
    const products = await service.find()

    res.json({
      data: products,
      count: products.length
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

})


router.get('/filter', async(req, res) => {
  res.send('hi, Los endpoints especificos deben declararsen antes de los endpoints dinamicos. ')
})

router.get('/:id', async(req, res) => {
  try {
    const id_product = req.params.id

    const product = await service.findOne(id_product)

    res.json({
      data: product
    })

  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/',async(req, res) => {
  const body = req.body
  const newProduct = await service.create(body)

  res.status(201).json({
    message: 'created',
    newProduct
  })
})

router.patch('/:id',async(req, res) => {
  try {
    const { id } = req.params
    const body = req.body
    const product = await service.update(id, body)

    res.json(product)

  } catch (error) {
     res.status(404).json({
      message: error.message
    })
  }

})

router.delete('/:id',async(req, res) => {
  const { id } = req.params

  const product = await service.delete(id)

  res.json(product)
})

module.exports = router

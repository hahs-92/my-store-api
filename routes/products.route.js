const express = require('express')
//SERVICES
const ProductsService = require('../services/products.service')
//MIDDLEWARES
const validatorHandler = require('../middlewares/validate.handler')
//SCHEMAS
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('../schemas/product.schema')


//INSTANCIAS
const router = express.Router()
const service = new ProductsService()


router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async(req, res, next) => {
    try {
      const products = await service.find(req.query)

      res.json({
        data: products,
        count: products.length
      })
    } catch (error) {
        next(error)
    }
  }
)


// router.get('/filter', async(req, res) => {
//   res.send('hi, Los endpoints especificos deben declararsen antes de los endpoints dinamicos. ')
// })

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async(req, res, next) => {
    try {
      const id_product = req.params.id

      const product = await service.findOne(id_product)

      res.json({
        data: product
      })

    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.create(body)

      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }

  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async(req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)

      res.json(product)

    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params
      await service.delete(id)

      res.status(201).json({id})

    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

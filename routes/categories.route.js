const express = require('express')
const passport = require('passport')
//SERVICE
const CategoriesService = require('../services/categories.service')
//VALIDATIONS
const validatorHandler = require('../middlewares/validate.handler')
//SCHEMAS
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
} = require('../schemas/category.schema')

const router = express.Router()
const service = new CategoriesService()


router.get('/', async(req, res, next) => {
  try {
    const ctgs = await service.find()

    res.json(ctgs)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
)

// router.get('/:id_category/products/:id_product', (req, res) => {
//   const { id_category } = req.params
//   const { id_product } = req.params

//   res.json({
//     id_category: id_category,
//     id_product: id_product
//   })
// })

//ruta protegida
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await service.create(body)
      res.status(201).json(newCategory);
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router

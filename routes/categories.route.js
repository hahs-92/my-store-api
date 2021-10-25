const express = require('express')
const CategoriesService = require('../services/categories.service')

const router = express.Router()
const service = new CategoriesService()


router.get('/', (req, res) => {
  const ctgs = service.find()

  res.json({
    data: ctgs
  })
})


router.get('/:id_category', (req, res) => {

  const { id_category } = req.params

  const ctg = service.findOne(id_category)

  res.json({
    data: ctg
  })
})

router.get('/:id_category/products/:id_product', (req, res) => {
  const { id_category } = req.params
  const { id_product } = req.params

  res.json({
    id_category: id_category,
    id_product: id_product
  })
})

module.exports = router

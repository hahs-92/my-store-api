const express = require('express')

const router = express.Router()

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


router.get('/', (req, res) => {
  res.json({
    data: ctgs
  })
})


router.get('/:id_category', (req, res) => {

  const { id_category } = req.params

  const ctg = ctgs.filter(item => item.id == id_category)

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

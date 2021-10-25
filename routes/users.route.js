const express = require('express')
const UsersService = require('../services/users.service')

const router = express.Router()
const service = new UsersService()

router.get('/', (req, res) => {
  const { limit, offset } = req.query
  const users = service.find()

  if(limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.json({
      data: users,
      count: users.length
    })
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  const user = service.findOne(id)
  res.json({
    data: user

  })
})

module.exports = router

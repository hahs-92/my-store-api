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

router.post('/',(req, res) => {
  const body = req.body
  const newUser = service.create(body)

  res.status(201).json({
    message: 'created',
    newUser
  })
})

router.patch('/:id',(req, res) => {
  const { id } = req.params
  const body = req.body
  const user = service.update(id, body)

  res.json(user)
})

router.delete('/:id',(req, res) => {
  const { id } = req.params

  const user = service.delete(id)

  res.json(user)
})

module.exports = router

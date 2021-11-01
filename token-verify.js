//EXAMPLE
const jwt = require('jsonwebtoken')

const secret = 'MyDog'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNTgwMzE4MH0.sQUegs__OkTxPCb_mjZ7S645Sdn-nGGpIow3uBBdU_E'

function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret)
console.log(payload)

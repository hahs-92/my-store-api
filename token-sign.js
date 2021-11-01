//EXAMPLE
const jwt = require('jsonwebtoken')

const secret = 'MyDog'
const payload = {
  sub: 1, // ID
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret)
}

const token = signToken(payload, secret)
console.log(token)

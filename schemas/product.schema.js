const Joi = require('joi')

// const id = Joi.string().uuid()
const id = Joi.number().integer()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const description = Joi.string().min(10)
const image = Joi.string().uri()
const categoryId = Joi.number().integer()

const offset = Joi.number().integer()
const limit = Joi.number().integer()
const min_price = Joi.number().integer()
const max_price = Joi.number().integer()

//SCHEMAS
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
})

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId
})

const getProductSchema = Joi.object({
  id: id.required()
})

const queryProductSchema = Joi.object({
  offset,
  limit,
  price,
  min_price,
  //si existe min_price , max_price es requerido
  max_price: max_price.when('min_price', {
    is: Joi.number().integer().required(),
    then: Joi.required()
  })
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
}

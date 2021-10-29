//API FAKE
// const faker = require('faker')
const boom = require('@hapi/boom')
//LIBS
const { models } = require('../libs/sequelize')

class CategoriesService {
  // constructor() {
  //   this.categories = []
  //   this.generate()
  // }

  // generate() {
  //   const limit = 5

  //   for(let index = 0; index < limit; index++) {
  //     this.categories.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.department(),
  //     })
  //   }

  // }

  async create(data) {
    // const newCtg = {
    //   id: faker.datatype.uuid(),
    //   ...data
    // }

    // this.categories.push(newCtg)
    // return newCtg
    // return data
    const newCtg = await models.Category.create(data)

    return newCtg
  }

  async find() {
    // return this.categories
    const ctgs = await models.Category.findAll()
    return ctgs
  }

  async findOne(id) {
    // return this.categories.find(item => item.id === id)
    // return { id }
    const ctg = await models.Category.findByPk(id,{
      include:['products']
    })
    return ctg
  }

  async update(id, changes) {
    return {
      id,
      changes
    }
  }

  async delete(id) {
    return { id }
  }


}

module.exports = CategoriesService

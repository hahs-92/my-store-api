//API FAKE
const faker = require('faker')

class CategoriesService {
  constructor() {
    this.categories = []
    this.generate()
  }

  generate() {
    const limit = 5

    for(let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
      })
    }

  }

  create(data) {
    const newCtg = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.categories.push(newCtg)
    return newCtg
  }

  find() {
    return this.categories
  }

  findOne(id) {
    return this.categories.find(item => item.id === id)
  }


}

module.exports = CategoriesService

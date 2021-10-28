//API FAKE
const faker = require('faker')
//db
const getConnection = require('../libs/postgres')

class UsersService {
  constructor() {
    this.users = []
    this.generate()
  }

  generate() {
    const limit = 10

    for(let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        avatar: faker.image.imageUrl(),
        email: faker.internet.email()
      })
    }

  }

  create(data) {
    // const newUser = {
    //   id: faker.datatype.uuid(),
    //   ...data
    // }

    // this.users.push(newUser)
    // return newUser
    return data
  }

  async find() {
    // return this.users
    const client = await getConnection()
    const resp = await client.query('SELECT * FROM tasks')
    return resp.rows
  }

  findOne(id) {
    // return this.users.find(item => item.id === id)
    return { id }
  }

  update(id, changes) {
    const index = this.users.findIndex(item => item.id === id)

    if(index === -1) {
      throw new Error('product not found')
    }

    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }

    return this.users[index]
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id)

    if(index === -1) {
      throw new Error('product not found')
    }

    this.users.splice(index, 1)
    return { id }
  }
}

module.exports = UsersService

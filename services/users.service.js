const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')
//API FAKE
const faker = require('faker')
//db
// const getConnection = require('../libs/postgres')
const pool = require('../libs/postgres.pool')
//LIBs
const { models } = require('../libs/sequelize')

class UsersService {
  constructor() {
    // this.users = []
    // this.generate()
    // this.pool = pool
    // this.pool.on('error', (err) => console.error(err))
  }

  // generate() {
  //   const limit = 10

  //   for(let index = 0; index < limit; index++) {
  //     this.users.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.name.firstName(),
  //       avatar: faker.image.imageUrl(),
  //       email: faker.internet.email()
  //     })
  //   }
  // }

  async create(data) {
    // const newUser = {
    //   id: faker.datatype.uuid(),
    //   ...data
    // }

    // this.users.push(newUser)
    // return newUser

    const hash = await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({
      ...data,
      password: hash
    })

    //NO DEBEMOS RETORNAR EL PASSWORD
    //ASI SE HACE CON SEQUELIZE (dataValues)
    delete newUser.dataValues.password

    return newUser
  }

  async find() {
    // connection with client
    // const client = await getConnection()
    // const resp = await client.query('SELECT * FROM tasks')
    // return resp.rows

    //conection with pool
    // const query = `SELECT * FROM tasks`
    // const resp = await this.pool.query(query)
    // return resp.rows

    //WITH ORM
    const resp = await models.User.findAll({
      include: ['customer']
    })
    return resp
  }

  //AUTH
  async findByEmail(email) {
    const resp = await models.User.findOne({
      where: { email }
    })
    return resp
  }

  async findOne(id) {
    // return this.users.find(item => item.id === id)
    // return { id }

    const user = await models.User.findByPk(id);

    if(!user) {
      throw boom.notFound('user not found')
    }

    return user
  }

  async update(id, changes) {
    // const index = this.users.findIndex(item => item.id === id)

    // if(index === -1) {
    //   throw new Error('product not found')
    // }

    // const user = this.users[index]
    // this.users[index] = {
    //   ...user,
    //   ...changes
    // }

    // return this.users[index]

    const user = await this.findOne(id)
    const resp = await user.update(changes)
    return resp

  }

  async delete(id) {
    // const index = this.users.findIndex(item => item.id === id)

    // if(index === -1) {
    //   throw new Error('product not found')
    // }

    // this.users.splice(index, 1)
    // return { id }

    const user = await this.findOne(id)
    await user.destroy()
    return id
  }
}

module.exports = UsersService

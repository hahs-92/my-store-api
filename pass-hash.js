//EXAMPLE

const bcrypt = require('bcrypt')

async function hashData() {
  const myPassword = 'admin123'
  const hash = await bcrypt.hash(myPassword, 10)

  console.log("hash: ", hash)
}

hashData()

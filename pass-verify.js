//EXAMPLE

const bcrypt = require('bcrypt')

async function verifyData() {
  const myPassword = 'admin123'
  const hash = '$2b$10$1wh0kAwt9ZexeSllokXmS.9.vuZBYwTTB4pivKkoPPdRJ3Qcbxjde'
  const isMatch = await bcrypt.compare(myPassword, hash)

  console.log("isMatch: ", isMatch)
}

verifyData()

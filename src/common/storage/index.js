const db = require('./db')
const migrateFunctions = require('./migrate')

module.exports = {
  db,
  ...migrateFunctions
}

const createDbClient = require('knex')
const { DB_CONNECTION_STRING } = require('./config')

const db = createDbClient({ client: 'pg', connection: DB_CONNECTION_STRING })

module.exports = db

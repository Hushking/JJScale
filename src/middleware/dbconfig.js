const config = require('../../config/database')
const { Pool } = require('pg')

const poolPromise = new Pool({
  host: 'drona.db.elephantsql.com', 
  port: 5432,
  database: 'eavfghgf',
  user: 'eavfghgf',
  password: 'rInFRBnbrPaNO0lIbVPhvAys-JhvbfCP'
})

module.exports = {
  poolPromise
}
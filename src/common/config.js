/* @flow */

const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const ENV: string = process.env.NODE_ENV || 'development'

{
  const defaultEnvFilePath = path.join(__dirname, `../../.env`)
  const specificEnvFilePath = path.join(__dirname, `../../.env.${ENV}`)
  const specificEnvFileExists = fs.existsSync(specificEnvFilePath)
  const envFilePath = specificEnvFileExists ? specificEnvFilePath : defaultEnvFilePath

  dotenv.config({ path: envFilePath })
}

const LOG_LEVEL: ?number = parseInt(process.env.PKS_LOG_LEVEL)
const HOST: ?string = process.env.PKS_HOST
const PORT: ?number = parseInt(process.env.PKS_PORT)
const CORS_ORIGIN: ?string = process.env.PKS_CORS_ORIGIN
const AUTH_SECRET: ?string = process.env.PKS_AUTH_SECRET
const DB_CONNECTION_STRING: ?string = process.env.PKS_DB_CONNECTION_STRING

module.exports = {
  ENV,
  LOG_LEVEL,
  HOST,
  PORT,
  CORS_ORIGIN,
  AUTH_SECRET,
  DB_CONNECTION_STRING
}

const fs = require('fs')
const path = require('path')
const globby = require('globby')
const { promisify } = require('bluebird')
const db = require('./db')

const readFile = promisify(fs.readFile)
const migrationsDirPath = path.join(__dirname, './migrations')

async function applyMigrations (migrationFilesPaths) {
  for (const migrationFilePath of migrationFilesPaths) {
    const migrationSql = await readFile(migrationFilePath, 'utf8')
    await db.schema.raw(migrationSql)
  }
}

async function migrateDbUp () {
  const migrationFilesPaths = await globby('*_up.sql', { cwd: migrationsDirPath, absolute: true })

  await applyMigrations(migrationFilesPaths)
}

async function migrateDbDown () {
  const migrationFilesPaths = await globby('*_down.sql', { cwd: migrationsDirPath, absolute: true })

  await applyMigrations(migrationFilesPaths.reverse())
}

async function migrateDbRefresh () {
  await migrateDbDown()
  await migrateDbUp()
}

module.exports = {
  migrateDbUp,
  migrateDbDown,
  migrateDbRefresh
}

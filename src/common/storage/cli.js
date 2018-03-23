const { argv } = require('yargs')
const { ENV } = require('../config')
const { sleep } = require('../lib')
const { migrateDbUp, migrateDbDown, migrateDbRefresh } = require('./migrate')

const ACTION_MIGRATE_DB_UP = 'migratedb:up'
const ACTION_MIGRATE_DB_DOWN = 'migratedb:down'
const ACTION_MIGRATE_DB_REFRESH = 'migratedb:refresh'

const ACTIONS_SUPPORTED = [
  ACTION_MIGRATE_DB_UP,
  ACTION_MIGRATE_DB_DOWN,
  ACTION_MIGRATE_DB_REFRESH
]

const ACTIONS_FUNCTIONS = {
  [ACTION_MIGRATE_DB_UP]: migrateDbUp,
  [ACTION_MIGRATE_DB_DOWN]: migrateDbDown,
  [ACTION_MIGRATE_DB_REFRESH]: migrateDbRefresh
}

const ACTIONS_MESSAGES = {
  [ACTION_MIGRATE_DB_UP]: 'Migrating database up',
  [ACTION_MIGRATE_DB_DOWN]: 'Migrating database down',
  [ACTION_MIGRATE_DB_REFRESH]: 'Refreshing database'
}

const ACTION_TIMEOUT = 3 * 1000 // 3 seconds, milliseconds

async function execute () {
  const action = argv._[0]

  if (!ACTIONS_SUPPORTED.includes(action)) {
    console.log('Action not supported.')
    process.exit(1)
  }

  const actionMessage = ACTIONS_MESSAGES[action]

  console.log(`${actionMessage} in "${ENV}" environment...`)

  // waiting before applying action in order to give user a chance for Cntrl+C cancel
  await sleep(ACTION_TIMEOUT)

  const actionFunction = ACTIONS_FUNCTIONS[action]

  try {
    await actionFunction()
  } catch (error) {
    console.log('Failed with error:')
    console.error(error)
    process.exit(1)
  }

  console.log('Succeed.')
  process.exit(0)
}

execute()

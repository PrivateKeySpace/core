const environmentsConstants = require('./environments')
const storageErrorsConstants = require('./storageErrors')

module.exports = {
  ...environmentsConstants,
  ...storageErrorsConstants
}

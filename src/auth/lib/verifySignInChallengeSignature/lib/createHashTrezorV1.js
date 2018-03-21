const createHashTrezor = require('./createHashTrezor')

function createHashTrezorV1 (challengeVisualBuffer, challengeHiddenBuffer) {
  return createHashTrezor(challengeVisualBuffer, challengeHiddenBuffer)
}

module.exports = createHashTrezorV1

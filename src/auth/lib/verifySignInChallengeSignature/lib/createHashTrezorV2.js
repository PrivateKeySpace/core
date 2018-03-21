const { crypto: { sha256 } } = require('bitcoinjs-lib')
const createHashTrezor = require('./createHashTrezor')

function createHashTrezorV2 (challengeVisualBuffer, challengeHiddenBuffer) {
  const challengeVisualHashBuffer = sha256(challengeVisualBuffer)
  const challengeHiddenHashBuffer = sha256(challengeHiddenBuffer)

  return createHashTrezor(challengeVisualHashBuffer, challengeHiddenHashBuffer)
}

module.exports = createHashTrezorV2

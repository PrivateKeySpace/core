/* @flow */

const { crypto: { sha256 } } = require('bitcoinjs-lib')
const createHashTrezor = require('./createHashTrezor')

function createHashTrezorV2 (challengeVisualBuffer: Buffer, challengeHiddenBuffer: Buffer): Buffer {
  const challengeVisualHashBuffer: Buffer = sha256(challengeVisualBuffer)
  const challengeHiddenHashBuffer: Buffer = sha256(challengeHiddenBuffer)

  return createHashTrezor(challengeVisualHashBuffer, challengeHiddenHashBuffer)
}

module.exports = createHashTrezorV2

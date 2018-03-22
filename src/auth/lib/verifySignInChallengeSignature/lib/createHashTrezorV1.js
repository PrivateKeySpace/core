/* @flow */

const createHashTrezor = require('./createHashTrezor')

function createHashTrezorV1 (challengeVisualBuffer: Buffer, challengeHiddenBuffer: Buffer): Buffer {
  return createHashTrezor(challengeVisualBuffer, challengeHiddenBuffer)
}

module.exports = createHashTrezorV1

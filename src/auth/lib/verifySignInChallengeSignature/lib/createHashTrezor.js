/* @flow */

const { crypto: { hash256 }, bufferutils: { varIntBuffer } } = require('bitcoinjs-lib')

function createHashTrezor (challengeVisualBuffer: Buffer, challengeHiddenBuffer: Buffer): Buffer {
  const challengeBuffer: Buffer = Buffer.concat([challengeHiddenBuffer, challengeVisualBuffer])
  const magicBuffer: Buffer = Buffer.from('Bitcoin Signed Message:\n')
  const prefixBuffer1: Buffer = varIntBuffer(magicBuffer.length)
  const prefixBuffer2: Buffer = varIntBuffer(challengeBuffer.length)
  const combinedBuffer: Buffer = Buffer.concat([prefixBuffer1, magicBuffer, prefixBuffer2, challengeBuffer])

  return hash256(combinedBuffer)
}

module.exports = createHashTrezor

const { crypto: { hash256 }, bufferutils: { varIntBuffer } } = require('bitcoinjs-lib')

function createHashTrezor (challengeVisualBuffer, challengeHiddenBuffer) {
  const challengeBuffer = Buffer.concat([challengeHiddenBuffer, challengeVisualBuffer])
  const magicBuffer = Buffer.from('Bitcoin Signed Message:\n')
  const prefixBuffer1 = varIntBuffer(magicBuffer.length)
  const prefixBuffer2 = varIntBuffer(challengeBuffer.length)
  const combinedBuffer = Buffer.concat([prefixBuffer1, magicBuffer, prefixBuffer2, challengeBuffer])

  return hash256(combinedBuffer)
}

module.exports = createHashTrezor

const { crypto: { hash256 } } = require('bitcoinjs-lib')

function createHashId (...subjectsHex) {
  const subjectsBuffers = subjectsHex.map(subjectHex => Buffer.from(subjectHex, 'hex'))
  const subjectsBuffer = Buffer.concat(subjectsBuffers)
  const hashIdBuffer = hash256(subjectsBuffer)

  return hashIdBuffer.toString('hex')
}

module.exports = createHashId

/* @flow */

const { crypto: { hash256 } } = require('bitcoinjs-lib')

function createHashId (...subjectsHex: Array<string>): string {
  const subjectsBuffers: Array<Buffer> = subjectsHex.map(subjectHex => Buffer.from(subjectHex, 'hex'))
  const subjectsBuffer: Buffer = Buffer.concat(subjectsBuffers)
  const hashIdBuffer: Buffer = hash256(subjectsBuffer)

  return hashIdBuffer.toString('hex')
}

module.exports = createHashId

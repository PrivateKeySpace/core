/* @flow */

type CreateHashFunction = (Buffer, Buffer) => Buffer

const { ECPair, ECSignature } = require('bitcoinjs-lib')
const { ThisShouldNeverHappenError } = require('../../../common/lib')
const { SIGN_IN_IMPLEMENTATION_TREZOR_V1, SIGN_IN_IMPLEMENTATION_TREZOR_V2 } = require('../../constants/index')
const { createHashTrezorV1, createHashTrezorV2 } = require('./lib')

function verifySignInChallengeSignature (signatureHex: string, publicKeyHex: string, challenge: [string, string], implementation: string): boolean {
  const [challengeVisualString, challengeHiddenHex]: [string, string] = challenge
  const challengeVisualBuffer: Buffer = Buffer.from(challengeVisualString, 'utf8')
  const challengeHiddenBuffer: Buffer = Buffer.from(challengeHiddenHex, 'hex')
  const signatureBuffer: Buffer = Buffer.from(signatureHex, 'hex')
  const publicKeyBuffer: Buffer = Buffer.from(publicKeyHex, 'hex')

  let createHash: CreateHashFunction

  switch (implementation) {
    case SIGN_IN_IMPLEMENTATION_TREZOR_V1: {
      createHash = createHashTrezorV1
      break
    }
    case SIGN_IN_IMPLEMENTATION_TREZOR_V2: {
      createHash = createHashTrezorV2
      break
    }
    default: {
      throw new ThisShouldNeverHappenError('unsupported sign in implementation')
    }
  }

  const hashBuffer: Buffer = createHash(challengeVisualBuffer, challengeHiddenBuffer)
  const keyPair: ECPair = ECPair.fromPublicKeyBuffer(publicKeyBuffer)
  const { signature }: { signature: ECSignature } = ECSignature.parseCompact(signatureBuffer)

  return keyPair.verify(hashBuffer, signature)
}

module.exports = verifySignInChallengeSignature

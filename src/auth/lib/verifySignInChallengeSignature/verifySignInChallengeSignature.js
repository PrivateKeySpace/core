const { ECPair, ECSignature } = require('bitcoinjs-lib')
const { SIGN_IN_IMPLEMENTATION_TREZOR_V1, SIGN_IN_IMPLEMENTATION_TREZOR_V2 } = require('../../constants/index')
const { createHashTrezorV1, createHashTrezorV2 } = require('./lib')

function verifySignInChallengeSignature (signatureHex, publicKeyHex, challenge, implementation) {
  const [challengeVisualString, challengeHiddenHex] = challenge
  const challengeVisualBuffer = Buffer.from(challengeVisualString, 'utf8')
  const challengeHiddenBuffer = Buffer.from(challengeHiddenHex, 'hex')
  const signatureBuffer = Buffer.from(signatureHex, 'hex')
  const publicKeyBuffer = Buffer.from(publicKeyHex, 'hex')

  let createHash

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
      // this should never happen
      break
    }
  }

  const hashBuffer = createHash(challengeVisualBuffer, challengeHiddenBuffer)
  const keyPair = ECPair.fromPublicKeyBuffer(publicKeyBuffer)
  const { signature } = ECSignature.parseCompact(signatureBuffer)

  return keyPair.verify(hashBuffer, signature)
}

module.exports = verifySignInChallengeSignature

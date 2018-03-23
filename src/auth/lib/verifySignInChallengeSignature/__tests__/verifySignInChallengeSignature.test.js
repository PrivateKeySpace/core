const verifySignInChallengeSignature = require('../verifySignInChallengeSignature')
const { validChallenges, invalidChallenges } = require('../__mocks__/signInChallenges')

function callVerifySignInChallengeSignature (payload) {
  return verifySignInChallengeSignature(
    payload.signature,
    payload.publicKey,
    payload.challenge,
    payload.implementation
  )
}

it('should return true with correctly provided signature, public key, visual and hidden challenges and trezor implementation',
  () => {
    for (const challenge of validChallenges) {
      expect(callVerifySignInChallengeSignature(challenge)).toBe(true)
    }
  })

it('should return false with invalid signature/public key/visual and hidden challenges/trezor implementation',
  () => {
    for (const challenge of invalidChallenges) {
      expect(callVerifySignInChallengeSignature(challenge)).toBe(false)
    }
  })

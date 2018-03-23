const verifySignInChallengeSignature = require('../verifySignInChallengeSignature')
const { validSignInData, invalidSignInData } = require('../__mocks__/signInData')

function verifySignInPayload (payload) {
  const { signature, publicKey, challenge, implementation } = payload
  return verifySignInChallengeSignature(
    signature,
    publicKey,
    challenge,
    implementation
  )
}

it('should return true with correctly provided signature, public key, visual and hidden challenges and trezor implementation', () => {
  for (const challenge of validSignInData) {
    expect(verifySignInPayload(challenge)).toBe(true)
  }
})

it('should return false with invalid signature/public key/visual and hidden challenges/trezor implementation', () => {
  for (const challenge of invalidSignInData) {
    expect(verifySignInPayload(challenge)).toBe(false)
  }
})

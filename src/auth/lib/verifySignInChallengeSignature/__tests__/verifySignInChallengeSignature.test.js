const verifySignInChallengeSignature = require('../verifySignInChallengeSignature')
const { validSignInData, invalidSignInData } = require('../__mocks__/signInData')

function verifySignInData (payload) {
  const { signature, publicKey, challenge, implementation } = payload
  return verifySignInChallengeSignature(signature, publicKey, challenge, implementation)
}

it('should return true for valid set of signature, public key, visual and hidden challenges, and implementation', () => {
  for (const payload of validSignInData) {
    expect(verifySignInData(payload)).toBe(true)
  }
})

it('should return false for invalid set of signature, public key, visual and hidden challenges, and implementation', () => {
  for (const payload of invalidSignInData) {
    expect(verifySignInData(payload)).toBe(false)
  }
})

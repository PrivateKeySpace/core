const { CHALLENGE_HIDDEN_LENGTH } = require('../../constants/challenge')
const generateSignInChallenge = require('../generateSignInChallenge')

it('should return a tuple with visual and hidden challenges', () => {
  const challenge = generateSignInChallenge()

  expect(Array.isArray(challenge)).toBe(true)
  expect(challenge).toHaveLength(2)

  const [challengeVisual, challengeHidden] = challenge

  expect(Date.parse(challengeVisual)).not.toBeNaN()
  expect(challengeHidden).toHaveLength(CHALLENGE_HIDDEN_LENGTH * 2) // hex string length is byte length * 2
})

it('should return random challenges', () => {
  const challenge1 = generateSignInChallenge()
  const challenge2 = generateSignInChallenge()

  expect(challenge1).not.toEqual(challenge2)
})

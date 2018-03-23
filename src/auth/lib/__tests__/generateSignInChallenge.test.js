const generateSignInChallenge = require('../generateSignInChallenge')

it('should return an array with visual and hidden challenges', () => {
  const challenge = generateSignInChallenge()

  expect(Array.isArray(challenge)).toBe(true)
  expect(challenge).toHaveLength(2)

  const [challengeVisual, challengeHidden] = challenge
  expect(Date.parse(challengeVisual)).not.toBeNaN()
  expect(challengeHidden).toHaveLength(128)
})

const generateSignInChallenge = require('../generateSignInChallenge')

it('should return an array with visual and hidden challenges', () => {
  const challenge = generateSignInChallenge()

  expect(challenge).toEqual(expect.any(Array))
  expect(challenge).toHaveLength(2)
  expect(Date.parse(challenge[0])).not.toBeNaN()
  expect(challenge[1]).toHaveLength(128)
})

const createHashId = require('../createHashId')

const mockPublicKey = '023a472219ad3327b07c18273717bb3a40b39b743756bf287fbd5fa9d263237f45'
const hexRegExp = /[0-9a-f]{64}/i

it('should generate a hash with length of 64', () => {
  expect(createHashId(mockPublicKey)).toHaveLength(64)
})

it('should generate a hex string', () => {
  expect(createHashId(mockPublicKey)).toMatch(hexRegExp)
})

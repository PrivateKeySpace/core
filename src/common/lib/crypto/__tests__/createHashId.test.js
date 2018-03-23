const createHashId = require('../createHashId')

const testSubjectHex = '023a472219ad3327b07c18273717bb3a40b39b743756bf287fbd5fa9d263237f45'
const hexRegExp = /[0-9a-f]+/i

it('should generate the same hash id for same input data', () => {
  const hashIdTake1 = createHashId(testSubjectHex)
  const hashIdTake2 = createHashId(testSubjectHex)
  const hashIdTake3 = createHashId(testSubjectHex)

  expect(hashIdTake1).toBe(hashIdTake2)
  expect(hashIdTake1).toBe(hashIdTake3)
  expect(hashIdTake2).toBe(hashIdTake3)
})

it('should generate hash id with length of 64', () => {
  expect(createHashId(testSubjectHex)).toHaveLength(64)
})

it('should generate hex-encoded hash', () => {
  expect(createHashId(testSubjectHex)).toMatch(hexRegExp)
})

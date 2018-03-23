const validateSignInSessionCompletePayload = require('../validateSignInSessionCompletePayload')

it('should return empty errors object if sessionKey, publicKey, signature and trezor implementation are all correct',
  () => {
    const validRequest = {
      sessionKey: 'a6YDg95Qp7AGPnbJJiqld2eef1910riwcEkcHaPexIgePTfsmhCz8fbepANhIuCr',
      publicKey: '029827904c4855abfb873de44b59017fecc18881af43384761a518b1e442a96adb',
      signature: '1fdc93bfe32350500e5889a2b6cae40fa9a040398506d89f26bb03c2ad60b6efa950b2d6fce12cb5176f6115274d869ff4b16ae929152f336a13dea29dc12887a8',
      implementation: 'trezor/v2'
    }
    expect(validateSignInSessionCompletePayload(validRequest)).toEqual({})
  }
)

it('should return not empty errors object if sessionKey is missing, publicKey is valid, signature is valid, trezor implementation is valid',
  () => {
    const invalidRequest = {
      publicKey: '029827904c4855abfb873de44b59017fecc18881af43384761a518b1e442a96adb',
      signature: '1fdc93bfe32350500e5889a2b6cae40fa9a040398506d89f26bb03c2ad60b6efa950b2d6fce12cb5176f6115274d869ff4b16ae929152f336a13dea29dc12887a8',
      implementation: 'trezor/v2'
    }
    expect(validateSignInSessionCompletePayload(invalidRequest)).not.toEqual({})
  }
)

it('should return not empty errors object if sessionKey is valid, publicKey is missing, signature is valid, trezor implementation is valid',
  () => {
    const invalidRequest = {
      sessionKey: 'a6YDg95Qp7AGPnbJJiqld2eef1910riwcEkcHaPexIgePTfsmhCz8fbepANhIuCr',
      signature: '1fdc93bfe32350500e5889a2b6cae40fa9a040398506d89f26bb03c2ad60b6efa950b2d6fce12cb5176f6115274d869ff4b16ae929152f336a13dea29dc12887a8',
      implementation: 'trezor/v2'
    }
    expect(validateSignInSessionCompletePayload(invalidRequest)).not.toEqual({})
  }
)

it('should return not empty errors object if sessionKey is valid, publicKey is valid, signature is missing, trezor implementation is valid',
  () => {
    const invalidRequest = {
      sessionKey: 'a6YDg95Qp7AGPnbJJiqld2eef1910riwcEkcHaPexIgePTfsmhCz8fbepANhIuCr',
      publicKey: '029827904c4855abfb873de44b59017fecc18881af43384761a518b1e442a96adb',
      implementation: 'trezor/v2'
    }
    expect(validateSignInSessionCompletePayload(invalidRequest)).not.toEqual({})
  }
)

it('should return not empty errors object if sessionKey is valid, publicKey is valid, signature is valid, trezor implementation is missing',
  () => {
    const invalidRequest = {
      sessionKey: 'a6YDg95Qp7AGPnbJJiqld2eef1910riwcEkcHaPexIgePTfsmhCz8fbepANhIuCr',
      publicKey: '029827904c4855abfb873de44b59017fecc18881af43384761a518b1e442a96adb',
      signature: '1fdc93bfe32350500e5889a2b6cae40fa9a040398506d89f26bb03c2ad60b6efa950b2d6fce12cb5176f6115274d869ff4b16ae929152f336a13dea29dc12887a8'
    }
    expect(validateSignInSessionCompletePayload(invalidRequest)).not.toEqual({})
  }
)

it('should return not empty errors object if the request is empty',
  () => {
    const invalidRequest = null
    expect(validateSignInSessionCompletePayload(invalidRequest)).not.toEqual({})
  }
)

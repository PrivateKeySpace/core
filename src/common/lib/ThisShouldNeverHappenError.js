
class ThisShouldNeverHappenError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ThisShouldNeverHappenError'
  }
}

module.exports = ThisShouldNeverHappenError

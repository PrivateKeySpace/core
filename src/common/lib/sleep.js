
function sleep (timeMilliseconds) {
  return new Promise(resolve => { setTimeout(() => { resolve() }, timeMilliseconds) })
}

module.exports = sleep

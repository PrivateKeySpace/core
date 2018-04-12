
async function loadProfile (ctx, next) {
  // TODO
  ctx.state.profile = null
  await next()
}

module.exports = loadProfile

const Router = require('koa-router')
const { parseJsonBody } = require('../../common/middleware')
const handleSignInSessionStart = require('./handleSignInSessionStart')
const handleSignInSessionComplete = require('./handleSignInSessionComplete')

const router = new Router({ prefix: '/auth' })

router
  .post('/signin/start', handleSignInSessionStart)
  .post('/signin/complete', parseJsonBody, handleSignInSessionComplete)

const routes = router.routes()

module.exports = routes

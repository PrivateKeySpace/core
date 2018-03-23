const Router = require('koa-router')
const { parseJsonBody, createOptionsHandler } = require('../../common/middleware')
const handleSignInSessionStart = require('./handleSignInSessionStart')
const handleSignInSessionComplete = require('./handleSignInSessionComplete')

const router = new Router({ prefix: '/auth' })

router
  .options('/signin/start', createOptionsHandler('post'))
  .post('/signin/start', handleSignInSessionStart)
  .options('/signin/complete', createOptionsHandler('post'))
  .post('/signin/complete', parseJsonBody, handleSignInSessionComplete)

const routes = router.routes()

module.exports = routes

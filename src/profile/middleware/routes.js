const Router = require('koa-router')
const { parseJsonBody, createOptionsHandler } = require('../../common/middleware')
const { requireAuth } = require('../../auth/middleware')
const loadProfile = require('./loadProfile')
const handleCreateProfile = require('./handleCreateProfile')
const handleGetProfile = require('./handleGetProfile')

const router = new Router({ prefix: '/profile' })

router
  .options('', requireAuth, createOptionsHandler('post'))
  .post('', requireAuth, parseJsonBody, loadProfile, handleCreateProfile)
  .options('', requireAuth, createOptionsHandler('get'))
  .get('', requireAuth, loadProfile, handleGetProfile)

const routes = router.routes()

module.exports = routes

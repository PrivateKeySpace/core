const http = require('http')
const Koa = require('koa')
const { HOST, PORT } = require('./common/config')
const { log, LOG_LEVEL_INFO } = require('./common/logging')
const { handleError: errorListener } = require('./common/lib')
const { routes: commonRoutes, logRequest, handleError } = require('./common/middleware')
const { routes: authRoutes } = require('./auth/middleware')

const app = new Koa()

app
  .on('error', errorListener)

app
  .use(logRequest)
  .use(handleError)
  .use(commonRoutes)
  .use(authRoutes)

const server = http.createServer(app.callback())

server.listen(PORT, HOST, () => {
  const { address, port } = server.address()

  log(LOG_LEVEL_INFO, `server is running at http://${address}:${port}`)
})

module.exports = server

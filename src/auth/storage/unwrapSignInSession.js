
function unwrapSignInSession (rawSession) {
  const session = { ...rawSession }

  session.createdTime = Number.parseInt(session.createdTime)
  session.challenge = JSON.parse(session.challenge)

  return session
}

module.exports = unwrapSignInSession

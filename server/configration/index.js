module.exports = {
  JWT_SECRET: 'auth-api-secret',
  db: {
    test: {
      host: 'localhost',
      port: 27017,
      name: 'APIAuthenticationTest'
    },
    development: {
      host: 'localhost',
      port: 27017,
      name: 'APIAuthentication'
    },
    production: {
      host: 'localhost',
      port: 27017,
      name: 'APIAuthentication'
    }
  }
}
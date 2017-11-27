if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: 'auth-api-demo',
  };
} else {
  module.exports = {
    JWT_SECRET: 'auth-api-demo',
  };
}

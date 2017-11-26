const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
// import routes
const UserRouter = require('./routes/users')
// import DB configs
const DB = require('./databases')

// connect to db
DB.connect()

// Middlewares
if (!((process.env.NODE_ENV || 'development') === 'test')) {
  app.use(logger('dev'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/users', UserRouter)

module.exports = app
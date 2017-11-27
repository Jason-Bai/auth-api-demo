const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./databases');

// connect to db
db.connect()

const app = express();

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

module.exports = app;

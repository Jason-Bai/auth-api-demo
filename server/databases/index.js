const mongoose = require('mongoose')
const { db } = require('../configration')

mongoose.Promise = global.Promise

const { host, port, name } = db[(process.env.NODE_ENV || 'development')]

module.exports = {
  connect: () => {
    // connect
    mongoose.connect(`mongodb://${host}:${port}/${name}`, {
      useMongoClient: true
    }).then(() => {
      console.log('API Auth Demo Mongodb connected!')
    })

    return mongoose
  }
}
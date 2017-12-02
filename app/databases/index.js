const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = {
  connect: () => {
    if (process.env.NODE_ENV === 'test') {
      mongoose
        .connect('mongodb://localhost/APIAuthenticationTEST', { useMongoClient: true })
        .then(() => {
          console.log('Auth API Mongogb connected!');
        });
    } else {
      mongoose
        .connect('mongodb://localhost/APIAuthentication', { useMongoClient: true })
        .then(() => {
          console.log('Auth API Mongogb connected!');
        });
    }

    return mongoose;
  },
};

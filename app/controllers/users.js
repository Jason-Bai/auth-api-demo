const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConf = require('../passport');

const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const helpers = require('./helpers');
const { authSchema } = require('./schemas/user')

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

signToken = user => {
  return JWT.sign({
    iss: 'jason-bai',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: [
    helpers.validator.validate(authSchema),
    async (req, res, next) => {
      const { email, password } = req.value.body;

      // Check if there is a user with the same email
      const foundUser = await User.findOne({ "local.email": email });
      if (foundUser) {
        return res.status(403).json({ error: 'Email is already in use'});
      }

      // Create a new user
      const newUser = new User({
        method: 'local',
        local: {
          email: email,
          password: password
        }
      });

      await newUser.save();

      // Generate the token
      const token = signToken(newUser);
      // Respond with token
      res.status(200).json({ token });
    }
  ],
  signIn: [
    helpers.validator.validate(authSchema),
    passportSignIn,
    async (req, res, next) => {
      // Generate token
      const token = signToken(req.user);
      res.status(200).json({ token });
    }
  ],

  secret: [
    passportJWT,
    async (req, res, next) => {
      res.json({ secret: "resource" });
    }
  ]
}

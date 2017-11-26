const JWT = require('jsonwebtoken')
const User = require('../models/user')
const { JWT_SECRET } = require('../configration')

const signToken = user => {
  return JWT.sign({
    iss: 'authToken',
    sub: user.id,
    iat: Date.now(),
    exp: Date.now() + 60 * 60 * 24
  }, JWT_SECRET)
}

module.exports = {
  signup: async (req, res, next) => {
    // email && password
    console.log('UserController.signUp() called!')
    const { email, password } = req.params.body

    const existed = await User.findOne({ email })

    if (existed) {
      return res.status(403).json({ error: 'Email is already in use' })
    }

    const newUser = new User({
      email,
      password
    })

    await newUser.save()

    const token = signToken(newUser)

    res.status(200).json({ token })
  },
  signin: async (req, res, next) => {
    // email && password
    console.log('UserController.signIn() called!')
    const token = signToken(req.user)
    res.status(200).json({ token })
  },
  secret: async (req, res, next) => {
    // email && password
    console.log('UserController.secret() called!')
    res.json({ secret: 'resource' })
  }
}
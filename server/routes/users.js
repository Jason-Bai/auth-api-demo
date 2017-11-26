// const express = require('express')
const router = require('express-promise-router')()
const passport = require('passport')
const passportConf = require('../passport')

const { validateBody, schemas } = require('../helpers/routerHelpers')
const UserController = require('../controllers/users')
const passportSignIn = passport.authenticate('jwt', { session: false })
const passportJWT = passport.authenticate('local', { session: false })



router.route('/signup')
  .post(validateBody(schemas.authSchema), UserController.signup)

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportJWT, UserController.signin) 

router.route('/secret')
  .get(passportSignIn, UserController.secret)

module.exports = router
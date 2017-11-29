const router = require('./helpers/router')();

const UsersController = require('../controllers/users');

router.Post('/signup', UsersController.signUp);

router.Post('/signin', UsersController.signIn);

router.Get('/secret', UsersController.secret);

router.Collection('/', [
  (req, res, next) => {
    res.send('get users!');
  }
], [
  (req, res, next) => {
    res.send('post user!')
  }
]);

module.exports = router;
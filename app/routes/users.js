const router = require('./helpers/router')();

const UsersController = require('../controllers/users');

router.httpPost('/signup', UsersController.signUp);

router.httpPost('/signin', UsersController.signIn);

router.httpGet('/secret', UsersController.secret);

router.httpCollection('/', [
  (req, res) => {
    res.send('get users!');
  },
], [
  (req, res) => {
    res.send('post user!');
  },
]);

module.exports = router;

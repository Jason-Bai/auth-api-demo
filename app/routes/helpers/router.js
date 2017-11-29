const Router = require('express-promise-router');
const methods = require('methods');

module.exports = () => {
  const router = Router();

  methods.forEach((method) => {
    const _method = `${method.substr(0, 1).toUpperCase()}${method.substr(1)}`;
    router[_method] = (path, fns) => {
      const route = router.route(path);
      route[method].apply(route, fns);
      return route;
    };
  });

  router.Collection = (path, getFns = [(req, res, next) => next()], postFns = [(req, res, next) => next()]) => {
    const getRoute = router.Get(path, getFns);
    const postRoute = router.Post(path, postFns);
    return [getRoute, postRoute];
  };

  return router;
}
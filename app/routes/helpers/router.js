const router = require('express-promise-router');
const methods = require('methods');

module.exports = () => {
  const routerHelper = router();

  methods.forEach((method) => {
    const _method = `${method.substr(0, 1).toUpperCase()}${method.substr(1)}`;
    routerHelper[`http${_method}`] = (path, fns) => {
      const route = routerHelper.route(path);
      route[method].apply(route, [...fns]);
      return route;
    };
  });

  routerHelper.httpCollection = (
    path,
    getFns = [(req, res, next) => next()],
    postFns = [(req, res, next) => next()]
  ) => {
    const getRoute = routerHelper.httpGet(path, getFns);
    const postRoute = routerHelper.httpPost(path, postFns);
    return [getRoute, postRoute];
  };

  return routerHelper;
};

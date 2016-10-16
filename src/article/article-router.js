/**
 * Module dependencies.
 */

var controller = require('./article-controller');
var auth = require('../auth');

/**
 * Map routes.
 */

exports.init = function(router) {

  router.get('/articles', controller.getArticles);
  router.get('/articles/:id', controller.getArticle);
  router.post('/articles', auth.ensureAuthenticated(['admin']), controller.createArticle);
  router.put('/articles/:id', auth.ensureAuthenticated(['admin']), controller.updateArticle);
  router.delete('/articles/:id', auth.ensureAuthenticated(['admin']), controller.deleteArticle);

};

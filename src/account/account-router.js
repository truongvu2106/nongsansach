/**
 * Module dependencies.
 */

var controller = require('./account-controller');
var auth = require('../auth');

/**
 * Map routes.
 */

exports.init = function(router) {

  router.post('/accounts', auth.ensureAuthenticated(['admin']), controller.createAccount);
  router.get('/accounts', auth.ensureAuthenticated(['admin']), controller.getAccounts);
  router.get('/accounts/:id', auth.ensureAuthenticated(null), controller.getAccount);
  router.delete('/accounts/:id', auth.ensureAuthenticated(null), controller.deleteAccount);

};

/**
 * Module dependencies.
 */

var controller = require('./authentication-controller');
var auth = require('../auth');

/**
 * Map routes.
 */

exports.init = function(router) {
    router.get('/oauth/token', controller.getStateToken);
    router.post('/oauth/signin', controller.oAuthentication);
    router.post('/auth', controller.authenticate);

};

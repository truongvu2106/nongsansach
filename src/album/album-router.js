/**
 * Module dependencies.
 */

var controller = require('./album-controller');
var auth = require('../auth');

/**
 * Map routes.
 */

exports.init = function(router) {
    router.get('/albums/:id', controller.getAlbum);
    router.get('/albums', controller.getAlbums);
    router.post('/albums', auth.ensureAuthenticated(), controller.createAlbum);

};

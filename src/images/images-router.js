/**
 * Module dependencies.
 */

var controller = require('./images-controller');
var auth = require('../auth');

/**
 * Map routes.
 */

exports.init = function(router) {

    router.get('/images/:id', controller.getImage);
    router.get('/images', controller.getImages);
    router.post('/images', auth.ensureAuthenticated(['admin']), controller.createImage);
    router.put('/images/:id', auth.ensureAuthenticated(['admin']), controller.updateImage);
    router.delete('/images/:id', auth.ensureAuthenticated(['admin']), controller.deleteImage);

};

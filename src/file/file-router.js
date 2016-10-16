/**
 * Module dependencies.
 */

var controller = require('./file-controller');
var auth = require('../auth');

/**
 * Map routes.
 */

exports.init = function(router) {

    router.get('/files/:id', controller.getFile);
    router.get('/files', controller.getFiles);
    router.post('/files', auth.ensureAuthenticated(['admin']), controller.createFile);
    router.put('/files/:id', auth.ensureAuthenticated(['admin']), controller.updateFile);
    router.delete('/files/:id', auth.ensureAuthenticated(['admin']), controller.deleteFile);

};

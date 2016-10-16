/**
 * Module dependencies.
 */

var controller = require('./message-controller');
var auth = require('../auth');

/**
 * Map routes.
 */

exports.init = function(router) {

    router.get('/message/:id', auth.ensureAuthenticated(null), controller.getMessage);
    router.get('/message/', auth.ensureAuthenticated(null), controller.getMessages);
    router.post('/message/', controller.createMessage);
    router.post('/message/:id/reply', auth.ensureAuthenticated(null), controller.replyMessage);
    router.delete('/message/:id', auth.ensureAuthenticated(null), controller.deleteMessage);

};

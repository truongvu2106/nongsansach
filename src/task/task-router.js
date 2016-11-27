/**
 * Module dependencies.
 */

var controller = require('./task-controller');
var auth = require('../auth');

/**
 * Map routes.
 */

exports.init = function(router) {

    router.get('/tasks', auth.ensureAuthenticated(['admin']), controller.getTasks);
    router.get('/tasks/:id', auth.ensureAuthenticated(['admin']), controller.getTask);
    router.post('/tasks', auth.ensureAuthenticated(['admin']), controller.createTask);
    router.put('/tasks/:id', auth.ensureAuthenticated(['admin']), controller.updateTask);
    router.delete('/tasks/:id', auth.ensureAuthenticated(['admin']), controller.deleteTask);

};

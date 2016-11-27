/**
 * Module dependencies.
 */
var express = require("express");

var accountRouter = require('./account/account-router');
var authenticationRouter = require('./authentication/authentication-router');
var imagesRouter = require('./images/images-router');
var taskRouter = require('./task/task-router');

/**
 * Map routes for API resources.
 * @param app
 */
exports.init = function init() {
    var router = express.Router();
    accountRouter.init(router);
    authenticationRouter.init(router);
    taskRouter.init(router);
    imagesRouter.init(router);
    return router;
};

/**
 * Module dependencies.
 */
var express = require("express");

var accountRouter = require('./account/account-router');
var articleRouter = require('./article/article-router');
var messageRouter = require('./message/message-router');
var fileRouter = require('./file/file-router');
var authenticationRouter = require('./authentication/authentication-router');
var albumRouter = require('./album/album-router');

/**
 * Map routes for API resources.
 * @param app
 */
exports.init = function init() {
    var router = express.Router();
    accountRouter.init(router);
    articleRouter.init(router);
    messageRouter.init(router);
    fileRouter.init(router);
    authenticationRouter.init(router);
    albumRouter.init(router);
    return router;
};

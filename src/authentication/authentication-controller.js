/**
 * Module dependencies.
 */

var auth = require('../auth');
var Account = require('../account/account');
var responseHelper = require('../response-helper');
var md5 = require("md5");
var OAuth = require('oauthio');

/**
 * Create controller.
 */

var controller = {};

/**
 * Authenticate account and return a JSON web token.
 * @param req
 * @param res
 */

controller.authenticate = function(req, res) {

    // Get data.
    var username = req.body.username || req.body.email;
    var password = req.body.password;
    // Validate request.
    if (!username || !password) return responseHelper.handleInvalidRequest(res);
    password = md5(password);

    Account.findOne({
        $or: [{
            username: username,
            password: password
        }, {
            email: username,
            password: password
        }]
    }).exec(function(error, account) {
        if (!error && account) {
            delete account.password;
            responseHelper.success(res, {
                token: auth.createAuthenticatedJWT(account._id, false),
                user: account
            });
        } else {
            responseHelper.handleNotAuthenticated(res);
        }
    });
};

controller.getStateToken = function(req, res) {
    // This generates a token and stores it in the session
    var token = OAuth.generateStateToken(req.session);
    // This sends the token to the front-end
    responseHelper.ok(res, { token: token });
};

controller.oAuthentication = function(req, res) {
    var code = req.body.code;
    var provider = req.body.provider;
    req.session['csrf_tokens'] = req.session['csrf_tokens'] || req.body.csrfTokens;
    // This sends the request to OAuth.io to get an access token
    OAuth.auth(provider, req.session, {
        code: code
    }).then(function(requestObject) {
        return requestObject.me();
    }).then(function(data) {
        // Find or create user
        // Need to be re-factor later
        Account.findOne({email: data.email}, function(err, account) {
            if (err || !account) {
                account = new Account({
                    email: data.email,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    avatar: data.avatar,
                    roles: ['user'],
                    provider: provider
                });
            } else {
                account.lastLoggedIn = new Date();
                account.avatar = data.avatar;
                account.firstName = data.firstname;
                account.lastName = data.lastname;
            }
            account.save(function(err, account) {
                if (!err && account) {
                    delete account.password;
                    responseHelper.success(res, {
                        token: auth.createAuthenticatedJWT(account._id, false),
                        user: account
                    });
                } else {
                    responseHelper.handleNotAuthenticated(res);
                }
            });
        });

    }).catch(function (err) {
        // Handle an error
        console.log(err);
        responseHelper.handleError(res, err);
    });
};

/**
 * Export controller.
 */

module.exports = controller;

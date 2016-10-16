/**
 * Module dependencies.
 */

var jwt = require('jwt-simple');
var moment = require('moment');
var _ = require('lodash');
var Account = require('./account/account');
var helper = require('./response-helper');
var config = require('../config');

/**
 * Constants
 */

var SECRET = config.secret;

/**
 * Variable for methods.
 * @type {{}}
 */

var methods = {};

/**
 * Create a fully authenticated JSON web token.
 * @param accountID
 * @param roles
 * @returns {*}
 */

methods.createAuthenticatedJWT = function(accountID, roles) {
    return createJWT(accountID, roles);
};

/**
 * Create a JWT.
 * @param accountID
 * @param roles
 * @returns {*}
 */
function createJWT(accountID, roles) {
    return jwt.encode({
        sub: accountID,
        roles: roles,
        // iat: moment().unix(),
        exp: moment().add(30, 'd')
    }, SECRET);
}

/**
 * Decodes a JSON web token.
 * @param token
 * @returns {*}
 */
methods.decodeJWT = function(token) {
    return jwt.decode(token, SECRET);
};


/**
 * Middleware that authenticates the request using the JWT passed in the header
 * and assigns the account to req.account. Ensures that the token is a fully
 * authenticated token and that the role in the token matches tha allowed roles
 * passed to the middleware.
 * @param roles
 * @returns {Function}
 */
methods.ensureAuthenticated = function(roles) {
    return function(req, res, next) {
        authenticateRequest(req, res, roles, next);
    };
};

/**
 * Authenticate the request.
 * @param req
 * @param res
 * @param roles
 * @param next
 * @returns {*}
 */
function authenticateRequest(req, res, roles, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
        return helper.handleForbiddenOperation(res);
    }

    try {
        var decoded = methods.decodeJWT(token);

        if (moment() > moment(decoded.exp)) {
            return helper.handleForbiddenOperation(res);
        }

        if (roles && roles.length > 0 && _.intersection(roles, decoded.roles).length > 0) {
            return helper.handleForbiddenOperation(res);
        }

        Account.findById(decoded.sub, function(err, account) {
            if (err) return helper.handleError(res, err);
            if (!account) {
                return helper.handleForbiddenOperation(res);
            }
            req.user = account;
            return next();
        });
    } catch (err) {
        return helper.handleError(res, err);
    }
}

/**
 * Export the methods.
 * @type {{}}
 */
module.exports = methods;

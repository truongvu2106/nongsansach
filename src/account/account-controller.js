/**
 * Module dependencies.
 */

var moment = require('moment');
var uuid = require('node-uuid');
var async = require('async');
var auth = require('../auth');
var Account = require('../account/account');
var helper = require('../response-helper');

/**
 * Create controller.
 */

var controller = {};

/**
 * Create a new account.
 * @param req
 * @param res
 */

controller.createAccount = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var roles = req.body.roles || ["user"];

    if (!username || !password) return helper.handleInvalidRequest(res);

    Account.create({
        username: username,
        password: password,
        roles: roles
    }, function(err, account) {
        if (err) return helper.handleError(res, err);
        helper.success(res,
            {
                token: auth.createAuthenticatedJWT(account._id, account.roles)
            }
        );
    });

};


/**
 * Delete the current account.
 * @param req
 * @param res
 */

controller.deleteAccount = function(req, res) {

    var id = req.params.id;
    Account.findById(id, function(err, account) {

        if (err) return helper.handleError(res, err);
        if (!account) return handleNotFound(res);

        account.remove(function(err) {
            if (err) return helper.handleError(res, err);
            helper.ok(res, {});
        });

    });
};

/**
 * Get an account.
 * @param req
 * @param res
 */

controller.getAccount = function(req, res) {

    var id = req.params.id;

    Account.findById(id, function(err, account) {
        if (err) return helper.handleError(res, err);

        if (!account) return helper.handleNotFound(res);

        helper.ok(res, account);
    });

};

/**
 * Get an accounts.
 * @param req
 * @param res
 */

controller.getAccounts = function(req, res) {

    Account.find({}, function(err, account) {
        if (err) return helper.handleError(res, err);

        if (!account) return helper.handleNotFound(res);

        res.status(200).send(account);
    });

};

/**
 * Get the current account.
 * @param req
 * @param res
 */

controller.getOwnAccount = function(req, res) {
    res.status(200).send(req.account);
};

/**
 * Verify the password for the current account.
 * @param req
 * @param res
 */

controller.verifyPassword = function(req, res) {

    var password = req.body.password;
    if (!password) return helper.handleInvalidRequest(res);

    Account.verifyPassword(password, req.account.password, function(err, verified) {
        if (err) return helper.handleError(res, err);
        if (!verified) return helper.handleNotAuthenticated(res);
        return res.status(200).end();
    });

};

/**
 * Update the current account.
 * @param req
 * @param res
 */

controller.updateAccount = function(req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    if (firstName) req.account.firstName = firstName;
    if (lastName) req.account.lastName = lastName;

    req.account.save(function(err, doc) {
        if (err) return helper.handleError(res, err);
        res.status(200).send(doc);
    });
};

/**
 * Export controller.
 */

module.exports = controller;
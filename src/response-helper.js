/**
 * Module dependencies.
 */

var _ = require('lodash');

/**
 * Success.
 * @param res
 */

module.exports.success = function(res, data) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).send(data || {});
};

/**
 * OK.
 * @param res
 */

module.exports.ok = function(res, data) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200).send(data || {});
};

/**
 * Handle invalid requests.
 * @param res
 */

module.exports.handleInvalidRequest = function(res) {
  res.status(400).end();
};

/**
 * Handle forbidden operation.
 * @param res
 */

module.exports.handleForbiddenOperation = function(res) {
  res.status(403).end();
};

/**
 * Handle duplicate key error.
 * @param res
 */

module.exports.handleDuplicateKeyError = function(res) {
  res.status(409).send({message: 'A duplicate key error occurred.'});
};

/**
 * Handle not found.
 * @param res
 */

module.exports.handleNotFound = function(res) {
  res.status(404).end();
};

/**
 * Handle not authenticated.
 * @param res
 */

module.exports.handleNotAuthenticated = function(res) {
  res.status(401).end();
};

/**
 * Handle not authorized.
 * @param res
 */

module.exports.handleNotAuthorized = function(res) {
  res.status(401).end();
};

/**
 * Handle validation error.
 * @param res
 * @param err
 */

module.exports.handleValidationError = function(res, err) {
  var errors = [];
  _.keys(err.errors).forEach(function(key) {
    errors.push(err.errors[key].message);
  });
  res.status(422).send(errors);
};

/**
 * Handle error.
 * @param res
 * @param err
 * @returns {*}
 */

module.exports.handleError = function(res, err) {
  if (err.name === 'ValidationError') return this.handleValidationError(res, err);
  if (err && (err.code === 11000 || err.code === 11001)) return this.handleDuplicateKeyError(res);
  res.status(500).send({message: err});
};

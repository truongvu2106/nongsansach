/**
 * Module dependencies.
 */

var moment = require('moment');
var async = require('async');
var Task = require('../task/task');
var helper = require('../response-helper');

/**
 * Create controller.
 */
var controller = {};

/**
 * Create a new Task.
 * @param req
 * @param res
 */
controller.createTask = function(req, res) {
    var task = req.body;

    // TODO validate data

    Task.create(task, function(err, task) {
        if (err) return helper.handleError(res, err);
        helper.success(res, task);
    });
};

/**
 * [getTask description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
controller.getTask = function(req, res) {
    var id = req.params.id;

    Task.findById(id, function(err, task) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            helper.success(res, task);
        }
    });
};

controller.getTasks = function(req, res) {
    Task.find({}, function(err, tasks) {
        if (err) {
            helper.handleError(res, err);
        } else {
            helper.success(res, tasks);
        }
    });
};

controller.updateTask = function(req, res) {
    // TODO validate data
    var task = req.body;
    var id = req.params.id;

    Task.findByIdAndUpdate(id, task, { new: true }, function(err, task) {
        if (err) return helper.handleError(res, err);
        helper.success(res, task);
    });
}

/**
 * [deleteTask description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
controller.deleteTask = function(req, res) {
    var id = req.params.id;

    Task.remove({ _id: id }, function(err, row) {
        if (err) {
            helper.handlerError(res, err);
        } else {
            helper.success(res, row);
        }
    });
}

/**
 * Export controller.
 */

module.exports = controller;
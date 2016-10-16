/**
 * Module dependencies.
 */

var moment = require('moment');
var async = require('async');
var multiparty = require('multiparty');
var path = require('path');
var fs = require('fs');
var auth = require('../auth');
var fileService = require('../file');
var File = require('../file/file');
var helper = require('../response-helper');

var controller = {};

controller.getFile = function(req, res) {
    var id = req.params.id;

    File.findById(id, function(err, file) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            helper.success(res, file);
        }
    });
};

controller.getFileInformation = function(req, res) {
    helper.success(res, req.files);
};

controller.getFiles = function(req, res) {
    var type = req.query.type;
    var condition = {};
    if (type) {
        condition.type = new RegExp(type, 'i');
    }

    File.find(condition, function(err, files) {
        if (err) {
            helper.handleError(res, err);
        } else {
            helper.success(res, files);
        }
    });
};

controller.createFile = function(req, res) {
    var form = new multiparty.Form();

    form.on('error', function(err) {
        return helper.handleError(res, err);
    });

    // Parts are emitted when parsing the form
    form.on('part', function(part) {
        // NOTE: if you want to ignore it, just call "part.resume()"
        part.resume();
        // if (part.filename) {
            // Saving file
            // fileService.saveToS3(part, function(err) {
            //     if (err) return res.send(500);
            //     logger.info('Upload completed!');
            // });
        // }

        part.on('error', function(err) {
            return helper.handleError(res, err);
        });
    });

    form.on('file', function(name, file) {
        fileService.saveToLocal(file, function(err, fileInfor) {
            if (err) return helper.handleError(res, err);
            File.create(fileInfor, function(err, file) {
                if (err) return helper.handleError(res, err);
                helper.success(res, file);
            });
        });

    });

    // Parse req
    form.parse(req);
};

controller.updateFile = function(req, res) {
    // TODO validate data
    var f = req.body;
    var id = req.params.id;

    // Get file.
    File.findById(id, function(err, file) {
        // Handle issues.
        if (err) return helper.handleError(res, err);
        if (!file) return helper.handleNotFound(res);

        file.title = f.title || file.title;
        file.description = f.description || file.description;

        // Save.
        file.save(function(err) {
            if (err) return helper.handleError(res, err);
            helper.success(res, file);
        });
    });
};

controller.deleteFile = function(req, res) {
    var id = req.params.id;

    File.findById(id, function(err, file) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            file.remove(function(err, row) {
                if (err) {
                    helper.handlerError(res, err);
                } else {
                    fileService.deleteFile(file.path);
                    helper.success(res, row);
                }
            });
        }
    });
};

module.exports = controller;

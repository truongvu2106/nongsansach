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
var Album = require('../album/album');
var helper = require('../response-helper');

var controller = {};

controller.getAlbum = function(req, res) {
    var id = req.params.id;

    Album.findOne({_id: id})
        .populate("images")
        .exec(function(err, album) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            helper.ok(res, album);
        }
    });
};

controller.getAlbums = function(req, res) {
    var id = req.params.id;

    Album.find({}, function(err, albums) {
        if (err) {
            helper.handleError(res, err);
        } else {
            helper.ok(res, albums);
        }
    });
};

controller.createAlbum = function(req, res) {
    var album = req.body;

    // TODO validate data
    album.createdOnDate = Date.now();

    Album.create({
        title: album.title,
        description: album.description,
        images: album.images
    }, function(err, album) {
        if (err) return helper.handleError(res, err);
        helper.success(res, album);
    });
};

module.exports = controller;

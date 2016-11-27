/**
 * Module dependencies.
 */

var Images = require('../images/images');
var helper = require('../response-helper');

var controller = {};

controller.getImage = function(req, res) {
    var id = req.params.id;

    Images.findOne({_id: id}, function(err, doc) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            helper.ok(res, doc);
        }
    });
};

controller.getImages = function(req, res) {
    var id = req.params.id;

    Images.find().sort('-createdOnDate').exec().then(function(docs) {
        helper.ok(res, docs);
    }).catch(function(err) {
        helper.handleError(res, err);
    });
};

controller.createImage = function(req, res) {
    var image = req.body;

    // TODO validate data

    Images.create({
        title: image.title,
        description: image.description,
        path: image.path
    }, function(err, doc) {
        if (err) return helper.handleError(res, err);
        helper.success(res, doc);
    });
};

controller.updateImage = function(req, res) {
    // TODO validate data
    var image = req.body;
    var id = req.params.id;

    Images.findByIdAndUpdate(id, image, { new: true }, function(err, doc) {
        if (err) return helper.handleError(res, err);
        helper.success(res, doc);
    });
}

/**
 * [deleteImage description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
controller.deleteImage = function(req, res) {
    var id = req.params.id;

    Images.remove({ _id: id }, function(err, row) {
        if (err) {
            helper.handlerError(res, err);
        } else {
            helper.success(res, row);
        }
    });
}

module.exports = controller;

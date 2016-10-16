/**
 * Module dependencies.
 */

var moment = require('moment');
var async = require('async');
var auth = require('../auth');
var fileService = require('../file');
var Article = require('../article/article');
var helper = require('../response-helper');

/**
 * Create controller.
 */
var controller = {};

/**
 * Create a new article.
 * @param req
 * @param res
 */
controller.createArticle = function(req, res) {
    var article = req.body;

    // TODO validate data

    Article.create({
        title: article.title,
        content: article.content,
        avatar: article.avatar,
        createdOnDate: article.createdOnDate,
        createdBy: article.createdBy,
        images: article.images
    }, function(err, article) {
        if (err) return helper.handleError(res, err);
        helper.success(res, article);
    });
};

/**
 * [getarticle description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
controller.getArticle = function(req, res) {
    var id = req.params.id;

    Article.findById(id).populate('images').exec(function(err, article) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            helper.success(res, article);
        }
    });
};

controller.getArticles = function(req, res) {
    Article.find({}).populate('images').exec(function(err, articles) {
        if (err) {
            helper.handleError(res, err);
        } else {
            helper.success(res, articles);
        }
    });
};

controller.updateArticle = function(req, res) {
    // TODO validate data
    var art = req.body;
    var id = req.params.id;

    // Get article.
    Article.findById(id, function(err, article) {
        // Handle issues.
        if (err) return helper.handleError(res, err);
        if (!article) return helper.handleNotFound(res);

        article.title = art.title || article.title;
        article.content = art.content || article.content;
        article.updatedOnDate = Date.now();
        article.updatedBy = art.updatedBy,
        article.images = art.images || article.images;
        article.avatar = art.avatar || article.avatar;

        // Save.
        article.save(function(err) {
            if (err) return helper.handleError(res, err);
            helper.success(res, article);
        });
    });
}

/**
 * [deleteArticle description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
controller.deleteArticle = function(req, res) {
    var id = req.params.id;

    Article.findById(id).populate('images').exec(function(err, article) {
        if (err) return helper.handlerError(res, err);

        if (!article) return helper.handleNotFound(res);

        article.images.forEach(function(image) {
            fileService.deleteFile(image.path);
        });

        article.remove(function(err, row) {
            if (err) {
                helper.handlerError(res, err);
            } else {
                helper.success(res, row);
            }
        });
    });
}

/**
 * Export controller.
 */

module.exports = controller;
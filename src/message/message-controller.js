/**
 * Module dependencies.
 */

var moment = require('moment');
var async = require('async');
var auth = require('../auth');
var messageService = require('../message');
var Message = require('../message/message');
var helper = require('../response-helper');

var controller = {};

controller.getMessage = function(req, res) {
    var id = req.params.id;
    if (id === 'count') return countUnreadMessages(req, res);

    Message.findById(id, function(err, message) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            helper.success(res, message);
        }
    });
};

controller.getMessages = function(req, res) {
    Message.find({}, function(err, messages) {
        if (err) {
            helper.handlerError(res, err);
        } else {
            helper.success(res, messages);
        }
    });
};

controller.createMessage = function(req, res) {

    var message = req.body;

    // TODO validate data
    message.sentOnDate = Date.now();
    message.unread = true;
    Message.create(message, function(err, message) {
        if (err) return helper.handleError(res, err);
        messageService.sendMessage({
            to: message.email,
            text: 'Thanks for your attention. We will reply you as soon as possible',
        });
        helper.success(res, message);
    });
};

controller.replyMessage = function(req, res) {
    var id = req.params.id;

    // TODO validate data
    var messageReplying = req.body;
    messageService.sendMessage({
        to: messageReplying.emailTo,
        subject: '[VuApp] Reply from VuApp',
        text: messageReplying.content
    }, function(err, reply) {
        if (err) return helper.handleError(res, err);
        helper.success(res, message);
    });

    Message.findById(id, function(err, message) {
        if (!err) {
            message.replyOnDate = Date.now();
            message.replied = true;
            message.replyContent = messageReplying.content;
            Message.update(message, function(err, data) {
                if (err) {
                    // Handle error
                }
            });
        }
    });
};

controller.deleteMessage = function(req, res) {
    var id = req.params.id;

    Message.remove({ _id: id }, function(err, row) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            helper.success(res, row);
        }
    });
};

function countUnreadMessages(req, res) {
    Message.count({ unread: true }, function(err, count) {
        if (err) {
            helper.handleNotFound(res);
        } else {
            helper.success(res, {'count': count});
        }
    });
}

module.exports = controller;
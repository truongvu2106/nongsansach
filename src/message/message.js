/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Create schema.
 */
var schema = new mongoose.Schema({
  name: {type: String, default: ''},
  message: {type: String, required: true, default: ''},
  email: {type: String, required: true, default: ''},
  sentOnDate: {type: Date, default: Date.now},
  replyOnDate: {type: Date, default: null},
  unread: {type: Boolean, default: true},
  replied: {type: Boolean, default: false},
  replyContent: {type: String, default: ''}
});

/**
 * Create model.
 */

var Message = mongoose.model('Message',  schema);

/**
 * Export model.
 */

module.exports = Message;

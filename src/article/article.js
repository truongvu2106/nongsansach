/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Create schema.
 */
var schema = new mongoose.Schema({
  title: {type: String, required: true, default: ''},
  content: {type: String, required: true, default: ''},
  avatar: {type: String, default: ''},
  createdOnDate: {type: Date, default: Date.now},
  updatedOnDate: {type: Date, default: null},
  createdBy: {type: String},
  updatedBy: {type: String},
  images: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
});

/**
 * Create model.
 */

var Article = mongoose.model('Article',  schema);

/**
 * Export model.
 */

module.exports = Article;

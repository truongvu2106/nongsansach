/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Create schema.
 */
var schema = new mongoose.Schema({
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    type: {type: String, default: ''},
    path: {type: String, default: ''},
    createdOnDate: {type: Date, default: Date.now},
    size: {type: Number, default: 0},
    thumbnail: {type: String, default: ''}
});

/**
 * Create model.
 */

var File = mongoose.model('File',  schema);

/**
 * Export model.
 */

module.exports = File;

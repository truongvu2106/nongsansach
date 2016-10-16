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
    createdOnDate: {type: Date, default: Date.now},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
});

/**
 * Create model.
 */

var Album = mongoose.model('Album',  schema);

/**
 * Export model.
 */

module.exports = Album;

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Create schema.
 */
var schema = new mongoose.Schema({
    name: {type: String, required: true, default: ''},
    description: {type: String, default: ''},
    type: {type: String, default: ''},
    storyPoint: {type: Number, default: ''},
    priority: {type: String},
    status: {type: String},
    owner: {type: String},
    completed: {type: Number},
    note: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    estimate: {type: Number, default: 0},
    logged: {type: Number, default: 0}
});

/**
 * Create model.
 */

var Task = mongoose.model('Task',  schema);

/**
 * Export model.
 */

module.exports = Task;

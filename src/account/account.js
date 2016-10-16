/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Create schema.
 */
var schema = new mongoose.Schema({
  username: {type: String, default: ''},
  email: {type: String, default: ''},
  password: {type: String, default: ''},
  avatar: {type: String, default: ''},
  name: {type: String, default: ''},
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  createdOnDate: {type: Date, default: Date.now},
  lastLoggedIn: {type: Date, default: Date.now},
  roles: {type: Array, default: ['user']},
  provider: {type: String, default: ''}
});

/**
 * Create model.
 */

var Account = mongoose.model('Account',  schema);

/**
 * Export model.
 */

module.exports = Account;

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

/**
 * Initialize the database connection.
 * @param uri
 * @returns {connection}
 */

exports.init = function(uri) {
  mongoose.connect(uri);
  mongoose.connection.on('error', console.error.bind(console, 'Database connection error: '));
  mongoose.connection.on('connected', function() {
    console.log('Database connection successful');
  });
  return mongoose.connection;
};

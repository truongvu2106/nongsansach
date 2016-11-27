/**
 * Module dependencies.
 */

var config = require('./config');
var db = require('./src/db');
var async = require('async');
var _ = require('lodash');
var md5 = require('md5');
var Account = require('./src/account/account');

module.exports.clearData = function(callback) {

    // Create connection.
    var connection = db.init(config.dbURI);

    // Once connected, initialize data.
    connection.once('connected', function() {

        // Drop database.
        connection.db.dropDatabase(function(err) {
            if (err) {
                callback(err);
            }
            connection.close(callback);
        });
    });
};

module.exports.initializeData = function(callback) {

    // Create connection.
    var connection = db.init(config.dbURI);

    // Once connected, initialize data.
    connection.once('connected', function() {

        account = new Account({
            username: 'admin',
            email: 'truong.vu2106@gmail.com',
            firstName: 'Vu',
            lastName: 'Truong',
            password: md5('admin'),
            avatar: 'https://graph.facebook.com/v2.3/1295502853801624/picture',
            roles: ['admin']
        });

        account.save(function(err) {
            if (err) {
                console.log('Create account failed');
                console.log(err);
                callback(err);
            } else {
                console.log('Create account successful');
                callback();
            }
            return connection.close();
        });
    });
}
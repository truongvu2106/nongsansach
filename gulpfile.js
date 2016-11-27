/**
 * Module dependencies.
 */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var _ = require('lodash');
var dbutil = require('./dbutil');
var config = require('./config');
/**
 * Start the server and restart on changes.
 */

gulp.task('server', function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            'NODE_ENV': process.env.NODE_ENV || config.env
        }
    }).on('restart', function() {
        console.log('Server restarted.');
    });
});

/**
 * Initialize data for development.
 */

gulp.task('init-data', function(done) {
    process.env.NODE_ENV = config.env;
    dbutil.clearData(function(err) {
        if (err) return done(err);
        dbutil.initializeData(done);
    });
});


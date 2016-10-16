/**
 * Module dependencies.
 */

var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require("morgan");
var MongoStore = require('connect-mongo')(session);
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config');
var db = require('./src/db');
var router = require('./src/router');

var OAuth = require('oauthio');

try {
    OAuth.initialize(config.oauthPublicKey, config.oauthSecretKey);
} catch (e) {
    console.log(e);
}

app.set('port', process.env.PORT || config.port);

/**
 * Use CORS.
 */

app.use(cors({
    origin: function(origin, callback) {
        var isAllowed = config.origins.indexOf(origin) > -1 ||
            config.origins.indexOf('*') > -1;
        callback(null, isAllowed);
    }
}));

app.use(logger("dev"));

/**
 * Configure middleware.
 */

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/**
 * Configure cookies
 */

var cookies = cookieParser(config.secret);
app.use(cookieParser());

/**
 * Configure session.
 */
var sess = session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        url: config.dbURI
    })
});

app.use(sess);

/**
 * Initialize routes.
 */

app.use(config.apiPrefix, router.init());

/**
 * Initialize database.
 */

db.init(config.dbURI);

/**
 * Start the server.
 */

server.listen(app.get('port'), function() {
    console.log('API Listening - ENV %s - PORT %s', config.env, app.get('port'));
});

/**
 * Export the app.
 */

module.exports = app;

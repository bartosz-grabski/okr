/**
* backend/app.js
*
* This is the main file for Express and others backend's middlewares
* configuration.
*/
'use strict';

/**
* Variables declaration.
*
*/
var express         = require('express');
var app 			= express();
var passport        = require('passport');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var cookieParser    = require('cookie-parser');
var path            = require('path');
var fs 				= require('fs');
var config 			= JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));
var strategiesDir 	= fs.readdirSync(path.join(__dirname, './lib/strategies'));
var okrService    = require('./lib/okr-service')(config);

/**
* Check environment configuration
*
*/
app.set('env', app.get('env') || 'production');


/**
 * Inject all strategies
 */

strategiesDir.forEach(function (file) {
	if (file.indexOf('.js') >-1) {
		require('./lib/strategies/'+file)(app.get('env'), passport, config);
	}
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	name: 'session',
	secret: config[app.get('env')].sessionSecret,
	cookie: {
		path: '/',
		httpOnly: true,
		secure: false,
		maxAge: 2*60*60*1000
	},
	rolling: true,
	resave: false,
	saveUninitialized: true
}));

/**
 * Creation of isLoggedIn middleware, which tests if user is logged in
 * to permit request continuation.
 *
 */
var isLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(403);
    }
    else {
      next()
    }
};



app.use(passport.initialize());
app.use(passport.session());

require('./router')(app,passport,isLoggedIn,okrService);



/**
* Export the configured Express app
*
*/
module.exports = app;

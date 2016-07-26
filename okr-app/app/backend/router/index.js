/**
* Index of Express Router
*
*/
'use strict';


/**
* Variables declaration
*
*/
var fs 				= require('fs');


/**
* Express Router declaration
*
*/
var ExpressRouter = function (app, passport, isLoggedIn, okrService) {


  app.get('/auth/google',
    passport.authenticate('google', {
      scope: okrService.scopes
    }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.send(req.user);
    });

  app.get('/verify', function(req,res) {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.sendStatus(403);
    }
  });

  app.get('/okrs', isLoggedIn, function(req,res) {

    var user = req.user;

    console.log(user);

    var callback = function(err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    };

    okrService.getOkrs(user.accessToken, callback);
  });

};

/**
* Export declared Express Router
*
*/
module.exports = ExpressRouter;

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
    passport.authenticate('google', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect("/");
    });

  app.get('/verify', function(req,res) {
    if (req.isAuthenticated()) {

      var userInfo = {
        name : req.user.displayName,
        email : req.user.email
      };

      res.send(userInfo);
    } else {
      res.sendStatus(403);
    }
  });

  app.get('/logout', function(req,res) {
    if (req.isAuthenticated()) {
      req.session.destroy();
    }
    res.sendStatus(200);
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

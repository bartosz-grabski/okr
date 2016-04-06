'use strict';

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Model= mongoose.model('Objective');

module.exports = function (isLoggedIn) {

  router.get('/', isLoggedIn, function (req, res) {
    var user = req.user;
    var query = Model.find({});


    query.where('userId',user.email);
    query.exec(function(err,data){
      if (err) {
        return res.status(500).send(err);
      } else {
        if (!data) {
          return res.status(404).end();
        } else {
          return res.status(200).send(data);
        }
      }
    });
  });

  router.post('/', isLoggedIn, function (req, res) {
    
  });

  router.get('/:id', isLoggedIn, function (req, res) {
    Model.findById(req.params.id, function (err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(404).end();
      }
      return res.status(200).send(data);
    });
  });

  router.put('/:id', isLoggedIn, function (req, res) {
    Model.findById(req.params.id, function (err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(404).end();
      }
      Model.fillDoc(data, req.body, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(data);
      });
    });
  });

  router.delete('/:id', isLoggedIn, function (req, res) {
    Model.findById(req.params.id, function (err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(404).end();
      }
      data.remove(function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).end();
      });
    });
  });

  return router;

};

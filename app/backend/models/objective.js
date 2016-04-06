'use strict';

var mongoose 	= require('mongoose');


var objectiveSchema = mongoose.Schema({
  name: {type: String},
  userEmail : {type: String},
  keyResults : {type: Array}
});


mongoose.model('Objective', objectiveSchema, 'objectives');

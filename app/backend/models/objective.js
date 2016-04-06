'use strict';

var mongoose 	= require('mongoose');


var objectiveSchema = mongoose.Schema({
  name: {type: String},
  userId : {type: String}
});


mongoose.model('Objective', objectiveSchema, 'objectives');

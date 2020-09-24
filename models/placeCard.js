const mongoose = require('mongoose');
const { schema } = require('./user');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
title: {
      type:String,
      require:true 
},
image:{
      type:String,
      
},
description:{
      type:String,
      
},
area:{
      type: String,
      required: true
},
userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
}
});

module.exports = mongoose.model('Place', placeSchema);
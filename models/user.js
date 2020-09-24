const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
 name: {
       type: String,
       require:true
 },
 email: {
       type: String
 },
 cart: {
      places: [ {
            type: Schema.Types.ObjectId, ref: 'Place', require:true
      }]
 }     
});

module.exports = mongoose.model('User', userSchema);
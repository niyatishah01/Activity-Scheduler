var mongoose = require('mongoose');
const mongoose-fire = require('mongoose-fire');

var Schema=  mongoose.Schema;

var ActivitySchema = new Schema({
  aname: String,
});

module.exports = mongoose.model('Activity', ActivitySchema);
ActivitySchema.plugin(mongoose-fire);

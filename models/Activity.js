var mongoose = require('mongoose');

var Schema=  mongoose.Schema;

var ActivitySchema = new Schema({
  aname: String,
});

module.exports = mongoose.model('Activity', ActivitySchema);

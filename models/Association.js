// Declaring the Attributes and functions related to association
var mongoose = require('mongoose');
var Schema=  mongoose.Schema;

var AssociationSchema = new Schema({
//  cname: {type: Schema.ObjectId, ref: 'Company'},
//  aname: {type: Schema.ObjectId, ref: 'Activity'},
  cname: String,
  aname: String,
  startDate: String,
  endDate: String
});

module.exports = mongoose.model('Association', AssociationSchema);

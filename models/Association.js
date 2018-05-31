var mongoose = require('mongoose');

var Schema=  mongoose.Schema;

var AssociationSchema = new Schema({
//  cname: {type: Schema.ObjectId, ref: 'Company'},
//  aname: {type: Schema.ObjectId, ref: 'Activity'},
  cname: String,
  aname: String,
  startTime: String,
  endTime: String
});

module.exports = mongoose.model('Association', AssociationSchema);

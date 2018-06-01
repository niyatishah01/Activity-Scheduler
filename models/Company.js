var mongoose = require('mongoose');
const mongoose-fire = require('mongoose-fire');

var Schema=  mongoose.Schema;

var CompanySchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Company', CompanySchema);
CompanySchema.plugin(mongoose-fire);

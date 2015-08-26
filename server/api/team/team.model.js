'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  city: String,
  name: String,
  logo: String,
  keys: [String]
});

TeamSchema.statics.findByKey = function(key, cb) {
  return this.findOne({ keys: key }, cb);
};

module.exports = mongoose.model('Team', TeamSchema);

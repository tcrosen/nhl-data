var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
  city: String,
  name: String,
  logo: String,
  keys: [String]
});

teamSchema.statics.findByKey = function(key, cb) {
  return this.findOne({ keys: key }, cb);
};

module.exports = mongoose.model('Team', teamSchema);

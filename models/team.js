var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
  city: String,
  name: String,
  logo: String,
  keys: [String]
});

module.exports = mongoose.model('Team', teamSchema);

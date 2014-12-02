var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
  name: String,
  team: String,
  birthDate: String,
  birthPlace: String,
  positions: [String]
});

module.exports = mongoose.model('Player', playerSchema);

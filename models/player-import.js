var mongoose = require('mongoose');

var playerImportSchema = mongoose.Schema({
  seasonId: String,
  players: [{
    nameAndPosition: String,
    team: String,
    birthDate: String,
    birthPlace: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlayerImport', playerImportSchema);

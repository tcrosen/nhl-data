var mongoose = require('mongoose');

var gameImportSchema = mongoose.Schema({
  seasonId: String,
  gameId: String,
  logs: Array
});

module.exports = mongoose.model('GameImport', gameImportSchema);

var mongoose = require('mongoose');

var playerImportSchema = mongoose.Schema({
  name: String,
  team: String,
  birthDate: String,
  birthPlace: String
});

module.exports = mongoose.model('PlayerImport', playerImportSchema);

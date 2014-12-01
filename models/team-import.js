var mongoose = require('mongoose');

var teamImportSchema = mongoose.Schema({
  city: String,
  name: String,
  logo: String
});

module.exports = mongoose.model('TeamImport', teamImportSchema);

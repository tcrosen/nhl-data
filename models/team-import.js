var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamImportSchema = Schema({
  seasonId: String,
  teams: [{
    city: String,
    name: String,
    logo: String,
    keys: [String]
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamImport', teamImportSchema);

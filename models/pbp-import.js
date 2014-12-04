var mongoose = require('mongoose');

var pbpImportSchema = mongoose.Schema({
  seasonId: String,
  gameId: String,
  logs: [{
    eventNumber: Number,
    period: Number,
    strength: String,
    times: String,
    eventType: String,
    eventDescription: String,
    awayOnIce: String,
    homeOnIce: String
  }]
});

module.exports = mongoose.model('PbpImport', pbpImportSchema);

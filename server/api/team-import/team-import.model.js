'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TeamImportSchema = new Schema({
  seasonId: String,
  teams: [{
    city: String,
    name: String,
    logo: String,
    keys: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TeamImport', TeamImportSchema);

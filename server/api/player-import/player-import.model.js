'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerImportSchema = new Schema({
  seasonId: String,
  players: [{
    nameAndPosition: String,
    team: String,
    birthDate: String,
    birthPlace: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Get the latest import
PlayerImportSchema.statics.getLatestBySeason = function(seasonId, done) {
  return this.findOne({
    seasonId: seasonId
  }, { sort: '-createdAt' }, done);
  // .sort('-createdAt')
  // .exec(done);
};

module.exports = mongoose.model('PlayerImport', PlayerImportSchema);

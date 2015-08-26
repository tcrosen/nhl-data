var mongoose = require('mongoose');

var playerImportSchema = mongoose.Schema({
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
playerImportSchema.statics.getLatestBySeason = function(seasonId, done) {
  return this.findOne({
    seasonId: seasonId
  })
  .sort('-createdAt')
  .exec(done);
};

module.exports = mongoose.model('PlayerImport', playerImportSchema);

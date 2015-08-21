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
playerImportSchema.statics.getLatest = function(seasonId, cb) {
  return this.findOne({
    seasonId: seasonId
  })
  .sort('-createdAt')
  .exec(cb);
};

module.exports = mongoose.model('PlayerImport', playerImportSchema);

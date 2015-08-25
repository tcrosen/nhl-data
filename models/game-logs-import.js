var mongoose = require('mongoose');

var gameLogsImportSchema = mongoose.Schema({
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
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

gameLogsImportSchema.statics.import = function(gameLogImport, cb) {
  var GameLogsImport = this;

  GameLogsImport.findOneAndUpdate({
    seasonId: gameLogImport.seasonId,
    gameId: gameLogImport.Id
  }, {
    seasonId: gameLogImport.seasonId,
    gameId: gameLogImport.gameId,
    logs: gameLogImport.logs
  }, {
    // bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    new: false,
    // bool - creates the object if it doesn't exist. defaults to false.
    upsert: true
  }, cb);
}

gameLogsImportSchema.statics.updateAllFromImport = function(importedGameLogs, cb) {
  var GameLogsImport = this;
  async.each(importedGameLogs, GameLogs.import.bind(GameLogs), cb);
};


module.exports = mongoose.model('GameLogsImport', gameLogsImportSchema);

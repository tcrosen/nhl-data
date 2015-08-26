'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameLogsImportSchema = new Schema({
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

GameLogsImportSchema.statics.import = function(importedGameLogs, cb) {
  var GameLogsImport = this;

  GameLogsImport.findOneAndUpdate({
    seasonId: importedGameLogs.seasonId,
    gameId: importedGameLogs.Id
  }, {
    seasonId: importedGameLogs.seasonId,
    gameId: importedGameLogs.gameId,
    logs: importedGameLogs.logs
  }, {
    // bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    new: false,
    // bool - creates the object if it doesn't exist. defaults to false.
    upsert: true
  }, cb);
}

GameLogsImportSchema.statics.updateAllFromImport = function(importedGameLogs, cb) {
  var GameLogsImport = this;
  async.each(importedGameLogs, GameLogs.import.bind(GameLogs), cb);
};


module.exports = mongoose.model('GameLogsImport', GameLogsImportSchema);

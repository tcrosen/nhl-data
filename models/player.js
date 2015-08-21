var async = require('async');
var mongoose = require('mongoose');
var PlayerImport = require('./player-import');

var playerSchema = mongoose.Schema({
  name: String,
  team: String,
  birthDate: String,
  birthPlace: String,
  positions: [String]
});

playerSchema.statics.updateAllFromLatestImport = function(seasonId, done) {
  var Player = this;

  PlayerImport.getLatestBySeason(seasonId, function(err, latestImport) {
    var players,
      name,
      team,
      position,
      positionStr;

    if (err) {
      done(err);
    }

    async.each(latestImport.players, function(importedPlayer, cb) {
      positionStr = importedPlayer.nameAndPosition.match(/\(.+\)/)[0];
      position = positionStr.replace(/\(|\)/g, '');
      name = importedPlayer.nameAndPosition.replace(positionStr, '');
      team = importedPlayer.team || 'NHL';

      // console.info('Upserting player: %s - %s - %s', name, position, team);

      Player.findOneAndUpdate({
        name: name
      }, {
        name: name,
        //team: importedPlayer.team,
        positions: [position],
        birthDate: importedPlayer.birthDate,
        birthPlace: importedPlayer.birthPlace
      }, {
        // bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
        new: false,
        // bool - creates the object if it doesn't exist. defaults to false.
        upsert: true
      }, function(err, doc) {
        if (err) {
          cb(err);
        }

        cb(null, doc);
      });
    }, function(err) {
      if (err) {
        done(err);
      }

      console.info('[%s] players updated from latest import.', latestImport.players.length);
      done();
    });
  });
};

module.exports = mongoose.model('Player', playerSchema);

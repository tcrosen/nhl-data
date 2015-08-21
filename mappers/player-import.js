
// Map player imports into players

var _ = require('lodash');

var PlayerImport = require('../models/player-import'),
  Player = require('../models/player');

module.exports = {
  getPlayersFromLatestImport: function(seasonId, done) {

    var latestImport;

    PlayerImport.getLatest(seasonId, done);

    // PlayerImport.find({}, function(err, playersImported) {
    //   var players,
    //     positionStr,
    //     position,
    //     name;
    //
    //   players = _.map(playersImported, function(player) {
    //     positionStr = player.nameAndPosition.match(/\(.+\)/)[0],
    //     position = positionStr.replace(/\(|\)/g, ''),
    //     name = player.name.replace(positionStr, '');
    //
    //     return new Player({
    //       name: name,
    //       positions: [position],
    //       birthDate: player.birthDate,
    //       birthPlace: player.birthPlace
    //     });
    //   });
    //
    //   Player.create(players, done);
    // });
  }
};

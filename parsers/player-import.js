

var _ = require('lodash');

var PlayerImport = require('../models/player-import');
var Player = require('../models/player');

module.exports = function(done) {
  PlayerImport.find({}, function(err, playersImported) {
    var players = _.map(playersImported, function(player) {
      var positionStr = player.name.match(/\(.+\)/)[0];
      var position = positionStr.replace(/\(|\)/g, '');
      var name = player.name.replace(positionStr, '');

      return new Player({
        name: name,
        positions: [position],
        birthDate: player.birthDate,
        birthPlace: player.birthPlace
      });
    });

    Player.remove({}, function(err) {
      Player.create(players, done);
    });
  });
};

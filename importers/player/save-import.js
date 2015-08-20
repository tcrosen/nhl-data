
var PlayerImport = require('../../models/player-import');

module.exports = function(seasonId, rawPlayers, done) {
  PlayerImport.create({
    seasonId: seasonId,
    players: rawPlayers
  }, done);
};


var PlayerImport = require('../../models/player-import');

module.exports = function(seasonId, players, done) {
  PlayerImport.create({
    seasonId: seasonId,
    players: players
  }, done);
};

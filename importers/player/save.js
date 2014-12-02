
var PlayerImport = require('../../models/player-import');

module.exports = function(extract, done) {
  PlayerImport.remove({}, function(err) {
    PlayerImport.create(extract, done);
  });
};

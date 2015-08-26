



var _ = require('lodash');
var PbpImport = require('../../models/game-logs-import');

module.exports = function(gameLogsImport, done) {
  GameLogImport.create(gameLogsImport, done);
};

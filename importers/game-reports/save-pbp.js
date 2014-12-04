



var _ = require('lodash');
var PbpImport = require('../../models/pbp-import');

module.exports = function(seasonId, gameId, importLogs, done) {

  PbpImport.findOne({ seasonId: seasonId, gameId: gameId }, function(err, pbp) {
    if (pbp) {
      pbp.logs = importLogs;
      pbp.save(function (err) {
        if (err) {
          console.log(err);
        }

        done(null, pbp);
      });
    } else {
      PbpImport.create({
        seasonId: seasonId,
        gameId: gameId,
        logs: importLogs
      }, function (err, pbp) {
        if (err) {
          console.log(err);
        }

        done(null, pbp);
      });
    }
  });

};

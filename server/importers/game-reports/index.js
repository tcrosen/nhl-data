var download = require('./download-game-logs');
var extract = require('./extract-game-logs');
var save = require('./save-import');
var GameLogsImport = require('../../api/game-logs-import/game-logs-import.model');

module.exports = function(seasonId, gameId, done) {
  download(seasonId, gameId, function(err, file) {
    if (err) {
      console.error('Error downloading game log data', err);
      done(err);
    }

    extract(file, function(err, extracted) {
      if (err) {
        console.error('Error extracting game log data', err);
        done(err);
      }

      console.info('[%s] logs scraped from HTML files.', extracted.length);

      GameLogsImport.create({
        gameId: gameId,
        seasonId: seasonId,
        logs: extracted
      }, function(err, res) {
        if (err) {
          console.error('Error saving imported game log data', err);
          done(err);
        }

        console.info('game with [%s] logs imported from disk to DB.', res.logs.length);

        done(null, res);
      });
    });
  });
};

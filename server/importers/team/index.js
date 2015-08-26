/**
* Import teams
*/


var download = require('./download');
var extract = require('./extract');
var saveImport = require('./save-import');

module.exports = function(seasonId, done) {
  download(seasonId, function(err, file) {
    if (err) {
      console.error('Error downloading team data', err);
      done(err);
    }

    extract(file, function(err, teams) {
      if (err) {
        console.error('Error extracting team data', err);
        done(err);
      }

      saveImport(seasonId, teams, function(err, res) {
        if (err) {
          console.error('Error extracting team data', err);
          done(err);
        }

        console.log(res.teams.length + ' teams imported successfully');
        done(null, res);
      });
    });
  });
};

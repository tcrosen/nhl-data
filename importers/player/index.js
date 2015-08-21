/**
* Import players
*/


var download = require('./download');
var extract = require('./extract');
var save = require('./save-import');

module.exports = function(seasonId, done) {
  download(seasonId, function(err) {
    if (err) {
      console.error('Error downloading player data', err);
      done(err);
    }

    extract(seasonId, function(err, extracted) {
      if (err) {
        console.error('Error extracting player data', err);
        done(err);
      }

      console.info('[%s] players scraped from HTML files.', extracted.length);

      save(seasonId, extracted, function(err, res) {
        if (err) {
          console.error('Error saving player imported data', err);
          done(err);
        }

        console.info('[%s] players imported from disk to DB.', res.players.length);

        done(null, res);
      });
    });
  });
};

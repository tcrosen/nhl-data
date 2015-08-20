/**
* Import players
*/


var download = require('./download');
var extract = require('./extract');
var save = require('./save-import');

module.exports = function(seasonId, done) {
  download(seasonId, function(err, file) {
    if (err) {
      console.error('Error downloading player data', err);
      done(err);
    }

    extract(seasonId, function(err, extracted) {
      if (err) {
        console.error('Error extracting player data', err);
        done(err);
      }

      console.info(extracted.length + ' players extracted from HTML');

      save(seasonId, extracted, function(err, res) {
        if (err) {
          console.error('Error saving player imported data', err);
          done(err);
        }

        console.info(res.players.length + ' players imported successfully!');

        done(null, res);
      });
    });
  });
};

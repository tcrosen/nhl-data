/**
* Import season schedule (games)
*/


var download = require('./download');
var extract = require('./extract');
var save = require('./save');

module.exports = function(seasonId, done) {
  download(seasonId, function(err, file) {
    if (err) {
      console.error('Error downloading schedule', err);
      done(err);
    }

    extract(file, function(err, extracted) {
      if (err) {
        console.error('Error extracting schedule', err);
        done(err);
      }

      save(seasonId, extracted, function(err, res) {
        if (err) {
          console.error('Error saving schedule imported data', err);
          done(err);
        }

        console.info('[%s] games imported from disk to DB.', res.games.length);

        done(null, res);
      });
    });
  });
};

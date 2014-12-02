/**
* Import season schedule (games)
*/


var download = require('./download');
var extract = require('./extract');
var save = require('./save');

module.exports = function(seasonId, done) {
  download(seasonId, function(err, file) {
    extract(file, function(err, extracted) {
      save(seasonId, extracted, done);
    });
  });
};

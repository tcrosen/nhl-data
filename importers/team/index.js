/**
* Import teams
*/


var download = require('./download');
var extract = require('./extract');
var save = require('./save');

module.exports = function(seasonId, done) {
  download(seasonId, function(err, file) {
    console.log('Teams downloaded to ', file);
    extract(file, function(err, extracted) {
      console.log('Teams extracted from HTML: ', extracted.length);
      save(extracted, done);
    });
  });
};

/**
* Import teams
*/


var download = require('./download');
var extract = require('./extract');
var saveImport = require('./save-import');

module.exports = function(seasonId, done) {
  download(seasonId, function(err, file) {
    extract(file, function(err, extracted) {
      saveImport(extracted, done);
    });
  });
};

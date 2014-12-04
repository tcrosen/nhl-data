var downloadPbp = require('./download-pbp');
var extractPbp = require('./extract-pbp');
var savePbp = require('./save-pbp');

module.exports = function(seasonId, gameId, done) {
  downloadPbp(seasonId, gameId, function(err, file) {
    extractPbp(file, function(err, extracted) {
      console.log(extracted.length + ' logs extracted from HTML');
      savePbp(seasonId, gameId, extracted, done);
    });
  });
};

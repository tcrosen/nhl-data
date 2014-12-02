/**
* Import players
*/


var download = require('./download');
var extract = require('./extract');
var save = require('./save');

module.exports = function(seasonId, done) {
  download(seasonId, function(err, file) {
    extract(seasonId, function(err, extracted) {
      console.log(extracted.length + ' players extracted from HTML');
      save(extracted, done);
    });
  });
};

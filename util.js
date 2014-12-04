

var request = require('request');
var fs = require('fs');

// Split a string and trim whitespace from results
String.prototype.splitAndTrim = function(sep) {
  return _.map(this.split(sep), function(s) {
    return s.trim();
  });
};

module.exports = {
  downloadAndSaveHtml: function(url, filename, done) {
    request(url, function (err, response, html) {
      if (response.statusCode !== 404) {
        fs.writeFileSync(filename, html);
      }

      if (done) {
        done(null, filename);
      }
    });
  }
};

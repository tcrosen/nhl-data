

var request = require('request');
var fs = require('fs');


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

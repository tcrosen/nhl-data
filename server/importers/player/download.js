/**
 * Download players from NHL.com
 */

var fs = require('fs');
var util = require('../../util');
var async = require('async');

module.exports = function (seasonId, done) {
  var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  async.each(alphabet, function (letter, doneLetter) {

    async.each(pages, function (page, donePage) {
      var url = 'http://www.nhl.com/ice/playersearch.htm?letter=' + letter + '&pg=' + page;
      var filename = './data/' + seasonId + '/players/' + letter + '-' + page + '.html';

      if (fs.existsSync(filename)) {
        // console.info('[%s] exists, skipping download.', filename);
        donePage();
      } else {
        console.info('[%s] not found.  Downloading...', filename);

        util.downloadAndSaveHtml(url, filename, function (err) {
          if (err) {
            console.err('Error downloading/saving HTML file [%s] from [%s]', filename, url, err);
            donePage(err);
          }

          console.info('Saved [%s] from [%s]', filename, url);

          donePage(null, filename);
        });
      }
    }, doneLetter);

  }, done);
};

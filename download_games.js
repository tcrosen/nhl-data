var request = require('request');
var fs = require('fs');

function getUrl(seasonId, gameId) {
  return 'http://www.nhl.com/scores/htmlreports/' + seasonId + '/' + gameId + '.HTM';
}

module.exports = function(seasonId, gameId, done) {
  var url = getUrl(seasonId, gameId);
  var filename = './games/' + seasonId + '-' + gameId + '.html';

  request(url, function (err, response, html) {
    fs.writeFileSync(filename, html);

    if (done) {
      done(null, {
        filename: filename,
        html: html
      });
    }
  });
};

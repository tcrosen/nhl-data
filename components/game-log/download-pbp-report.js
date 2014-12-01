

var request = require('request');
var fs = require('fs');

function getGameReportUrl(seasonId, gameId) {
  return 'http://www.nhl.com/scores/htmlreports/' + seasonId + '/' + gameId + '.HTM';
}

function downloadAndSave(url, filename, done) {
  request(url, function (err, response, html) {
    if (response.statusCode !== 404) {
      fs.writeFileSync(filename, html);
    }

    if (done) {
      done(null, filename);
    }
  });
}

/**
* Download game log HTML from the web and save to ./games directory
* Will only download if file is not found or forceDownload is true
*
*/
module.exports = function(seasonId, gameId, done) {

  var url = getGameReportUrl(seasonId, gameId);
  var filename = '../../data/game-reports/' + seasonId + '-' + gameId + '.html';

  if (fs.existsSync(filename)) {
    done(null, filename);
  } else {
    console.log(filename + ' not found.  Downloading...');
    downloadAndSave(url, filename, done);
  }
};

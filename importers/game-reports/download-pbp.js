

var request = require('request');
var fs = require('fs');
var util = require('../../util');

function getGameReportUrl(seasonId, gameId) {
  return 'http://www.nhl.com/scores/htmlreports/' + seasonId + '/' + gameId + '.HTM';
}

/**
* Download game log HTML from the web
*/
module.exports = function(seasonId, gameId, done) {

  var url = getGameReportUrl(seasonId, gameId);
  var filename = './data/' + seasonId + '/game-reports/' + seasonId + '-' + gameId + '.html';

  if (fs.existsSync(filename)) {
    done(null, filename);
  } else {
    console.log(filename + ' not found.  Downloading...');
    util.downloadAndSaveHtml(url, filename, done);
  }
};

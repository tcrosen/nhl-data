var request = require('request');
var fs = require('fs');

var seasonId = '20142015';
var gameId = 'PL020316';

function getUrl(seasonId, gameId) {
  return 'http://www.nhl.com/scores/htmlreports/' + seasonId + '/' + gameId + '.HTM';
}

var url = getUrl(seasonId, gameId);

request(url, function (err, response, html) {
  fs.writeFileSync('./games/' + seasonId + '-' + gameId + '.html', html);
});

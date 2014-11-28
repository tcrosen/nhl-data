


var downloadGame = require('./download_game');
var readGameLogs = require('./read_game_logs');
var parseGameLogs = require('./parse_game_logs');


var seasonId = '20142015';
var gameId = 'PL020316';

//downloadGame(seasonId, gameId, function(err, res) {
  // res => { filename: './games/20142015-PL020316.html', html: '...' }
//});

var gameLogs = readGameLogs('./games/20142015-PL020316.html');

console.log(gameLogs);

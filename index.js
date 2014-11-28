
var _ = require('lodash');

var downloadGame = require('./download_game');
var importGameLogs = require('./import_game_logs');
var parseGameLogs = require('./parse_game_logs');


var seasonId = '20142015';
var gameId = 'PL020316';

//downloadGame(seasonId, gameId, function(err, res) {
  // res => { filename: './games/20142015-PL020316.html', html: '...' }
//});

var importedLogs = importGameLogs('./games/20142015-PL020316.html');

//console.log(_.filter(importedLogs, { eventType: 'GOAL'}));

var parsedLogs = parseGameLogs(importedLogs);

console.log('GOALS');
console.log('----------------------------\n');
console.log(_.filter(parsedLogs, { type: 'GOAL'}));

console.log('SHOTS ON GOAL');
console.log('----------------------------\n');
console.log(_.filter(parsedLogs, { type: 'SHOT'}));

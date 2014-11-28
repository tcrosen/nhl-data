
var _ = require('lodash');

var downloadGame = require('./downloadGame');
var importGameLogs = require('./extractGameLogs');
var parseGameLogs = require('./parseGameLogs');


var seasonId = '20142015';
var gameId = 'PL020316';

//downloadGame(seasonId, gameId, function(err, res) {
  // res => { filename: './games/20142015-PL020316.html', html: '...' }
//});

var importedLogs = importGameLogs('./games/20142015-PL020316.html');

var parsedLogs = parseGameLogs(importedLogs);

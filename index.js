
var _ = require('lodash');

var downloadGame = require('./downloadGame');
var importGameLogs = require('./extractGameLogs');
var parseGameLogs = require('./parseGameLogs');


var seasonId = '20142015';
var gameId = 'PL020316';

downloadGame(seasonId, gameId, function(err, savedFile) {
  //var importedLogs = importGameLogs(savedFile);

  //console.log(importedLogs);

  //var parsedLogs = parseGameLogs(importedLogs);
});

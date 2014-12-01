

// Libs
var mongoose = require('mongoose');
var _ = require('lodash');

// Modules
var downloadGame = require('./downloadGame');
var importGameLogs = require('./extractGameLogs');
var parseGameLogs = require('./parseGameLogs');

// Models
var GameImport = require('./models/game-import');


mongoose.connect('mongodb://localhost/nhlData');

var db = mongoose.connection;

var seasonId = '20142015';
var gameId = 'PL020316';

downloadGame(seasonId, gameId, function(err, savedFile) {

  var importedLogs = importGameLogs(savedFile);

  GameImport.create({
    seasonId: seasonId,
    gameId: gameId,
    logs: importedLogs
  }, function (err, gameImport) {
    if (err) {
      console.log(err);
    }

    //var parsedLogs = parseGameLogs(importedLogs);
    db.close();
  });
});

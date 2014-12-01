/**
* Import process
*
* 1. Download & save HTML
* 2. Extract text from saved HTML
* 3. Save raw text objects to DB
* 4. Parse into defined schemas (business objects)
* 5. Save BOs to DB
* 6. Generate stats
*
*/

// Libs
var mongoose = require('mongoose');
var _ = require('lodash');

// Modules
var util = require('./util');
var season = require('./components/season');

// Locals
var db = mongoose.connection;
var seasonId = '20142015';
var gameId = 'PL020316';

function onComplete() {
  db.close();
}

mongoose.connect('mongodb://localhost/nhlData');

season.downloadSchedule(seasonId, function(err, scheduleFile) {
  console.log('Season downloaded');

  var scheduleExtract = season.extractSchedule(scheduleFile);

  season.importSchedule(seasonId, scheduleExtract, function(err, schedule) {
    onComplete();
  });
});

//
// downloadGame(seasonId, gameId, function(err, savedFile) {
//
//   var gameLogs = extractGameLogs(savedFile);
//
//   // 3. Save import
//   GameImport.findOne({ seasonId: seasonId, gameId: gameId }, function(err, game) {
//     if (game) {
//       game.logs = gameLogs;
//       game.save(function (err, gameImport) {
//         if (err) {
//           console.log(err);
//         }
//
//         onComplete();
//       });
//     } else {
//       GameImport.create({
//         seasonId: seasonId,
//         gameId: gameId,
//         logs: gameLogs
//       }, function (err, gameImport) {
//         if (err) {
//           console.log(err);
//         }
//
//         onComplete();
//       });
//     }
//   });
// });

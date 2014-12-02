var mongoose = require('mongoose');

var gameImportSchema = mongoose.Schema({
  seasonId: String,
  gameId: String,
  logs: Array
});

var GameImport = mongoose.model('GameImport', gameImportSchema);

// Import single game logs
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

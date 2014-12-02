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

// Locals
var db = mongoose.connection;
var seasonId = '20142015';
var gameId = 'PL020316';


function onComplete() {
  db.close();
}

mongoose.connect('mongodb://localhost/nhlData');

var importSchedule = require('./importers/schedule');
var importTeams = require('./importers/team');
var importPlayers = require('./importers/player');
//
// importSchedule(seasonId, function(err) {
//   console.log('Schedule imported');
//   onComplete();
// });

// importTeams(seasonId, function(err) {
//   console.log('Teams imported');
//   onComplete();
// });

// importPlayers(seasonId, function(err) {
//   console.log('Players imported');
// });


var parsePlayerImport = require('./parsers/player-import');
var parseScheduleImport = require('./parsers/schedule-import');
var parseTeamImport = require('./parsers/team-import');

//parsePlayerImport(onComplete);

// parseTeamImport(function(err) {
//   onComplete();
// });

// parseScheduleImport(seasonId, function(err) {
//   onComplete();
// });

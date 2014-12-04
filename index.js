#!/usr/bin/env node

/**
* Module dependencies.
*/

var program = require('commander');
var mongoose = require('mongoose');
var _ = require('lodash');
var util = require('./util');

program
  .version('0.0.1')
  .option('-s, --schedule', 'schedule')
  .option('-p, --pbp', 'pbp')
  // .option('-P, --pineapple', 'Add pineapple')
  // .option('-b, --bbq', 'Add bbq sauce')
  // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbq) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);

// Locals
var db = mongoose.connection;

function onComplete() {
  db.close();
}

mongoose.connect('mongodb://localhost/nhlData');

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

var importSchedule = require('./importers/schedule');
var importTeams = require('./importers/team');
var importPlayers = require('./importers/player');
var importPbp = require('./importers/game-reports');

var seasonId = '20142015';
var gameId = 'PL020316';

if (program.schedule) {
  importSchedule(seasonId, function(err) {
    console.log('Schedule imported');
    onComplete();
  });
} else if (program.pbp) {
  seasonId = program.args[0];
  gameId = program.args[1];
  importPbp(seasonId, gameId, onComplete);
} else {
  onComplete();
}

var EVENT_TYPES = {
  PERIOD_START: 'PSTR',
  PERIOD_END: 'PEND',
  FACEOFF: 'FAC',
  STOPPAGE: 'STOP',
  GOAL: 'GOAL',
  PENALTY: 'PENL',
  TAKEAWAY: 'TAKE',
  GIVEAWAY: 'GIVE',
  SHOT_ON_GOAL: 'SHOT',
  SHOT_MISSED: 'MISS',
  SHOT_BLOCKED: 'BLOCK',
  HIT: 'HIT',
  GAME_END: 'GEND'
};


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

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
  .parse(process.argv);

// Locals
var db = mongoose.connection;

function onComplete() {
  db.close();
}

mongoose.connect('mongodb://localhost/nhlData');

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


  // importTeams(seasonId, function(err) {
  //   console.log('Teams imported');
  //   onComplete();
  // });

  // importPlayers(seasonId, function(err) {
  //   console.log('Players imported');
  // });

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

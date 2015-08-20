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
  .option('-t, --teams', 'teams')
  .parse(process.argv);

// Locals
var db = mongoose.connection;

function doneImport() {
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
    doneImport();
  });
} else if (program.pbp) {
  seasonId = program.args[0];
  gameId = program.args[1];
  importPbp(seasonId, gameId, doneImport);
}  else if (program.teams) {
  importTeams(seasonId, function(err) {
    console.log('Teams imported');
    doneImport();
  });
} else {
  doneImport();




  // importPlayers(seasonId, function(err) {
  //   console.log('Players imported');
  // });

}

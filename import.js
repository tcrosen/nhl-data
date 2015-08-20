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
  .option('-t, --teams', 'teams')
  .option('-p, --players', 'players')
  .option('-l, --logs', 'logs')
  .parse(process.argv);

// Locals
var db = mongoose.connection;

function doneImport(err) {
  if (err) {
    console.error('Error completing import', err);
  }

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
  importSchedule(seasonId, doneImport);
} else if (program.logs) {
  seasonId = program.args[0];
  gameId = program.args[1];
  importPbp(seasonId, gameId, doneImport);
} else if (program.teams) {
  importTeams(seasonId, doneImport);
} else if (program.players) {
  importPlayers(seasonId, doneImport);
} else {
  doneImport();
}

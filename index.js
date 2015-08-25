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

function done(err) {
  if (err) {
    console.error(err);
  }

  console.info('All done.');
  db.close();
}

mongoose.connect('mongodb://localhost/nhlData');

var importSchedule = require('./importers/schedule');
var importTeams = require('./importers/team');
var importPlayers = require('./importers/player');
var importPbp = require('./importers/game-reports');
var TEAMS = require('./const').TEAMS;
var Player = require('./models/player');
var Team = require('./models/team');
var seasonId = '20142015';
var gameId = 'PL020316';

if (program.schedule) {
  console.info('Importing schedule...');  
  // Download and scrape a full season's game into SeasonImport
  importSchedule(seasonId, done);
} else if (program.logs) {
  console.info('Importing game logs...');
  seasonId = program.args[0];
  gameId = program.args[1];
  importPbp(seasonId, gameId, done);
} else if (program.teams) {
  console.info('Importing players...');
  // Imports static teams to Team collection
  Team.remove({}, function(err) {
    Team.create(TEAMS, done);
  });

  // Imports teams from internet
  // TeamImport --> Team migration not currently enabled
  // Not required unless we want new data from NHL.com
  // importTeams(seasonId, done);
} else if (program.players) {
  console.info('Importing players...');

  // Download and scrape players from NHL.com to PlayerImport collection
  importPlayers(seasonId, function(err, res) {
    if (err) {
      done(err);
    }

    // Update Player collection from new PlayerImport collection
    Player.updateAllFromImport(res.players, done);
  });
} else {
  done();
}

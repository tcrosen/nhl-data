var _ = require('lodash');
var async = require('async');

var ScheduleImport = require('../models/schedule-import');
var Game = require('../models/game');
var Team = require('../models/team');

/**
 * Convert a schedule import into games
 */

module.exports = function(seasonId, done) {
  ScheduleImport.findOne({
    seasonId: seasonId
  }, function(err, scheduleImported) {
    var home, away;

    var games = async.map(scheduleImported.games, function(game, gameComplete) {
      async.series({
          away: function(cb) {
            Team.findByKey(game.awayTeamKey, function(err, t) {
              cb(null, t._id);
            });
          },
          home: function(cb) {
            Team.findByKey(game.homeTeamKey, function(err, t) {
              cb(null, t._id);
            });
          }
        },
        function(err, teams) {
          if (err) {
            done(err);
          }

          gameComplete(null, new Game({
            seasonId: scheduleImported.seasonId,
            scheduledDate: game.scheduledDate,
            scheduledTime: game.scheduledTime,
            home: teams.home,
            away: teams.away
          }));
        });
    }, function(err, games) {
      if (err) {
        done(err);
      }

      Game.remove({
        seasonId: seasonId
      }, function(err) {
        Game.create(games, done);
      });
    });
  });
};



var _ = require('lodash');

var TeamImport = require('../models/team-import');
var Team = require('../models/team');

module.exports = function(done) {
  TeamImport.find({}, function(err, imported) {
    var teams = _.map(imported, function(team) {
      return new Team({
        city: team.city,
        name: team.name,
        logo: team.logo,
        keys: team.keys
      });
    });

    Team.remove({}, function(err) {
      Team.create(teams, done);
    });
  });
};

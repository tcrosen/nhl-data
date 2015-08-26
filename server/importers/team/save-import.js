
var _ = require('lodash');
var TeamImport = require('../../models/team-import');
var keyMaps = require('./keys');

module.exports = function(seasonId, teamsRaw, done) {
  // Add acronym keys that are used later in parsing game logs
  var teams = _.map(teamsRaw, function(team) {
    var keyMap = _.find(keyMaps, { city: team.city, name: team.name });

    if (!keyMap) {
      throw new Error('Keys not found for ', team);
    } else {
      team.keys = keyMap.keys;
    }

    return team;
  });

  TeamImport.create({
    seasonId: seasonId,
    teams: teams
  }, done);
};

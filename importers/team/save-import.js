
var _ = require('lodash');
var TeamImport = require('../../models/team-import');
var keyMaps = require('./keys');

module.exports = function(extract, done) {
  var teams = _.map(extract, function(team) {
    var keyMap = _.find(keyMaps, { city: team.city, name: team.name });

    if (!keyMap) {
      throw new Error('Keys not found for ', team);
    } else {
      team.keys = keyMap.keys;
    }

    return team;
  });

  TeamImport.remove({}, function(err, teams) {
    TeamImport.create(extract, done);
  });
};

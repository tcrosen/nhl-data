
var TeamImport = require('../../models/team-import');

module.exports = function(extract, done) {
  TeamImport.remove({}, function(err, teams) {
    TeamImport.create(extract, done);
  });
};

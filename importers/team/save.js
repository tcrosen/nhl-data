var mongoose = require('mongoose');

var teamImportSchema = mongoose.Schema({
  city: String,
  name: String,
  logo: String
});

var TeamImport = mongoose.model('TeamImport', teamImportSchema);

module.exports = function(extract, done) {
  TeamImport.remove({}, function(err, teams) {
    TeamImport.create(extract, done);
  });
};

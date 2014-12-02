var mongoose = require('mongoose');

var playerImportSchema = mongoose.Schema({
  name: String,
  team: String,
  birthDate: String,
  birthPlace: String
});

var PlayerImport = mongoose.model('PlayerImport', playerImportSchema);

module.exports = function(extract, done) {
  PlayerImport.remove({}, function(err) {
    PlayerImport.create(extract, done);
  });
};

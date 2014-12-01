var mongoose = require('mongoose');

var scheduleImportSchema = mongoose.Schema({
  seasonId: String,
  games: [{
    scheduledDate: String,
    scheduledTime: String,
    awayTeam: String,
    homeTeam: String
  }]
});

module.exports = mongoose.model('ScheduleImport', scheduleImportSchema);

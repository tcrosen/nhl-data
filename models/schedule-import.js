var mongoose = require('mongoose');

var scheduleImportSchema = mongoose.Schema({
  seasonId: String,
  games: [{
    scheduledDate: String,
    scheduledTime: String,
    awayTeamName: String,
    homeTeamName: String,
    awayTeamKey: String,
    homeTeamKey: String
  }]
});

module.exports = mongoose.model('ScheduleImport', scheduleImportSchema);

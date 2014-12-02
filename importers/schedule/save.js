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

var ScheduleImport = mongoose.model('ScheduleImport', scheduleImportSchema);

module.exports = function(seasonId, scheduleExtract, done) {
  ScheduleImport.findOne({ seasonId: seasonId }, function(err, schedule) {
    if (schedule) {
      schedule.games = scheduleExtract;
      schedule.save(done);
    } else {
      ScheduleImport.create({
        seasonId: seasonId,
        games: scheduleExtract
      }, done);
    }
  });
};

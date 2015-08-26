var ScheduleImport = require('../../api/schedule-import/schedule-import.model');

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

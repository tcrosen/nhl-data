'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ScheduleImportSchema = new Schema({
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

module.exports = mongoose.model('ScheduleImport', ScheduleImportSchema);

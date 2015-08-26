'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  seasonId: String,
  scheduledDate: String,
  scheduledTime: String,
  away: { type: Schema.ObjectId, ref: 'Team' },
  home: { type: Schema.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('Game', GameSchema);

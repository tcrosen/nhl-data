var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = Schema({
  seasonId: String,
  scheduledDate: String,
  scheduledTime: String,
  away: { type: Schema.ObjectId, ref: 'Team' },
  home: { type: Schema.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('Game', gameSchema);

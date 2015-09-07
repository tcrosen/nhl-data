'use strict';

var async = require('async'),
    mongoose = require('mongoose'),
    PlayerImport = require('../player-import/player-import.model'),
    Team = require('../team/team.model'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: String,
  team: { type: Schema.ObjectId, ref: 'Team' },
  birthDate: String,
  birthPlace: String,
  positions: [String]
});

PlayerSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

PlayerSchema.statics.import = function(player, cb) {
  var Player = this,
    positionStr = player.nameAndPosition.match(/\(.+\)/)[0],
    position = positionStr.replace(/\(|\)/g, ''),
    name = player.nameAndPosition.replace(positionStr, ''),
    team = player.team || 'NHL';

  console.info('Upserting player: %s - %s - %s', name, position, team);

  Team.findByKey(team, function(err, playerTeam) {
    if (err) {
      cb(err);
    }

    Player.findOneAndUpdate({
      name: name
    }, {
      name: name,
      team: playerTeam._id,
      positions: [position],
      birthDate: player.birthDate,
      birthPlace: player.birthPlace
    }, {
      // bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
      new: false,
      // bool - creates the object if it doesn't exist. defaults to false.
      upsert: true
    }, cb);
  });
}

PlayerSchema.statics.updateAllFromImport = function(importedPlayers, cb) {
  var Player = this;
  async.each(importedPlayers, Player.import.bind(Player), cb);
};

module.exports = mongoose.model('Player', PlayerSchema);

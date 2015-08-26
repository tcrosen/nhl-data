

var parsePlayer = require('./player');


// SHOT_ON_GOAL:  WPG ONGOAL - #16 LADD, Wrist, Off. Zone, 58 ft.
module.exports = function parseShotOnGoal(desc) {
  var parts = desc.replace('ONGOAL - ', '').splitAndTrim(',');

  return {
    player: parsePlayer(parts[0]),
    type: parts[1],
    zone: parts[2],
    distance: parts[3]
  };
};

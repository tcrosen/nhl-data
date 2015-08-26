
var parsePlayer = require('./player');

// SHOT_MISSED:   CBJ #42 ANISIMOV, Wrist, Over Net, Off. Zone, 29 ft.
module.exports = function parseShotMissed(desc) {
  var parts = desc.splitAndTrim(',');

  return {
    player: parsePlayer(parts[0]),
    type: parts[1],
    miss: parts[2],
    zone: parts[3],
    distance: parts[4]
  };
};

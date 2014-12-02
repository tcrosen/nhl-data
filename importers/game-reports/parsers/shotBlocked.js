

var parsePlayer = require('./player');

// SHOT_BLOCKED:  CBJ #38 JENNER BLOCKED BY  WPG #8 TROUBA, Wrist, Def. Zone
module.exports = function parseShotBlocked(desc) {
  var parts = desc.replace('BLOCKED BY', '').splitAndTrim(',');

  return {
    player: parsePlayer(parts[0]),
    type: parts[1],
    zone: parts[2]
  };
};

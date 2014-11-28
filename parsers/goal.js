

var _ = require('lodash');
var parsePlayer = require('./player');


// CBJ #42 ANISIMOV(3), Wrist, Off. Zone, 29 ft.
function parseGoalShot(desc) {
  var parts = desc.splitAndTrim(',');

  return {
    player: parsePlayer(parts[0]),
    type: parts[1],
    zone: parts[2],
    distance: parts[3]
  };
}


/**
* Parse a goal log description
* Eg. DET #14 NYQUIST(4), Wrist, Off. Zone, 20 ft.Assists: #40 ZETTERBERG(4); #4 KINDL(1)
*/

module.exports = function parseGoal(desc) {
  // DET #14 NYQUIST(4), Wrist, Off. Zone, 20 ft.Assists: #40 ZETTERBERG(4); #4 KINDL(1)
  //   ==> ['DET #14 NYQUIST(4), Wrist, Off. Zone, 20 ft.', '#40 ZETTERBERG(4); #4 KINDL(1)']
  var parts = desc.splitAndTrim(/Assists:|Assist:/);
  var shot = parseGoalShot(parts[0]);
  var goal = {
    shot: shot,
    assists: _.map(parts[1].splitAndTrim(';'), function(p) {
      return parsePlayer(p, shot.player.team);
    })
  };

  return goal;
};

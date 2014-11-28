/**
* Parse the name and number out of a player string in a goal event
* Eg. CBJ #42 ANISIMOV ==> { number: 42, name: ANISIMOV, team: 'CBJ' }
*/
function parseShotPlayer(player) {
  // CBJ #42 ANISIMOV ==> ['CBJ', '#42', 'ANISIMOV']
  var parts = player.split(' ');

  return {
    team: parts[0],
    number: parts[1].replace('#', ''),
    name: parts[2]
  };
}

// type possible values:
// SHOT_MISSED:   CBJ #42 ANISIMOV, Wrist, Over Net, Off. Zone, 29 ft.
// SHOT_ON_GOAL:  WPG ONGOAL - #16 LADD, Wrist, Off. Zone, 58 ft.
// SHOT_BLOCKED:  CBJ #38 JENNER BLOCKED BY  WPG #8 TROUBA, Wrist, Def. Zone
module.exports = function(type, desc) {
  var shot = {
    type: type
  };

  if (type === 'SHOT') {
    shot.ongoal = true;
    desc = desc.replace('ONGOAL - ', '');
  }

  shot.player = parseShotPlayer(desc.split(',')[0].replace(shot.team, '').trim());

  return shot;
};

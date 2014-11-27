var _ = require('lodash');

/**
* Parse the name and number out of a player string in a goal event
* Eg. #14 NYQUIST(4) ==> { number: 14, name: NYQUIST }
*/
function parseGoalPlayer(player) {
  // Player number is everything before space in player minus the hash tag
  var number = player.split(' ')[0].replace('#', '');

  // Player name is everything after the space in player minus the bracketed goal/assist count
  // Note: This should not be necessary as player number is unique, just pull it in case we need to
  // correct player names/numbers as we go.
  var name = player.split(' ')[1].split('(')[0];

  return {
    number: number,
    name: name
  };
}

/**
* Parse a goal log description
* Eg. DET #14 NYQUIST(4), Wrist, Off. Zone, 20 ft.Assists: #40 ZETTERBERG(4); #4 KINDL(1)
*/
module.exports = function(desc) {
  var goal = {
    assists: []
  };

  // Team is first 3 characters
  var teamStr = desc.substr(0, 3);
  goal.team = teamStr;

  // Player is everything after team until first comma
  // DET #14 NYQUIST(4) ==> #14 NYQUIST(4)
  var player = desc.split(',')[0].replace(teamStr, '').trim();

  if (desc.indexOf('Assist:') > -1) {
    // Single assist
    goal.assists.push(desc.split('Assist:')[1].trim());
  } else if (desc.indexOf('Assists:') > -1) {
    // Multiple assists, separated by semi-colon
    goal.assists.push(desc.split('Assists:')[1].trim().split(';')[0].trim());
    goal.assists.push(desc.split('Assists:')[1].trim().split(';')[1].trim());
  }

  goal.player = parseGoalPlayer(player);
  goal.assists = _.map(goal.assists, parseGoalPlayer);

  return goal;
};

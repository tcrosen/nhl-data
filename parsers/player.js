
var _ = require('lodash');

/**
* Parse the team, name and number out of a player string
* For goal assist players, a team parameter should be supplied.
* Eg. CBJ #42 ANISIMOV(2) ==> { number: 42, name: 'ANISIMOV', team: 'CBJ' }
* Eg. #42 ANISIMOV ==> { number: 42, name: 'ANISIMOV' }
*/
module.exports = function parsePlayer(playerStr, team) {
  // CBJ #42 ANISIMOV(3) ==> ['CBJ', '42', 'ANISIMOV']
  var parts = playerStr.replace(/\(\d+\)|#/g, '').splitAndTrim(' ');

  if (parts.length === 2) {
    // ['42', 'ANISIMOV']
    return {
      name: parts[1],
      number: parseInt(parts[0], 10),
      team: team
    };
  } else {
    // ['CBJ', '42', 'ANISIMOV']
    return {
      name: parts[2],
      number: parseInt(parts[1], 10),
      team: parts[0]
    };
  }
};

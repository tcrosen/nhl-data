

var _ = require('lodash');

// 18:461:14 => 18:46
// 3:211:14 => 3:21
function parseGameTimes(times) {
  return /(\d+:\d{2})(\d+:\d+)/.exec(times)[1];
}

/**
* Parse the team, name and number out of a player string
* Eg. CBJ #42 ANISIMOV ==> { number: 42, name: ANISIMOV, team: 'CBJ' }
*/
function parsePlayer(player) {
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

// Ex. WPG ONGOAL - #16 LADD, Wrist, Off. Zone, 58 ft.
function parseShotOnGoal(desc) {
  // ['WPG #16 LADD', 'Wrist', 'Off. Zone', '58 ft.']
  var parts = desc.replace('ONGOAL - ', '').split(',');

  return {
    player: parseShotPlayer(parts[0]),
    type: parts[1],
    zone: parts[2],
    distance: parts[3]
  };
}

// Ex. CBJ #42 ANISIMOV, Wrist, Over Net, Off. Zone, 29 ft.
function parseShotMissed(desc) {
  // ['CBJ #42 ANISIMOV', 'Wrist', 'Over Net', 'Off. Zone', '58 ft.']
  var parts = desc.replace('ONGOAL - ', '').split(',');

  return {
    player: parseShotPlayer(parts[0]),
    type: parts[1],
    reason: parts[2],
    zone: parts[3],
    distance: parts[4]
  };
}

// 15R 67R 17L 2D 44D 34G
//  ==> 15 67 17 2 44 34
function parsePlayersOnIce(desc) {
  return desc.replace(/[A-Z]/g, '');
}

module.exports = function(gameLogs) {

  var EVENT_TYPES = {
    PERIOD_START: 'PSTR',
    PERIOD_END: 'PEND',
    FACEOFF: 'FAC',
    STOPPAGE: 'STOP',
    GOAL: 'GOAL',
    PENALTY: 'PENL',
    TAKEAWAY: 'TAKE',
    GIVEAWAY: 'GIVE',
    SHOT_ON_GOAL: 'SHOT',
    SHOT_MISSED: 'MISS',
    SHOT_BLOCKED: 'BLOCK',
    HIT: 'HIT'
  };

  var game = {
    goals: [],
    shots: [],
    periodStartsEnds: [],
    stoppages: [],
    penalties: [],
    hits: [],
    faceoffs: [],
    giveaways: [],
    takeaways: []
  };

  // Parse raw text into meaningful objects
  _.each(gameLogs, function(log, i) {
    var gameTime = parsers.gameTime(log.times);
    var period = parseInt(log.period, 10);

    switch (log.eventType) {
      case EVENT_TYPES.GOAL: {
        game.goals.push(_.extend(parsers.goal(log.eventDescription), { period: period, time: gameTime }));
        break;
      }
      case EVENT_TYPES.SHOT_ON_GOAL:
      case EVENT_TYPES.SHOT_MISSED:
      case EVENT_TYPES.SHOT_BLOCKED: {
        game.shots.push(_.extend(parsers.shot(log.eventType, log.eventDescription), { period: period, time: gameTime }));
        break;
      }
      case EVENT_TYPES.PERIOD_START:
      case EVENT_TYPES.PERIOD_END: {
        game.periodStartsEnds.push(log.eventDescription);
        break;
      }
      case EVENT_TYPES.GIVEAWAY: {
        game.giveaways.push(log.eventDescription);
        break;
      }
      case EVENT_TYPES.TAKEAWAY: {
        game.takeaways.push(log.eventDescription);
        break;
      }
      case EVENT_TYPES.FACEOFF: {
        game.faceoffs.push(log.eventDescription);
        break;
      }
      case EVENT_TYPES.PENALTY: {
        game.penalties.push(log.eventDescription);
        break;
      }
      case EVENT_TYPES.STOPPAGE: {
        game.stoppages.push(log.eventDescription);
        break;
      }
      case EVENT_TYPES.HIT: {
        game.hits.push(log.eventDescription);
        break;
      }
      default: {
        console.log('Unknown event: ' + log.eventType + ' - ' + log.eventDescription);
        break;
      }
    }
  });
};



var _ = require('lodash');

// TODO: Proper object & require
var Player = function(name, number, team) {
  this.name = name;
  this.number = number;
  this.team = team || '';
};

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
  HIT: 'HIT',
  GAME_END: 'GEND'
};

/**
* Parse a period start/end event description into a time.
* Eg. Period Start- Local time: 7:07 EDT ==> 7:07 EDT
*/
function parsePeriodStartEnd(desc) {
  return desc.split('Local time: ')[1];
}


// 18:461:14 => 18:46
// 3:211:14 => 3:21
function parseGameTimes(times) {
  return /(\d+:\d{2})(\d+:\d+)/.exec(times)[1];
}

/**
* Parse the team, name and number out of a player string
* For goal assist players, a team parameter should be supplied.
* Eg. CBJ #42 ANISIMOV(2) ==> { number: 42, name: 'ANISIMOV', team: 'CBJ' }
* Eg. #42 ANISIMOV ==> { number: 42, name: 'ANISIMOV' }
*/
function parsePlayer(playerStr, team) {
  // CBJ #42 ANISIMOV(3) ==> ['CBJ', '42', 'ANISIMOV']
  var parts = playerStr.replace(/\(\d+\)|#/g, '').split(' ');

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
}

// CBJ #42 ANISIMOV(3), Wrist, Off. Zone, 29 ft.
function parseGoalShot(desc) {
  var parts = desc.split(',');

  return {
    player: parsePlayer(parts[0]),
    type: parts[1].trim(),
    zone: parts[2].trim(),
    distance: parts[3].trim()
  };
}


/**
* Parse a goal log description
* Eg. DET #14 NYQUIST(4), Wrist, Off. Zone, 20 ft.Assists: #40 ZETTERBERG(4); #4 KINDL(1)
*/
function parseGoal(desc) {
  // DET #14 NYQUIST(4), Wrist, Off. Zone, 20 ft.Assists: #40 ZETTERBERG(4); #4 KINDL(1)
  //   ==> ['DET #14 NYQUIST(4), Wrist, Off. Zone, 20 ft.', '#40 ZETTERBERG(4); #4 KINDL(1)']
  var parts = desc.split(/Assists:|Assist:/);
  var shot = parseGoalShot(parts[0]);
  var goal = {
    shot: shot,
    assists: _.map(parts[1].split(';'), function(p) {
      return parsePlayer(p.trim(), shot.player.team);
    })
  };

  return goal;
}

// Ex. WPG ONGOAL - #16 LADD, Wrist, Off. Zone, 58 ft.
function parseShotOnGoal(desc) {
  // ['WPG #16 LADD', 'Wrist', 'Off. Zone', '58 ft.']
  var parts = desc.replace('ONGOAL - ', '').split(',');

  return {
    player: parsePlayer(parts[0]),
    type: parts[1],
    zone: parts[2],
    distance: parts[3]
  };
}

// SHOT_MISSED:   CBJ #42 ANISIMOV, Wrist, Over Net, Off. Zone, 29 ft.
function parseShotMissed(desc) {
  var parts = desc.split(',');

  return {
    player: parsePlayer(parts[0]),
    type: parts[1],
    reason: parts[2],
    zone: parts[3],
    distance: parts[4]
  };
}

// SHOT_BLOCKED:  CBJ #38 JENNER BLOCKED BY  WPG #8 TROUBA, Wrist, Def. Zone
function parseShotBlocked(desc) {
  var parts = desc.split(',');

  return {
    player: parsePlayer(parts[0]),
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

function parsePeriod(period) {
  return parseInt(period, 10);
}

function parseEventNumber(eventNbr) {
  return parseInt(eventNbr, 10);
}

function parseLog(importLog, i) {
  var log = {};

  log.period = parsePeriod(importLog.period);
  log.gameTime = parseGameTimes(importLog.times);
  log.type = importLog.eventType;
  log.nhlEventNbr = parseEventNumber(importLog.eventNumber);

  switch (importLog.eventType) {
    case EVENT_TYPES.GOAL: {
      log.goal = parseGoal(importLog.eventDescription);
      break;
    }
    case EVENT_TYPES.SHOT_ON_GOAL: {
      //log.shot = parseShotOnGoal(importLog.eventDescription);
      break;
    }
    case EVENT_TYPES.SHOT_MISSED: {
      //log.shot = parseShotMissed(importLog.eventDescription);
      break;
    }
    case EVENT_TYPES.SHOT_BLOCKED: {
      //log.shot = parseShotBlocked(importLog.eventDescription);
      break;
    }
    case EVENT_TYPES.PERIOD_START: {
      break;
    }
    case EVENT_TYPES.PERIOD_END: {
      break;
    }
    case EVENT_TYPES.GIVEAWAY: {
      break;
    }
    case EVENT_TYPES.TAKEAWAY: {
      break;
    }
    case EVENT_TYPES.FACEOFF: {
      break;
    }
    case EVENT_TYPES.PENALTY: {
      break;
    }
    case EVENT_TYPES.STOPPAGE: {
      break;
    }
    case EVENT_TYPES.HIT: {
      break;
    }
    case EVENT_TYPES.GAME_END: {
      break;
    }
    default: {
      console.log('Unknown event: ' + importLog.eventType + ' - ' + importLog.eventDescription);
      break;
    }
  }

  return log;
}

module.exports = function(importLogs) {

  // Parse raw text into meaningful objects
  return _.map(importLogs, parseLog);

};

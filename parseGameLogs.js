

var _ = require('lodash');

// Split a string and trim whitespace from results
String.prototype.splitAndTrim = function(sep) {
  return _.map(this.split(sep), function(s) {
    return s.trim();
  });
};

var parsers = require('./parsers');

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

function parseLog(importLog, i) {
  var log = {};

  log.period = parsers.period(importLog.period);
  log.gameTime = parsers.gameTimes(importLog.times);
  log.type = importLog.eventType;
  log.nhlEventNbr = parsers.eventNumber(importLog.eventNumber);

  switch (importLog.eventType) {
    case EVENT_TYPES.GOAL: {
      log.goal = parsers.goal(importLog.eventDescription);
      break;
    }
    case EVENT_TYPES.SHOT_ON_GOAL: {
      log.shot = parsers.shotOnGoal(importLog.eventDescription);
      break;
    }
    case EVENT_TYPES.SHOT_MISSED: {
      log.shot = parsers.shotMissed(importLog.eventDescription);
      break;
    }
    case EVENT_TYPES.SHOT_BLOCKED: {
      log.shot = parsers.shotBlocked(importLog.eventDescription);
      break;
    }
    case EVENT_TYPES.PERIOD_START:
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

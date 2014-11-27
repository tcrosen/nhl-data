var _ = require('lodash');
var fs = require('fs');
var cheerio = require('cheerio');

var parsers = {
  goal: require('./parse_goal'),
  periodStartEnd: require('./parse_period_start_end')
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
  HIT: 'HIT'
};

var gameHtml = fs.readFileSync('./games/20142015-PL020316.html', 'utf8');

var $ = cheerio.load(gameHtml);

var selectors = {
  eventNumber: '.evenColor .bborder:nth-child(1)',
  period: '.evenColor .bborder:nth-child(2)',
  strength: '.evenColor .bborder:nth-child(3)',
  times: '.evenColor .bborder:nth-child(4)',
  eventType: '.evenColor .bborder:nth-child(5)',
  eventDescription: '.evenColor .bborder:nth-child(6)',
  awayOnIce: '.evenColor .bborder:nth-child(7)',
  homeOnIce: '.evenColor .bborder:nth-child(8)'
};

var gameLogs = [];

$(selectors.eventNumber).map(function(i, el) {
  gameLogs[i] = {
    eventNumber: $(el).text()
  };
});

_.each(selectors, function(selector, key) {
  $(selector).each(function(i, el) {
    gameLogs[i][key] = $(el).text();
  });
});

var goals = [];

_.each(gameLogs, function(log, i) {
  switch (log.eventType) {
    case EVENT_TYPES.GOAL: {
      goals.push(parsers.goal(log.eventDescription));
    }
  }
});


console.log(goals);

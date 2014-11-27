var _ = require('lodash');
var fs = require('fs');
var cheerio = require('cheerio');

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

var games = [];

$(selectors.eventNumber).map(function(i, el) {
  games[i] = {
    eventNumber: $(el).text()
  };
});

_.each(selectors, function(selector, key) {
  $(selector).each(function(i, el) {
    games[i][key] = $(el).text();
  });
});


console.log(games);

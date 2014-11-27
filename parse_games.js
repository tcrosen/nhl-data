var fs = require('fs');
var cheerio = require('cheerio');

var gameHtml = fs.readFileSync('./games/20142015-PL020316.html', 'utf8');

var $ = cheerio.load(gameHtml);

var selectors = {
  eventNumber: '.evenColor .bborder:nth-child(1)',
  period: '.evenColor .bborder:nth-child(2)'
};

var games = [];

$(selectors.eventNumber).map(function(i, el) {
  games[i] = {
    eventNumber: $(el).text()
  };
});

$(selectors.period).each(function(i, el) {
  games[i].period = $(el).text();
});

console.log(games);

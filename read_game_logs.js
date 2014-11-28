var _ = require('lodash');
var fs = require('fs');
var cheerio = require('cheerio');

module.exports = function(file) {
  var gameLogs = [];
  var gameHtml = fs.readFileSync(file, 'utf8');
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

  // Pull out raw text values
  _.each(selectors, function(selector, key) {
    $(selector).each(function(i, el) {
      gameLogs[i] = {};
      gameLogs[i][key] = $(el).text().trim();
    });
  });

  return gameLogs;
};

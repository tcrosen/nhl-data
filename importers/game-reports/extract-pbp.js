


var _ = require('lodash');
var fs = require('fs');
var cheerio = require('cheerio');

/**
 *  Read a game log HTML file and convert to raw text
 */
module.exports = function(file) {

  var results = [];

  var gameHtml = fs.readFileSync(file, 'utf8');
  var $ = cheerio.load(gameHtml);

  // HTML selectors to extract data
  // Keys are used as properties for resulting game log objects
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

  // create the initial array of objects
  // the next loop will run through each selector and hydrate the array
  $(selectors.eventNumber).map(function(i, el) {
    results[i] = {};
  });

  // Parse HTML to text and do some generic cleanup
  // Each property has a specific parser that handles data cleaning edge cases
  _.each(selectors, function(selector, key) {
    $(selector).each(function(i, el) {
      results[i][key] = $(el).text().trim().replace(/(\n|\r)/g, '');
    });
  });

  return results;
};

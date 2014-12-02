


var _ = require('lodash');
var fs = require('fs');
var cheerio = require('cheerio');

/**
*  Read a season schedule HTML file and extract raw text properties
*/
module.exports = function(file, done) {

  var results = [];

  var gameHtml = fs.readFileSync(file, 'utf8');
  var $ = cheerio.load(gameHtml);

  // HTML selectors to extract data
  // Keys are used as properties
  var selectors = {
    scheduledDate: '.skedStartDateSite',
    scheduledTime: '.skedStartTimeEST',
    awayTeamName: '.date+ .team .teamName a',
    homeTeamName: '.team+ .team .teamName a',
    awayTeamKey: '.date+ .team .teamName a',
    homeTeamKey: '.team+ .team .teamName a'
  };

  // create the initial array of objects
  // the next loop will run through each selector and hydrate the array
  $(selectors.scheduledDate).map(function(i, el) {
    results[i] = {};
  });

  // Parse HTML to text and do some generic cleanup
  // Each property has a specific parser that handles data cleaning edge cases
  _.each(selectors, function(selector, key) {
    $(selector).each(function(i, el) {
      if (key === 'awayTeamKey' || key === 'homeTeamKey') {
        results[i][key] = $(el).attr('rel');
      } else {
        results[i][key] = $(el).text().trim().replace(/(\n|\r)/g, '');
      }
    });
  });

  done(null, results);
};

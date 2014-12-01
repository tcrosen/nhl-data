


var _ = require('lodash');
var fs = require('fs');
var cheerio = require('cheerio');

/**
*  Read a teams HTML file and extract raw text properties
*/
module.exports = function(file) {

  var results = [];

  var gameHtml = fs.readFileSync(file, 'utf8');
  var $ = cheerio.load(gameHtml);

  // HTML selectors to extract data
  // Keys are used as properties
  var selectors = {
    city: '.container .teamPlace',
    name: '.container .teamCommon',
    logo: '.container .svg.team-logo'
  };

  // create the initial array of objects
  // the next loop will run through each selector and hydrate the array
  $(selectors.city).map(function(i, el) {
    results[i] = {};
  });

  // Parse HTML to text and do some generic cleanup
  // Each property has a specific parser that handles data cleaning edge cases
  _.each(selectors, function(selector, key) {
    $(selector).each(function(i, el) {
      if (key === 'logo') {
        results[i][key] = $(el).attr('src');
      } else {
        results[i][key] = $(el).text().trim().replace(/(\n|\r)/g, '');
      }
    });
  });

  return results;
};

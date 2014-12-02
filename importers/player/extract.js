


var _ = require('lodash');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var glob = require('glob');

/**
*  Read a directory of player HTML files and extract raw text properties
*/
module.exports = function(seasonId, done) {

  var results = [];

  glob('./data/' + seasonId + '/players/*.html', function(err, files) {
    async.each(files, function(file, cb) {
      var gameHtml = fs.readFileSync(file, 'utf8');
      var $ = cheerio.load(gameHtml);
      var pageResults = [];

      // HTML selectors to extract data
      // Keys are used as properties
      var selectors = {
        name: '.playerSearch td:nth-child(1) a',
        team: '.playerSearch td:nth-child(2) a',
        birthDate: '.playerSearch td:nth-child(3)',
        birthPlace: '.playerSearch td:nth-child(4)'
      };

      // create the initial array of objects
      // the next loop will run through each selector and hydrate the array
      $(selectors.name).map(function(i, el) {
        pageResults[i] = {};
      });

      // Parse HTML to text and do some generic cleanup
      // Each property has a specific parser that handles data cleaning edge cases
      _.each(selectors, function(selector, key) {
        $(selector).each(function(i, el) {
          pageResults[i][key] = $(el).text().trim().replace(/(\n|\r)/g, '');
        });
      });

      if (pageResults.length) {
        results.push(pageResults);
      }

      cb();
    }, function(err) {
      if (err) {
        done(err);
      }

      done(null, _.flatten(results));
    });
  });
};

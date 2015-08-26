/**
* Download teams from NHL.com
*/

var fs = require('fs');
var util = require('../../util');


module.exports = function(seasonId, done) {

  var url = 'http://www.nhl.com/ice/teams.htm';
  var filename = './data/' + seasonId + '/teams.html';

  if (fs.existsSync(filename)) {
    done(null, filename);
  } else {
    console.log(filename + ' not found.  Downloading...');
    util.downloadAndSaveHtml(url, filename, done);
  }

};

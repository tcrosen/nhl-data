/**
* Download games for a season from NHL.com
*/

var fs = require('fs');
var util = require('../../util');


module.exports = function(season, done) {

  var url = 'http://www.nhl.com/ice/schedulebyseason.htm';
  // Alternative - http://www.nhl.com/ice/schedulebyseason.htm?season=20142015&gameType=2&team=&network=&venue=
  var filename = './data/' + season + '/schedule.html';

  if (fs.existsSync(filename)) {
    done(null, filename);
  } else {
    console.log(filename + ' not found.  Downloading...');
    util.downloadAndSaveHtml(url, filename, done);
  }

};


/**
* Parse a period start/end event description into a time.
* Eg. Period Start- Local time: 7:07 EDT ==> 7:07 EDT
*/
module.exports = function(logEvent) {
  var timeStr = null;

  if (logEvent && logEvent.description) {
    timeStr = logEvent.description.split('Local time: ')[1];
  }

  return timeStr;
}

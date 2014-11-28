


/**
* Parse a period start/end event description into a time.
* Eg. Period Start- Local time: 7:07 EDT ==> 7:07 EDT
*/

module.exports = function parsePeriodStartEnd(desc) {
  return desc.splitAndTrim('Local time: ')[1];
};




// 18:461:14 => 18:46
// 3:211:14 => 3:21
module.exports = function parseGameTimes(times) {
  return /(\d+:\d{2})(\d+:\d+)/.exec(times)[1];
};

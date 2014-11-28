module.exports = function(desc) {
  // 18:461:14 => 18:46
  // 3:211:14 => 18:46

  return /(\d+:\d{2})(\d+:\d+)/.exec(desc)[1];
};

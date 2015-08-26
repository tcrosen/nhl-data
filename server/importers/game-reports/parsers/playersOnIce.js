


// 15R 67R 17L 2D 44D 34G
//  ==> 15 67 17 2 44 34
module.exports = function parsePlayersOnIce(desc) {
  return desc.replace(/[A-Z]/g, '');
};

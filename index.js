var NedbDown = require('./lib/nedbdown');

module.exports = function NedbDownFactory(location) {
  return new NedbDown(location);
};
var util = require('util');
var AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN;
var AbstractIterator  = require('abstract-leveldown').AbstractIterator
var nedb = require('nedb');


function NedbDOWN(location) {

  if (!(this instanceof NedbDOWN))
    return new NedbDOWN(location);

  AbstractLevelDOWN.call(this, location);

}

util.inherits(NedbDOWN, AbstractLevelDOWN);

module.exports = exports = NedbDOWN;

var p = NedbDOWN.prototype;

p._open = function(opts, cb) {
  this._
};




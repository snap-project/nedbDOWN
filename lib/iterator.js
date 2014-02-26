var util = require('util');
var AbstractIterator  = require('abstract-leveldown').AbstractIterator;

function NedbIterator(db, opts) {

  AbstractIterator.call(this, db);

  this._reverse = opts.reverse;
  this._limit = opts.limit;
  this._count = 0;
  this._end = opts.end;
  this._start = opts.start;
  this._exclusiveStart = opts.exclusiveStart
  this._gt = opts.gt;
  this._gte = opts.gte;
  this._lt = opts.lt;
  this._lte = opts.lte;

}

util.inherits(NedbIterator, AbstractIterator);

module.exports = NedbIterator;

var p = NedbIterator.prototype;

p._isOutsideRange = function(key) {
  return !!((this._lt && key >= this._lt) ||
    (this._lte && key > this._lte) ||
    (this._gt  && key <= this._gt) ||
    (this._gte && key < this._gte));
};

p._next = function(cb) {

  var self = this;
  var store = self.db._store;
  var query = {};
  var justStarted = false;

  if (!!self._limit && self._limit > 0 && self._count++ >= self._limit) {
    return setImmediate(cb);
  }   

  if(!('_last' in self) && self._start) {
    self._last = self._start;
    justStarted = true;
  }

  if('_last' in self) {
    var op = self._reverse ? '$lt' : '$gt';
    if(justStarted && !self._exclusiveStart) {
      op += 'e';
    }
    query.k = {};
    query.k[op] = self._last;
  }

  store
    .findOne(query)
    .sort({k: self._reverse ? -1 : 1})
    .exec(function(err, doc) {

      if(err) {
        return cb(err);
      }

      if(doc) {

        var key = doc.k;

        if (!!self._end && (self._reverse ? key < self._end : key > self._end)) {
          return cb();
        }

        if(self._isOutsideRange(key)) {
          return cb();
        }        

        self._last = key;

        return cb(null, key, doc.v);

      } else {
        return cb();
      }

    });


};
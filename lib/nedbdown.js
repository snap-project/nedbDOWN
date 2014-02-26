var util = require('util');
var AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN;
var Datastore = require('nedb');
var bops = require('bops');
var async = require('async');
var NedbIterator = require('./iterator');

function NedbDOWN(location) {
  AbstractLevelDOWN.call(this, location);
  this._store = new Datastore({ filename: location });
}

util.inherits(NedbDOWN, AbstractLevelDOWN);

module.exports = exports = NedbDOWN;

var p = NedbDOWN.prototype;

p._open = function(opts, cb) {
  var store = this._store;
  async.series([
    store.loadDatabase.bind(store),
    store.ensureIndex.bind(store, { fieldName: 'k', unique: true })
  ], cb);
};

p._put = function(key, value, opts, cb) {
  if(bops.is(value)) {
    value = bops.to(value, 'utf8');
  }
  this._store.update(
    {k: key},
    {v: value, k: key},
    {upsert: true},
    cb
  );
};

p._get = function(key, opts, cb) {
  this._store.findOne(
    {k: key},
    function(err, doc) {
      if(err) {
        return cb(err);
      }
      if(!doc) {
        return cb(new Error('NotFound'));
      } else {
        var value = doc.v;
        if (opts.asBuffer !== false && !bops.is(value)) {
          value = bops.from(String(value));
        }
        return cb(null, value);
      }
    }
  );
};

p._del = function(key, opts, cb) {
  this._store.remove({k: key}, {}, cb);
};


p._batch = function(arr, opts, cb) {
  var self = this;
  async.forEach(arr, function batchIterator(op, next) {
    var err;
    if(op) {
      var key = bops.is(op.key) ? key : String(op.key);
      err = self._checkKeyValue(key, 'key');
      if(err) {
        return next(err);
      }
      if(op.type === 'del') {
        return self._del(key, opts, next);
      } else if(op.type === 'put') {
        var value = bops.is(op.value) ? op.value : String(op.value);
        err = self._checkKeyValue(value, 'value');
        if(err) {
          return next(err);
        }
        return self._put(key, value, opts, next);
      } else {
        return next();
      }
    } else {
      return next();
    }
  }, cb);
};

p._iterator = function(opts) {
  return new NedbIterator(this, opts);
};



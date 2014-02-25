var test       = require('tape');
var testCommon = require('abstract-leveldown/testCommon');
var NedbDOWN    = require('./');

/*** compatibility with basic LevelDOWN API ***/

require('abstract-leveldown/abstract/open-test').args(NedbDOWN, test, testCommon)
require('abstract-leveldown/abstract/open-test').open(NedbDOWN, test, testCommon)

require('abstract-leveldown/abstract/del-test').all(NedbDOWN, test, testCommon)

require('abstract-leveldown/abstract/get-test').all(NedbDOWN, test, testCommon)

require('abstract-leveldown/abstract/put-test').all(NedbDOWN, test, testCommon)

require('abstract-leveldown/abstract/batch-test').all(NedbDOWN, test, testCommon)
require('abstract-leveldown/abstract/chained-batch-test').all(NedbDOWN, test, testCommon)

require('abstract-leveldown/abstract/close-test').close(NedbDOWN, test, testCommon)

require('abstract-leveldown/abstract/iterator-test').all(NedbDOWN, test, testCommon)

require('abstract-leveldown/abstract/ranges-test').all(NedbDOWN, test, testCommon)
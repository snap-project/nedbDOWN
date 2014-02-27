var tape       = require('tape');
var testCommon = require('abstract-leveldown/testCommon');
var NedbDOWN    = require('./');
var testBuffer = require('./testdata_b64');

/*** compatibility with basic LevelDOWN API ***/

require('abstract-leveldown/abstract/leveldown-test').args(NedbDOWN, tape, testCommon)

require('abstract-leveldown/abstract/open-test').args(NedbDOWN, tape, testCommon)
require('abstract-leveldown/abstract/open-test').open(NedbDOWN, tape, testCommon)

require('abstract-leveldown/abstract/del-test').all(NedbDOWN, tape, testCommon)

require('abstract-leveldown/abstract/get-test').all(NedbDOWN, tape, testCommon)

require('abstract-leveldown/abstract/put-test').all(NedbDOWN, tape, testCommon)

require('abstract-leveldown/abstract/put-get-del-test').all(NedbDOWN, tape, testCommon, testBuffer, process.browser && Uint8Array)

require('abstract-leveldown/abstract/batch-test').all(NedbDOWN, tape, testCommon)
require('abstract-leveldown/abstract/chained-batch-test').all(NedbDOWN, tape, testCommon)

require('abstract-leveldown/abstract/close-test').close(NedbDOWN, tape, testCommon)

require('abstract-leveldown/abstract/iterator-test').all(NedbDOWN, tape, testCommon)

require('abstract-leveldown/abstract/ranges-test').all(NedbDOWN, tape, testCommon)
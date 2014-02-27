# nedbDOWN

A LevelUp storage back-end based on [NeDB](https://github.com/louischatriot/nedb)

## Stability

In development, but pass [AbstractLevelDOWN](https://github.com/rvagg/abstract-leveldown) tests

## Usage

```
var nedbDOWN = require('nedbDOWN');
var levelup = require('levelup');

var db = levelup('./store.db', { db: nedbDOWN });

db.put('hello', 'world');
db.put('foo', 'bar');
```

## Licence

ISC
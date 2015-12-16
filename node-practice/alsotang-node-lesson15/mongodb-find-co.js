var MongoClient = require('mongodb').MongoClient
    , co = require('co')
    , assert = require('assert');

co(function*() {
  var db = yield MongoClient.connect('mongodb://localhost:27017/test');
  var collection = db.collection('students');
  var docs = yield collection.findOne({username: 'Tom'});

  docs = yield collection.find({examid: docs.examid}).toArray();
  console.log(docs);
});

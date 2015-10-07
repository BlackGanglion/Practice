var MongoClient = require('mongodb').MongoClient
    , co = require('co')
    , assert = require('assert');

var findDocuments = function(db, collectName, queryCondition, callback) {
  var collection = db.collection(collectName);
  collection.find(queryCondition).toArray(function(err, docs) {
    assert.equal(err, null);
    //console.log(docs.length);
    callback(null, docs);
  });
}

var url = 'mongodb://localhost:27017/test';

/*
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('connect success');

  findDocuments(db, 'students', {username: 'hy'}, function (err, result){
    //console.log(result[0].examid);
    findDocuments(db, 'students', {examid: result[0].examid}, function (err, result){
      console.log(result);
      db.close();
    });
  });
});
*/

co(function*() {
  var db = yield MongoClient.connect('mongodb://localhost:27017/test');
  var collection = db.collection('students');
  var docs = yield collection.findOne({username: 'hy'});

  docs = yield collection.find({examid: docs.examid}).toArray();
  console.log(docs);
});

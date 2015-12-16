var MongoClient = require('mongodb').MongoClient
    , co = require('co')
    , assert = require('assert');

var findDocuments = function(db, collectName, queryCondition, callback) {
  var collection = db.collection(collectName);
  collection.find(queryCondition).toArray(function(err, docs) {
    callback(null, docs);
  });
}

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  findDocuments(db, 'students', {username: 'Tom'}, function (err, result){
    findDocuments(db, 'students', {examid: result[0].examid}, function (err, result){
      console.log(result);
      db.close();
    });
  });
});

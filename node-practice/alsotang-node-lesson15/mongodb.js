/*
mongodb 1.4
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var client = new MongoClient(new Server('localhost', 27017, {
  socketOptions: { connectTimeoutMS: 500 },
  poolsize: 5,
  auto_reconnect: true
}, {
  numberOfRetries: 3,
  retryMilliSeconds: 500
}));

client.open(function(err, client) {
  if(err){
    console.log('error');
  }
  console.log('success');
})
*/

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var crypto = require('crypto');

var url = 'mongodb://localhost:27017/test';

var getMdValue = function(content) {
  var md5 = crypto.createHash('md5');
  md5.update(content);
  return md5.digest('hex');
};

var insertDocuments = function(db, collectionName, insertArray, callback) {
  var collection = db.collection(collectionName);
  var size = insertArray.length;

  collection.insertMany(insertArray, function(err, result) {
    assert.equal(err, null);
    assert.equal(size, result.result.n);
    assert.equal(size, result.ops.length);

    console.log('success');
    callback(result);
  })
}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('connect success');

  var docs = [];
  docs.push({
    examid: 1,
    username: 'kkd',
    password: getMdValue('good'),
    score: [84, 79, 91, 90]
  })
  docs.push({
    examid: 2,
    username: 'hg',
    password: getMdValue('both'),
    score: [81, 73, 67, 78]
  })

  insertDocuments(db, 'students', docs, function() {
    db.close();
  });

  //console.log(docs);
  //db.close();
});

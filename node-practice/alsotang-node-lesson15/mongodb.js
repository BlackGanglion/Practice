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

var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('success');

  
  //db.close();
});

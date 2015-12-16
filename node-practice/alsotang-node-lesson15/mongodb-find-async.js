var MongoClient = require('mongodb').MongoClient
    , async = require('async')
    , assert = require('assert');

async.auto({
  connect: function(callback) {
    MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
      var collection = db.collection('students');
      callback(err, collection);
    });
  },
  getExamid: ['connect', function(callback, results) {
    var collection = results.connect.findOne({username: 'Tom'}, function(err, content) {
      callback(null, content);
    });
  }],
  getStudentList: ['getExamid', function(callback, results) {
    var collection = results.connect.find({examid: results.getExamid.examid}).toArray(function(err, content){
      callback(null, content);
    });
  }]
}, function(err, results) {
  console.log(err);
  console.log(results.getStudentList);
});

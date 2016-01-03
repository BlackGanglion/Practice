var MongoClient = require('mongodb').MongoClient;

var collection;
var connect = new Promise(function(resolve, reject) {
  MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if(err){
      reject(err);
    } else {
      collection = db.collection('students');
      resolve(collection);
    }
  });
});

var getExamid = function(collection) {
  /*
  collection.findOne 等应该已被promise化,
  具体可以参见mongodb驱动文档:
  http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOne
  */
  return collection.findOne({username: 'Tom'});
};

var getStudentList = function(result) {
  var examid = result.examid;
  return collection.find({examid: examid}).toArray();
};

connect.then(getExamid)
       .then(getStudentList)
       .then(result => console.log(result))
       .catch(error => console.log(error));

/*
connect.then(function(collection) {
  collection.findOne({username: 'Tom'})
            .then(function(result) {
              var examid = result.examid;
              collection.find({examid: examid})
                        .toArray()
                        .then(function(result) {
                          console.log(result);
                        }, function(err) {
                          console.log(err);
                        });
            }, function(err) {
              console.log(err);
            });
}, function(err) {
  console.log(err);
});
*/

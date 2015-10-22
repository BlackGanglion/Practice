var MongoClient = require('mongodb').MongoClient
    , co = require('co')
    , assert = require('assert');

co(function*(){
  var db = yield MongoClient.connect('mongodb://localhost:27017/test');
  var collection = db.collection('students');

  //count 用来计数
  var count = yield collection.count({examid: 1});
  console.log(count);

  //$set 表示只更新 examid:2, 不然整条文档会变成 {examid: 2}
  yield collection.update({username: 'hy'}, {$set: {examid: 2}});

  var count = yield collection.count({examid: 1});
  console.log(count);
});

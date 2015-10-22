var MongoClient = require('mongodb').MongoClient
    , co = require('co')
    , assert = require('assert');

co(function*(){
  var db = yield MongoClient.connect('mongodb://localhost:27017/test');
  var collection = db.collection('students');

  //count 统计相应文档数
  var count = yield collection.count({examid: 1});
  console.log(count);

  //$set 只更新此字段 examid:2,不然此条字段会被全部替换为 {examid: 2}
  yield collection.update({username: 'hy'}, {$set: {examid: 2}});

  var count = yield collection.count({examid: 1});
  console.log(count);
});

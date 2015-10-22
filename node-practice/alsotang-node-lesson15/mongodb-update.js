var MongoClient = require('mongodb').MongoClient
    , co = require('co')
    , assert = require('assert');

co(function*(){
  var db = yield MongoClient.connect('mongodb://localhost:27017/test');
  var collection = db.collection('students');

  //count ��������
  var count = yield collection.count({examid: 1});
  console.log(count);

  //$set ��ʾֻ���� examid:2, ��Ȼ�����ĵ����� {examid: 2}
  yield collection.update({username: 'hy'}, {$set: {examid: 2}});

  var count = yield collection.count({examid: 1});
  console.log(count);
});

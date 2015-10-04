var mongoose = require('mongoose');
var crypto = require('crypto');

var getMdValue = function(content) {
  var md5 = crypto.createHash('md5');
  md5.update(content);
  return md5.digest('hex');
};

mongoose.connect('mongodb://localhost/test');

/*
var Cat = mongoose.model('Cat', {
  name: String,
  friends: [String],
  age: Number
});

var kitty = new Cat({ name: 'Zildjian', friends: ['tom', 'jerry']});
kitty.age = 3;

kitty.save(function (err) {
  console.log('successful');
});
*/

var Student = mongoose.model('Student',{
  examid: Number,
  username: String,
  password: String,
  score: [Number],
  updated: { type: Date, default: Date.now }
});

var hyy = new Student({
  examid: 1,
  username: 'hyy',
  password: getMdValue('love'),
  score: [100, 99, 97, 0]
});

hyy.save(function (err) {
  if(err){
    console.log('error');
    return;
  }
  console.log('successful');
});

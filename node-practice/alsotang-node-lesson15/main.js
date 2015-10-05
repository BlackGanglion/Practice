var mongoose = require('mongoose');
var crypto = require('crypto');
var Eventproxy = require('eventproxy');

var ep = new Eventproxy();

var getMdValue = function(content) {
  var md5 = crypto.createHash('md5');
  md5.update(content);
  return md5.digest('hex');
};

mongoose.connect('mongodb://localhost/test');

ep.all('action1', 'action2', function(){
  console.log('all successful');
});

var studentSchma = mongoose.Schema({
  examid: Number,
  username: String,
  password: String,
  score: [Number],
  updated: { type: Date, default: Date.now }
});

studentSchma.methods.getMaxScore = function () {
  var score = this.score;
  var result = -1;
  for(var i = 0; i < score.length; i++){
    if(result < score[i]){
      result = score[i];
    }
  }
  console.log(result);
}

var Student = mongoose.model('Student', studentSchma);

var hyy = new Student({
  examid: 1,
  username: 'hyy',
  password: getMdValue('love'),
  score: [100, 99, 97, 0]
});

var hy = new Student({
  examid: 1,
  username: 'hy',
  password: getMdValue('hate'),
  score: [59, 59, 59, 59]
});

hyy.save(function (err, hyy) {
  if(err){
    console.log('error1');
    return;
  }
  hyy.getMaxScore();
  ep.emit('action1');
});

hy.save(function (err, hy) {
  if(err){
    console.log('error2');
    return;
  }
  hy.getMaxScore();
  ep.emit('action2');
});

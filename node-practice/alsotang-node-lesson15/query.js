var mongoose = require('mongoose');
var Eventproxy = require('eventproxy');
var ep = new Eventproxy();

mongoose.connect('mongodb://localhost/test');

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

Student.find({ 'examid': 1 }, function (err, student){
  if(err) return handleError(err);
  for(var i = 0; i < student.length; i++){
    console.log(student[i].username);
  }
});

var async = require('async');
var superagent = require('superagent');

var fetchUrl = function (url, callback) {
  var start = new Date().getTime();
  superagent.get(url).end( function (err, res) {
    if(err){
      return console.error(err);
    }
    var end = new Date().getTime();
    //单位ms
    callback(null, [start, end, end - start]);
  });
};

var urls = [];
for(var i = 1; i <= 20; i++){
  urls.push('http://codeforces.com/problemset/page/'+i);
}

//当前并发数为5
async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result){
  console.log(result);
});

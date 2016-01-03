var async = require('async');
var fs = require('fs');

var fileList = ['1.txt', '2.txt', '3.txt'];

async.map(fileList, function(file, callback) {
  fs.readFile(file, 'utf8', function (err, data) {
    callback(err, data);
  });
}, function(err,results) {
  console.log(results.length);
});

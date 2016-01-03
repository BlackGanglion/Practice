var eventproxy = require('eventproxy'),
    fs = require('fs');
var ep = new eventproxy();

var files = ['1.txt', '2.txt', '3.txt'];

ep.after('got_file', files.length, function (list) {
  // 所有文件的内容都存在list数组中
  console.log(list);
});
for (var i = 0; i < files.length; i++) {
  fs.readFile(files[i], 'utf-8', function (err, content) {
    // 触发结果事件
    ep.emit('got_file', content);
  });
}

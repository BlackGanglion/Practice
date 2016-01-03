var eventproxy = require('eventproxy'),
    fs = require('fs');
var ep = new eventproxy();

ep.all('file1', 'file2', 'file3', function (file1, file2, file3) {
  // 在所有指定的事件触发后，将会被调用执行
  console.log(file1);
  console.log(file2);
  console.log(file3);
});

fs.readFile('1.txt', 'utf8', function (err, data) {
  if (err) throw err;
  // 触发'file1'事件, data对应ep.all function中的file1
  ep.emit('file1', data);
});

fs.readFile('2.txt', 'utf8', function (err, data) {
  if(err) throw err;
  ep.emit('file2', data);
});

fs.readFile('3.txt', 'utf8', function (err, data) {
  if(err) throw err;
  ep.emit('file3', data);
});

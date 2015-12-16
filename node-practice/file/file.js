var fs = require('fs');

console.time("test");
fs.readFile('1.txt', 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data);
  fs.readFile('2.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
    fs.readFile('3.txt', 'utf8', function (err, data) {
      if (err) throw err;
      console.log(data);
      console.timeEnd("test");
    });
  });
});

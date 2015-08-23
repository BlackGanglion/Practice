var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function(req, res, next){
  superagent.get('http://poj.org/problem?id=1007')
  .end( function (err, sres){
    if(err){
      return next(err);
    }

    var $ = cheerio.load(sres.text);
    var problem = [];

    problem.push({
      title: $('.ptt').html()
    });

    $('.plm table tbody tr').each(function(idx, element) {
      var $element = $(element);
      problem.push({
        timeLimit: $element.find('td').eq(0).html(),
        memoryLimit: $element.find('td').eq(2).html()
      });
    });

    $('.ptx').each(function (idx, element) {
      var $element = $(element);
      switch(idx){
        case 0:
        problem.push({
          description: $element.html()
        });
        break;
        case 1:
        problem.push({
          input: $element.html()
        });
        break;
        case 2:
        problem.push({
          output: $element.html()
        });
        break;
      }
    });

    $('.sio').each(function (idx, element) {
      if(idx == 0){
        problem.push({
          sampleInput: $(element).html()
        });
      }
      if(idx == 1){
        problem.push({
          sampleOutput: $(element).html()
        });
      }
    });

    problem.push({
      source: $('.ptx a').text()
    });

    res.send(problem);
  })
});



app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

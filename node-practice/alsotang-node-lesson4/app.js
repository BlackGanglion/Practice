var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cfProblemListUrl = 'http://codeforces.com/problemset/page/1';

superagent.get(cfProblemListUrl)
    .end( function (err, res) {
      if(err){
        return console.error(err);
      }

      var problemUrls = [];
      var $ = cheerio.load(res.text);

      $('.id').find('a').each(function (idex, element) {
        var $element = $(element);
        var href = url.resolve(cfProblemListUrl, $element.attr('href'));
        problemUrls.push(href);
      });

      //console.log(problemUrls);

      var ep = new eventproxy();

      ep.after('cf_problem', problemUrls.length, function (problem) {
        problem = problem.map(function (problemElent) {
          var problemUrl = problemElent[0];
          var problemHtml = problemElent[1];
          var $ = cheerio.load(problemHtml);

          $('.property-title').remove();
          return ({
            title: $('.title').eq(0).text(),
            timeLimit: $('.time-limit').text(),
            memoryLimit: $('.memory-limit').text(),
            description: $('.header').next().html(),
            input: $('.input-specification').html(),
            output: $('.output-specification').html(),
            sample: $('.sample-tests').html(),
            note: $('.note').html()
          });
        });

        console.log(problem);
      });

      problemUrls.forEach(function (problemUrl) {
        superagent.get(problemUrl)
          .end(function (err, res) {
            console.log('fetch ' + problemUrl + ' successful');
            ep.emit('cf_problem', [problemUrl, res.text]);
          });
      });
    })

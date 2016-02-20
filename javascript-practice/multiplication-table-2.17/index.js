var main = document.getElementsByTagName("tbody")[0];
var timeCount = 0;

var run = function(i, j) {
  var target = document.getElementsByTagName("tr")[i - 1];
  var newnode = document.createElement("td");
  newnode.innerHTML = j + ' * ' + i + ' = ' + (i * j);
  target.appendChild(newnode);
}

var back = function(i, j) {
  var target = document.getElementsByTagName("tr")[i - 1];
  var remove = target.getElementsByTagName("td")[j - 1];
  target.removeChild(remove);
  if(j == 1){
    document.removeChild(target);
  }
}

for(var i = 1; i <= 9; i++) {
  (function(i) {
    var newnode = document.createElement("tr");
    main.appendChild(newnode);
    for(var j = 1; j <= i; j++) {
      (function(i, j) {
        setTimeout(function() {
          run(i, j);
        }, timeCount * 200);
        timeCount++;
      })(i, j);
    }
  })(i);
}

for(var i = 9; i >= 1; i--) {
  (function(i) {
    for(var j = i; j >= 1; j--) {
      (function(i, j) {
        setTimeout(function() {
          back(i, j);
        }, timeCount * 200);
        timeCount++;
      })(i, j);
    }
  })(i);
}

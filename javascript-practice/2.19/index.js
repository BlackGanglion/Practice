// 参考 http://sentsin.com/web/112.html

var targetElement = document.querySelectorAll("li");

var liWidth = 113;
var liHeight = 113;

var spacing = 174;
// 0, 1, 2, 3分别代表上, 右, 下, 左，4是指全覆盖
var pos = {
  0: {
    top: -114,
    left: 1
  },
  1: {
    top: 1,
    left: 117
  },
  2: {
    top: 118,
    left: 1
  },
  3: {
    top: 1,
    left: -115
  },
  4: {
    top: 1,
    left: 1
  }
};

function moveElement(elem, final_x, final_y, interval) {
  if(elem.movement){
    clearTimeout(elem.movement);
  }

  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);

  if(xpos == final_x && ypos == final_y){
    return;
  }
  if(xpos < final_x){
    dist = Math.ceil((final_x - xpos) / 10);
    xpos = xpos + dist;
  }
  if(xpos > final_x){
    dist = Math.ceil((xpos - final_x) / 10);
    xpos = xpos - dist;
  }
  if(ypos < final_y){
    dist = Math.ceil((final_y - ypos) / 10);
    ypos = ypos + dist;
  }
  if(ypos > final_y){
    dist = Math.ceil((ypos - final_y) / 10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";

  elem.movement = setTimeout(function(){
    moveElement(elem, final_x, final_y, interval);
  }, interval);
}

/*
简述一下算法思路:
(e.pageX, e.pageY) 是 鼠标进入li的坐标值,
this.offsetLeft是li与左部的距离，
this.offsetTop是li与顶部的距离，

以图片中心为原点，平行于长建立x轴，平行于宽建立y轴
以宽为直径建立圆，将(e.pageX, e.pageY)换算到该坐标系中的圆内，
根据与圆心连线与x轴所成角度判断，鼠标从哪一条边进入

direction的值为“0,1,2,3”分别对应着“上，右，下，左”;
*/
var judgeBorder = function(e, li) {
  var x = (e.pageX - li.offsetLeft - (liWidth / 2)) * (liWidth > liHeight ? (liHeight / liWidth) : 1);
  var y = (e.pageY - li.offsetTop - (liHeight / 2)) * (liHeight > liWidth ? (liWidth / liHeight) : 1);
  var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
  return direction;
}

for(var i = 0; i < targetElement.length; i++) {
  (function(i) {
    targetElement[i].addEventListener('mouseenter', function(e) {
      var borderNumber = judgeBorder(e, this);
      var coverElement = document.getElementsByClassName("cover")[i];
      coverElement.style.left = pos[borderNumber].left + 'px';
      coverElement.style.top = pos[borderNumber].top + 'px';
      moveElement(coverElement, pos[4].left, pos[4].top, 5);
    });

    targetElement[i].addEventListener('mouseleave', function(e) {
      var borderNumber = judgeBorder(e, this);
      var coverElement = document.getElementsByClassName("cover")[i];
      moveElement(coverElement, pos[borderNumber].left, pos[borderNumber].top, 5);
    });
  })(i);
}

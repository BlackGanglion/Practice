/*
* elementID 需要动画的元素ID
* final_x 最终x位置
* final_y 最终y位置
* interval 动画时间
*/
function moveElement(elementID, final_x, final_y, interval) {
  if(!document.getElementById) return false;
  if(!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if(elem.movement){
    clearTimeout(elem.movement);
  }

  if(!elem.style.left){
    elem.style.left = "0px";
  }
  if(!elem.style.right){
    elem.style.right = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);

  if(xpos == final_x && ypos == final_y){
    return true;
  }
  if(xpos < final_x){
    //xpos++;
    dist = Math.ceil((final_x - xpos) / 10);
    xpos = xpos + dist;
  }
  if(xpos > final_x){
    //xpos--;
    dist = Math.ceil((xpos - final_x) / 10);
    xpos = xpos - dist;
  }
  if(ypos < final_y){
    //ypos++;
    dist = Math.ceil((final_y - ypos) / 10);
    ypos = ypos + dist;
  }
  if(ypos > final_y){
    //ypos--;
    dist = Math.ceil((ypos - final_y) / 10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('" + elementID + "'," + final_x + "," +
          final_y + "," + interval + ")";
  elem.movement = setTimeout(repeat, interval);
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}else{
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function prepareSlideShow() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;

  if(!document.getElementById("linklist")) return false;
  if(!document.getElementById("preview")) return false;

  var slideshow = document.createElement("div");
  slideshow.setAttribute("id", "slideshow");
  var preview = document.createElement("img");
  preview.setAttribute("src", "demo.jpg");
  preview.setAttribute("alt", "the demo jpg");
  preview.setAttribute("id", "preview");
  slideshow.appendChild(preview);

  /*
  var preview = document.getElementById("preview");
  preview.style.position = "absolute";
  preview.style.left = "0px";
  preview.style.right = "0px";
  */

  var list = document.getElementById("linklist");
  var links = list.getElementsByTagName("button");

  links[0].onmouseover = function() {
    moveElement("preview", 0, 0, 5);
  }
  links[1].onmouseover = function() {
    moveElement("preview", -300, 0, 5);
  }
  links[2].onmouseover = function() {
    moveElement("preview", -600, 0, 5);
  }
}

addLoadEvent(prepareSlideShow);

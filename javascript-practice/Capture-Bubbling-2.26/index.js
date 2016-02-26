var html = document.documentElement;
var body = document.body;
var div = body.querySelector('div');
var ul = body.querySelector('ul');
var li = body.querySelector('li');
var pause = 200;

function callback(event) {
  var ms = event.timeout = (event.timeout + pause) || 0;
  /*
  currentTarget 事件属性返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口
  target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。
  */
  var target = event.currentTarget;

  // 阻止事件冒泡
  event.stopPropagation();
  console.log('fsdf');

  setTimeout(function() {
    target.classList.add('highlight');
    setTimeout(function() {
      target.classList.remove('highlight');
    }, pause);
  }, ms);
}

// Capture - 捕获阶段
//html.addEventListener('click', callback, true);
//body.addEventListener('click', callback, true);
//div.addEventListener('click', callback, true);
//html.addEventListener('click', callback, true);
ul.addEventListener('click', callback, true);
li.addEventListener('click', callback, true);

// Bubble - 冒泡阶段
html.addEventListener('click', callback, false);
body.addEventListener('click', callback, false);
div.addEventListener('click', callback, false);
html.addEventListener('click', callback, false);
ul.addEventListener('click', callback, false);
li.addEventListener('click', callback, false);

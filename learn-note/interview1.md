## 利用面试题进行总结与查漏补缺

* **Doctype作用？严格模式与混杂模式如何区分？它们有何意义?**

<!DOCTYPE>告知浏览器文档所使用HTML规范，HTML5 <!DOCTYPE HTML> 严格模式的排版和JS运作模式是以该浏览器支持的最高标准运行。在混杂模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现。两种模式下的盒模型width与height存在差异。

* **行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？**

**行内元素**：a、span、br、i、em、strong、label、q、var、cite、code

特点(display: inline)：

1. 和其他元素都在一行上。

2. 元素的高度、宽度及顶部和底部边距不可设置。

3. 元素的宽度就是它包含的文字或图片的宽度，不可改变

**块级元素**：div、p、h1...h6、ol、ul、dl、table、address、blockquote、form

特点(display: block)：

1. 每个块级元素都从新的一行开始，并且其后的元素也另起一行。

2. 元素的高度、宽度、行高以及顶和底边距都可设置。

3. 元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。

**内联块状元素**：<img>、<input>

特点(display: inline-block)
1. 和其他元素都在一行上。
2. 元素的高度、宽度、行高以及顶和底边距都可设置。

**空元素**：br、hr、input、img 在开始标签中关闭的

* **介绍一下CSS的盒子模型？**

![](http://pic002.cnblogs.com/images/2012/287602/2012090115134292.png)


* **link和@import的区别是？**

link是一个html的一个标签，而@import是CSS的一个标签, link除了调用CSS外还可以有其他作用譬如声明页面链接属性，声明目录，rss等等，而@import就只能调用CSS。link引用CSS时，在页面载入时同时加载；@import需要页面完全载入以后加载。

* **CSS选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3新增伪类有那些？**

**CSS选择符** *，#id，.class，element child-element，element > child-element，element:hover，element[href^="http"]

**一般可继承属性**：文字文本属性(font-size font-family color)

**优先级算法**：标签/元素/伪元素的权值为1，类选择符/伪类的权值为10，ID选择符的权值最高为100，行内样式为1000，可以叠加。
!important > id > class > tag

**CSS伪类**：:active :focus :hover :link :visited :first-child :lang

* **如何居中div？如何居中一个浮动元素？**

**居中div**
```
margin: 0 auto;
```

**居中一个浮动元素**
```
float: left;
margin-left: 50%;
position: relative;
left: -250px;
```

* **浏览器的内核分别是什么？**

IE内核 Trident Edge使用Edge内核

Firefox内核 Gecko

Webkit 内核 Safari、Chrome(From Apple)

Opera Presto(已废弃, 与google开发blink)

* **html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？**

1. New Doctype 
<!DOCTYPE>

2. No More Types for Scripts and Links 
<link rel="stylesheet" href="test.css" />


















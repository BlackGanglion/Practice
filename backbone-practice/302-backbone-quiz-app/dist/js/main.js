/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _collection = __webpack_require__(1);

	var _startView = __webpack_require__(3);

	var _aboutView = __webpack_require__(4);

	var _cardView = __webpack_require__(5);

	var _endView = __webpack_require__(6);

	var _data = __webpack_require__(7);

	var cardlist = new _collection.cardList(_data.data);

	var Router = Backbone.Router.extend({
	  routes: {
	    '': 'start',
	    'start': 'start',
	    'about': 'about',
	    'card/:id/:select': 'card',
	    'end/:select': 'end'
	  },
	  initialize: function initialize() {
	    this.startView = new _startView.startView({ model: cardlist.models[0] });
	    this.aboutView = new _aboutView.aboutView({ model: cardlist.models[1] });
	    this.cardView = [];
	    this.endView = [];
	    for (var i = 2; i <= 6; i++) {
	      if (i <= 4) {
	        this.cardView.push(new _cardView.cardView({ model: cardlist.models[i] }));
	      } else {
	        this.endView.push(new _endView.endView({ model: cardlist.models[i] }));
	      }
	    }
	  },
	  start: function start() {
	    this.startView.render();
	  },
	  about: function about() {
	    this.aboutView.render();
	  },
	  card: function card(id, select) {
	    //每当第一个问题时，初始化countSelect
	    if (id === '1') {
	      this.countSelect = 0;
	    }
	    if (select === '1') {
	      this.countSelect++;
	    }
	    this.cardView[id - 1].render();
	  },
	  end: function end(select) {
	    if (select === '1') {
	      this.countSelect++;
	    }
	    //三张牌拥有任意二张就是忠实玩家
	    if (this.countSelect >= 2) {
	      this.endView[0].render();
	    } else {
	      this.endView[1].render();
	    }
	  }
	});

	var router = new Router();
	Backbone.history.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cardList = undefined;

	var _model = __webpack_require__(2);

	var cardList = Backbone.Collection.extend({
	  model: _model.card
	});

	exports.cardList = cardList;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var card = Backbone.Model.extend({
	  defaults: {
	    question: "",
	    imageURL: "",
	    answerA: "",
	    answerB: ""
	  }
	});

	exports.card = card;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var startView = Backbone.View.extend({
	  el: $('#container'),
	  initialize: function initialize() {
	    this.template = _.template($("#start-template").html());
	  },
	  render: function render() {
	    this.$el.html(this.template(this.model.toJSON()));
	  }
	});

	exports.startView = startView;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var aboutView = Backbone.View.extend({
	  el: $('#container'),
	  initialize: function initialize() {
	    this.template = _.template($("#about-template").html());
	  },
	  render: function render() {
	    this.$el.html(this.template(this.model.toJSON()));
	  }
	});

	exports.aboutView = aboutView;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var cardView = Backbone.View.extend({
	  el: $('#container'),
	  initialize: function initialize() {
	    this.template = _.template($("#card-template").html());
	  },
	  render: function render() {
	    this.$el.html(this.template(this.model.toJSON()));
	  }
	});

	exports.cardView = cardView;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var endView = Backbone.View.extend({
	  el: $('#container'),
	  initialize: function initialize() {
	    this.template = _.template($("#end-template").html());
	  },
	  render: function render() {
	    this.$el.html(this.template(this.model.toJSON()));
	  }
	});

	exports.endView = endView;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var data = [{
	  "question": "你是不是炉石传说的铁杆玩家?",
	  "imageURL": "./dist/images/start.png",
	  "answerA": "开始测试",
	  "answerB": "简单介绍",
	  "url1": "#card/1/0",
	  "url2": "#about"
	}, {
	  "question": "炉石简介",
	  "imageURL": "《炉石传说：魔兽英雄传》（Hearthstone: Heroes of Warcraft，简称炉石传说 是暴雪娱乐开发的一款集换式卡牌游戏。中国大陆地区独家运营权已被授予网易公司。《炉石传说：魔兽英雄传》是一款免费游戏，故事背景基于魔兽争霸系列的世界观，玩家可以另行购买卡牌包。游戏将首先在PC与苹果电脑平台发售，已推出iPad版本，并在2015年4月登陆Windows、iPad以及安卓平板。",
	  "answerA": "开始测试",
	  "answerB": "返回首页",
	  "url1": "#card/1/0",
	  "url2": "#start"
	}, {
	  "question": "你拥有这张卡牌嘛?",
	  "imageURL": "./dist/images/card1.png",
	  "answerA": "我拥有!",
	  "answerB": "我没有...",
	  "url1": "#card/2/1",
	  "url2": "#card/2/0"
	}, {
	  "question": "你拥有这张卡牌嘛?",
	  "imageURL": "./dist/images/card2.png",
	  "answerA": "我拥有!",
	  "answerB": "我没有...",
	  "url1": "#card/3/1",
	  "url2": "#card/3/0"
	}, {
	  "question": "你拥有这张卡牌嘛?",
	  "imageURL": "./dist/images/card3.png",
	  "answerA": "我拥有!",
	  "answerB": "我没有...",
	  "url1": "#end/1",
	  "url2": "#end/0"
	}, {
	  "question": "嗯，你是忠实玩家",
	  "imageURL": "./dist/images/success.png",
	  "answerA": "再测一次，我可以更强！",
	  "answerB": "开心地去学前端喽",
	  "url1": "#start",
	  "url2": "http://qianxueseng.com"
	}, {
	  "question": "你还需要努力哟",
	  "imageURL": "./dist/images/fail.png",
	  "answerA": "再测一次, 现在有了!",
	  "answerB": "算了, 还是乖乖学前端吧",
	  "url1": "#start",
	  "url2": "http://qianxueseng.com"
	}];

	exports.data = data;

/***/ }
/******/ ]);
(function(){
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  Promise = function(fn) {
    this.state = PENDING;
    this.value = null;
    this.doResolve(fn, this.resolve.bind(this), this.reject.bind(this));
  }

  Promise.prototype = {
    getFulfill: function(res) {
      this.value = res;
      this.state = FULFILLED;
    },
    getReject: function(err) {
      this.value = err;
      this.state = REJECTED;
    },
    resolve: function(res) {
      try {
  			this.getFulfill(res);
  		} catch(err) {
  			this.getReject(err);
  		}
    },
    reject: function(err) {
      this.getReject(err);
    },
    then: function(fulfilled, rejected) {
  		var self = this;
  		return new Promise(function(resolve, reject) {
        // res为defer中的this.value，即上一个Promise的value值
  			return self.done(function(res) {
          try {
            return resolve(fulfilled(res));
  				} catch(err) {
            return reject(err);
          }
        }, function(err) {
          try {
            return resolve(rejected(err));
          } catch(err) {
            return reject(err);
          }
  			});
  		});
  	},
    done: function(fulfilled, rejected) {
      var self = this;
  		// 异步保证
  		setTimeout(function() {
  			self.defer({
  				fulfilled: fulfilled,
  				rejected: rejected
  			});
  		}, 0);
    },
    defer: function(item) {
      if (this.state === FULFILLED && typeof item.fulfilled === 'function') {
  				item.fulfilled(this.value);
      }
      if (this.state === REJECTED && typeof item.rejected === 'function') {
  				item.rejected(this.value);
      }
    },
    doResolve: function(fn, fulfilled, rejected) {
   	 try {
   		 fn(function(value) {
   			 fulfilled(value);
   		 }, function(err) {
   			 rejected(err);
   		 });
   	 } catch(err) {
   		 rejected(err);
   	 }
    }
  }

})();


var t = new Promise(function(resolve, reject){
  console.log('1');
  resolve('2');
}).then(function(value){
  console.log(value);
  return '4';
}, function(error){
  console.log(error);
}).then(function(value){
  console.log(value);
}, function(error){
  console.log(error);
})

console.log('3');

var f = new Promise(function(resolve, reject){
  console.log('5');
  resolve('6');
}).then(function(value){
  console.log(value);
  return '7';
}, function(error){
  console.log(error);
}).then(function(value){
  console.log(value);
}, function(error){
  console.log(error);
})

console.log('8');

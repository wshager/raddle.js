define(function (require) {
	var registerSuite = require('intern!object'),
		assert = require('intern/chai!assert'),
		parseQuery = require('../parser').parseQuery,
		Transpiler = require('../transpiler').Transpiler;
	var test = {
		name: 'raddle/test/transpiling'
	};
	function add(key,cb){
		test[key] = function(){
			var dfd = this.async(5000);
			var transpiler = new Transpiler();
			var ready = dfd.callback(cb);
			transpiler.process(key,function(error,fn){
				if(error) throw error;
				console.log(fn.toString());
				ready(error,fn);
			});
			return dfd;
		};
	}
	add("use(core/string-regex-functions,core/aggregate-functions),define(depth,(string,number),(),(tokenize(/),count())),depth()",function(error,fn){
		var path = "";
		for(var i=0;i<10000;i++){
			path += "/" + Math.random().toString(36).substring(7);
		}
		assert.equal(fn(path),10001);
	});
	add("use(core/numeric-arithmetic-operators),define(add2,(number,number),(number,number),(add(?),add(?))),add2(2,3)",function (error, fn) {
		assert.equal(fn(1),6,'Addition operator should add numbers together');
	});
	add("use(core/numeric-arithmetic-operators,core/higher-order-functions),define(sum,(any*,any*),(),fold-left(add#1,0)),sum()",function (error, fn) {
		var arr = [];
		for(var i=0;i<10000;i++){
			arr.push(i);
		}
		assert.equal(fn(arr),49995000);
	});
	registerSuite(test);
});

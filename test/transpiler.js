define(function (require) {
	var registerSuite = require('intern!object'),
		assert = require('intern/chai!assert'),
		//Query = require('../query').Query,
		parseQuery = require('../parser').parseQuery,
		Transpiler = require('../transpiler').Transpiler,
		JSON = require('intern/dojo/json');
	var test = {
		name: 'raddle/test/transpiling'
	};
	function add(key,cb){
		test[key] = function(){
			var dfd = this.async(5000);
			var transpiler = new Transpiler();
			var ready = dfd.callback(cb);
			transpiler.process(key,function(err,fn){
				ready(err,fn);
			});
			return dfd;
		};
	}
	add("use(core/string-regex-functions,core/aggregate-functions),define(depth,(string,number),(),(tokenize(/),count())),depth()",function(error,fn){
		if(error) throw error;
		assert.equal(fn("/a/b/c"),4);
	});
	add("use(core/numeric-arithmetic-operators),define(add2,(number,number),(number,number),(add(?),add(?))),add2(2,3)",function (error, fn) {
		if (error) {
			throw error;
		}
		assert.equal(fn(1),6,'Addition operator should add numbers together');
		console.log( ' ended');
	});
	add("use(core/numeric-arithmetic-operators,core/higher-order-functions),define(sum,(any*,any*),(),fold-left(add,0)),sum()",function (error, fn) {
		if (error) {
			throw error;
		}
		assert.equal(fn([1,2,3]),6);
	});
	registerSuite(test);
});

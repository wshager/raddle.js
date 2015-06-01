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
		var val = "";
		for(var i=0;i<10;i++){
			val += "/" + Math.random().toString(36).substring(7);
		}
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.equal(ret,11);
	});
	add("use(core/numeric-arithmetic-operators),define(add2,(number,number),(number,number),(add(?),add(?))),add2(2,3)",function (error, fn) {
		var val = 1;
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.equal(ret,6,'Addition operator should add numbers together');
	});
	add("use(core/numeric-arithmetic-operators,core/higher-order-functions),define(sum,(any*,any*),(),fold-left(add#1,0)),sum()",function (error, fn) {
		var val = [];
		for(var i=0;i<10;i++){
			val.push(i);
		}
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.equal(ret,45);
	});
	add("use(core/numeric-arithmetic-operators,core/numeric-comparison-operators,core/higher-order-functions),unfold((add(1)),(greater-than(10)))",function (error, fn) {
		var val = 1;
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.deepEqual(ret,[1,2,3,4,5,6,7,8,9,10]);
	});
	add("use(core/numeric-arithmetic-operators,core/numeric-comparison-operators,core/higher-order-functions,core/list-functions,core/string-value-functions),define(appender,(any*,any*),(?,?),map-transform(?,(append(?)))),unfold4((tail()),(empty()),(head()),(head(),string-length()),appender#2)",function (error, fn) {
		var val = ["sdf","d","we","eq","w"];
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.deepEqual(ret,{1:["d","w"],2:["we","eq"],3:["sdf"]});
	});
	registerSuite(test);
});

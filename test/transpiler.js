define(function (require) {
	var registerSuite = require('intern!object'),
		assert = require('intern/chai!assert'),
		//Query = require('../query').Query,
		parseQuery = require('../parser').parseQuery,
		Transpiler = require('../transpiler').Transpiler,
		JSON = require('intern/dojo/json');
	registerSuite({
		name: 'rql/test/transpiling',
		"use(core/numeric-arithmetic-operators),define(add2,(number,number),(number,number),(add(?),add(?))),add2(2,3)": function () {
			var dfd = this.async(1000);
			var transpiler = new Transpiler();
			var ready = dfd.callback(function (error, fn) {
		          if (error) {
		            throw error;
		          }
		          assert.equal(fn(1),6,'Addition operator should add numbers together');
			});
			//var def = transpiler.process("define(depth,(string,number),(),(tokenize(/),count()))");
			transpiler.process("use(core/numeric-arithmetic-operators),define(add2,(number,number),(number,number),(add(?),add(?))),add2(2,3)",function(err,fn){
				ready(err,fn);
			});
			return dfd;
		}
	});
});

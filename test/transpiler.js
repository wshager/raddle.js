define(function (require) {
	var test = require('intern!object'),
		assert = require('intern/chai!assert'),
		//Query = require('../query').Query,
		parseQuery = require('../parser').parseQuery,
		Transpiler = require('../transpiler').Transpiler,
		JSON = require('intern/dojo/json');
	test({
		name: 'rql/test/transpiling',
		testTranspiling: function () {
			var transpiler = new Transpiler();
			transpiler.use({name:"use",args:["core/numeric-arithmetic-operators"]},{callback:function(){
				//var def = transpiler.process("define(depth,(string,number),(),(tokenize(/),count()))");
				var def = transpiler.process("define(add2,(any*,number),(number),add(2,?))");
				var fn = def.body;
				console.warn(fn.toString())
			}});
		}
	});
});

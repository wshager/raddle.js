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
			transpiler.use({name:"use",args:["core/aggregate-functions","core/string-regex-functions"]},{callback:function(){
				var def = transpiler.process("define(depth,(string,number),(),(tokenize(/),count()))");
				var fn = def.body;
				var stack = ["/a/v/b"];
				fn(stack,transpiler.typeCheck)
				console.warn(stack)
			}});
		}
	});
});

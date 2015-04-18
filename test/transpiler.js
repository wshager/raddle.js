define(function (require) {
	var test = require('intern!object'),
		assert = require('intern/chai!assert'),
		Query = require('../query').Query,
		parseQuery = require('../parser').parseQuery,
		Transpiler = require('../transpiler').Transpiler,
		JSON = require('intern/dojo/json');
	
	test({
		name: 'rql/test/transpiling',

		testTranspiling: function () {
			var transpiler = new Transpiler();
			transpiler.use({name:"use",args:["core"]});
		}
	});
});

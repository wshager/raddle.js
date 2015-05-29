define(function (require) {
	var test = require('intern!object'),
		assert = require('intern/chai!assert'),
		parseQuery = require('../parser').parseQuery,
		queryPairs = {
			define: {
				'define(test,(number,number),number)': { name: 'define', args: ['test', [ 'number', 'number' ], 'number' ]},
				'define(group-by,(any*,map),(function),fold-right(map-merge(?,(map-get(?),ifnull(append(list-new()),append)))))':
					{name:'define', args:['group-by',['any*','map'],['function'],{name:'fold-right',args:[{"name":"map-merge","args":["?",[{"name":"map-get","args":["?"]},{"name":"ifnull","args":[{"name":"append","args":[{"name":"list-new","args":[]}]},"append"]}]]}]}]},
			},
			use: {
				'use(http://test.org/test/bla.rql,/local/foo.rql)': { name: 'use', args: ['http://test.org/test/bla.rql', '/local/foo.rql' ]}
			},
			and:{
				'and(eq(a,b))': { name: 'and', args: [{ name: 'eq', args: ['a', 'b' ]}]}
			}
		},
		testParsing = (function () {
			var tests = {},
				test,
				group,
				pairs,
				key;

			for (group in queryPairs) {
				tests[ group ] = test = {};
				pairs = queryPairs [ group ];
				for (key in pairs) {
					// Wrap the test function in another function call so
					// that the keys and pairs objects are correctly bound
					var f = function (k, p) {
						return function () {
							// skip tests which don't have an expected value
							if (!p[ k ]) {
								return this.skip();
							}

							var actual = parseQuery(k),
								expected = p[ k ];

							if (!hasKeys(actual.cache)) {
								delete actual.cache;
							}

							if (typeof expected === 'string') {
								expected = parseQuery(expected);
							}

							if (!hasKeys(expected.cache)) {
								delete expected.cache;
							}

							// someone decided that matching constructors is necessary for deep equality
							// see https://github.com/theintern/intern/issues/284
							// the deepEqual assertion also fails due to properties like toString so this assertion seems to
							// be the most suitable.
							assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected));
						};
					};
					test[ key ] = f(key, pairs);
				}
			}
			return tests;
		})();

	function hasKeys(it) {
		var key;

		if (it == null || typeof it !== 'object') {
			return false;
		}

		for (key in it) {
			if (it.hasOwnProperty(key)) {
				return true;
			}
		}
		return false;
	}

	test({
		name: 'raddle/test/parsing',

		testParsing: testParsing
	});
});

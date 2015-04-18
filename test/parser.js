define(function (require) {
	var test = require('intern!object'),
		assert = require('intern/chai!assert'),
		Query = require('../query').Query,
		parseQuery = require('../parser').parseQuery,
		JSON = require('intern/dojo/json'),
		supportsDateString = !isNaN(new Date('2009')),
		queryPairs = {
			define: {
				'define(test,(number,number),number)': { name: 'and', args: [{ name: 'define', args: ['test', [ 'number', 'number' ], 'number' ]}]}
			},
			use: {
				'use(http://test.org/test/bla.rql,/local/foo.rql)': { name: 'and', args: [{ name: 'use', args: ['http://test.org/test/bla.rql', '/local/foo.rql' ]}]}
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
		name: 'rql/test/parsing',

		testParsing: testParsing
	});
});

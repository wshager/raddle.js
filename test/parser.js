define(function (require) {
	var test = require('intern!object'),
		assert = require('intern/chai!assert'),
		Query = require('../query').Query,
		parseQuery = require('../parser').parseQuery,
		JSON = require('intern/dojo/json'),
		supportsDateString = !isNaN(new Date('2009')),
		queryPairs = {
			arrays: {
				a: { name: 'and', args: [ 'a' ]},
				'(a)': { name: 'and', args: [[ 'a' ]]},
				'a,b,c': { name: 'and', args: [ 'a', 'b', 'c' ]},
				'(a,b,c)': { name: 'and', args: [[ 'a', 'b', 'c']]},
				'a(b)': { name: 'and', args: [{ name: 'a', args: [ 'b' ]}]},
				'a(b,c)': { name: 'and', args: [{ name: 'a', args: [ 'b', 'c' ]}]},
				'a((b),c)': { name: 'and', args: [{ name: 'a', args: [ [ 'b' ], 'c' ]}]},
				'a((b,c),d)': { name: 'and', args: [{ name: 'a', args: [ [ 'b', 'c' ], 'd' ]}]},
				'a(b/c,d)': { name: 'and', args: [{ name: 'a', args: [ [ 'b', 'c' ], 'd' ]}]},
				'a(b)&c(d(e))': { name: 'and', args:[
					{ name: 'a', args: [ 'b' ]},
					{ name: 'c', args: [ { name: 'd', args: [ 'e' ]} ]}
				]}
			},
			'complex coercion': {
				'(a=b|c=d)&(e=f|g=1)': { name: 'and', args: [
					{ name: 'or', args: [{ name: 'eq', args: [ 'a', 'b' ]}, { name: 'eq', args: [ 'c', 'd' ]}]},
					{ name: 'or', args: [{ name: 'eq', args: [ 'e', 'f' ]}, { name: 'eq', args: [ 'g', 1 ]}]}
				]}
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

		testBehavior: function () {
			//assert.error(parseQuery(), "parseQuery requires a string");
			assert.ok(parseQuery('') instanceof Query, 'should inherit from Query');
			assert.ok(parseQuery('a=b') instanceof Query, 'should inherit from Query');
			//assert.error(parseQuery('?a=b'), 'cannot begin with a ?');
		},

		testParsing: testParsing,

		testBindParameters: function () {
			// TODO
			var parsed;
			parsed = parseQuery('in(id,$1)', [['a','b','c']]);
			assert.strictEqual(JSON.stringify(parsed), JSON.stringify({
				name: 'and',
				args: [{ name: 'in', args: [ 'id', [ 'a', 'b', 'c' ]]}],
				cache: {}
			}));
			parsed = parseQuery('eq(id,$1)', [ 'a' ]);
			assert.deepEqual(JSON.stringify(parsed), JSON.stringify({
				name: 'and',
				args: [{ name: 'eq', args: ['id', 'a']}],
				cache: {id: 'a'}
			}));
		},

		testStringification: function () {
			// TODO
			var parsed;
			parsed = parseQuery('eq(id1,RE:%5Eabc%5C%2F)');
			// Hmmm. deepEqual gives null for regexps?
			assert.ok(parsed.args[0].args[1].toString() === /^abc\//.toString());
			//assert.deepEqual(parsed, {name: 'and', args: [{name: 'eq', args: ['id1', /^abc\//]}]});
			assert.ok(new Query().eq('_1',/GGG(EE|FF)/i) + '' === 'eq(_1,re:GGG%28EE%7CFF%29)');
			parsed = parseQuery('eq(_1,re:GGG%28EE%7CFF%29)');
			console.log(parsed.args[0].args[1].toString() === /GGG(EE|FF)/i.toString());
			//assert.ok(Query().eq('_1',/GGG(EE|FF)/)+'' === 'eq(_1,RE:GGG%28EE%7CFF%29)');
			// string to array and back
			var str = 'somefunc(and(1),(a,b),(10,(10,1)),(a,b.c))';
			assert.equal(parseQuery(str) + '', str);
			// quirky arguments
			var name = ['a/b','c.d'];
			assert.equal(parseQuery(new Query().eq(name,1) + '') + '', 'eq((a%2Fb,c.d),1)');
			assert.deepEqual(parseQuery(new Query().eq(name,1) + '').args[0].args[0], name);
		}
	});
});

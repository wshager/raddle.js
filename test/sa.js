	var Query = require('../query').Query,
		executeQuery = require('../js-array').executeQuery;

	var data = [
		{
			'with/slash': 'slashed',
			nested: {
				property: 'value'
			},
			price: 10,
			name: 'ten',
			tags: [ 'fun', 'even' ]
		},
		{
			price: 5,
			name: 'five',
			tags: [ 'fun' ]
		}
	];

	console.log(executeQuery('excludes(tags,ne(even))', {}, data));
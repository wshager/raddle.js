define(function (require) {
	var registerSuite = require('intern!object'),
		assert = require('intern/chai!assert'),
		parseQuery = require('../parser').parseQuery,
		Transpiler = require('../transpiler').Transpiler;
	var test = {
		name: 'raddle/test/transpiling'
	};
	var transpiler = new Transpiler();
	function add(key,cb){
		test[key] = function(){
			var dfd = this.async(5000);
			var ready = dfd.callback(cb);
			transpiler.process(key,{
				moduleTextPrefix:"intern/dojo/text!"
			},
			function(error,fn){
				if(error) throw error;
				console.log(fn.toString());
				ready(error,fn);
			});
			return dfd;
		};
	}
	/*add("use(core/string-value-functions),define(get,(string),string,core:concat(file:///,$1,/xml/refs/,$1,.refs.xml)),local:get(.)",function(error,fn){
		var val = "t";
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.equal(ret,"file:///t/xml/refs/t.refs.xml");
	});
	add("use(core/string-regex-functions,core/aggregate-functions),define(depth,(string),number,(tokenize($1,/),count(.))),local:depth(.)",function(error,fn){
		var val = "";
		for(var i=0;i<10;i++){
			val += "/" + Math.random().toString(36).substring(7);
		}
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.equal(ret,11);
	});
	add("use(op/numeric-arithmetic-operators),define(add2,(number,number,number),number,(op:add($1,$2),op:add(.,$3))),local:add2(.,2,3)",function (error, fn) {
		var val = 1;
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.equal(ret,6,'Addition operator should add numbers together');
	});
	add("use(op/numeric-arithmetic-operators,core/higher-order-functions),define(sum,(any*),number,fold-left($1,0,op:add#2)),local:sum(.)",function (error, fn) {
		var val = [];
		for(var i=0;i<10;i++){
			val.push(i);
		}
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.equal(ret,45);
	});*/
	add("use(op/numeric-arithmetic-operators,op/numeric-comparison-operators,hof/unfold-functions),hof:unfold(.,(op:add(.,1)),(op:greater-than(.,10)))",function (error, fn) {
		var val = 1;
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.deepEqual(ret,[1,2,3,4,5,6,7,8,9,10]);
	});
	/*add("use(core/numeric-arithmetic-operators,core/numeric-comparison-operators,core/higher-order-functions,core/list-functions,core/map-functions,core/string-value-functions),define(appender,(map,any,(any*)),map,map-transform(.,?,(append(.,?)))),unfold(.,(tail(.)),(empty(.)),(head(.)),local:appender#3,(head(.),string-length(.)),map-new())",function (error, fn) {
		var val = ["sdf","d","we","eq","w"];
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.deepEqual(ret,{1:["d","w"],2:["we","eq"],3:["sdf"]});
	});
	add("use(dom/dom-functions),dom:by-id(test)",function (error, fn) {
		var node = document.createElement("div");
		node.id = "test";
		document.body.appendChild(node);
		var val = "";
		var ret = fn(val);
		console.warn(val,"=>",ret);
		assert.deepEqual(ret,node);
	});
	add("use(dom/dom-functions),core:create(?)",function (error, fn) {
		var val = "div";
		var ret = fn(val);
		console.warn(val,"=>",ret);
	});
	*/
	registerSuite(test);
});

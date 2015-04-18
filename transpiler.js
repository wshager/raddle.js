({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports, require("./parser"), require("./query"), require("./util/each"), require("./util/contains"));}}).
define(["exports", "./parser", "./query", "./util/each", "./util/contains"], function(exports, parser, QUERY, each, contains){
	
	function Transpiler(){
	}
	
	Transpiler.prototype.use = function(value){
		var reqs = value.args.map(function(_){
			return "intern/dojo/text!/rqld/"+_+".rql";
		});
		var self = this;
		require(reqs,function(){
			var deps = Array.slice(arguments);
			deps.forEach(function(dep){
				var parsed = parser.parse(dep);
				if(parsed.args.length) self.process(parsed);
			});
		})
	};
	
	Transpiler.prototype.conj = function(value){
		
	};
	Transpiler.prototype.process = function(value){
		value.args.forEach(function(arg){
			if(arg.name=="and" || arg.name=="or"){
				this.process(arg);
			} else if(arg.name=="use"){
				this.use(arg);
			} else if(arg.name=="define"){
				this.define(arg);
			} else {
				// fall thru
			}
		},this);		
	};
	Transpiler.prototype.define = function(){
		
	};
	exports.Transpiler = Transpiler;

	return exports;
});
({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports, require("./parser"), require("./util/each"), require("./util/contains"));}}).
define(["exports", "./parser", "./util/each", "./util/contains"], function(exports, parser, each, contains){
	
	function Transpiler(execute){
		this.dict = {};
		this.lib = {};
	}
	
	function stringify(args){
		var str = JSON.stringify(args);
		return str.length>2 ? ","+str.substring(1,str.length-1) : "";
	}
	
	Transpiler.prototype.use = function(value,params){
		// TODO filter and separate core definitions
		var core = value.args;
		var reqs = core.map(function(_){
			return "intern/dojo/text!/rqld/"+_+".rql";
		});
		var self = this;
		require(core,function(){
			var libs = Array.prototype.slice.call(arguments);
			libs.forEach(function(lib,i){
				self.lib[core[i]] = lib;
			});
			require(reqs,function(){
				var deps = Array.prototype.slice.call(arguments);
				deps.forEach(function(dep,i){
					var parsed = parser.parse(dep);
					if(parsed.args.length) self.process(parsed,{use:core[i]});
				});
				if(params.callback) params.callback();
			});
		});
	};
	
	Transpiler.prototype.process = function(value,params){
		if(typeof value == "string") value = parser.parse(value);
		if(value.name=="use"){
			this.use(value,params);
		} else if(value.name=="define"){
			return this.define(value,params);
		} else if(value.name=="" && value.args) {
			return value.args.map(function(arg){
				return this.process(arg,params,value);
			},this);
		} else {
			return this.compile(value,value.name);
		}
	};
	
	Transpiler.prototype.typeCheck = function(stack,type){
		var l = stack.length;
		var last = stack[l-1];
		console.warn("last",last,type)
	};
	
	Transpiler.prototype.coerce = function(value,type){
		// should we infer and check?
		if (type === 'string') {
			value = value ? '' + value : '';
		} else if (type === 'number') {
			value = +value;
		} else if (type === 'boolean') {
			value = !!value;
		} else if (type === 'array') {
			if(!(value instanceof Array)) value = new Array();
		} else if (type === 'object') {
			if(!(value instanceof Object)) value = new Object();
		} else if (typeof type === 'function' && !(value instanceof type)) {
			value = new type(value);
		}
		return value;
	};
	
	Transpiler.prototype.compile = function(value,name,funs,args){
		// TODO compose to single,stackless function
		// compose
		var self = this;
		var def;
		if(value instanceof Array){
			var arity = args.length;
			var fn = "";
			var map = function(a){
				var f = self.compile(value.shift());
				a.unshift(f[0]);
				a.push(f[1]);
				if(value.length) {
					return map(a);
				} else {
					return a;
				}
			}
			var a = map(["x"]);
			return new Function("return function "+name+"(x){ return "+a.join("")+";}")();
		}
		def = this.dict[value.name];
		if(!def) throw new Error("Definition for "+value.name+" not in dictionary");
		var __f = def.body;
		var __i = def.funs[0];
		var __o = def.funs[1];
		var __t = this.typeCheck;
		var args = value.args;
		// static type checks
		if(args){
			if(!def.args || args.length!=def.args.length){
				throw new Error("Argument length incorrect");
			}
			args = args.map(function(arg,i){
				return this.coerce(arg,def.args[i]);
			},this);
		} else if(def.args) {
			throw new Error("No arguments supplied");
		}
		return ["("+__f.toString()+").call(this,",stringify(args)+")"];
	};
	
	Transpiler.prototype.define = function(value,params){
		var l = value.args.length;
		var name = value.args[0];
		var funs = [], args = [];
		var body,def;
		if(l==2){
			// lookup
			def = this.dict[value.args[1]];
			if(!def) throw new Error("Unknown reference in definition "+name);
			funs = def.funs;
			args = def.args;
			body = def.body;
		} else if(l==3 || l==4){
			// core
			funs = value.args[1];
			args = value.args[2];
			if(l==4){
				// compile definition
				body = this.compile(value.args[3],name,funs,args);
			} else {
				// known definition
				if(params.use) body = this.lib[params.use][name];
			}
		}
		def = {
			funs:funs,
			args:args,
			body:body
		};
		this.dict[name] = def;
		return def;
	};
	exports.Transpiler = Transpiler;

	return exports;
});
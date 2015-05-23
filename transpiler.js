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
			return "intern/dojo/text!/rqld/"+_+".rad";
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
			return this.compile(value);
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
	
	Transpiler.prototype.type = function(t){
		// 0: null
		// 1: number
		// 2: string
		// 3: boolean
		// 4: map
		// 5: any
		// 6: number*
		// 7: string*
		// 8: boolean*
		// 9: map*
		// 10: any*
		var ts = ["number","string","boolean","map","any"];
		if(t.match(/\*/)){
			t = t.replace(/\*/,"");
			return ts.indexOf(t)+6;
		}
		return ts.indexOf(t)+1;
	};
	
	Transpiler.prototype.matchTypes = function(i,o){
		var ti = this.type(i);
		var to = this.type(o);
		console.warn(i,ti,"->",o,to);
		if(ti==to) return true;
		if(ti>0&&ti<5 && to==5) return true;
		if(to>0&&to<5 && ti==5) return true;
		if(ti>5&&ti<10 && to==10) return true;
		if(to>5&&to<10 && ti==10) return true;
		return false;
	};
	
	Transpiler.prototype.compile = function(value,parent){
		// TODO compile literals like ?
		var self = this;
		if(parent){
			var name = parent.name;
			var args = parent.args;
			var sigs = parent.sigs;
			var a = [];
			var arity = args.length;
			for(var i=0;i<=arity;i++){
				a.push("arg"+i);
			}
			// this means the function was called from "define"
			if(value instanceof Array){
				// compose the functions in the array
				var map = function(a,i,o){
					var v = value.shift();
					var f = self.compile(v);
					var def = self.dict[v.name];
					if(!self.matchTypes(i,def.sigs[0])){
						throw new Error("Type signatures do not match: "+i+"->"+def.sigs[0]);
					}
					a.unshift(f[0]);
					a.push(f[1]);
					if(value.length) {
						return map(a,def.sigs[1],o);
					} else {
						if(!self.matchTypes(o,def.sigs[1])){
							throw new Error("Type signatures do not match: "+o+"->"+def.sigs[1]);
						}
						return a;
					}
				}
				var f = map([a.join(",")],sigs[0],sigs[1]);
				return new Function("return function "+name+"("+a.join(",")+"){ return "+f.join("")+";}")();
			} else {
				var f = self.compile(value);
				var def = self.dict[value.name];
				console.warn(f,def)
			}
		}
		var def = this.dict[value.name];
		if(!def) throw new Error("Definition for "+value.name+" not in dictionary");
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
		return ["("+def.body.toString()+").call(this,",stringify(args)+")"];
	};
	
	Transpiler.prototype.define = function(value,params){
		var l = value.args.length;
		var name = value.args[0];
		var sigs = [], args = [];
		var body,def;
		if(l==2){
			// lookup
			def = this.dict[value.args[1]];
			if(!def) throw new Error("Unknown reference in definition "+name);
			sigs = def.sigs;
			args = def.args;
			body = def.body;
		} else if(l==3 || l==4){
			// core
			sigs = value.args[1];
			args = value.args[2];
			if(l==4){
				body = value.args[3];
			} else {
				// known definition
				if(params.use) body = this.lib[params.use][name];
			}
		}
		def = {
			name:name,
			sigs:sigs,
			args:args,
			body:body
		};
		if(l==4) {
			// compile definition
			def.body = this.compile(body,def);
		}
		this.dict[name] = def;
		return def;
	};
	exports.Transpiler = Transpiler;

	return exports;
});
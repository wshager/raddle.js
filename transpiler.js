"use strict";

({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports, require("./parser"));}}).
define(["exports", "./parser"], function(exports, parser){
	
	function short(qname){
		var n = qname.split(":");
		return (n[0]+n[1].charAt(0).toUpperCase()+n[1].substr(1)).replace(/#|-/g,"");
	}
	
	function Transpiler(execute){
		this.dict = {};
		this.lib = {};
		this.cache = [];
		this.count = 0;
	}
	
	Transpiler.prototype.use = function(value,params,callback){
		// TODO filter and separate core definitions
		var core = value.args;
		var reqs = core.map(function(_){
			return "intern/dojo/text!/raddled/"+_+".rdl";
		});
		var self = this;
		require(core.map(function(_){ return _ }),function(){
			var libs = Array.prototype.slice.call(arguments);
			libs.forEach(function(lib,i){
				var nslib = {};
				for(var k in lib){
					nslib[core[i].split("/")[0]+":"+k] = lib[k];
				} 
				self.lib[core[i]] = nslib;
			});
			require(reqs,function(){
				var deps = Array.prototype.slice.call(arguments);
				deps.forEach(function(dep,i){
					var parsed = parser.parse(dep);
					if(parsed.args.length) self.process(parsed,{use:core[i]},callback);
				});
				if(callback) callback();
			});
		});
	};
	
	Transpiler.prototype.transpile = function(value,params){
		this.cache = [];
		var ret = this.process(value,params).filter(function(_){
			return !!_;
		}).pop();
		if(params.callback) {
			
		}
		return ret;
	};
	
	Transpiler.prototype.process = function(value,params,callback){
		var args = Array.prototype.slice.call(arguments);
		var value = args.shift();
		var params = args.length>1 && typeof args[0]!="function" ? args.shift() : {};
		var callback = args.shift();
		if(typeof value == "string") value = parser.parse(value);
		if(value.name=="use"){
			this.use(value,params,callback);
		} else if(value.name=="define"){
			this.define(value,params);
		} else if(value.name=="" && value.args) {
			var self=this,use,define=[],args=[];
			value.args.forEach(function(arg){
				if(arg.name=="use") {
					use = arg;
				} else if(arg.name=="define"){
					define.push(arg);
				} else {
					args.push(arg);
				}
			});
			var cb = !params.use && !!callback ? callback : function(){};
			callback = function(){
				define.forEach(function(arg){
					self.define(arg,params);
				});
				var ret = args.map(function(arg){
					return self.process(arg,params,callback);
				}).pop();
				// always return a function
				if(!ret) ret = function anon0() {};
				cb(null,ret);
			};
			use ? this.use(use,params,callback) : callback();
		} else {
			value.top = true;
			return this.compile(value);
		}
	};
	
	function typeOf(o) {
		return o === undefined ? "undefined" : o === null ? "null" : o.constructor.name.toLowerCase();
	}
	
	Transpiler.prototype.typeCheck = function(value,type){
		// TODO check occurrence and function arity+types
		var t = typeOf(type) == "array" ? "function" : type.replace(/\?|\+|\*|-/,"");
		return typeOf(value)==t || t=="any";
	};
	
	var autoConverted = {
		"true": true,
		"false": false,
		"null": null,
		"undefined": undefined,
		"Infinity": Infinity,
		"-Infinity": -Infinity
	};

	Transpiler.prototype.convert = function(string){
		if(autoConverted.hasOwnProperty(string)){
			return autoConverted[string];
		}
		var number = +string;
		if(isNaN(number) || number.toString() !== string){
          /*var isoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/.exec(x);
          if (isoDate) {
            date = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3], +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));
          }*/
			string = decodeURIComponent(string);
			if(exports.jsonQueryCompatible){
				if(string.charAt(0) == "'" && string.charAt(string.length-1) == "'"){
					return JSON.parse('"' + string.substring(1,string.length-1) + '"');
				}
			}
			return string;
		}
		return number;
	};
	
	Transpiler.prototype.coerce = function(value,type){
		// should we infer and check?
		if (type === 'string') {
			value = value ? '' + value : '';
		} else if (type === 'number') {
			value = +value;
		} else if (type === 'boolean') {
			value = !!value;
//		} else if (type === 'array') {
//			if(!(value instanceof Array)) value = new Array();
//		} else if (type === 'object') {
//			if(!(value instanceof Object)) value = new Object();
		} else if (type instanceof Array) {
			var def = this.dict[value];
			value = this.lib[def.module][value];
		}
		return value;
	};
	
	Transpiler.prototype.type = function(t){
		var ts = ["null","number","string","boolean","node","map","function","any"];
		// return tuple: [type,cardinality] 
		var rt = new Array(2);
		var card = -1;
		var type = 0;
		// TODO ?
		var re = /(\*)|(\+)|(\-)/;
		var gr = t.match(re);
		if(gr) {
			var i=0,l=gr.length;
			for(;i<l;i++){
				if(gr[i+1]) break;
			}
			card = i;
		}
		type = ts.indexOf(t.replace(re,""));
		return [type,card];
	};
	
	Transpiler.prototype.matchTypes = function(i,o){
		var ti = this.type(i);
		var to = this.type(o);
		//console.warn(i,ti,"->",o,to);
		// cardinality checks:
		// string->string* -1->0 => allow
		// string*->string 0->-1 => deny
		// string->string+ -1->1 => deny
		// string*->string+ 0->1 => allow (runtime check)
		// string->any 2->7 => allow
		// any->string 7->2 => allow (infer+check @ runtime)
		var d = to[1]-ti[1];
		return (ti[0]==to[0] || to[0]==7 || ti[0]==7) && d>=0 && d<=1;
	};
	
	Transpiler.prototype.compile = function(value,parent,pa){
		// TODO compile literals like ?
		var self = this;
		var top = false;
		// always compose
		if(typeOf(value)!="array") {
			top = value.top;
			value = [value];
		}
		if(top) this.count = 0;
		var name,type,args=[];
		if(parent){
			// called from define, so compile to a definition body
			name = parent.name;
			args = parent.args;
			type = parent.type;
		} else {
			name = "anon"+this.count;
			this.count++;
		}
		// if there are unknown args, take them from the definition
		var a = [];
		var arity = args.length;
		for(var i=1;i<arity;i++){
			a.push("arg"+i);
		}
		var fa = a.slice(0);
		fa.unshift("arg0");
		// compose the functions in the array
		var f = value.map(function(v){
			var acc = [];
			//var v = value.shift();
			var arity = v.args.length;
			var name = v.name;
			var qname = (name.indexOf(":")>-1 ? name : "core:"+name)+"#"+arity;
			/*var def = this.dict[qname];
			if(!def) {
				throw new Error("Definition for "+qname+" not in dictionary");
			}*/
			/*if(i && !this.matchTypes(i,def.sigs[0])){
				throw new Error("Type signatures do not match: "+i+"->"+def.sigs[0]);
			}*/
			acc.push(short(qname));
			// TODO static arg type checks
			/*if(v.args){
				if(!def.args || v.args.length!=def.args.length){
					throw new Error("Argument length incorrect");
				}
			} else if(def.args) {
				throw new Error("No arguments supplied");
			}*/
			// accumulate def hashes per run
			if(this.cache.indexOf(qname)==-1) this.cache.push(qname);
			// replace ? args in order
			args = v.args.map(function(_,i){
				var type = typeOf(_);
				if(_==".") {
					return ".";
				} else if(_=="?") {
					if(parent && a.length){
						return a.shift();
					} else if(pa.length){
						return pa.shift();
					} else {
						throw new Error("No arguments found to replace ?");
					}
				} else if(type == "array" || type == "query"){
					// compile to function
					return this.compile(_,null,a).toString();
				} else {
					//var t = def.args[i];
					var r = this.convert(_);
					if(typeof r=="string" && r.match(/^.+#[0-9]+$/)){
						var qname = (r.indexOf(":")>-1 ? r : "core:"+r);
						//var d = this.dict[qname];
						if(this.cache.indexOf(qname)==-1) this.cache.push(qname);
						//return this.lib[d.module][r].toString();
						return short(qname);
					}
					// check type here
					//if(!this.typeCheck(r,t)){
					//	throw new Error("Expected type ",t," for argument value ",r);
					//}
					return JSON.stringify(r);
				}
			},this);
			acc.push(args);
			return acc;
		},this);
		var exec = false;
		var fn = f.reduce(function(pre,cur,i){
		  var f = cur[0]+"(";
		  var args = cur[1];
		  if(args[0]=="."){
		    args[0] = pre;
		  } else {
			  exec = true;
			  f = pre+","+f;
		  }
		  return f+args.join(",")+")";
		},"arg0");
		console.warn(fn)
		var fargs = fa.join(",");
		var fns = "\n";
		if(top) {
			for(var i=0;i<this.cache.length;i++){
				var d = this.dict[this.cache[i]]; 
				if(d && this.lib[d.module][d.qname]){
					fns += "var "+short(d.qname)+"="+this.lib[d.module][d.qname].toString()+";\n";
				}
			}
		}
		var func = new Function("return function "+name+"("+fargs+"){ "+fns+"return "+fn+";}")();
		if(!exec || top){
			return func;
		} else {
			return func.toString()+"()";
		}
	};
	
	Transpiler.prototype.define = function(value,params){
		this.cache = [];
		var l = value.args.length;
		var parts = value.args[0].split(":");
		var name = parts.pop();
		var module = "";
		var ns = parts.length ? parts[0] : "local";
		var type, args = [], qname;
		var body,def;
		if(l==2){
			// lookup
			def = this.dict[value.args[1]];
			if(!def) {
				throw new Error("Unknown reference in definition "+name);
			}
			type = def.type;
			args = def.args;
			body = def.body;
			module = def.module;
			qname = ns+":"+name+"#"+args.length;
		} else if(l==3 || l==4){
			if(l==3) {
				module = params.use;
				if(ns=="local"){
					ns = module.split("/")[0];
				}
			} else {
				body = value.args[3];
				module = ns;
			}
			// core
			args = value.args[1];
			type = value.args[2];
			qname = ns+":"+name+"#"+args.length;
		}
		if(this.dict[qname]) return this.dict[qname];
		def = {
			name:name,
			qname:qname,
			ns:ns,
			type:type,
			args:args,
			body:body,
			module:module
		};
		if(!this.lib[module]) this.lib[module] = {};
		if(l==4) {
			// compile definition
			this.lib[module][qname] = this.compile(body,def);
		}
		this.dict[qname] = def;
		return def;
	};
	exports.Transpiler = Transpiler;

	return exports;
});
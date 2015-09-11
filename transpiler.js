"use strict";

({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports, require("./parser"));}}).
define(["exports", "./parser"], function(exports, parser){
	
	function short(fullname){
		var n = fullname.split(":");
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
		var modulePath = params.modules || "raddle/modules.json";
		var textPrefix = params.moduleTextPrefix || "text!";
		var defaultNamespace = params.defaultNamespace || "fn";
		var use = value.args;
		var self = this;
		// TODO: core is bound, use namespace mapping for external modules
		// OR assume flat collections
		require(use,function(){
			var libs = Array.prototype.slice.call(arguments);
			libs.forEach(function(lib,i){
				for(var k in lib){
					var name = use[i].split("/")[0]+":"+k;
					if(!self.lib[name]) self.lib[name] = lib[k];
				}
			});
			var reqs = use.map(function(_){
				return textPrefix+"raddled/"+_+".rdl";
			});
			require(reqs,function(){
				var deps = Array.prototype.slice.call(arguments);
				deps.forEach(function(dep,i){
					var parsed = parser.parse(dep);
					if(parsed.args.length) self.process(parsed,{use:use[i]},callback);
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
			return this.compile(value,null,false,params);
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
	
	Transpiler.prototype.getFunction = function(fullname){
		return this.lib[fullname] ? this.lib[fullname] : this.lib[fullname.replace(/#.*$/,"")];
	};
	
	Transpiler.prototype.getFunctionDef = function(qname,arity){
		if(!this.dict[qname]) return;
		return this.dict[qname][arity+1] ? this.dict[qname][arity+1] : this.dict[qname][0];
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
	
	Transpiler.prototype.getSeqType = function(seq){
		var type = 0;
		for(var i=0,l=seq.length;i<l;i++){
			var itemType = typeOf(seq[i])=="query" ? 1 : seq[i].indexOf(":") > -1 ? 2 : 3;
			if(type<1 || type==itemType){
					type = itemType;
			} else {
				throw new Error("Mixing sequence types is not allowed");
			}
		}
		return type;
	};
	
	Transpiler.prototype.compile = function(value,parent,compose,params){
		var self = this;
		var isSeq = typeOf(value)=="array";
		var ret,seqType;
		if(isSeq) {
			seqType = this.getSeqType(value);
			if(seqType==1) {
				ret = value.reduce(function(pre,cur,i){
					if(typeOf(cur)=="query"){
						// compose the functions in the array
						var c = self.compile(cur,null,true,params);
						console.log(c)
						var p = c.length>1 ? c[1].split(",") : [];
						if(parent && p.length>0 && p[0]=="arg0") p.shift();
						var t = p.length && i>0 ? "," : "";
						return c[0] + pre + t + p.join(",") + ")";
					}
				},"");
			} else {
				if(seqType==2){
					ret = {};
					var vals = value.forEach(function(_){
						var p = _.split(":");
						ret[p[0].trim()] = this.convert(p[1].trim());
					},this);
				} else {
					ret = value.map(function(_){
						return this.convert(_);
					},this);
				}
				return JSON.stringify(ret);
			}
		}
		var top = isSeq ? false : value.top;
		var fargs = parent ? parent.args.map(function(_,i){
			return "arg" + (i+1);
		}).join(",") : "arg0";
		var fname = "anon"+this.count;
		if(parent){
			var parity = parent.more ? "N" : parent.args.length;
			fname = short(parent.name+"#"+parity);
		} else if(top) {
			this.count++;
		}
		if(isSeq && seqType==1){
			//var pre = parent ? "var arg0;\n" : "";
			return new Function("return function "+fname+"("+fargs+"){\nreturn "+ret+";\n}")();
		}
		var name = value.name,
			args = value.args,
			defaultNamespace = params.defaultNamespace || "fn";
		if(!name.match(/:/)) name = defaultNamespace+":"+name;
		var def = this.getFunctionDef(name,args.length);
		var fullname = name+"#"+(def.more ? "N" : def.args.length);
		if(this.cache.indexOf(fullname)==-1) this.cache.push(fullname);
		// exec is true if there are no args or the args don't contain variables
		args = args.map(function(_){
			if(typeOf(_) == "array") {
				return this.compile(_,null,null,params).toString();
			} else if(typeOf(_) == "query") {
				return this.compile(_,null,null,params).toString();
			} else if(_.match(/^(\.\/)|\.$/)) {
				return _;
			} else if(_.match(/^\$[0-9]+$/)) {
				return _.replace(/^\$([0-9]+)$/,"arg$1");
			} else {
				var r = this.convert(_);
				if(typeof r=="string" && r.match(/^.+#[0-9]+$/)){
					var fullname = (r.indexOf(":")>-1 ? r : "core:"+r);
					if(this.cache.indexOf(fullname)==-1) this.cache.push(fullname);
					return short(fullname);
				}
				// check type here
				//if(!this.typeCheck(r,t)){
				//	throw new Error("Expected type ",t," for argument value ",r);
				//}
				return JSON.stringify(r);
			}
		},this);
		var args2 = args.reduce(function(pre,cur,i){
			if(cur.match(/^(\.\/)|\.$/)) {
				pre.push("arg0");
			} else {
				var s = pre.length-1;
				var last = pre[s];
				if(last.match(/^(\.\/)|\.$/) || s<1) {
					pre.push(cur);
				} else {
					pre[s] = last + "," + cur;
				}
			}
			return pre;
		},[short(fullname) + "("]);
		if(compose) return args2;
		args2.push(")");
		var fn = args2.join("");
		if(!parent && !top) return fn;
		var fns = "\n";
		if(top) {
			for(var i=0;i<this.cache.length;i++){
				var f = this.getFunction(this.cache[i]);
				var r = new RegExp(f.name+"\\s?\\(","g");
				fns += f.toString().replace(r,short(this.cache[i])+"(")+";\n";
			}
		}
		return new Function("return function "+fname+"("+fargs+"){ "+fns+"return "+fn+";\n}")();
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
			qname = ns+":"+name;
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
			qname = ns+":"+name;
		}
		var len = args.length;
		// check if more argument of last type is allowed
		var last = args[len-1];
		var more = typeOf(last) == "string" ? last.substr(-1) === "-" : false;
		var arity = more ? -1 : len;
		var existing = this.getFunctionDef(qname,arity);
		if(existing) return existing;
		def = {
			name:qname,
			type:type,
			args:args,
			more:more,
			body:body,
			module:module
		};
		if(!this.dict[qname]){
			this.dict[qname] = [];
		}
		this.dict[qname][arity+1] = def;
		if(l==4) {
			// compile definition
			this.lib[qname+"#"+(arity<0 ? "N" : arity)] = this.compile(body,def,false,params);
		}
		return def;
	};
	exports.Transpiler = Transpiler;

	return exports;
});
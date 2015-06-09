({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports, require("./parser"));}}).
define(["exports", "./parser"], function(exports, parser){
	
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
			return "intern/dojo/text!/raddled/"+_+".rad";
		});
		var self = this;
		require(core.map(function(_){ return _ }),function(){
			var libs = Array.prototype.slice.call(arguments);
			libs.forEach(function(lib,i){
				self.lib[core[i]] = lib;
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
		var ret = this.process(value,params).filter(function(_){
			return !!_;
		}).pop();
		if(params.callback) {
			
		}
		return ret;
	};
	
	Transpiler.prototype.process = function(value,params,callback){
		this.cache = [];
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
				cb(null,ret);
			};
			use ? this.use(use,params,callback) : callback();
		} else {
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
		var ts = ["null","number","string","boolean","map","function","any"];
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
		return (ti[0]==to[0] || to[0]==6 || ti[0]==6) && d>=0 && d<=1;
	};
	
	Transpiler.prototype.wrap = function(value,i,o,a,acc){
		acc = acc || [];
		var v = value.shift();
		var arity = v.args.length;
		var aname = v.name+"#"+arity;
		var def = this.dict[aname];
		if(!def) {
			throw new Error("Definition for "+aname+" not in dictionary");
		}
		if(i && !this.matchTypes(i,def.sigs[0])){
			throw new Error("Type signatures do not match: "+i+"->"+def.sigs[0]);
		}
		//acc.unshift("this['"+def.module+"']['"+aname+"'].call(this,");
		acc.unshift("("+this.lib[def.module][aname].toString()+")(");
		//acc.unshift("f"+def.hash+"(");
		// TODO static arg type checks
		if(v.args){
			if(!def.args || v.args.length!=def.args.length){
				throw new Error("Argument length incorrect");
			}
		} else if(def.args) {
			throw new Error("No arguments supplied");
		}
		// replace ? args in order
		var args = v.args.map(function(_,i){
			if(_=="?") {
				if(a.length){
					return a.shift();
				} else {
					throw new Error("No arguments found to replace ?");
				}
			} else if(typeOf(_) == "array"){
				// compile to function
				var f = this.compile(_,null,a);
				return f.toString();
			} else if(typeOf(_) == "query"){
				// compile and execute with args
				// TODO execute with provided args
				// if input is null and no args, exec with null
				var f = this.compile(_,null,a,true);
				console.warn(f.toString())
				return f.toString();
			} else {
				var t = def.args[i];
				var r = this.convert(_);
				if(typeof r=="string" && r.match(/^.+#[0-9]+$/)){
					var d = this.dict[r];
					//return "this['"+d.module+"']['"+r+"']";
					return this.lib[d.module][r].toString();
				}
				// check type here
				if(!this.typeCheck(r,t)){
					throw new Error("Expected type ",t," for argument value ",r);
				}
				return JSON.stringify(r);
			}
		},this);
		acc.push((args.length ? "," : "")+args.join(",")+")");
		if(value.length) {
			return this.wrap(value,def.sigs[1],o,a,acc);
		} else {
			if(o && !this.matchTypes(o,def.sigs[1])){
				throw new Error("Type signatures do not match: "+o+"->"+def.sigs[1]);
			}
			return acc;
		}
	};
	
	Transpiler.prototype.compile = function(value,parent,pa,exec){
		// TODO compile literals like ?
		var self = this;
		var name,sigs=new Array(2),args=[];
		if(parent){
			// called from define, so compile to a definition body
			name = parent.name;
			args = parent.args;
			sigs = parent.sigs;
		} else {
			name = "anon"+this.count;
			this.count++;
		}
		// if there are unknown args, take them from the definition
		var a = [];
		var arity = args.length;
		for(var i=1;i<=arity;i++){
			a.push("arg"+i);
		}
		var fa = a.slice(0);
		fa.unshift("arg0");
		var fargs = fa.join(",");
		// always compose
		if(typeOf(value)!="array") value = [value];
		// compose the functions in the array
		var f = this.wrap(value,sigs[0],sigs[1],parent ? a : pa);
		// put default input arg in a
		a.unshift("arg0");
		var index = f.length/2;
		f.splice(index,0,a.join(","));
		var fns = "\n";
		/*if(!parent && !pa) {
			for(var k in this.cache){
				var d = this.dict[k]; 
				if(d.hash && this.lib[d.module][d.aname]){
					fns += "var f"+d.hash+"="+this.lib[d.module][d.aname].toString()+";\n";
				}
			}
		}*/
		var fn =  "function "+name+"("+fargs+"){ "+fns+"return "+f.join("")+";}";
		console.warn(fn)
		return new Function("return "+fn)();
	};
	
	Transpiler.prototype.define = function(value,params){
		var l = value.args.length;
		var name = value.args[0];
		var sigs = [], args = [], aname, module = "";
		var body,def;
		if(l==2){
			// lookup
			def = this.dict[value.args[1]];
			if(!def) {
				throw new Error("Unknown reference in definition "+name);
			}
			sigs = def.sigs;
			args = def.args;
			body = def.body;
			module = def.module;
			aname = name+"#"+args.length;
		} else if(l==3 || l==4){
			// core
			sigs = value.args[1];
			args = value.args[2];
			aname = name+"#"+args.length;
			if(l==4){
				body = value.args[3];
				module = "user";
			} else {
				module = params.use;
			}
		}
		if(this.dict[aname]) return this.dict[aname];
		def = {
			name:name,
			aname:aname,
			sigs:sigs,
			args:args,
			body:body,
			module:module,
			hash:Math.random().toString(36).substring(7)
		};
		// TODO accumulate def hashes per run
		this.cache.push(aname);
		if(!this.lib[module]) this.lib[module] = {};
		if(l==4) {
			// compile definition
			this.lib[module][aname] = this.compile(body,def);
		}
		this.dict[aname] = def;
		return def;
	};
	exports.Transpiler = Transpiler;

	return exports;
});
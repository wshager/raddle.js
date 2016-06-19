import * as Immutable from "../../immutable-js/dist/immutable.js";

import XRegExp from "../../xregexp/src/index.js";

import Decimal from "../node_modules/decimal.js/decimal.js";
import BigNumber from "../node_modules/bignumber.js/bignumber.js";
//import * as array from "array.js";

const Seq = Immutable.Seq;
const OrderedMap = Immutable.OrderedMap;
const List = Immutable.List;
const Range = Immutable.Range;
const Iterable = Immutable.Iterable;

class Integer extends BigNumber {
}

class Double extends Number {
}

const compProto = {
    equals(other) {
        return this == other;
    }
};

// mixin comparators
Object.assign(String.prototype, compProto);

Object.assign(Number.prototype, compProto);

class UntypedAtomic extends String {
	constructor(a){
		super(a);
		this._v = a;
		return a;
	}
	toString() {
		return this._v ? String(this._v) : "";
	}
	equals(other){
		//If the atomic value is an instance of xdt:untypedAtomic
		//and the other is an instance of a numeric type,
		//then the xdt:untypedAtomic value is cast to the type xs:double.

		//If the atomic value is an instance of xdt:untypedAtomic
		//and the other is an instance of xdt:untypedAtomic or xs:string,
		//then the xdt:untypedAtomic value is cast to the type xs:string.

		//If the atomic value is an instance of xdt:untypedAtomic
		//and the other is not an instance of xs:string, xdt:untypedAtomic, or any numeric type,
		//then the xdt:untypedAtomic value is cast to the dynamic type of the other value.
		switch(other.constructor){
			case UntypedAtomic: return other.equals(String(this._v));
			case String: return String(this._v).equals(other);
			case Decimal: return Decimal(this).equals(other);
			case Integer: return Integer(this).equals(other);
		}
	}
}

Iterable.prototype.serialize = function() {
  if (this.size === 0) {
	return "";
  }
  return this.toSeq().map(function(value) {
		return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }).join("\n");
};

export function seq(...a){
	return Seq(a).flatten(true);
}

export function seqOf($a) {
	return Seq.of($a);
}

export function isSeq(a){
    return Seq.isSeq(a);
}

function returnTrue() {
	return true;
}

function ensureSize(iter) {
  if (iter.size === undefined) {
	iter.size = iter.__iterate(returnTrue);
  }
  return iter.size;
}

Seq.prototype.iff = function($,truthy,falsy) {
  //invariant(step !== 0, 'Cannot step a Range by 0');
  return iffFactory(this,$,truthy,falsy);
};

Seq.prototype.step = function(fn) {
  //invariant(step !== 0, 'Cannot step a Range by 0');
  return stepFactory(this,fn);
};

function stepFactory(iterable,stepper) {
  var seq = Object.create(Seq.prototype);
  seq.size = iterable.size;
  seq.__iterateUncached = function (fn, reverse) {
	  return iterable.__iterate(function(v, k, c)  {
		var $, guard = 9999,i = 0;
		while(!v.has(0) && i<guard){
			i++;
			v = stepper(seqOf(v)).first();
			//console.log(v)
		}
		fn(v.get(0), 0, iterable);
		return v.get(0);
	});
  };
  return seq.flatten(true);
}

function iffFactory(iterable,$,truthy,falsy) {
  var seq = Object.create(Seq.prototype);
  seq.size = iterable.size;
  seq.__iterateUncached = function (fn, reverse) {
	  return iterable.__iterate(function(v, k, c)  {
          var b = atomic(v);
          //console.log(b)
		  var value = b ? truthy : falsy;
          value = item(value($));
		  fn(value, k, iterable);

		  return value;//ensureSize(value);
	  });
  };
  return seq.flatten(true);
}



class Node extends List {
	constructor(value){
        var x = super(value);
        x._isNode = true;
        x._type = value[0];
		return x;
	}
}

class QName extends List {
	constructor(value){
		var x = super(value);
		x._isQName = true;
		return x;
	}
}

List.prototype.toString = function(){
	if(!this._isNode) return this.__toString("[","]");
	return serialize(this);
};

List.prototype.getTextNode = function(){
	if(!this._isNode || this.first() !== 1) return seq();
	return this.get(2).filter(function(_){
		if(!_._isNode) throw new TypeError("Sequence cannot be converted into a node set.");
		return _.get(0) === 3;
	});
};

List.prototype.data = function(){
	let t = this.first();
	var r;
	if(t===1) {
		let n = this.getTextNode();
		r = n.first();
	} else if(t===2) {
		r = this.get(2);
	} else if(t===3) {
		r = this.get(1);
	}
	return new UntypedAtomic(r);
};

var deepEqual = List.prototype.equals;

List.prototype.equals = function(other) {
	if(!this._isNode) return deepEqual.call(this,other);
	return this.data().equals(other);
};

// everything is at least an item
export function item($a) {
	return isSeq($a) ? $a : seqOf($a);
}

// always return from a seq
export function atomic($a) {
	return isSeq($a) ? $a.first() : $a;
}

// TODO create from Type classes
export function decimal($a){
	return cast($a,Decimal);
}

export function integer($a){
	return cast($a,Integer);
}

export function string($a){
	return cast($a,String);
}

export function subsequence($a,$s,$e) {
	var s = atomic(s), e = atomic($e);
	return $a.slice(s - 1, e);
}

export function remove($a,$i) {
	let i = atomic($i);
	return $a.slice(0, i - 1).concat($a.slice(i));
}

export function head($a) {
	return $a.slice(0,1);
}

export function tail($a){
	return $a.rest();
}

export function count($a){
	return seqOf($a.count());
}

export function reverse($a) {
	return $a.reverse();
}

export function insertBefore($a,$pos,$ins) {
	let pos = atomic($pos);
	return $a.slice(0,pos).concat($ins).concat($a.slice(pos));
}

function strFromNode(node,fltr) {
	let type = node.get(0);
	if(fltr && type === fltr) return undefined;
	if(type===3) {
		return node.get(1);
	} else if(type===2) {
		return node.get(2);
	} else if(type===1){
		return node.get(2).map(function(_){
			return strFromNode(_,2);
		}).flatten(true).filter(function(_){
			return _ !== undefined;
		}).join("");
	}
}

export function stringImpl($a){
	return item($a).map(function(_){
		if(_._isNode){
			return strFromNode(_);
		} else {
			return _.toString();
		}
	}).flatten(true);
}

export function textImpl($a){
	return $a.map(n => n.getTextNode());
}

export function trueImpl(){
	return seqOf(true);
}

export function falseImpl(){
	return seqOf(false);
}

export function eq($a,$b){
	return comp($a,$b,"equals");
}

export function ne($a,$b){
	return comp($a,$b,"equals",true);
}

export function gt($a,$b){
	return comp($a,$b,"greaterThan");
}

export function lt($a,$b){
	return comp($a,$b,"lessThan");
}

export function ge($a,$b){
	return comp($a,$b,"greaterThanEquals");
}

export function le($a,$b){
	return comp($a,$b,"lessThanEquals");
}

export function and($a,$b){
	return seqOf($a.every(function(a){
        return $b.every(function(b){
            return a && b;
        });
    }));
}

export function or($a,$b){
    return seqOf($a.some(function(a){
        return $b.some(function(b){
            return a || b;
        });
    }));
}

export function data($a){
	return $a.map(function(n){
		return n.data();
	});
}

function convert(a,type){
    if(a !== undefined && a.constructor !== type){
        a = new type(a.toString());
    }
    return a;
}

function _op(a,b,op,invert){
    var ret;
    if(a !== undefined && typeof a[op] == "function") {
        b = convert(b,a.constructor);
        //if(b.constructor==Decimal) console.log(a,op,b)
		ret = a[op](b);
	}
    return invert ? !ret : ret;
}

// TODO check sequence count + throw
function comp($a,$b,op,invert){
	$a = item($a);
    $b = item($b);
	return seqOf($a.every(function(_){
		return $b.every(function(__){
			return _op(_,__,op,invert);
		});
	}));
}

function genComp($a,$b,op,invert){
	$a = item($a);
    $b = item($b);
	return seqOf($a.some(function(_){
		return $b.some(function(__){
			return _op(_,__,op,invert);
		});
	}));
}

export function geq($a,$b){
	return genComp($a,$b,"equals");
}

export function gne($a,$b){
	return genComp($a,$b,"equals",true);
}

export function ggt($a,$b){
	return genComp($a,$b,"greaterThan");
}

export function glt($a,$b){
	return genComp($a,$b,"lessThan");
}

export function gge($a,$b){
	return genComp($a,$b,"greaterThanEquals");
}

export function gle($a,$b){
	return genComp($a,$b,"lessThanEquals");
}


export function to($a,$b){
	return Range(atomic($a),atomic($b));
}

export function map($seq) {
	return seqOf(OrderedMap($seq.isEmpty() ? null : $seq));
}

export function array($seq) {
	return seqOf($seq.toList());
}

function filterNodesByType(nn,type){
	return nn.filter(function(_){
		return _.get(0) === type;
	});
}

function filterNodesByName(nn,type,name){
	return nn.filter(function(_){
		return _.get(0) === type && _.get(1).first() == name;
	});
}

function filterNodesDeepByType(nn,type){
	nn = seq(nn.filter(function(_){
		return _.get(0) === type;
	}));
	return nn;
}

function filterNodesDeepByName(nn,type,name){
	return nn.filter(function(_){
		return _.get(0) === type && _.get(1).first() == name;
	});
}

export function selectAll($node,$path){
	let path = atomic($path);
	let node = atomic($node);
	let chi = node.get(2);
	return path == "*" ? filterNodesDeepByType(chi,1) : filterNodesDeepByName(chi,1,path);
}

/*export function select($node,$path){
	let path = atomic($path);
	let node = atomic($node);
	let chi = node.get(2);
	return path === "*" ? filterNodesByType(chi,1) : filterNodesByName(chi,1,path);
}*/

export function arraySize($a) {
	return seqOf($a.first().count());
}

export function call(... a) {
    let $fn = item(a[0]);
    let args = a.slice(1);
    return $fn.map(function(fn){
        if(fn instanceof List) {
    		return fn.get(atomic(a[1]) - 1);
    	} else if(fn instanceof OrderedMap) {
            var key = atomic(a[1]);
            return fn.get(key);
    	} else {
    		return fn.apply(this,args);
    	}
    });
}

export function name($a) {
	return $a.map(function(_){
		return _.get(1);
	}).flatten(true);
}

export function select($node,$path) {
    let path = atomic($path);
	return item($node).map(function(node){
        if(node._type==1){
        	if(path == "*"){
        		return node.get(2);
        	} else if(typeof path == "function") {
        		return path.call(this,node);
        	} else {
                return node.get(2).filter(function(n){
                    return n._isNode && n._type === 1 && atomic(n.get(1)) == path;
                });
        	}
        } else {
            return seq();
        }
    }).flatten(true);
}

export function selectAttribute($node,$path) {
	var path = atomic($path);
	return item($node).map(function(node){
        if(node._type==1){
        	if(path == "*"){
        		return node.get(2);
        	} else if(typeof path == "function") {
        		return path.call(this,node);
        	} else {
                return node.get(2).filter(function(n){
                    return n._isNode && n._type === 2 && atomic(n.get(1)) == path;
                });
        	}
        } else {
            return seq();
        }
    }).flatten(true);
}
/*
export function select(... a) {
	var $a = Seq.of(List(a));
	var $s = integer(arraySize($a));
	if(eq($s,2)) {
		return apply(select_2,$a);
	} else if(eq($s,3)) {
		return apply(select_3,$a);
	} else {
		return seq();
	}
}*/

export function stringJoin($seq,$sep) {
	let sep = atomic($sep);
	return seqOf($seq.flatten().join(sep));
}

export function concatImpl(... a){
    return Range(0,a.length,1).reduce(function(pre,cur){
        let x = a[cur];
        return pre.concat(isSeq(x) ? x.flatten(true) : x);
    },seq()).join("");
}

function wrap($fn,count){
	return function (_,i,$a){
		var $_ = Seq.of(_);
		var $i = Seq.of(i);
		$_._position = i + 1;
		$_._count = count + 1;
		var $v = $fn($_,$i,$a);
		return atomic($v);
	};
}

function wrapReduce($fn,count){
	return function (pre,cur,i,$a){
		var $pre = Seq.of(pre);
		var $cur = Seq.of(cur);
		var $i = Seq.of(i);
		$cur._position = i + 1;
		$cur._count = count;
		var $v = $fn($pre,$cur,$i,$a);
		return atomic($v);
	};
}

export function filter($seq,$fn) {
	return $seq.filter(wrap(atomic($fn),$seq.count()));
}

export function forEach($seq,$fn){
	var fn = atomic($fn);
	if(typeof fn != "function") {
		return $seq.map(wrap(function() {
			return fn;
		},$seq.count()));
	}
	return $seq.map(wrap(fn,$seq.count()));
}

export function foldLeft($seq,$init,$fn){
	return $seq.reduce(wrapReduce(atomic($fn),$seq.count()),atomic($init));
}

export function foldRight($seq,$init,$fn){
	return $seq.reduceRight(wrapReduce(atomic($fn),$seq.count()),atomic($init));
}

export function stringToCodepoints($str){
	return Seq(atomic($str).split("")).map(a => a.codePointAt());
}

function isNode(a) {
	return List.isList(a) && a._isNode;
}

export function matches($str,$pat) {
	return $str.map(function(str){
    	str = isNode(str) ? str.data().toString() : convert(str,String);
    	let pat = atomic($pat);
    	if(str === undefined) return seqOf(false);
    	let match = str.match(XRegExp(pat,"g"));
    	return seqOf(!!match);
    });
}

// TODO lazy
export function replace($str,$pat,$rep) {
    let pat = atomic($pat);
    let rep = atomic($rep).replace(/\\\$/g,"$$$$");
	return $str.map(function(str){
        return XRegExp.replace(str,XRegExp(pat,"g"),rep);
    });
}

export function round($a) {
	return item($a).map(function(a){
	       if(a && a.constructor == Decimal) return a.round();
          return Math.round(a);
      });
}

export function empty($i){
	return seqOf(item($i).isEmpty());
}

export function exists($i){
	return seqOf(!item($i).isEmpty());
}


export function indexOf($a,$b) {
	var b = atomic($b);
	return seq($a.findKey(function(i){
		return _eq(i,b);
	}) + 1);
}

export function analyzeString($str,$pat) {
	let pat = XRegExp(atomic($pat),"g");
    return item($str).map(function(str){
    	var ret = Seq();
    	var index = 0;
    	XRegExp.replace(str,pat,function(... a){
    		var match = a.shift();
    		var str = a.pop();
    		var idx = a.pop();
    		// the rest is groups
    		if(idx > index) ret = ret.concat(element(seq("fn:non-match"),text(seq(str.substring(index,idx)))));
    		index = idx + match.length;
    		if(a.length > 0) {
    			var c = a.reduce(function(pre,_,i){
    				if(_ !== undefined) {
    					return pre.concat(element(seq("fn:group"),attribute(seq("nr"),seq(i+1+"")).concat(text(seq(_)))));
    				} else {
    					return pre;
    				}
    			},Seq());
    			var e = element(seq("fn:match"),c);
    			ret = ret.concat(e);
    		} else if(match) {
    			ret = ret.concat(element(seq("fn:match"),text(seq(match))));
    		}
    	});
    	if(index < str.length) ret = ret.concat(element(seq("fn:non-match"),text(seq(str.substr(index)))));
    	return  element(seq("fn:analyze-string-result"),ret);
    }).flatten(true);
}

export function tokenize($str,$pat) {
	var pat = new RegExp(atomic($pat),"g");
	return item($str).map(function(str){
        return str.split(pat);
    });
}

export function qname($uri,$prefix){
	return array(seq($uri,$prefix));
}

export function element($qname,$children){
	return seqOf(Node([1,$qname,$children.map(_ => typeof _ == "string" ? text(_) : _)]));
}

export function attribute($qname,$value){
	return seqOf(Node([2,$qname,$value]));
}

export function text($value) {
	return seqOf(Node([3,$value]));
}

export function position($_){
	return seqOf($_._position);
}

export function last($_){
	return seqOf($_._count);
}

export function stringLength($_) {
	return item($_).map(function(_) {
        return _.length;
    });
}

export function not($_) {
	// TODO test for nodeseq and add error handling
	return $_.map(function(_){
        return !_;
    });
}

export function subtract($a,$b){
	let a = atomic($a);
	let b = atomic($b);
	if(a !== undefined){
		switch(a.constructor){
			case Decimal: return seqOf(a.sub(b));
			case Integer: return seqOf(a.sub(b));
		}
	}
	if(b !== undefined){
		switch(b.constructor){
			case Decimal: return seqOf(-b.sub(a));
			case Integer: return seqOf(-b.sub(a));
		}
	}
	return seqOf(a - b);
}

export function add($a,$b){
	let a = atomic($a);
	let b = atomic($b);
	if(a !== undefined){
		switch(a.constructor){
			case Decimal: return seqOf(a.add(b));
			case Integer: return seqOf(a.add(b));
		}
	}
	if(b !== undefined){
		switch(b.constructor){
			case Decimal: return seqOf(b.add(a));
			case Integer: return seqOf(b.add(a));
		}
	}
	return seqOf(a + b);
}

export function substring($_,$a,$b) {
	return item($_).map(function(_) { return _.substring(atomic($a),atomic($b));});
}

export function serialize(node,indent) {
	indent = indent || 0;
	var type = node.first();
    var v;
	if(type<3){
		var name,ns,pf,dc = "";
		name = node.get(1);
		//pf = name.replace(/^([^:]*):([^:]*)$/,"$1");
		//if(ns>0) dc = " xmlns"+(pf ? ":"+pf : "")+"=\""+ns+"\"";
		if(type==1){
			var children = node.get(2);
			var ret = "";
			var attrs = "";
			var hasChildNodes = false;
			children.forEach(function(child){
				var type = child.first();
				if(type == 2){
					attrs += " "+serialize(child);
				} else {
					if(type == 1) hasChildNodes = hasChildNodes || true;
					ret += serialize(child,indent+1);
				}
			});
			var dent = to(0,indent).map(x => "\t").toJS().join("");
			return "\n"+dent+"<"+name+attrs+(ret==="" ? "/>" : ">")+ret+(ret==="" ? "" : (hasChildNodes ? "\n"+dent : "")+"</"+name+">");
		} else {
            v = atomic(node.get(2));
			return name+"=\""+v.replace(/&/g,"&amp;")+"\"";
		}
	} else if(type==3){
        v = atomic(node.get(1));
		return v.replace(/&/g,"&amp;");
	} else {
		return "";
	}
}

// reserve for l3n
export function _text($context,$str){
	$context.concat(seqOf(5,stringToCodepoints($str)).toList());
	var $node = List.of(3,$context.size);
	return $context.concat(seqOf($node));
}

export function _element($context,$qname,$fn){
	$context  = $context.concat(seqOf(4,stringToCodepoints($qname)).toList());
	var $s = $context.size;
	$context = $fn($context);
	var $node = List.of(1,$s+1,Range($s+2,$childresize).toList());
	return $context.concat(seqOf($node));
}

// new
export function fetch($a,b){
    //console.log("calling get",b);
	var val = $a.first().get(b);
	//console.log("get",b,seq().concat(val).toString());
	return val;
}

export function put($,b,c){
    //console.log("put",b,seq().concat(c).toString());
    return seqOf($.first().set(b,c));
    //return $.map(function(a){
    //    return a.set(b,c);
    //});
}

export function apply($fn,$a) {
	return item($fn).map(function(fn){
		return fn.apply(this,atomic($a));
	}).flatten(true);
}

export function iff($,a,b,c){
	return a.slice(0,1).iff($,b,c);
}

function _setframe(_args,_params){
    var frame = new Map();
	frame = frame.set("$params",_params);
    var cnt = _args.length;
    var len = _params.length;
    var prm,name;
	for(var i=0;i<len;i++) {
        prm = _params[i];
        name = prm[0];
        if(i==len-1 && !!name.match(/\.{3}/)){
            frame = frame.set(name.replace(/\s*\.{3}/,""),Array.prototype.slice.call(_args,i));
            break;
        }
		frame = frame.set(name,i<cnt ? _args[i] : prm[1]);
	}
    return frame;
}

export function initialize(_args,_params,fn){
	return seqOf(_setframe(_args,_params)).step(fn);
}

export function cont($){
    //var frame = $.first();
    var _args = Array.prototype.slice.call(arguments,1);
	var _params = fetch($,"$params");
    return $.map(function(a){
        //console.log(ret.toString())
        for(var i=0;i<_params.length;i++) {
    		//console.log(_params[i],arguments[i + 2].toJS())
    		a = a.set(_params[i][0],_args[i]);
    	}
        return a;
    });
    //return seqOf(_setframe(_args,_params));
}

export function stop($,ret){
    // MUST be lazy
    return $.map(function(a){
        //console.log(ret.toString())
        return a.set(0,ret);
    });
}

Seq.prototype.put = function(b,c){
	return put(this,b,c);
};

Seq.prototype.fetch = function(b){
	return fetch(this,b);
};

/*export function fetch($,b){
	return $.concat(get($,b));
}

Seq.prototype.stopWith = function(b){
	return this. fetch(b).stop();
};*/

Seq.prototype.stop = function(ret){
	var $ = this;
	if(arguments.length===0) {
		$ = head(this);
		ret = tail(this);
	}
	return stop($,ret);
};

/*
// examples
function fold(){
	return initialize(arguments,["s","acc","fn"],[],function($){
		return iff(
			eq(count(get($,"s")),seq(0)),
			stop($,($=put($,"ret",get($,"acc")),get($,"ret"))),
			cont($,tail(get($,"s")),apply(get($,"fn"),get($,"acc"),head(get($,"s"))),get($,"fn"))
		);
	});
}

function factorial(){
	var _params = ["s","acc"],_inits = [null,seq(1)];
	return initialize(_params,arguments,_inits,function($){
		return iff(
			eq(get($,"s"),seq(0)),
			$.put("ret",get($,"acc")).stopWith("ret"),
			cont($,_params,sub(get($,"s"),seq(1)),mult(get($,"s"),get($,"acc")))
		);
	});
}
*/


export function concat($a,$b){
    let ret = $a.concat($b).flatten().join("");
	return seqOf(ret);
}

function op($a,$b,_op){
    $a = item($a);
    if(isSeq($b)) {
    	return $a.map(function(a){
    		return $b.reduce(_op,a);
    	}).flatten(true);
    } else {
        return $a.map(function(a){
    		return _op(a,$b);
    	});
    }
}

function _add(a,b){
	//console.log(a,"+",b)
	return a + b;
}

function add($a,$b){
	return op($a,$b,_add);
}

function _sub(a,b){
	//console.log(a,"-",b)
	return a - b;
}

function sub($a,$b){
	return op($a,$b,_sub);
}

function _mult(a,b){
	//console.log(a,"*",b)
	return a * b;
}

function mult($a,$b){
	return op($a,$b,_mult);
}

function _cast(a,b){
	return new b(a);
}

function cast($a,$b){
	return op($a,$b,_cast);
}

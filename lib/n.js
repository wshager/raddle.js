import * as Immutable from "../../immutable-js/dist/immutable.js";

import XRegExp from "../../xregexp/src/index.js";

import Decimal from "../node_modules/decimal.js/decimal.js";
//import * as array from "array.js";

const Seq = Immutable.Seq;
const OrderedMap = Immutable.OrderedMap;
const List = Immutable.List;
const Range = Immutable.Range;
const Iterable = Immutable.Iterable;

class Integer extends Number {
    constructor(a) {
        super(a);
        //this._v = a;
        return parseInt(a,10);
    }
    sub(other) {
        return parseInt(this,10) - other;
    }
}

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
            case String: return String(this._v) === other;
            case Decimal: return Decimal(this).equals(other);
            case Integer: return Integer(this) === other;
            case Number: console.log(this);return Number(this._v) === other;
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


class Node extends List {
	constructor(value){
		var x = super(value);
		x._isNode = true;
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
export function item($i) {
    return seq($i);
}

// always return from a seq
export function atomic($a) {
    return Seq.isSeq($a) ? $a.first() : $a;
}

export function truthy($a) {
    return $a.first() === true;
}

// TODO create from Type classes
export function decimal($a){
    return seqOf(Decimal(atomic($a)));
}

export function integer($i){
    return seqOf(Integer(atomic($i)));
}

export function string($i){
    return seqOf(String(atomic($i)));
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
	return $a.slice(1);
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
    return $a.map(function(_){
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
    return seqOf(eqf(atomic($a),atomic($b)));
}

export function ne($a,$b){
    return seqOf(nef(atomic($a),atomic($b)));
}

export function gt($a,$b){
    seqOf(gtf(atomic($a),atomic($b)));
}

export function lt($a,$b){
    seqOf(ltf(atomic($a),atomic($b)));
}

export function ge($a,$b){
    seqOf(gef(atomic($a),atomic($b)));
}

export function le($a,$b){
    seqOf(lef(atomic($a),atomic($b)));
}

export function and($a,$b){
    return seqOf(atomic($a) && atomic($b));
}

export function or($a,$b){
    return seqOf(atomic($a) || atomic($b));
}

// TODO add general gt,lt,ge,le
function genComp($a,$b,comp){
    let a = seq($a);
    let b = seq($b);
    return seqOf(a.some(function(_){
        return b.some(function(__){
            return comp(_,__);
        });
    }));
}

export function data($a){
    return $a.map(function(n){
        return n.data();
    });
}


function eqf(a,b){
    if(a !== undefined) {
        switch(a.constructor) {
            case Decimal: return a.equals(b);
            case List: return a.equals(b);
        }
    }
    if(b !== undefined) {
        switch(b.constructor) {
            case Decimal: return b.equals(a);
            case List: return b.equals(a);
        }
    }
    return a===b;
}

function nef(a,b){
    if(a && a.constructor === Decimal) return !a.equals(b);
    return a!==b;
}

function gtf(a,b){
    if(a && a.constructor === Decimal) return a.greaterThan(b);
    return a>b;
}

function ltf(a,b){
    if(a && a.constructor === Decimal) return a.lessThan(b);
    return a<b;
}

function gef(a,b){
    if(a && a.constructor === Decimal) return a.greaterThanEquals(b);
    return a>=b;
}

function lef(a,b){
    if(a && a.constructor === Decimal) return a.lessThanEquals(b);
    return a<=b;
}

export function geq($a,$b){
    return genComp($a,$b,eqf);
}

export function gne($a,$b){
	return genComp($a,$b,nef);
}

export function ggt($a,$b){
	return genComp($a,$b,gtf);
}

export function glt($a,$b){
	return genComp($a,$b,ltf);
}

export function gge($a,$b){
	return genComp($a,$b,gef);
}

export function gle($a,$b){
	return genComp($a,$b,lef);
}


export function seq(... a) {
    return Seq(a).flatten(true);
}

export function to($a,$b){
	return Range(atomic($a),atomic($b));
}

export function map($seq) {
	return Seq.of(OrderedMap($seq.isEmpty() ? null : $seq));
}

export function seqOf($a) {
    return Seq.of($a);
}

export function array($seq) {
	return Seq.of($seq.toList());
}

function filterNodesByType(nn,type){
    return nn.filter(function(_){
        return _.get(0) === type;
    });
}

function filterNodesByName(nn,type,name){
    return nn.filter(function(_){
        return _.get(0) === type && _.get(1).first() === name;
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
        return _.get(0) === type && _.get(1).first() === name;
    });
}

export function selectAll($node,$path){
    let path = atomic($path);
    let node = atomic($node);
    let chi = node.get(2);
    return path === "*" ? filterNodesDeepByType(chi,1) : filterNodesDeepByName(chi,1,path);
}

/*export function select($node,$path){
    let path = atomic($path);
    let node = atomic($node);
    let chi = node.get(2);
    return path === "*" ? filterNodesByType(chi,1) : filterNodesByName(chi,1,path);
}*/

export function arraySize($a) {
	return seq($a.first().count());
}

export function apply($fn, $a) {
    let fn = atomic($fn);
    let a = Seq.isSeq($a) ? $a.first().toArray() : $a;
    return seq(fn.apply(this,a));
}

export function call(... a) {
    let fn = atomic(a.shift());
    if(fn instanceof List) {
        return seqOf(fn.get(atomic(a.shift()) - 1));
    } else if(fn instanceof OrderedMap) {
        return seqOf(fn.get(atomic(a.shift())));
    } else {
        return seqOf(fn.apply(this,a));
    }
}

export function iff($a,$b,$c) {
    if(atomic($a)) {
        return $b;
    } else {
        return $c;
    }
}

export function get($a,$k) {
    // TODO make lazy
    let a = $a.get(0);
    let k = atomic($k);
    if(a instanceof List) k--;
    return seq(a.get(k));
}

export function name($a) {
    return seq($a.map(function(_){
        return _.get(1);
    }));
}

export function select($node,$path) {
    var ret = filter($node,function($_0) {
		return geq(position($_0),1);
	});
    var path = atomic($path);
    if(path === "*"){
        return call(ret,3).first().toSeq();
    } else if(typeof path == "function") {
        return path.call(this,ret);
    } else {
	    return select_3(call(ret,3).first().toSeq(),$path,seq());
    }
}


function select_3($nn,$path,$acc) {
	var $h = head($nn);
    if(atomic(and(eq(call($h,1),1),eq(call($h,2),$path)))) {
        $acc = seq($acc,$h);
    }
    if(gt(count($nn),1)) {
        return select_3(tail($nn),$path,$acc);
    } else {
        return $acc;
    }
}


function selectAttribute_3($nn,$path,$acc) {
	var $h = head($nn);
    if(atomic(and(eq(call($h,1),2),eq(call($h,2),$path)))) {
        $acc = seq($acc,$h);
        console.log($acc.toString());
    }
    if(gt(count($nn),1)) {
        return selectAttribute_3(tail($nn),$path,$acc);
    } else {
        return $acc;
    }
}

export function selectAttribute($node,$path) {
    var path = atomic($path);
    if(path === "*"){
        return call($node,3);
    } else if(typeof path == "function") {
        return path.call(this,$node);
    } else {
	    return selectAttribute_3(call($node,3).first().toSeq(),$path,seq());
    }
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
	var sep = !$sep ? "" : atomic($sep);
	return seq($seq.flatten().join(sep));
}

export function concatImpl(... a){
    return seqOf(Seq(a).flatten(true).join(""));
}

export function concat($a,$b){
	return seqOf(atomic($a) + atomic($b));
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
    var str = atomic($str) || "";
    str = isNode(str) ? str.data().toString() : str;
	let pat = atomic($pat);
    if(str === undefined) return seqOf(false);
    let match = str.match(XRegExp(pat,"g"));
    return seqOf(!!match);
}

export function replace($str,$pat,$rep) {
    let str = atomic($str) || "";
	let pat = atomic($pat);
    let rep = atomic($rep).replace(/\\\$/g,"$$$$");
	return XRegExp.replace(str,XRegExp(pat,"g"),rep);
}

export function round($a) {
    let a = atomic($a);
    if(a && a.constructor === Decimal) return seqOf(a.round());
    return seqOf(Math.round(a));
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
        return eqf(i,b);
    }) + 1);
}

export function analyzeString($str,$pat) {
    let str = atomic($str);
	let pat = XRegExp(atomic($pat),"g");
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
	return element(seq("fn:analyze-string-result"),ret);
}

export function tokenize($str,$pat) {
	var str = atomic($str);
	var pat = new RegExp(atomic($pat),"g");
	return Seq(str.split(pat));
}

export function qname($uri,$prefix){
	return array(seq($uri,$prefix));
}

export function element($qname,$children){
	return Seq.of(Node(seq(1,$qname,array($children.map(_ => typeof _ == "string" ? text(_) : _)))));
}

export function attribute($qname,$value){
	return Seq.of(Node(seq(2,$qname,$value)));
}

export function text($value) {
	return Seq.of(Node(seq(3,$value)));
}

export function position($_){
	return Seq.of($_._position);
}

export function last($_){
	return Seq.of($_._count);
}

export function stringLength($_) {
    return seqOf(atomic($_).length);
}

export function not($_) {
    // TODO test for nodeseq and add error handling
    return seqOf(!atomic($_));
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
    return seqOf(atomic($_).substring(atomic($a),atomic($b)));
}

export function serialize(node,indent) {
    indent = indent || 0;
	var type = node.first();
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
            return name+"=\""+node.get(2).replace(/&/g,"&amp;")+"\"";
        }
    } else if(type==3){
        return node.get(1).replace(/&/g,"&amp;");
    } else {
        return "";
    }
}

// reserve for l3n
export function _text($context,$str){
	$context.concat(Seq.of(5,stringToCodepoints($str)).toList());
	var $node = List.of(3,$context.size);
	return $context.concat(Seq.of($node));
}

export function _element($context,$qname,$fn){
	$context  = $context.concat(Seq.of(4,stringToCodepoints($qname)).toList());
	var $s = $context.size;
	$context = $fn($context);
	var $node = List.of(1,$s+1,Range($s+2,$childresize).toList());
	return $context.concat(Seq.of($node));
}

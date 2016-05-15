import * as Immutable from "../../immutable-js/dist/immutable.js";

import XRegExp from "../../xregexp/src/index.js";

//import * as array from "array.js";

const Seq = Immutable.Seq;
const Map = Immutable.Map;
const List = Immutable.List;
const Range = Immutable.Range;
const Iterable = Immutable.Iterable;

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

// everything is at least an item
export function item($i) {
    return Seq().concat($i);
}

// always return from a seq
export function atomic($a) {
    return item($a).first();
}

export function truthy($a) {
    return $a.first() === true;
}

// TODO create from Type classes
export function decimal($a){
    return Seq.of(parseFloat(atomic($a)).toFixed());
}

export function integer($i){
    return item($i);
}

export function string($i){
    return item($i);
}

export function subsequence($a,$s,$e) {
    var s = atomic(s), e = atomic($e);
    return $a.slice(s - 1, e);
}

export function head($a) {
	return $a.slice(0,1);
}

export function tail($a){
	return $a.slice(1);
}

export function count($a){
	return $a.count();
}

export function reverse($a) {
    return $a.reverse();
}

export function stringImpl($a){
    var ret = Seq();
    $a.forEach(function(_){
        if(_._isNode){
            var type = _.get(0);
            if(type===3) {
                ret = ret.concat(_.get(1));
            } else if(type===1){
                ret = ret.concat(stringImpl(_.get(2)));
            }
        } else {
            ret = ret.concat(_.toString());
        }
    });
    return ret;
}

export function trueImpl(){
	return seqOf(true);
}

export function falseImpl(){
	return seqOf(false);
}

export function eq($a,$b){
    return seqOf(atomic($a) === atomic($b));
}

export function ne($a,$b){
    return seqOf(atomic($a) !== atomic($b));
}

export function gt($a,$b){
    return seqOf(atomic($a) > atomic($b));
}

export function lt($a,$b){
    return seqOf(atomic($a) < atomic($b));
}

export function ge($a,$b){
    return seqOf(atomic($a) >= atomic($b));
}

export function le($a,$b){
    return seqOf(atomic($a) <= atomic($b));
}

export function and($a,$b){
    return seqOf(atomic($a) && atomic($b));
}

export function or($a,$b){
    return seqOf(atomic($a) || atomic($b));
}

// TODO add general gt,lt,ge,le
export function geq($a,$b){
	return Seq.of(item($a).equals(item($b)));
}

export function gne($a,$b){
	return Seq.of(!item($a).equals($b));
}

export function seq(... a) {
    return Seq(a).flatten(true);
}

export function to($a,$b){
	return Range(atomic($a),atomic($b));
}

export function map($seq) {
	return Seq.of(Map($seq.isEmpty() ? null : $seq));
}

export function seqOf($a) {
    return Seq.of($a);
}

export function array($seq) {
	return Seq.of(List($seq));
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
    let a = $a instanceof Array ? $a : $a.first().toArray();
    return Seq(fn.apply(this,a));
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

function select_2($node,$path) {
    var ret = filter($node,function($_0) {
		return seq(geq(position($_0),1));
	});
    var path = atomic($path);
    if(path === "*"){
        return get(ret,3);
    } else if(typeof path == "function") {
        return path.call(this,ret);
    }
	//return select_3(get(ret,3),$path,seq());
}
function select_3($nn,$path,$acc) /*item()*/ {
	var $h;
	return seq(($h = item(head($nn)),
	$acc = item(atomic((and(eq(get($h,1),1),or(eq($path,"*"),eq(get($h,2),$path)))) ? seq($acc,$h) : $acc)), (
		atomic(gt(count($nn),1)) ? select_3(tail($nn),$path,$acc) : $acc)));
}
export function select(... a) /*item()*/ {
	var $s;
    var $a = Seq.of(List(a));
	return seq(($s = integer(arraySize($a)), (eq($s,2) ? apply(select_2,$a) : (eq($s,3) ? apply(select_3,$a) : seq()))));
}

export function stringJoin($seq,$sep) {
	var sep = !$sep ? "" : atomic($sep);
	return seq($seq.flatten().join(sep));
}

export function concatImpl(... a){
    var s = Seq();
    for(var i=0;i<a.length;i++){
        s.concat(a[i]);
    }
	return seqOf(s.join(""));
}

export function concat($a,$b){
	return seqOf(atomic($a) + atomic($b));
}

function wrap($fn,count){
	return function (_,i,$a){
		var $_ = Seq.of(_);
		var $i = Seq.of(i);
		$_._position = i + 1;
		$_._count = count;
        var $v = $fn($_,$i,$a);
		return atomic($v);
	};
}

export function filter($seq,$fn) {
	return $seq.filter(wrap(atomic($fn),$seq.count()));
}

export function forEach($seq,$fn){
    var fn = atomic($fn);
    fn = typeof fn != "function" ? function($_0) { return fn; } : fn;
	return $seq.map(wrap(fn,$seq.count()));
}

export function foldLeft($seq,$init,$fn){
	return $seq.reduce(wrap(atomic($fn),$seq.count()),atomic($init));
}

export function foldRight($seq,$init,$fn){
	return $seq.reduceRight(wrap(atomic($fn),$seq.count()),atomic($init));
}

export function stringToCodepoints($str){
	return Seq(atomic($str).split("")).map(a => a.codePointAt());
}

export function matches($str,$pat) {
    let str = atomic($str);
	let pat = atomic($pat);
    if(str === undefined) return seqOf(false);
    let match = str.match(XRegExp(pat,"g"));
    return seq(!!match);
}

export function replace($str,$pat,$rep) {
    let str = atomic($str);
	let pat = atomic($pat);
    let rep = atomic($rep);
	return XRegExp.replace(str,XRegExp(pat,"g"),rep);
}

export function round($a) {
    return seq(Math.round(atomic($a)));
}

export function empty($i){
    return seqOf(item($i).isEmpty());
}

export function indexOf($a,$b) {
    var b = atomic($b);
    return $a.findKey(function(i){
        return i === b;
    });
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
	return Seq.of(Node(seq(1,$qname,array($children))));
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
	return Seq.of($_._last);
}

export function stringLength($_) {
    return seqOf(atomic($_).length);
}

export function not($_) {
    // TODO test for nodeseq and add error handling
    return seqOf(!atomic($_));
}

export function subtract($a,$b){
    return seqOf(atomic($a) - atomic($b));
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

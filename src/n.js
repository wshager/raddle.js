import Immutable from "immutable";

import XRegExp from "xregexp";

import Decimal from "decimal.js";
import BigNumber from "bignumber.js";

import xmutable from "xmutable";

// TODO update when loader spec is solid
import { readFile, readDir } from "./readfile";

import FastIntCompression from "fastintcompression";

const nulstr = String.fromCodePoint(0);

function ab2str(buf) {
  return String.fromCodePoint.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.codePointAt(i);
  }
  return buf;
}

export function compress($node){
    var doc = materialize($node);
    var nodes = doc.slice(2),
        names = doc[0],
        values = doc[1];
	var nil = Buffer.alloc(1);
    //var offsets = ab2str(FastIntCompression.compress([names.length,values.length]));
	//return offsets+nulstr+names.join(nulstr)+nulstr+values.join(nulstr)+nulstr+nodes.map(_ => ab2str(FastIntCompression.compress(_))).join(nulstr);
	var offsets = Buffer.from(FastIntCompression.compress([names.length,values.length]));
	var out = [offsets,nil];
	names.forEach(_ => { out = out.concat([Buffer.from(_),nil]); });
	values.forEach(_ => { out = out.concat([Buffer.from(_),nil]); });
	nodes.forEach(_ => { out = out.concat([Buffer.from(FastIntCompression.compress(_)),nil]); });
	return Buffer.concat(out);
}
export function uncompress(str){
	var parts = str.split(nulstr);
    var offsets = FastIntCompression.uncompress(str2ab(parts[0]));
    var names = parts.slice(1,offsets[0]+1);
    var valueOffset = offsets[0]+offsets[1];
    var values = parts.slice(offsets[0]+2,valueOffset+1);
    var nodes = parts.slice(valueOffset+2).map(_ => FastIntCompression.uncompress(str2ab(_)));
    return [names,values].concat(nodes);
}

const parser = new xmutable.Parser();
export const Seq = Immutable.Seq;
const ImmutableMap = Immutable.Map;
const List = Immutable.List;
const Range = Immutable.Range;
const Iterable = Immutable.Iterable;

class Integer extends BigNumber {
    constructor(a){
        super(a);
        this.floor();
        return a;
    }
}

const compProto = {
    equals(other) {
        return this.valueOf() === other.valueOf();
    },
	greaterThan(other) {
        return this.valueOf() > other.valueOf();
    }
};

const opProto = {
    plus(other){
        return this + other;
    },
    minus(other) {
        return this - other;
    },
    times(other){
        return this * other;
    },
    dividedBy(other) {
        return this / other;
    }
};

// mixin comparators
Object.assign(String.prototype, compProto);

Object.assign(Number.prototype, compProto, opProto);

Object.assign(Boolean.prototype, compProto);

class Double extends Number {
}

//class UntypedAtomic extends String {
//String.prototype.equals = function(other){
		//If the atomic value is an instance of xdt:untypedAtomic
		//and the other is an instance of a numeric type,
		//then the xdt:untypedAtomic value is cast to the type xs:double.

		//If the atomic value is an instance of xdt:untypedAtomic
		//and the other is an instance of xdt:untypedAtomic or xs:string,
		//then the xdt:untypedAtomic value is cast to the type xs:string.

		//If the atomic value is an instance of xdt:untypedAtomic
		//and the other is not an instance of xs:string, xdt:untypedAtomic, or any numeric type,
		//then the xdt:untypedAtomic value is cast to the dynamic type of the other value.
		//switch(other.constructor){
			//case UntypedAtomic: return other.equals(String(this));
			//case String: return this.equals(other);
		//	case Decimal: return Decimal(this).equals(other);
			//case Integer: return Integer(this).equals(other);
		//}
	//}
//}

Iterable.prototype.serialize = function() {
  if (this.size === 0) {
	return "";
  }
  return this.toSeq().map(function(value) {
		return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }).join("\n");
};

export function seq(...a){
	return Seq(a);
}

export function flatSeq(...a){
    return Seq(a).flatten(true);
}

export function seqOf($a) {
	return Seq.of($a);
}

export function toSeq(arr) {
    return Seq(arr).flatten(true);
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
  /*if(atomic(this)){
      return item(truthy($));
  } else {
      return item(falsy($));
  }*/
};

Seq.prototype.step = function(fn) {
  //invariant(step !== 0, 'Cannot step a Range by 0');
  return stepFactory(this,fn);
};

function stepFactory(iterable,stepper) {
  var seq = Object.create(Seq.prototype);
  seq.size = iterable.size;
  seq._stepper = stepper;
  seq.__iterateUncached = function (fn, reverse) { var seq = this;
      var _i = 0, stopped = false;
	  return iterable.__iterate(function(v, k, c)  {
        while(!v.has(0)){
			if(_i > 999) throw new Error("Too much recursion!");
			v = seq._stepper(item(v)).first();
		}
        var val = v.get(0);
        //if(isSeq(val)){
        //    val.__iterate(function(v,k,c){
        //        return fn(v, _i++, seq) !== false;
        //    });
        //} else {
            stopped = fn(val, _i++, seq) === false;
        //}
        return !stopped;
	});
  };
  return seq.flatten(true);
}

function iffFactory(iterable,$,truthy,falsy) {
  var seq = Object.create(Seq.prototype);
  seq.size = iterable.size;
  seq._truthy = truthy;
  seq._falsy = falsy;
  var copy = new Map();
  var frame = $.first();
  for (var [name, value] of frame) {
      copy.set(name,value);
  }
  seq._$ = seqOf(copy);
  //seq._$ = $;
  seq.__iterateUncached = function (fn, reverse) { var seq = this;
      var _i = 0, stopped = false;
	  return iterable.__iterate(function(v, k, c)  {
          var b = atomic(v);
          if(_i > 999) {
              //console.log($.toJS());
              throw new Error("Too much recursion in " + $.first().get("$trace"));
          }
		  var value = b ? seq._truthy : seq._falsy;
          var ret = value(seq._$);//;
          //if(isSeq(ret)){
        //      ret.__iterate(function(v, k, c)  {
    //              return fn(v, k, seq) !== false;
//              });
          //} else {
              stopped = fn(ret, _i++, seq) === false;
          //}
          //console.log(ret);
          //value = item(ret);
          return !stopped;
	  });
  };
  return seq.flatten(true);//.flatten(true);
}

class NamedNodeMap extends ImmutableMap {

}

class Node extends List {
	constructor(type, name, attrs, children, mutable){
        //var name = type < 3 ? a.shift() : null;
        //var value = type > 1 ? a.shift() : null;
        //var attrs = type == 1 && a[0] instanceof NamedNodeMap ? a.shift() : null;
        var x = super([]).asMutable();
        children = isSeq(children) || children instanceof Array ? children : [children];
        children.forEach(function(_){
            if(isNode(_)) _._parent = x;
            x.push(_);
        });
        if(!mutable) x = x.asImmutable();
        x._name = name;
        //x._value = value;
        x._attrs = attrs;
        x._isNode = true;
        x._type = type;
        x._index = {}; // for select by name
        x._owner = null; // have elem create it, or explicitly through createDocument
        x._parent = null;
        return x;
	}
}

/*push(val){
    val._parent = this;
    return super.push(val);
}*/
List.prototype.name = function name(){
    var name = atomic(this._name);
    if(name instanceof QName) name = name._name;
    return name;
};

List.prototype.value = function value(){
    if(this._type ==  1) return null;
    return atomic(this.get(0));
};
// children is a no-op because it's equal to the node

class QName {
	constructor(uri,name){
        this._isQName = true;
		this._name = name;
        this._uri = uri;
	}
}

List.prototype.toString = function(){
	if(!this._isNode) return this.__toString("[","]");
	return serialize(this);
};

List.prototype.getTextNode = function(){
	if(!this._isNode || this._type != 1) return seq();
	return this.filter(function(_){
		if(!_._isNode) throw new TypeError("Sequence cannot be converted into a node set.");
		return _._type === 3;
	});
};

List.prototype.data = function(){
	let t = this._type;
	var r;
	if(t===1) {
		let n = this.getTextNode();
		r = n.get(0);
	} else if(t===2) {
		r = this.get(0);
	} else if(t===3) {
		r = this.get(0);
	}
    //console.log(r)
	return r;
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

export function sort($a,$f){
	return $a.sort($f ? $f.first() : function(a,b){
		return a.greaterThan(convert(b,a.constructor)) ? 1 : -1;
	});
}

export function number($a){
	return cast($a,Number);
}

export function doc($file){
    var file = atomic($file);
    return parse(readFile(file.valueOf()));
}

export function collection($uri) {
    var uri = atomic($uri);
    return Seq(readDir(uri)).map(file => doc(uri+"/"+file)).flatten(true);
}

export function parse($a){
    return string($a).map(function(xml){
        var result;
        parser.parseString(xml,function(err,ret){
            if(err) console.log(err);
            result = ret;
        });
        return result;
    });
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
    //console.log($a.toJS().length);
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
    if(node._string) {
        return node._string;
    }
    var ret;
	let type = node._type;
	if(fltr && type === fltr) return undefined;
	if(type===3) {
		ret = node.get(0);
	} else if(type===2) {
		ret = node.get(1);
	} else if(type===1){
		ret = node.map(function(_){
			return strFromNode(_,2);
		}).flatten(true).filter(function(_){
			return _ !== undefined;
		}).join("");
	}
    node._string = ret;
    return ret;
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

// TODO check sequence count + throw
function comp($a,$b,op,invert){
	$a = item($a);
    $b = item($b);
    if($a.isEmpty() && !$b.isEmpty()) return seqOf(false);
	return seqOf($a.every(function(a){
		return $b.every(function(b){
			return _comp(a,b,op,invert);
		});
	}));
}

function genComp($a,$b,op,invert){
	$a = item($a);
    $b = item($b);
	return seqOf($a.some(function(a){
		return $b.some(function(b){
			return _comp(a,b,op,invert);
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
    let b = atomic($b);
	return $a.flatMap(function(a) {
        return Range(a,b);
    });
}

export function fromJS(obj) {
    return seqOf(Immutable.fromJS(obj));
}

export function map($seq) {
    if(!$seq){
        return new ImmutableMap();
    }
    var m = new ImmutableMap();
    if(!$seq.isEmpty()) {
        $seq.forEach(function(s){
            if(s) m = m.set(atomic(s.get(0)),atomic(s.get(1)));
        });
    }
    return seqOf(m);
}

export function array($seq) {
    var a = new List();
    if(!$seq.isEmpty()){
        $seq.forEach(function(s,i){
            a = a.push(s);
        });
    }
	return seqOf(a);
}

function filterNodesByType(nn,type){
	return nn.filter(function(_){
		return _._type === type;
	});
}

function filterNodesByName(nn,type,name){
	return nn.filter(function(_){
		return _._type === type && _.get(0).first() == name;
	});
}

function filterNodesDeepByType(nn,type){
	nn = seq(nn.filter(function(_){
		return _._type === type;
	}));
	return nn;
}

function filterNodesDeepByName(nn,type,name){
	return nn.filter(function(_){
		return _._type === type && _.get(0).first() == name;
	});
}

export function selectAll($node,$path){
	let path = atomic($path);
	let node = atomic($node);
	let chi = node.get(1);
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
    	} else if(fn instanceof ImmutableMap) {
            var key = atomic(a[1]);
            return fn.get(key);
    	} else {
    		return fn.apply(this,args);
    	}
    });
}

export function name($a) {
	return $a.map(function(_){
        if(!_._isNode) throw new Error("This is not a node");
        var name = _._name;
		return name instanceof QName ? name._name : name;
	}).flatten(true);
}

/*
new STRICT model
class Index {
    get(k) {
        return this[k].first();
    }
    has(k) {
        return !!this[k];
    }
    set(k) {
        if (!this[k]) this[k] = new Seq([k]);
        return this[k];
    }
}
var names = new Index();
var values = new Index();
var nss = new Index();

export function elem(name, children = [], ns = null) {
    var node = new Node(1,children.filter(_ => _ && _ instanceof Node));
    node.name = names.set(name);
    node.namespace = nss.set(ns);
    return node;
}

export function attr(name, value, ns = null) {
    var node = new Node(2);
    if (ns) {
        node.namespace = nss.set(ns);
    }
    node.name = names.set(name);
    node.value = values.set(value);
    return node;
}

export function text(value) {
    var node = new Node(3);
    node.value = values.set(value);
    return node;
}

export function serialize(node) {
    if (node.isSeq(node)) return node.toString();
    var str = "";
    var name;
    if (node.type == 1) {
        name = node.name.first();
        str += "<" + name;
        var i = 0, l = node.size;
        for (i = l; i > 0; i--) {
            if (node.get(i-1).type == 2) break;
        }
        var last = i;
        for (i = 0; i < last; i++) {
            str += " " + node.get(i).name.first() + "=\"" + node.get(i).value.first() + "\"";
        }
        str += l === 0 ? "/>" : ">";
        for (i = last; i < l; i++) {
            str += serialize(node.get(i));
        }
        str += l === 0 ? "" : "</" + name + ">";
    } else if (node.type == 3) {
        str += node.value.first();
    }
    return str;
}

export function insert(frag, target) {
    // TODO when reconstructing becomes too slow
    target = target.isSeq(target) ? target.first() : target;
    target._array = target._array.concat(frag);
    target.size = target._array.length;
    return target;
}

export function serialize2(node) {
    var str = "";
    var name;
    var cur = node;
    var last = [];
    var i = 0;
    while (cur) {
        var l = cur.size;
        if (i === 0) {
            str += "<" + cur.name.first();
            var j = l - 1;
            for (; j >= 0; j--) {
                if (cur.get(j).type == 2) break;
            }
            for (; i < j + 1; i++) {
                str += " " + cur.get(i).name.first() + "=\"" + cur.get(i).value + "\"";
            }
            str += ">";
        }
        for (; i < l; i++) {
            var type = cur.get(i).type;
            if (type == 1) {
                cur._last = i;
                last.push(cur);
                cur = cur.get(i);
                i = 0;
                break;
            } else if (type == 3) {
                str += cur.get(i).value.first();
            }
        }
        if (i >= l) {
            str += l === 0 ? "/>" : "</" + cur.name.first() + ">";
            if (last.length) {
                cur = last.pop();
                i = cur._last + 1;
            } else {
                cur = null;
            }
        }
    }
    return str;
}


// TODO do we need deep copies?
// TODO only create flat Seqs?
class Seq {
    isSeq:true
    size: number
    _array: any[]
    constructor(array: any = []) {
        this._array = isSeq(array) ? array._array : array instanceof Array ? array : [array];
        this.size = array.length;
    }
    concat(other) {
        // stupid copy, but hey it's JS
        var ret = new Seq(this._array.slice());
        if (!isSeq(other)) {
            ret._array.push(other);
        } else {
            ret._array.push.apply(this._array, other._array);
        }
        ret.size = ret._array.length;
        return ret;
    }
    forEach(fn,cx = this) {
        var a = this._array;
        for (var i = 0; i < a.length; i++) {
            fn.call(cx, a[i], i, a);
        }
    }
    map(fn, cx = this) {
        var ret = new Seq();
        this.forEach(function (c,i,a) {
            ret = ret.concat(fn(c, i, a));
        }, cx);
        return ret;
    }
    filter(fn, cx = this) {
        var ret = new Seq();
        this.forEach(function (c, i, a) {
            if(fn(c,i,a)) ret = ret.concat(c);
        }, cx);
        return ret;
    }
    toString() {
        return this._array.map(_ => _.toString()).join("\n");
    }
    slice(s,l){
        return new Seq(this._array[s,l]);
    }
    head() {
        return new Seq(this._array[0]);
    }
    tail() {
        return new Seq(this._array.slice(1));
    }
    take(i) {
        return new Seq(this._array[i]);
    }
    first() {
        return this._array[0];
    }
    get(i) {
        return this._array[i];
    }
}

class Node extends Seq {
    isSeq:false
    name: Seq
    namespace: Seq
    value: Seq
    type: number
    _domNode: HTMLElement
    size: number
    constructor(type, array = []) {
        super(array);
        this.type = type;
    }
    toString() {
        return serialize(this);
    }
    _place(domNode, position) {
        domNode = domNode instanceof Node ? domNode._domNode : domNode;
        if (!domNode) throw new Error("The selected node is not of the correct type");
        if (position == 1) {
            while (domNode.firstChild) {
                domNode.removeChild(domNode.firstChild);
            }
        }
        if (position > 1) {
            var parent = domNode.parentNode;
            if (position == 2) {
                parent.insertAfter(domify(this), domNode);
            } else {
                parent.insertBefore(domify(this), domNode);
            }
        } else {
            domNode.appendChild(domify(this));
        }
    }
    empty() {
        if (this._domNode) {
            while (this._domNode.firstChild) {
                this._domNode.removeChild(this._domNode.firstChild);
            }
        }
    }
    placeAt(domNode, replace = false) {
        this._place(domNode, replace ? 1 : 0);
    }
    placeAfter(domNode) {
        this._place(domNode, 2);
    }
    placeBefore(domNode) {
        this._place(domNode, 3);
    }
    getTextNode(){
    	if(this.type != 1) return seq();
    	return this.filter(function(_){
    		return _.type === 3;
    	});
    }
    data(){
    	let t = this.type;
    	var r;
    	if(t===1) {
    		let n = this.getTextNode();
    		r = n.value;
    	} else if(t===2) {
    		r = this.value;
    	} else if(t===3) {
    		r = this.value;
    	}
        //console.log(r)
    	return r;
    }
    equals(other) {
    	return this.data().equals(other);
    }
}


function seq(...a) {
    return new Seq(a);
}

export function domify(node) {
    var cur = node;
    var ref: any = document.createElement(cur.name.first());
    cur._domNode = ref;
    var last = [];
    var parent = ref;
    var i = 0;
    while (cur) {
        var l = cur.size;
        for (; i < l; i++) {
            var type = cur.get(i).type;
            if (type == 1) {
                //if (cur.get(i)._domNode) continue;
                cur._last = i;
                last.push(cur);
                cur = cur.get(i);
                ref = document.createElement(cur.name.first());
                cur._domNode = ref;
                parent.appendChild(ref);
                parent = ref;
                i = 0;
                break;
            } else if (type == 2) {
                ref.setAttribute(cur.get(i).name.first(), cur.get(i).value.first());
            } else if (type == 3) {
                //if (cur.get(i)._domNode) continue;
                ref = document.createTextNode(cur.get(i).value.first());
                cur.get(i)._domNode = ref;
                parent.appendChild(ref);
            }
        }
        if (i >= l) {
            if (last.length) {
                cur = last.pop();
                parent = cur._domNode;
                i = cur._last + 1;
            } else {
                cur = null;
            }
        }
    }
    return parent;
}
*/

export function select(node, ...paths) {
    // usually we have a sequence
    var cur = node;
    while (paths.length > 0) {
        cur = selectImpl(cur, paths.shift());
    }
    return cur;
}

export function selectAttribute(node, ...paths) {
    // usually we have a sequence
    var cur = node;
    while (paths.length > 0) {
        cur = selectImpl(cur, paths.shift(), true);
    }
    return cur;
}

function selectImpl(node, $path, attr) {
    var path = atomic($path);
    if(isSeq(node)) return node.map(_ => selectImpl(_,path,attr)).flatten(true);
    if(typeof path == "function") return path.call(this, node);
    var attrpath = /^@/.test(path);
    if(attr && !attrpath) path = "@"+path;
    if(attrpath) attr = true;

    var typetest = function(n){
        return n._isNode && n._type == (attr ? 2 : 1);
    };
    if (node._type == 1) {
        var ret;
        if (!node._cache) {
            node._cache = new Map();
        }
        if (!node._cache.has(path)) {
            var testpath = path.replace(/^@/,"");
            if (testpath == "*") {
                ret = node.filter(function (n) {
                    return typetest(n);
                });
            } else {
                ret = node.filter(function (n) {
                    return typetest(n) && atomic(n._name) == testpath;
                });
            }
            node._cache.set(path, ret);
        } else {
            ret = node._cache.get(path);
        }
        return ret;
    } else {
        return seq();
    }
}

export function stringJoin($seq,$sep) {
	let sep = atomic($sep);
	return seqOf($seq.join(sep !== undefined ? sep : ""));
}

export function concatImpl(... a){
    return seqOf(Seq(a).flatten(true).join(""));
}

export function wrap($fn,count){
	return function (_,i,$a){
		var $_ = item(_);
		var $i = Seq.of(i);
		$_._position = i;
		$_._count = count;
		var $v = $fn($_,$i,$a);
        //console.log(_,atomic($v));
		return atomic($v);
	};
}

export function wrapReduce($fn,count){
	return function (pre,cur,i,$a){
		var $pre = Seq.of(pre);
		var $cur = Seq.of(cur);
		var $i = Seq.of(i);
		$cur._position = i;
		$cur._count = count;
		var $v = $fn($pre,$cur,$i,$a);
		return atomic($v);
	};
}

export function filter($seq,$fn) {
    let fn = atomic($fn);
    if(typeof fn != "function") {
        if(typeof fn != "function") {
    		return $seq.filter(function() {
    			return fn;
    		});
    	}
    }
	return $seq.filter(wrap(fn,$seq.count()));
}

export function forEach($seq,$fn){
	var fn = atomic($fn);
	if(typeof fn != "function") {
		return $seq.map(function() {
			return fn;
		});
	}
	return $seq.map(wrap(fn,$seq.count()));
}

export function foldLeft($seq,$init,$fn){
	return seqOf($seq.reduce(wrapReduce(atomic($fn),$seq.count()),atomic($init)));//;
}

export function foldRight($seq,$init,$fn){
	return seqOf($seq.reduceRight(wrapReduce(atomic($fn),$seq.count()),atomic($init)));//;
}

export function stringToCodepoints($str){
	return Seq(atomic($str).split("")).map(a => a.codePointAt());
}

function isNode(a) {
	return List.isList(a) && a._isNode;
}

export function matches($str,$pat) {
    let pat = XRegExp.cache(atomic($pat),"g");
    var _cache;
    if(!matches._cache) matches._cache = new WeakMap();
    if(!matches._cache.has(pat)) {
        _cache = new Map();
        matches._cache.set(pat,_cache);
    } else {
        _cache = matches._cache.get(pat);
    }
	return $str.map(function(str){
    	str = isNode(str) ? str.data().toString() : convert(str,String);
    	if(str === undefined) return false;
        var ret;
        if(!_cache.has(str)){
            ret = str.match(pat) !== null;
            _cache.set(str,ret);
        } else {
            ret = _cache.get(str);
        }
        return ret;
    });
}

// TODO lazy
export function replace($str,$pat,$rep) {
    let pat = atomic($pat).valueOf();
    let rep = atomic($rep).valueOf();
    var rc = replace.repCache = replace.repCache ? replace.repCache : {};
    //var pc = replace.patCache = replace.patCache ? replace.patCache : {};
    if(!rc[rep]){
        rc[rep] = rep.replace(/(^|[^\\])\\\$/g,"$$$$").replace(/\\\\\$/g,"\\$$");
    }
    /*if(!pc[pat]){
        pc[pat] = XRegExp.cache(pat,"g");
    }*/
    var c = replace.cache ? replace.cache : new Map();
    replace.cache = c;
    var cc,cpc,ret;
	return $str.map(function(str){
        str = str.valueOf();
        if(!c.has(str)) {
            cc = new Map();
            c.set(str,cc);
        } else {
            cc = c.get(str);
        }
        if(!cc.has(pat)) {
            cpc = new Map();
            cc.set(pat,cpc);
        } else {
            cpc = cc.get(pat);
        }
        if(!cpc.has(rep)) {
            ret = XRegExp.replace(str,pat,rc[rep]);
            cpc.set(rep,ret);
        } else {
            ret = cpc.get(rep);
        }
        return ret;
    });
}

export function round($a) {
	return item($a).map(function(a){
	      return a.round();
          //return Math.round(a);
      });
}

export function empty($i){
    var x = item($i).isEmpty();
    //console.log(x)
	return seqOf(x);
}

export function exists($i){
	return seqOf(!item($i).isEmpty());
}


export function indexOf($a,$b) {
	var b = atomic($b);
    var key = $a.findKey(function(i){
		return _comp(i,b,"equals");
	});
	return seq(key !== undefined ? key + 1 : 0);
}

export function analyzeString($str,$pat) {
	let pat = XRegExp.cache(atomic($pat),"g");
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
	let pat = XRegExp.cache(atomic($pat),"g");
    var ret = seq();
	item($str).forEach(function(str){
        if(str) {
            str.split(pat).forEach(s => {
                ret = ret.concat(String(s));
            });
        }
    });
    return ret;
}

export function qname($uri, $name) {
    return seqOf(new QName(atomic($uri),atomic($name)));
}

export function partialRight(fn, ... args) {
    return function(... a) {
        return fn.apply(this, a.concat(args));
    };
}
// TODO rename to short, use attr map
export function element($qname,$children,$mutable=false){
	return new Node(1,atomic($qname),null,$children,$mutable);
}

export function attribute($qname,$value,$mutable=false){
	return new Node(2,atomic($qname),null,$value,$mutable);
}

export function text($value,$mutable=false) {
	return new Node(3,null,null,$value,$mutable);
}

export function cdata($value,$mutable=false) {
	return new Node(4,null,null,$value,$mutable);
}

export function comment($value,$mutable=false) {
	return new Node(8,null,null,$value,$mutable);
}

export function processingInstruction($name,$value,$mutable=false) {
	return new Node(7,atomic($name),null,$value,$mutable);
}

export function position($_){
	return integer($_._position + 1);
}

export function last($_){
	return integer($_._count);
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

export function substring($_,$a,$b) {
	return item($_).map(function(_) { return _.substring(atomic($a),atomic($b));});
}

export function serialize(node,indent) {
	indent = indent || 0;
	var type = node._type;
    var v;
	if(type<3 || type == 7){
		var name,ns,pf,dc = "";
		name = atomic(node._name);
        if(name instanceof QName) name = name._name;
		//pf = name.replace(/^([^:]*):([^:]*)$/,"$1");
		//if(ns>0) dc = " xmlns"+(pf ? ":"+pf : "")+"=\""+ns+"\"";
		if(type==1){
			var children = node;
			var ret = "";
			var attrs = "";
			var hasChildNodes = false;
			children.forEach(function(child,i){
				var type = child._type;
				if(type == 2){
					attrs += " "+serialize(child);
				} else {
					if(type == 1) hasChildNodes = hasChildNodes || true;
					ret += serialize(child,indent+1);
				}
			});
			var dent = to(integer(0),indent).map(x => "\t").toJS().join("");
			return "\n"+dent+"<"+name+attrs+(ret==="" ? "/>" : ">")+ret+(ret==="" ? "" : (hasChildNodes ? "\n"+dent : "")+"</"+name+">");
		} else if(type == 7){
            v = node.get(0).toString();
			return "<?"+name+" "+v.replace(/&/g,"&amp;")+"?>";
		} else {
            v = node.get(0).toString();
			return name+"=\""+v.replace(/&/g,"&amp;")+"\"";
        }
    } else if (type == 3 || type == 4 || type == 7 || type == 8) {
        v = node.get(0).toString();
        if(type == 4){
            return "<![CDATA["+v+"]]>";
        } else if(type == 8){
            return "<!--"+v+"-->";
        } else {
            return v.replace(/&/g, "&amp;");
        }
	} else {
		return "";
	}
}

export function dematerialize($doc){
    var doc = atomic($doc);
    var stack = [];
    var names = doc[0], values = doc[1], nodes = doc.slice(2);
    var node, name, value, depth, type, oldd = 10e10;
    for(var i=0;i<nodes.length;i++){
        depth = nodes[i][0];
        type = nodes[i][1];
        if(depth < oldd) {
            name = type < 3 || type == 7 ? names[nodes[i][2]] : null;
            value = type > 1 ? values[node[i][type == 2 || type == 7 ? 3 : 2]] : stack.pop();
            node = new Node(type,name,null,val);
            stack.push(node);
        } else if(depth == oldd) {

        } else {

        }
    }
}

export function materialize($node) {
    // can't materialize seq
    var node = atomic($node);
    var names = {},
        values = {};
    var ncount = 0,
        vcount = 0;
    var type = node._type;
    var cur = node;
    var ret = [],
        depth = 0,
        index = 0,
        l = cur.count();
    while (cur) {
        type = cur._type;

        console.log("with", cur._name, index, l);
        // do we have more children?
        if (type == 1 && index < l) {
            depth++;
            cur._index = index;
            cur = cur.get(index);
            index = 0;
            l = cur.count();
            console.log("down", cur._name);
        } else {
            // write head
            console.log("write",type == 1 ? cur._name : cur.first());
            var w = [depth + 1, type];
            if (type < 3) {
                var name = cur._name;
                if (!names[name]) {
                    names[name] = ncount;
                    ncount++;
                }
                w.push(names[name] + 1);
            }
            if (type > 1) {
                var val = cur.first();
                if (!values[val]) {
                    values[val] = vcount;
                    vcount++;
                }
                w.push(values[val] + 1);
            }
            ret.push(w);
            // go back up
            depth--;
            console.log("up", cur._name, type, cur._parent ? cur._parent._name : "no parent");
            cur = cur._parent;
            if (cur) {
                index = cur._index+1;
                l = cur.count();
            }
        }
    }
    var namea = [],
        vala = [];
    for (var k in names) {
        namea[names[k]] = k;
    }
    for (k in values) {
        vala[values[k]] = k;
    }
    return [namea, vala, ret];
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
export function fetch($,b){
    //console.log("calling get",b);
	return $.first().get(b);
	//console.log("get",b,seq().concat(val).toString());
	//return $.fetch(b);//seqOf(val).flatten(true);
}

export function put($,b,c){
    //console.log("put",b,seq().concat(c).toString());
    return seqOf($.first().set(b,c));
    //return $.put(b,c);
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

function _setframe(_args,_params,_trace){
    var frame = new Map();
	frame = frame.set("$params",_params);
    frame = frame.set("$trace",_trace);
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
		frame = frame.set(name,i<cnt ? _args[i].cacheResult() : prm[1]);
	}
    return frame;
}

export function initialize(_args,_params,fn,_trace){
	return seqOf(_setframe(_args,_params,_trace)).step(fn);
}

export function cont($){
    //var frame = $.first();
    var _args = arguments;///Array.prototype.slice.call(arguments,1);
	var _params = fetch($,"$params");
    return $.map(function(copy){
        //console.log(ret.toString())
        //var copy = new Map();
        //for (var [name, value] of a) copy.set(name,value);
        for(var i=0;i<_params.length;i++) {
    		copy = copy.set(_params[i][0],_args[i + 1].cacheResult());
    	}
        return copy;
    }).cacheResult();
    //return seqOf(_setframe(_args,_params));
}

export function stop($,ret){
    // MUST be lazy
    return $.map(function(a){
        //console.log(ret.toString())
        setTimeout(function(){},0);
        return a.set(0,ret);
    }).cacheResult();
}

function putFactory(iterable,key,val) {
  var seq = Object.create(Seq.prototype);
  seq.size = iterable.size;
  seq._key = key;
  seq._val = val;
  seq.__iterateUncached = function (fn, reverse) { var seq = this;
      var _i = 0, stopped = false;
	  return iterable.__iterate(function(v, k, c)  {
          //console.log(v)
		return fn(v.set(seq._key,seq._val), _i++, seq) !== false;
	});
  };
  return seq;
}

function fetchFactory(iterable,key) {
  var seq = Object.create(Seq.prototype);
  seq.size = iterable.size;
  seq._key = key;
  seq.__iterateUncached = function (fn, reverse) { var seq = this;
      var _i = 0, stopped = false;
	  return iterable.__iterate(function(v, k, c)  {
          //console.log(v)
		return fn(v.get(seq._key), _i++, seq) !== false;
	});
  };
  return seq;//.flatten(true);
}

Seq.prototype.put = function(b,c){
	return putFactory(this,b,c);
};

Seq.prototype.fetch = function(b){
	return fetchFactory(this,b);
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
    return seqOf($a.concat($b).flatten(true).join(""));
}

function opFactory(iterable,other,op) {
  var seq = Object.create(Seq.prototype);
  seq.size = iterable.size;
  seq._other = other;
  seq._otherIsSeq = isSeq(other);
  seq._op = op;
  seq.__iterateUncached = function (fn, reverse) { var seq = this;
      var _i = 0, stopped = false;
	  return iterable.__iterate(function(v, k, c)  {
		var other = seq._other, op = seq._op;
        if(seq._otherIsSeq) {
            stopped = fn(other.reduce(op(v)), _i++, seq) === false;
        } else {
            stopped = fn(op(v,other), _i++, seq) === false;
        }
        return !stopped;
	});
  };
  return seq;
}

Seq.prototype.op = function(other,op) {
  //invariant(step !== 0, 'Cannot step a Range by 0');
  return opFactory(this,other,op);
};


function convert(a,type){
    if(a !== undefined && a.constructor !== type){
        return _cast(a.toString(),type);
    }
    return a;
}

function _opImpl(a,b,op){
    var ret,cache,ac;
    if(!_opImpl.cache) _opImpl.cache = new Map();
    if(!_opImpl.cache.has(op)) {
        cache = new Map();
        _opImpl.cache.set(op,cache);
    } else {
        cache = _opImpl.cache.get(op);
    }
    if(!cache.has(a)){
        ac = new Map();
        cache.set(a,ac);
    } else {
        ac = cache.get(a);
    }
    if(!ac.has(b)) {
        ret = a[op](b);
        ac.set(a,ret);
    } else {
        ret = ac.get(b);
    }
    return ret;
}
function _op(a,b,op,invert){
    var ret;
    if(a !== undefined) {
        if(typeof a[op] == "function") {
            var c = a.constructor;
            if(c == String || c == Boolean) throw new Error(a + " is not of a numeric type");
            //ret = _opImpl(a,convert(b,c),op);
            ret = a[op](convert(b,c));
        } else {
            throw new Error("Operator "+op+" not implemented");
        }
	}
    return invert ? !ret : ret;
}

function _comp(a,b,op,invert){
    var ret;
    if(a !== undefined) {
        if(typeof a[op] == "function") {
            var c = a.constructor;
            if(c != b.constructor) {
                if(c == String || c == Boolean) throw new Error(b + " is not a " + c.name);
            }
            //ret = _opImpl(a,b,op);
            ret = a[op](convert(b,c));
        } else {
            throw new Error("Operator "+op+" not implemented for "+a+" ("+(a.constructor.name)+")");
        }
	}
    //console.log(a,b,op,ret);

    return invert ? !ret : ret;
}

function opsFactory(iterable,other,op) {
  var seq = Object.create(Seq.prototype);
  seq.size = iterable.size;
  seq._other = other;
  seq._otherIsSeq = isSeq(other);
  seq._op = op;
  seq.__iterateUncached = function (fn, reverse) { var seq = this;
      var _i = 0, stopped = false;
	  return iterable.__iterate(function(v, k, c)  {
		var other = seq._other, op = seq._op;
        if(seq._otherIsSeq) {
            stopped = fn(other.reduce(function(_,b) {
                return _op(_,b,op);
            }), _i++, seq) === false;
        } else {
            stopped = fn(_op(v,other), _i++, seq) === false;
        }
        return !stopped;
	});
  };
  return seq;
}

Seq.prototype.ops = function(other,op) {
  //invariant(step !== 0, 'Cannot step a Range by 0');
  return opsFactory(this,other,op);
};

function _cast(a,b){
    if(!_cast.cache) _cast.cache = new Map();
    var n = b.name;
    var c,ret;
    if(!_cast.cache.has(n)) {
        c = new Map();
        _cast.cache.set(n,c);
    } else {
        c = _cast.cache.get(n);
    }
    if (!c.has(n)) {
        ret = new b(a);
        c.set(a,ret);
    } else {
        ret = c.get(a);
    }
    return ret;
}

function cast($a,$b){
	return item($a).op($b,_cast);
}

export function subtract($a,$b){
    return item($a).ops($b,"minus");
}

export function add($a,$b){
    return item($a).ops($b,"plus");
}

export function multiply($a,$b){
    return item($a).ops($b,"times");
}

export function div($a,$b){
    return item($a).ops($b,"dividedBy");
}

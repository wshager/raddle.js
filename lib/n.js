import * as Immutable from "../immutable-js/dist/immutable.js"

import XRegExp from "../xregexp/src/index.js"

const Seq = Immutable.Seq;
const List = Immutable.List;
const Map = Immutable.Map;
const Range = Immutable.Range;

const operatorMap = {
	"or": "||",
	"and": "&&",
	"eq": "==",
	"ne": "!=",
	"lt": "<",
	"le": "<=",
	"gt": ">",
	"ge": ">=",
	"add": "+",
	"subtract": "-",
	"plus": "+",
	"minus": "-",
	"multiply": "*",
	"div": "/",
	"mod": "%"
}

export function geq($a,$b){
	return $a.equals($b);
}

export function seq(... $a) {
	return Seq.of.apply(Seq,$a);
}

export function to($a,$b){
	return Range($a.get(0),$b.get(0));
}

export function foldLeft($seq,$init,$fn){
	return $seq.reduce($fn,$init.get(0));
}

export function map($seq) {
	// TODO to seq of lists in xq-compat
	return seq(Map($seq));
}

export function array($seq) {
	return Seq.of($seq.toList());
}

export function select($node,$path){
	console.log($node,$path)
}

export function stringJoin($seq,$sep) {
	var sep = !$sep ? "" : $sep.get(0)
	return seq($seq.join(sep));
}

export function concat(... $a){
	return stringJoin(Seq.of.apply(Seq,$a));
}

export function forEach($seq,$fn){
	// TODO wrap function return body in seq
	return $seq.map($fn);
}

export function stringToCodepoints($str){
	return Seq($str.get(0).split("")).map(a => a.codePointAt());
}

export function analyzeString($str,$pat) {
	var str = $str.first();
	var pat = XRegExp($pat.first(),"g");
	var ret = NodeSeq();
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
				if(_ != undefined) {
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
	var str = $str.first();
	var pat = new RegExp($pat.first(),"g");
	return Seq(str.split(pat));
}

export function qname($uri,$prefix){
	return array(seq($uri,$prefix))
}

export class NodeSeq extends Seq {
  constructor(value) {
    return super(value);
  }

  static of(/*...values*/) {
    return NodeSeq(arguments);
  }

  toString() {
	  console.log(this)
	return serialize(this);
  }
}

export class Node extends List {
  constructor(value) {
    return super(value);
  }
  toString() {
	  console.log(this)
	return serialize(this);
  }
}

export function element($qname,$children){
	return NodeSeq.of(Node(seq(1,$qname,$children)));
}

export function attribute($qname,$value){
	return NodeSeq.of(Node(seq(2,$qname,$value)));
}

export function text($value) {
	return NodeSeq.of(Node(seq(3,$value)));
}



export function serialize(node) {
	var type = node.first();
    if(type<3){
        var name,ns,pf,dc = "";
        name = node.get(1).get(0);
        //pf = name.replace(/^([^:]*):([^:]*)$/,"$1");
        //if(ns>0) dc = " xmlns"+(pf ? ":"+pf : "")+"=\""+ns+"\"";
        if(type==1){
			var children = node.get(2);
            var ret = "";
            var attrs = "";
            children.forEach(function(child){
				var type = child.first();
                if(type == 2){
                    attrs += " "+serialize(child);
                } else {
                    ret += serialize(child);
                }
            });
            return "<"+name+attrs+(ret=="" ? "/>" : ">")+ret+"</"+name+">";
        } else {
            return name+"=\""+node.get(2).first().replace(/&/g,"&amp;")+"\"";
        }
    } else if(type==3){
        return node.get(1).first().replace(/&/g,"&amp;");
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

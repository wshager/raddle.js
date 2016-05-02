/* xquery version "3.1" */

/*module namespace rdl="http://raddle.org/raddle";

n.seq()*/

//import * as xqc from "../lib/xq-compat.js";

import * as n from "../lib/n.js";

import * as fn from "fn.js";

import * as a from "../lib/array-util.js";

//import * as console from "http://exist-db.org/xquery/console";

export const suffix = "\+\*\-\?";

export const ncname = "\p{L}\p{N}\-_\.";

export const qname = n.concat(n.concat(n.concat(n.concat(n.concat("[",ncname),"]*:?"),"["),ncname),"]+");

export const operatorRegexp = "=#\p{N}+#?\p{N}*=";

export const operators = n.map(
	n.seq(1,",",2.01,"some",2.02,"every",2.03,"switch",2.04,"typeswitch",2.05,"try",2.06,"if",2.07,"then",2.08,"else",2.09,"let",2.1,":=",2.11,"return",
	2.12,"case",2.13,"default",2.14,"xquery",2.15,"version",2.16,"module",2.17,"declare",2.18,"variable",2.19,"import",3,"or",4,"and",5.01,"eq",5.02,"ne",
	5.03,"lt",5.04,"le",5.05,"gt",5.06,"ge",5.07,"=",5.08,"!=",5.09,"<=",5.1,">=",5.11,"<<",5.12,">>",5.13,"<",5.14,">",5.15,"is",6,"||",7,"to",8.01,"+",
	8.02,"-",9.01,"*",9.02,"idiv",9.03,"div",9.04,"mod",10.01,"union",10.02,"|",11.01,"intersect",11.02,"except",12,"instance of",13,"treat as",
	14,"castable as",15,"cast as",16,"=>",17.01,"+",17.02,"-",18,"!",19.01,"/",19.02,"//",19.03,"/*",20.01,"[",20.02,"]",20.03,"?",20.04,"[",
	20.05,"[",20.06,"{",20.07,"}",20.08,"@",21.01,"array",21.02,"attribute",21.03,"comment",21.04,"document",21.05,"element",21.06,"function",21.07,
	"map",21.08,"namespace",21.09,"processing-instruction",21.1,"text",22.01,"array",22.02,"attribute",22.03,"comment",22.04,"document-node",22.05,"element",22.06,
	"empty-sequence",22.07,"function",22.08,"item",22.09,"map",22.1,"namespace-node",22.11,"node",22.12,"processing-instruction",22.13,"schema-attribute",22.14,
	"schema-element",22.15,"text",24,"as",25.01,"(:",25.02,":)",26,":")
);

export const chars = n.concat(n.concat(suffix,ncname),"\$:%/#@\^");

export const filterRegexp = "(\])|(,)?([^\[\]]*)(\[?)";

export const parenRegexp = fn.concat("(\)[",suffix,"]?)|(",operatorRegexp,"|,)?([",chars,"]*)(\(?)");

export const protocolRegexp = "^((http[s]?|ftp|xmldb|xmldb:exist|file):/)?/*(.*)$";

export function mapPut($map,$key,$val) /*n.item()*/ {

return map.new(($map,n.map(n.seq($key,$val))));

}

export function parseStrings($strings,$normalizer,$params) /*n.item()*/ {

var $i;

return (wrap(n.select(fn.analyzeString($normalizer(fn.stringJoin(fn.forEach(n.to(1,fn.count($strings)),function($i) /*n.item()*/ {

return (n.eq(fn.name(n.filterAt($strings,(n.geq($_0,$i)))),"match") ? n.concat("$%",$i) : n.select(n.filterAt($strings,(n.geq($_0,$i))),fn.string()));

})),$params),parenRegexp),"fn:match"),$strings));

}

export function normalizeQuery($query,$params) /*n.item()*/ {

return fn.replace($query,"&#9;|&#10;|&#13;","");

}

function parse_1($query) /*n.item()*/ {

return parse($query,n.map(n.seq()));

}

function parse_2($query,$params) /*n.item()*/ {

return parseStrings(n.select(fn.analyzeString($query,"('[^']*')|(&quot;[^&quot;]*&quot;)"),"*"),(n.geq($params("$compat"),"xquery") ? normalizeQuery : normalizeQuery),$params);

}

export function parse(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,1) ? fn.apply(parse_1,$a) : (n.eq($s,2) ? fn.apply(parse_2,$a) : n.seq()))));

}

export function getIndexFromTokens($tok) /*n.item()*/ {

var $i;

return (fn.forEach(n.to(1,fn.count(fn.indexOf($tok,1))),function($i) /*n.item()*/ {

return (n.filterAt(n.glt(n.filterAt(n.and(fn.exists(n.filterAt(fn.indexOf($tok,n.minus(1)),(n.geq($_0,$i)))),fn.indexOf($tok,n.minus(1))),(n.geq($_0,$i))),fn.indexOf($tok,1)),(n.geq($_0,$i))) ? n.seq() : n.add(n.filterAt(fn.indexOf($tok,1),(n.geq($_0,$i))),1));

}));

}

export function getIndex($rest) /*n.item()*/ {

var $_;

return (n.filterAt(getIndexFromTokens(fn.forEach($rest,function($_1) /*n.item()*/ {

return (n.filter(n.select($_,"fn:group"),(n.geq(n.selectAttribute($_0,"nr"),1))) ? 1 : (n.filter(n.select($_,"fn:group"),(n.geq(n.selectAttribute($_0,"nr"),4))) ? n.minus(1) : 0));

})),(n.geq($_0,1))));

}

export function clipString($str) /*n.item()*/ {

return fn.substring($str,2,n.subtract(fn.stringLength($str),2));

}

export function valueFromStrings($val,$strings) /*n.item()*/ {

return (fn.matches($val,"\$%[0-9]+") ? fn.concat("&quot;",clipString(n.filter($strings,n.seq(fn.number(fn.replace($val,"\$%([0-9]+)","$1"))))),"&quot;") : $val);

}

export function appendOrNest($next,$strings,$group,$ret,$suffix) /*n.item()*/ {

var $x,$operator,$rev,$last,$args;

return (($x = n.item((n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),3))) ? n.map(n.seq("name",valueFromStrings(n.select(n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),3))),fn.string()),$strings),"args",wrap($next,$strings),"suffix",$suffix)) : wrap($next,$strings))),

(fn.matches(n.select(n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),2))),fn.string()),n.concat(n.concat("^",operatorRegexp),"$")) ? ($operator = n.item(n.select(n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),2))),fn.string())),(n.ggt(array.size($ret),0) ? ($rev = n.item(array.reverse($ret)),$last = n.item(array.head($rev)),$args = n.item((fn.empty($last) ? $x : n.array(n.seq($last,$x)))),array.append(array.reverse(array.tail($rev)),n.map(n.seq("name",$operator,"args",$args,"suffix","")))) : array.append($ret,n.map(n.seq("name",$operator,"args",$x,"suffix",""))))) : array.append($ret,$x))));

}

export function appendPropOrValue($string,$operator,$strings,$ret) /*n.item()*/ {

return (fn.matches($operator,n.concat(operatorRegexp,"+")) ? (n.ggt(array.size($ret),0) ? operatorPrecedence((fn.exists($string) ? valueFromStrings($string,$strings) : n.seq()),$operator,$ret) : array.append($ret,n.map(n.seq("name",unaryOp($operator),"args",n.array(n.seq(valueFromStrings($string,$strings))),"suffix","")))) : array.append($ret,valueFromStrings($string,$strings)));

}

export function wrapOpenParen($rest,$strings,$index,$group,$ret) /*n.item()*/ {

return wrap(fn.subsequence($rest,$index),$strings,appendOrNest(fn.subsequence($rest,1,$index),$strings,$group,$ret,fn.replace(n.filterAt($rest,(n.geq($_0,n.subtract($index,1)))),"\)","")));

}

function wrap_4($rest,$strings,$ret,$group) /*n.item()*/ {

return (fn.exists($rest) ? (n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),4))) ? wrapOpenParen($rest,$strings,getIndex($rest),$group,$ret) : (n.or(n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),3))),fn.matches(n.select(n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),2))),fn.string()),n.concat(operatorRegexp,"+|,"))) ? wrap($rest,$strings,appendPropOrValue(n.select(n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),3))),fn.string()),n.select(n.filter($group,(n.geq(n.selectAttribute($_0,"nr"),2))),fn.string()),$strings,$ret)) : wrap($rest,$strings,$ret))) : $ret);

}

function wrap_3($match,$strings,$ret) /*n.item()*/ {

return wrap(fn.tail($match),$strings,$ret,n.select(fn.head($match),"fn:group"));

}

function wrap_2($match,$strings) /*n.item()*/ {

var $name;

return (rename(wrap($match,$strings,n.array(n.seq())),function($name) /*n.item()*/ {

return (fn.matches($name,operatorRegexp) ? toOp(opNum($name)) : $name);

}));

}

export function wrap(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,4) ? fn.apply(wrap_4,$a) : (n.eq($s,3) ? fn.apply(wrap_3,$a) : (n.eq($s,2) ? fn.apply(wrap_2,$a) : n.seq())))));

}

export function importModule($name,$params) /*n.item()*/ {

var $mappath,$map,$location,$uri,$module;

return (($mappath = n.item((map.contains($params,"modules") ? $params("modules") : "modules.xml")),

$map = n.item(n.select(n.select(fn.doc($mappath),"root"),"module")),

$location = n.item(n.anyURI(n.selectAttribute(n.filter($map,(n.geq(n.selectAttribute($_0,"name"),$name))),"location"))),

$uri = n.item(n.anyURI(n.selectAttribute(n.filter($map,(n.geq(n.selectAttribute($_0,"name"),$name))),"uri"))),

$module = n.item(($location ? inspect.inspectModule($location) : inspect.inspectModuleUri($uri))),

n.try(util.importModule(n.anyURI(n.selectAttribute($module,"uri")),n.selectAttribute($module,"prefix"),n.anyURI(n.selectAttribute($module,"location"))),"n.seq()")));

}

function stringify_2($a,$params) /*n.item()*/ {

return stringify($a,$params,fn.true());

}

function stringify_3($a,$params,$top) /*n.item()*/ {

var $s,$acc,$t,$i,$type,$ret;

return (($s = n.item(array.size($a)),

a.foldLeftAt($a,"",function($acc,$t,$i) /*n.item()*/ {

var $type,$ret;

return (($type = n.item((n.instanceOf($t,Map) ? 1 : (n.instanceOf($t,n.array(n.item())) ? 2 : 0))),$ret = n.item((n.eq($type,1) ? fn.concat($t("name"),"(",fn.stringJoin(array.flatten(stringify($t("args"),$params,fn.false())),","),")",(n.instanceOf($t("suffix"),n.string()) ? $t("suffix") : "")) : (n.eq($type,2) ? fn.concat("(",stringify($t,$params,fn.false()),")") : $t))),fn.concat($acc,(n.and(n.ggt($i,1),fn.not(n.and(n.eq($type,1),n.eq($t("name"),"")))) ? ($top ? ",&#10;&#13;" : ",") : ""),$ret)));

})));

}

export function stringify(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ? fn.apply(stringify_2,$a) : (n.eq($s,3) ? fn.apply(stringify_3,$a) : n.seq()))));

}

export function exec($query,$params) /*n.item()*/ {

var $core,$n,$module,$frame;

return (($core = n.item(n.import("../lib/core.xql")),

$n = n.item(n.import("../lib/n.xql")),

(map.contains($params,"$transpile") ? ($module = n.item(n.import(n.concat(n.concat("../lib/",$params("$transpile")),".xql"))),$frame = n.item(map.put($params,"$imports",n.map(n.seq("core",$module)))),$module("$exports")("core:transpile#2")(parse($query,$params),$frame)) : ($frame = n.item(map.put($params,"$imports",n.map(n.seq("core",$core,"n",$n)))),n.eval(parse($query,$params))($frame)))));

}


export function operatorPrecedence($val,$operator,$ret) /*n.item()*/ {

var $rev,$last,$hasPrecedingOp,$isUnaryOp,$preceeds,$name,$args,$argsize,$nargs,$pre;

return (($rev = n.item(array.reverse($ret)),

$last = n.item(array.head($rev)),

$hasPrecedingOp = n.item(n.and(n.instanceOf($last,Map),fn.matches($last("name"),operatorRegexp))),

$isUnaryOp = n.item(n.and(n.geq(opInt($operator),8),n.seq(n.or(fn.empty($last),n.seq(n.geq(n.and(n.instanceOf(n.and($hasPrecedingOp,$last("suffix")),n.boolean()),$last("suffix")),fn.false())))))),

$operator = n.item(($isUnaryOp ? unaryOp($operator) : $operator)),

$preceeds = n.item(n.ggt(n.and($hasPrecedingOp,opInt($operator)),opInt($last("name")))),

$name = n.item(($preceeds ? $last("name") : $operator)),

$args = n.item(($preceeds ? ($argsize = n.item(array.size($last("args"))),$nargs = n.item(($isUnaryOp ? n.array(n.seq()) : n.filterAt(n.geq($_0,$last("args")),n.seq(2)))),$nargs = n.item(($val ? array.append($nargs,$val) : $nargs)),(n.and(n.ggt($argsize,1),$isUnaryOp) ? ($pre = n.item(($last("args")(2))),n.array(n.seq($last("args"),(1),n.map(n.seq("name",$pre("name"),"args",array.append($pre("args"),n.map(n.seq("name",$operator,"args",$nargs,"suffix",""))),"suffix",""))))) : n.array(n.seq($last("args"),(1),n.map(n.seq("name",$operator,"args",$nargs,"suffix","")))))) : ($nargs = n.item((fn.empty($last) ? n.array(n.seq()) : n.array(n.seq($last)))),($val ? array.append($nargs,$val) : $nargs)))),

array.append(array.reverse(array.tail($rev)),n.map(n.seq("name",$name,"args",$args,"suffix",fn.exists($val))))));

}

export function toOp($opnum) /*n.item()*/ {

return (map.contains(operatorMap,$opnum) ? n.concat("core:",operatorMap($opnum)) : n.concat("core:",fn.replace(operators($opnum)," ","-")));

}

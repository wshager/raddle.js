import * as xqc from "../lib/xq-compat.js";

import * as n from "../lib/n.js";

import * as a from "../lib/array-util.js";

import * as console from "../lib/console.js";

export const suffix = "\\+\\*\\-\\?";

export const ncname = xqc.ncname;

export const chars = n.concat(n.concat(suffix,ncname),"\\$:%/#@\\^");

export const filterRegexp = "(\\])|(,)?([^\\[\\]]*)(\\[?)";

export const parenRegexp = fn.concat("(\\)[",suffix,"]?)|(",xqc.operatorRegexp,"|,)?([",chars,"]*)(\\(?)");

export const protocolRegexp = "^((http[s]?|ftp|xmldb|xmldb:exist|file):/)?/*(.*)$";

export function mapPut($map,$key,$val) {

return n.item(map.new(n.seq($map,n.map(n.seq(n.array(n.seq($key,$val)))))));

}

export function parseStrings($strings,$normalizer,$params) {

var $i;

return n.item(n.seq(wrap(n.select(fn.analyzeString($normalizer(fn.stringJoin(fn.forEach(n.to(1,fn.count($strings)),function($i) /*n.item()*/ {

return n.item((n.atomic(n.eq(fn.name(n.filter($strings,function($_0) { return n.seq(n.geq(fn.position($_0),$i));})),"match")) ?

n.concat("$%",$i) :

n.select(n.filter($strings,function($_0) { return n.seq(n.geq(fn.position($_0),$i));}),function($_0) { return n.seq(fn.string($_0));})));

})),$params),parenRegexp),n.seq("fn:match")),$strings)).last());

}

export function normalizeQuery($query,$params) {

return n.item(fn.replace($query,"&#9;|&#10;|&#13;",""));

}

function parse_1($query) {

return n.item(parse($query,n.map(n.seq())));

}

function parse_2($query,$params) {

return n.item(parseStrings(n.select(fn.analyzeString($query,"('[^']*')|(&quot;[^&quot;]*&quot;)"),n.seq("*")),(n.atomic(n.geq($params("$compat"),"xquery")) ?

xqc.normalizeQuery :

normalizeQuery),$params));

}

export function parse(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.atomic(n.eq($s,1)) ?

fn.apply(parse_1,$a) :

(n.atomic(n.eq($s,2)) ?

fn.apply(parse_2,$a) :

n.seq())))).last());

}

export function getIndexFromTokens($tok) {

var $i;

return n.item(n.seq(fn.forEach(n.to(1,fn.count(fn.indexOf($tok,1))),function($i) /*n.item()*/ {

return n.item((n.atomic(n.filter(n.glt(n.filter(n.and(fn.exists(n.filter(fn.indexOf($tok,n.minus(1)),function($_0) { return n.seq(n.geq(fn.position($_0),$i));})),fn.indexOf($tok,n.minus(1))),function($_0) { return n.seq(n.geq(fn.position($_0),$i));}),fn.indexOf($tok,1)),function($_0) { return n.seq(n.geq(fn.position($_0),$i));})) ?

n.seq() :

n.add(n.filter(fn.indexOf($tok,1),function($_0) { return n.seq(n.geq(fn.position($_0),$i));}),1)));

})).last());

}

export function getIndex($rest) {

var $_;

return n.item(n.seq(n.filter(getIndexFromTokens(fn.forEach($rest,function($_1) /*n.item()*/ {

return n.item((n.atomic(n.filter(n.select($_,n.seq("fn:group")),function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),1));})) ?

1 :

(n.atomic(n.filter(n.select($_,n.seq("fn:group")),function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),4));})) ?

n.minus(1) :

0)));

})),function($_0) { return n.seq(n.geq(fn.position($_0),1));})).last());

}

export function clipString($str) {

return n.item(fn.substring($str,2,n.subtract(fn.stringLength($str),2)));

}

export function valueFromStrings($val,$strings) {

return n.item((n.atomic(fn.matches($val,"\\$%[0-9]+")) ?

fn.concat("&quot;",clipString(n.filter($strings,n.seq(fn.number(fn.replace($val,"\\$%([0-9]+)","$1"))))),"&quot;") :

$val));

}

export function appendOrNest($next,$strings,$group,$ret,$suffix) {

var $x,$operator,$rev,$last,$op,$hasPrecedingOp,$preceeds,$y;

return n.item(n.seq(($x = n.item((n.atomic(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),3));})) ?

n.map(n.seq(n.array(n.seq("name",valueFromStrings(n.select(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),3));}),function($_0) { return n.seq(fn.string($_0));}),$strings))),n.array(n.seq("args",wrap($next,$strings))),n.array(n.seq("suffix",$suffix)))) :

wrap($next,$strings))),

(n.atomic(fn.matches(n.select(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),2));}),function($_0) { return n.seq(fn.string($_0));}),n.concat(n.concat("^",xqc.operatorRegexp),"$"))) ?

n.seq($operator = n.item(n.select(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),2));}),function($_0) { return n.seq(fn.string($_0));})),(n.atomic(n.ggt(array.size($ret),0)) ?

n.seq($rev = n.item(array.reverse($ret)),$last = n.item(array.head($rev)),$ret = n.item(array.reverse(array.tail($rev))),$op = n.item(xqc.opInt($operator)),(n.atomic(fn.empty($last)) ?

array.append($ret,n.map(n.seq(n.array(n.seq("name",$operator)),n.array(n.seq("args",$x)),n.array(n.seq("suffix",""))))) :

n.seq($hasPrecedingOp = n.item(n.and(n.instanceOf($last,Map),fn.matches($last("name"),xqc.operatorRegexp))),$preceeds = n.item(n.and($hasPrecedingOp,n.ggt($op,xqc.opInt($last("name"))))),(n.atomic(n.and($preceeds,n.glt($op,20))) ?

n.seq($y = n.item(n.map(n.seq(n.array(n.seq("name",$operator)),n.array(n.seq("args",n.array(n.seq($last("args"),(2),$x)))),n.array(n.seq("suffix",""))))),array.append($ret,n.map(n.seq(n.array(n.seq("name",$last("name"))),n.array(n.seq("args",n.array(n.seq($last("args"),(1),$y)))),n.array(n.seq("suffix","")))))) :

array.append($ret,n.map(n.seq(n.array(n.seq("name",$operator)),n.array(n.seq("args",n.array(n.seq($last,$x)))),n.array(n.seq("suffix",""))))))))) :

array.append($ret,n.map(n.seq(n.array(n.seq("name",$operator)),n.array(n.seq("args",$x)),n.array(n.seq("suffix",""))))))) :

array.append($ret,$x)))).last());

}

export function appendPropOrValue($string,$operator,$strings,$ret) {

return n.item((n.atomic(fn.matches($operator,n.concat(xqc.operatorRegexp,"+"))) ?

(n.atomic(n.ggt(array.size($ret),0)) ?

xqc.operatorPrecedence((n.atomic(fn.exists($string)) ?

valueFromStrings($string,$strings) :

n.seq()),$operator,$ret) :

array.append($ret,n.map(n.seq(n.array(n.seq("name",xqc.unaryOp($operator))),n.array(n.seq("args",n.array(n.seq(valueFromStrings($string,$strings))))),n.array(n.seq("suffix","")))))) :

array.append($ret,valueFromStrings($string,$strings))));

}

export function wrapOpenParen($rest,$strings,$index,$group,$ret) {

return n.item(wrap(fn.subsequence($rest,$index),$strings,appendOrNest(fn.subsequence($rest,1,$index),$strings,$group,$ret,fn.replace(n.filter($rest,n.seq(n.subtract($index,1))),"\\)",""))));

}

function wrap_4($rest,$strings,$ret,$group) {

return n.item((n.atomic(fn.exists($rest)) ?

(n.atomic(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),4));})) ?

wrapOpenParen($rest,$strings,getIndex($rest),$group,$ret) :

(n.atomic(n.or(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),3));}),fn.matches(n.select(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),2));}),function($_0) { return n.seq(fn.string($_0));}),n.concat(xqc.operatorRegexp,"+|,")))) ?

wrap($rest,$strings,appendPropOrValue(n.select(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),3));}),function($_0) { return n.seq(fn.string($_0));}),n.select(n.filter($group,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),2));}),function($_0) { return n.seq(fn.string($_0));}),$strings,$ret)) :

wrap($rest,$strings,$ret))) :

$ret));

}

function wrap_3($match,$strings,$ret) {

return n.item(wrap(fn.tail($match),$strings,$ret,n.select(fn.head($match),n.seq("fn:group"))));

}

function wrap_2($match,$strings) {

var $name;

return n.item(n.seq(xqc.rename(wrap($match,$strings,n.array(n.seq())),function($name) /*n.item()*/ {

return n.item((n.atomic(fn.matches($name,xqc.operatorRegexp)) ?

xqc.toOp(xqc.opNum($name)) :

$name));

})).last());

}

export function wrap(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.atomic(n.eq($s,4)) ?

fn.apply(wrap_4,$a) :

(n.atomic(n.eq($s,3)) ?

fn.apply(wrap_3,$a) :

(n.atomic(n.eq($s,2)) ?

fn.apply(wrap_2,$a) :

n.seq()))))).last());

}

export function importModule($name,$params) {

var $mappath,$map,$location,$uri,$module;

return n.item(n.seq(($mappath = n.item((n.atomic(map.contains($params,"modules")) ?

$params("modules") :

"modules.xml")),

$map = n.item(n.select(n.select(fn.doc($mappath),n.seq("root")),n.seq("module"))),

$location = n.item(n.anyURI(n.selectAttribute(n.filter($map,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"name"),$name));}),"location"))),

$uri = n.item(n.anyURI(n.selectAttribute(n.filter($map,function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"name"),$name));}),"uri"))),

$module = n.item((n.atomic($location) ?

inspect.inspectModule($location) :

inspect.inspectModuleUri($uri))),

n.try(util.importModule(n.anyURI(n.selectAttribute($module,"uri")),n.selectAttribute($module,"prefix"),n.anyURI(n.selectAttribute($module,"location"))),n.seq()))).last());

}

function stringify_2($a,$params) {

return n.item(stringify($a,$params,fn.true()));

}

function stringify_3($a,$params,$top) {

var $s,$acc,$t,$i,$type,$ret;

return n.item(n.seq(($s = n.item(array.size($a)),

a.foldLeftAt($a,"",function($acc,$t,$i) /*n.item()*/ {

var $type,$ret;

return n.item(n.seq(($type = n.item((n.atomic(n.instanceOf($t,Map)) ?

1 :

(n.atomic(n.instanceOf($t,n.array(n.item()))) ?

2 :

0))),$ret = n.item((n.atomic(n.eq($type,1)) ?

fn.concat($t("name"),"(",fn.stringJoin(array.flatten(stringify($t("args"),$params,fn.false())),","),")",(n.atomic(n.instanceOf($t("suffix"),n.string())) ?

$t("suffix") :

"")) :

(n.atomic(n.eq($type,2)) ?

fn.concat("(",stringify($t,$params,fn.false()),")") :

$t))),fn.concat($acc,(n.atomic(n.and(n.ggt($i,1),fn.not(n.and(n.eq($type,1),n.eq($t("name"),""))))) ?

(n.atomic($top) ?

",&#10;&#13;" :

",") :

""),$ret))).last());

}))).last());

}

export function stringify(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.atomic(n.eq($s,2)) ?

fn.apply(stringify_2,$a) :

(n.atomic(n.eq($s,3)) ?

fn.apply(stringify_3,$a) :

n.seq())))).last());

}

export function exec($query,$params) {

var $core,$n,$module,$frame;

return n.item(n.seq(($core = n.item(n.import("../lib/core.xql")),

$n = n.item(n.import("../lib/n.xql")),

(n.atomic(map.contains($params,"$transpile")) ?

(n.atomic(n.eq($params("$transpile"),"rdl")) ?

stringify(parse($query,$params),$params) :

n.seq($module = n.item(n.import(n.concat(n.concat("../lib/",$params("$transpile")),".xql"))),$frame = n.item(map.put($params,"$imports",n.map(n.seq(n.array(n.seq("core",$module)))))),$module("$exports")("core:transpile#2")(parse($query,$params),$frame))) :

n.seq($frame = n.item(map.put($params,"$imports",n.map(n.seq(n.array(n.seq("core",$core)),n.array(n.seq("n",$n)))))),n.eval(parse($query,$params))($frame))))).last());

}

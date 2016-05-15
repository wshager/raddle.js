import * as n from "n.js";

import fn from "fn.js";

import * as map from "map.js";

import * as array from "array.js";

import * as console from "console.js";

export const ncname = "\\p{L}\\p{N}\\-_\\.";

export const qname = n.concat(n.concat(n.concat(n.concat(n.concat("[",ncname),"]*:?"),"["),ncname),"]+");

export const operatorRegexp = "=#\\p{N}+#?\\p{N}*=";

export const operators = n.map(n.seq(n.array(n.seq(1,",")),n.array(n.seq(n.decimal("2.01"),"some")),n.array(n.seq(n.decimal("2.02"),"every")),n.array(n.seq(n.decimal("2.03"),"switch")),n.array(n.seq(n.decimal("2.04"),"typeswitch")),n.array(n.seq(n.decimal("2.05"),"try")),n.array(n.seq(n.decimal("2.06"),"if")),n.array(n.seq(n.decimal("2.07"),"then")),n.array(n.seq(n.decimal("2.08"),"else")),n.array(n.seq(n.decimal("2.09"),"let")),n.array(n.seq(n.decimal("2.10"),":=")),n.array(n.seq(n.decimal("2.11"),"return")),n.array(n.seq(n.decimal("2.12"),"case")),n.array(n.seq(n.decimal("2.13"),"default")),n.array(n.seq(n.decimal("2.14"),"xquery")),n.array(n.seq(n.decimal("2.15"),"version")),n.array(n.seq(n.decimal("2.16"),"module")),n.array(n.seq(n.decimal("2.17"),"declare")),n.array(n.seq(n.decimal("2.18"),"variable")),n.array(n.seq(n.decimal("2.19"),"import")),n.array(n.seq(3,"or")),n.array(n.seq(4,"and")),n.array(n.seq(n.decimal("5.01"),"eq")),n.array(n.seq(n.decimal("5.02"),"ne")),n.array(n.seq(n.decimal("5.03"),"lt")),n.array(n.seq(n.decimal("5.04"),"le")),n.array(n.seq(n.decimal("5.05"),"gt")),n.array(n.seq(n.decimal("5.06"),"ge")),n.array(n.seq(n.decimal("5.07"),"=")),n.array(n.seq(n.decimal("5.08"),"!=")),n.array(n.seq(n.decimal("5.09"),"<=")),n.array(n.seq(n.decimal("5.10"),">=")),n.array(n.seq(n.decimal("5.11"),"<<")),n.array(n.seq(n.decimal("5.12"),">>")),n.array(n.seq(n.decimal("5.13"),"<")),n.array(n.seq(n.decimal("5.14"),">")),n.array(n.seq(n.decimal("5.15"),"is")),n.array(n.seq(6,"||")),n.array(n.seq(7,"to")),n.array(n.seq(n.decimal("8.01"),"+")),n.array(n.seq(n.decimal("8.02"),"-")),n.array(n.seq(n.decimal("9.01"),"*")),n.array(n.seq(n.decimal("9.02"),"idiv")),n.array(n.seq(n.decimal("9.03"),"div")),n.array(n.seq(n.decimal("9.04"),"mod")),n.array(n.seq(n.decimal("10.01"),"union")),n.array(n.seq(n.decimal("10.02"),"|")),n.array(n.seq(n.decimal("11.01"),"intersect")),n.array(n.seq(n.decimal("11.02"),"except")),n.array(n.seq(12,"instance of")),n.array(n.seq(13,"treat as")),n.array(n.seq(14,"castable as")),n.array(n.seq(15,"cast as")),n.array(n.seq(16,"=>")),n.array(n.seq(n.decimal("17.01"),"+")),n.array(n.seq(n.decimal("17.02"),"-")),n.array(n.seq(18,"!")),n.array(n.seq(n.decimal("19.01"),"/")),n.array(n.seq(n.decimal("19.02"),"//")),n.array(n.seq(n.decimal("19.03"),"/*")),n.array(n.seq(n.decimal("20.01"),"[")),n.array(n.seq(n.decimal("20.02"),"]")),n.array(n.seq(n.decimal("20.03"),"?")),n.array(n.seq(n.decimal("20.04"),"[")),n.array(n.seq(n.decimal("20.06"),"{")),n.array(n.seq(n.decimal("20.07"),"}")),n.array(n.seq(n.decimal("20.08"),"@")),n.array(n.seq(n.decimal("21.01"),"array")),n.array(n.seq(n.decimal("21.02"),"attribute")),n.array(n.seq(n.decimal("21.03"),"comment")),n.array(n.seq(n.decimal("21.04"),"document")),n.array(n.seq(n.decimal("21.05"),"element")),n.array(n.seq(n.decimal("21.06"),"function")),n.array(n.seq(n.decimal("21.07"),"map")),n.array(n.seq(n.decimal("21.08"),"namespace")),n.array(n.seq(n.decimal("21.09"),"processing-instruction")),n.array(n.seq(n.decimal("21.10"),"text")),n.array(n.seq(n.decimal("22.01"),"array")),n.array(n.seq(n.decimal("22.02"),"attribute")),n.array(n.seq(n.decimal("22.03"),"comment")),n.array(n.seq(n.decimal("22.04"),"document-node")),n.array(n.seq(n.decimal("22.05"),"element")),n.array(n.seq(n.decimal("22.06"),"empty-sequence")),n.array(n.seq(n.decimal("22.07"),"function")),n.array(n.seq(n.decimal("22.08"),"item")),n.array(n.seq(n.decimal("22.09"),"map")),n.array(n.seq(n.decimal("22.10"),"namespace-node")),n.array(n.seq(n.decimal("22.11"),"node")),n.array(n.seq(n.decimal("22.12"),"processing-instruction")),n.array(n.seq(n.decimal("22.13"),"schema-attribute")),n.array(n.seq(n.decimal("22.14"),"schema-element")),n.array(n.seq(n.decimal("22.15"),"text")),n.array(n.seq(24,"as")),n.array(n.seq(n.decimal("25.01"),"(:")),n.array(n.seq(n.decimal("25.02"),":)")),n.array(n.seq(26,":"))));

export const operatorsI = fn.foldLeft(map.keys(operators),n.map(n.seq()),function($pre,$cur) /*n.item()*/ {

return n.item(map.put($pre,operators($cur),$cur));

});

export const types = n.seq("untypedAtomic","dateTime","dateTimeStamp","date","time","duration","yearMonthDuration","dayTimeDuration","float","double","decimal","integer","nonPositiveInteger","negativeInteger","long","int","short","byte","nonNegativeInteger","unsignedLong","unsignedInt","unsignedShort","unsignedByte","positiveInteger","gYearMonth","gYear","gMonthDay","gDay","gMonth","string","normalizedString","token","language","NMTOKEN","Name","NCName","ID","IDREF","ENTITY","boolean","base64Binary","hexBinary","anyURI","QName","NOTATION");

export const operatorMap = n.map(n.seq(n.array(n.seq(n.decimal("2.09"),"item")),n.array(n.seq(n.decimal("5.01"),"eq")),n.array(n.seq(n.decimal("5.02"),"ne")),n.array(n.seq(n.decimal("5.03"),"lt")),n.array(n.seq(n.decimal("5.04"),"le")),n.array(n.seq(n.decimal("5.05"),"gt")),n.array(n.seq(n.decimal("5.06"),"ge")),n.array(n.seq(n.decimal("5.07"),"geq")),n.array(n.seq(n.decimal("5.08"),"gne")),n.array(n.seq(n.decimal("5.09"),"gle")),n.array(n.seq(n.decimal("5.10"),"gge")),n.array(n.seq(n.decimal("5.11"),"precedes")),n.array(n.seq(n.decimal("5.12"),"follows")),n.array(n.seq(n.decimal("5.13"),"glt")),n.array(n.seq(n.decimal("5.14"),"ggt")),n.array(n.seq(6,"concat")),n.array(n.seq(n.decimal("8.01"),"add")),n.array(n.seq(n.decimal("8.02"),"subtract")),n.array(n.seq(n.decimal("9.01"),"multiply")),n.array(n.seq(n.decimal("10.02"),"union")),n.array(n.seq(n.decimal("17.01"),"plus")),n.array(n.seq(n.decimal("17.02"),"minus")),n.array(n.seq(18,"for-each")),n.array(n.seq(n.decimal("19.01"),"select")),n.array(n.seq(n.decimal("19.02"),"select-all")),n.array(n.seq(n.decimal("20.01"),"filter")),n.array(n.seq(n.decimal("20.03"),"lookup")),n.array(n.seq(n.decimal("20.04"),"array")),n.array(n.seq(n.decimal("20.08"),"select-attribute"))));

export const fns = n.seq("position","last","name","node-name","nilled","string","data","base-uri","document-uri","number","string-length","normalize-space");

export function normalizeQuery($query,$params) {

var $cur,$next;

return n.item(n.seq(($query = n.item(fn.replace(fn.replace(fn.replace(fn.replace($query,"%3E",">"),"%3C","<"),"%2C",","),"%3A",":")),

$query = n.item(fn.foldLeft(n.filter(map.keys(operators),function($_0) { return n.seq(n.and(n.ne($_0,n.decimal("5.07")),n.ne($_0,1)));}),$query,function($cur,$next) /*n.item()*/ {

return n.item(fn.replace($cur,escapeForRegex($next),(n.truthy(n.eq(fn.round($next),22)) ?

fn.concat("$1",toOp($next),"$2") :

fn.concat("$1 ",opStr($next)," $2"))));

})),

$query = n.item(fn.foldLeft(types,$query,function($cur,$next) /*n.item()*/ {

return n.item(n.seq(($cur = n.item(fn.replace($cur,fn.concat("xs:",$next,"\\s*([^\\(])"),fn.concat("core:",$next,"()$1"))),fn.replace($cur,fn.concat("xs:",$next,"\\s*\\("),fn.concat("core:",$next,"(")))));

})),

$query = n.item(fn.replace($query,",","=#1=")),

$query = n.item(fn.replace($query,"=(#\\p{N}+#?\\p{N}*)=","%3D$1%3D")),

$query = n.item(fn.replace($query,"=","=#5#07=")),

$query = n.item(fn.replace($query,"%3D","=")),

$query = n.item(fn.replace($query,n.concat(n.concat("(",operatorRegexp),")")," $1 ")),

$query = n.item(fn.replace($query,"\\s+"," ")),

$query = n.item(fn.replace($query,"=#19#01=\\s*=#20#08=","=#20#08=")),

$query = n.item(block(n.filter(n.select(fn.analyzeString($query,"([^\\s\\(\\),\\.;]+)"),n.seq("*")),function($_0) { return n.seq(n.or(n.geq(fn.name($_0),"fn:match"),n.geq(fn.matches(fn.string($_0),"^\\s*$"),fn.false())));}),"")),

$query = n.item(fn.replace($query,"\\s+","")),

$query)).slice(-1));

}

export function seqtype($parts,$ret,$lastseen) {

var $head,$maybeSeqtype;

return n.item(n.seq(($head = n.item(n.select(n.filter(n.select(fn.head($parts),n.seq("fn:group")),function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),1));}),function($_0) { return n.seq(fn.string($_0));})),

$maybeSeqtype = n.item((n.truthy(fn.matches($head,operatorRegexp)) ?

opNum($head) :

0)),

(n.truthy(n.eq($maybeSeqtype,n.decimal("20.06"))) ?

body($parts,fn.concat($ret,","),n.seq($lastseen,n.decimal("21.06"))) :

seqtype(fn.tail($parts),$ret,$lastseen)))).slice(-1));

}

function as_3($param,$parts,$ret) {

return n.item(as($param,$parts,$ret,n.seq()));

}

function as_4($param,$parts,$ret,$lastseen) {

return n.item(as($param,$parts,$ret,$lastseen,fn.false(),fn.false()));

}

function as_6($param,$parts,$ret,$lastseen,$subtype,$seqtype) {

var $head,$next,$no,$non;

return n.item(n.seq(($head = n.item(n.select(fn.head($parts),function($_0) { return n.seq(fn.string($_0));})),

$next = n.item(n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),2));}),function($_0) { return n.seq(fn.string($_0));})),

$no = n.item((n.truthy(fn.matches($head,operatorRegexp)) ?

opNum($head) :

0)),

$non = n.item((n.truthy(fn.matches($next,operatorRegexp)) ?

opNum($next) :

0)),

(n.truthy(n.eq($no,n.decimal("20.06"))) ?

body($parts,fn.concat($ret,(n.truthy($subtype) ?

")" :

""),","),n.seq($lastseen,n.decimal("21.06"))) :

(n.truthy(n.eq($no,24)) ?

as($param,fn.tail($parts),fn.concat($ret,(n.truthy($subtype) ?

")" :

""),","),$lastseen,$subtype,fn.true()) :

(n.truthy(n.eq($no,1)) ?

(n.truthy($subtype) ?

as($param,fn.tail($parts),fn.concat($ret,","),$lastseen,$subtype,$seqtype) :

params(fn.tail($parts),fn.concat($ret,","))) :

(n.truthy(fn.matches($head,fn.concat("core:[",ncname,"]+"))) ?

(n.truthy(fn.matches($next,"^\\s*\\(\\s*$")) ?

as(n.seq(),fn.subsequence($parts,3),fn.concat($ret,$head,"(",$param,",",(n.truthy(n.eq($head,"core:function")) ?

"(" :

"")),$lastseen,fn.true(),$seqtype) :

as(n.seq(),fn.tail($parts),fn.concat($ret,$head,"(",$param,(n.truthy(n.eq($head,"core:function")) ?

",(" :

"")),$lastseen,$subtype,$seqtype)) :

(n.truthy(fn.matches($head,"[\\?\\+\\*]")) ?

as($param,fn.tail($parts),fn.concat($ret,$head),$lastseen,$subtype,$seqtype) :

(n.truthy(fn.matches($head,"^(\\(\\))?\\s*\\)")) ?

(n.truthy(n.and($subtype,n.geq($non,n.seq(1,24)))) ?

as($param,fn.tail($parts),fn.concat($ret,(n.truthy(n.eq($non,24)) ?

"" :

")")),$lastseen,fn.false(),$seqtype) :

(n.truthy(n.eq($non,24)) ?

as(n.seq(),fn.tail($parts),fn.concat($ret,(n.truthy($subtype) ?

")" :

""),"))"),$lastseen) :

(n.truthy(n.eq($non,n.decimal("20.06"))) ?

body(fn.tail($parts),fn.concat($ret,(n.truthy($subtype) ?

")" :

""),(n.truthy(fn.matches($head,"^\\(\\)")) ?

")" :

""),"),core:item(),"),n.seq($lastseen,n.decimal("21.06"))) :

console.log($parts)))) :

as($param,fn.tail($parts),fn.concat($ret,(n.truthy(n.and(n.eq($non,1),$seqtype)) ?

")" :

""),")"),$lastseen,$subtype,$seqtype))))))))).slice(-1));

}

export function as(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.truthy(n.eq($s,3)) ?

fn.apply(as_3,$a) :

(n.truthy(n.eq($s,4)) ?

fn.apply(as_4,$a) :

(n.truthy(n.eq($s,6)) ?

fn.apply(as_6,$a) :

n.seq()))))).slice(-1));

}

function params_2($parts,$ret) {

return n.item(params($parts,$ret,n.seq()));

}

function params_3($parts,$ret,$lastseen) {

var $maybeParam,$next;

return n.item(n.seq(($maybeParam = n.item(n.select(fn.head($parts),function($_0) { return n.seq(fn.string($_0));})),

$next = n.item(n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),2));}),function($_0) { return n.seq(fn.string($_0));})),

(n.truthy(fn.matches($maybe-param,"^(\\(\\))?\\s*\\)")) ?

(n.truthy(n.eq($next,"=#24=")) ?

as(n.seq(),fn.tail($parts),fn.concat($ret,")"),$lastseen) :

body(fn.tail($parts),fn.concat($ret,"),core:item(),"),n.seq($lastseen,n.decimal("21.06")))) :

(n.truthy(fn.matches($maybe-param,"=#1=")) ?

params(fn.tail($parts),fn.concat($ret,","),$lastseen) :

(n.truthy(fn.matches($maybe-param,"^\\$")) ?

(n.truthy(n.eq($next,"=#24=")) ?

as(fn.replace($maybe-param,"^\\$","\\$,"),fn.subsequence($parts,3),$ret,$lastseen) :

params(fn.tail($parts),fn.concat($ret,"core:item(",fn.replace($maybe-param,"^\\$","\\$,"),")"),$lastseen)) :

params(fn.tail($parts),$ret,$lastseen)))))).slice(-1));

}

export function params(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.truthy(n.eq($s,2)) ?

fn.apply(params_2,$a) :

(n.truthy(n.eq($s,3)) ?

fn.apply(params_3,$a) :

n.seq())))).slice(-1));

}

export function xfn($parts,$ret) {

return n.item(params(fn.tail($parts),n.concat(n.select(n.filter(n.concat($ret,n.select(fn.head($parts),n.seq("fn:group"))),function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),1));}),function($_0) { return n.seq(fn.string($_0));}),",(),(")));

}

export function ns($parts,$ret) {

var $ns,$rest;

return n.item(n.seq(($ns = n.item(fn.replace(n.select(fn.head($parts),function($_0) { return n.seq(fn.string($_0));}),"\\s","")),

$rest = n.item(fn.tail($parts)),

fn.stringJoin($rest))).slice(-1));

}

export function xvar($parts,$ret) {

return n.item(body(fn.subsequence($parts,3),fn.concat($ret,n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),1));}),function($_0) { return n.seq(fn.string($_0));}),",(),"),n.seq(n.decimal("2.18"))));

}

function annot_2($parts,$ret) {

return n.item(annot($parts,$ret,""));

}

function annot_3($parts,$ret,$annot) {

var $maybeAnnot,$rest;

return n.item(n.seq(($maybeAnnot = n.item(n.select(n.filter(n.select(fn.head($parts),n.seq("fn:group")),function($_0) { return n.seq(n.geq(n.selectAttribute($_0,"nr"),1));}),function($_0) { return n.seq(fn.string($_0));})),

$rest = n.item(fn.tail($parts)),

(n.truthy(fn.matches($maybe-annot,"^%")) ?

annot($rest,$ret,fn.replace($maybe-annot,"^%","-")) :

(n.truthy(n.geq($maybeAnnot,"=#21#06=")) ?

xfn($rest,n.concat(n.concat(n.concat($ret,"core:define"),$annot),"($,")) :

(n.truthy(n.geq($maybeAnnot,"=#2#18=")) ?

xvar($rest,n.concat(n.concat(n.concat($ret,"core:var"),$annot),"($,")) :

$ret))))).slice(-1));

}

export function annot(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.truthy(n.eq($s,2)) ?

fn.apply(annot_2,$a) :

(n.truthy(n.eq($s,3)) ?

fn.apply(annot_3,$a) :

n.seq())))).slice(-1));

}

export function xversion($parts,$ret) {

return n.item(block(fn.subsequence($parts,3),fn.concat($ret,"core:xq-version($,",n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),2));}),function($_0) { return n.seq(fn.string($_0));}),")")));

}

export function xmodule($parts,$ret) {

return n.item(block(fn.subsequence($parts,5),fn.concat($ret,"core:module($,",n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),2));}),function($_0) { return n.seq(fn.string($_0));}),",",n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),4));}),function($_0) { return n.seq(fn.string($_0));}),",())")));

}

function close_2($lastseen,$no) {

return n.item(close(fn.reverse($lastseen),$no,n.seq()));

}

function close_3($lastseen,$no,$ret) {

return n.item((n.truthy(n.or(fn.empty($lastseen),n.eq($no,0))) ?

fn.reverse(n.seq($ret,$lastseen)) :

(n.truthy(n.ne(fn.head($lastseen),n.decimal("0.01"))) ?

close(fn.tail($lastseen),$no,n.seq(fn.head($lastseen),$ret)) :

close(fn.tail($lastseen),n.subtract($no,1),$ret))));

}

export function close(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.truthy(n.eq($s,2)) ?

fn.apply(close_2,$a) :

(n.truthy(n.eq($s,3)) ?

fn.apply(close_3,$a) :

n.seq())))).slice(-1));

}

function closer_1($b) {

return n.item(closer(fn.reverse($b),0));

}

function closer_2($b,$c) {

return n.item((n.truthy(n.and(fn.exists($b),n.geq(fn.head($b),n.seq(n.decimal("2.08"),n.decimal("2.11"))))) ?

closer(fn.tail($b),n.add($c,1)) :

$c));

}

export function closer(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.truthy(n.eq($s,1)) ?

fn.apply(closer_1,$a) :

(n.truthy(n.eq($s,2)) ?

fn.apply(closer_2,$a) :

n.seq())))).slice(-1));

}

export function lastIndexOf($lastseen,$a) {

var $id;

return n.item(n.seq(($id = n.item(fn.indexOf($lastseen,$a)),

(n.truthy(fn.empty($id)) ?

1 :

n.filter($id,function($_0) { return n.seq(fn.last($_0));})))).slice(-1));

}

export function pop($a) {

return n.item(fn.reverse(fn.tail(fn.reverse($a))));

}

export function anon($head,$parts,$ret,$lastseen) {

return n.item(params($parts,n.concat($ret,"core:function(("),$lastseen));

}

export function comment($parts,$ret,$lastseen) {

var $head,$rest;

return n.item(n.seq(($head = n.item(n.select(fn.head($parts),function($_0) { return n.seq(fn.string($_0));})),

$rest = n.item(fn.tail($parts)),

(n.truthy(n.geq($head,"=#25#02=")) ?

body($rest,$ret,$lastseen) :

comment($rest,$ret,$lastseen)))).slice(-1));

}

export function bodyOp($no,$next,$lastseen,$rest,$ret) {

var $llast,$old,$closer,$qn,$positional,$hascomma,$letopener,$n,$elsecloser,$retncloser,$letclose,$letcloser,$lastindex,$closes,$last,$nu;

return n.item(n.seq(($llast = n.item(n.filter($lastseen,function($_0) { return n.seq(fn.last($_0));})),

$ret = n.item((n.truthy(n.eq($llast,n.decimal("19.01"))) ?

fn.concat($ret,")") :

$ret)),

$lastseen = n.item((n.truthy(n.eq($llast,n.decimal("19.01"))) ?

pop($lastseen) :

$lastseen)),

(n.truthy(n.eq($no,1)) ?

n.seq($old = n.item($lastseen),$closer = n.item(closer($lastseen)),$lastseen = n.item(fn.subsequence($lastseen,1,n.subtract(fn.count($lastseen),$closer))),$ret = n.item(fn.concat($ret,fn.stringJoin(n.forEach(n.seq(n.to(1,$closer)),")")),(n.truthy(n.eq(n.filter($lastseen,function($_0) { return n.seq(n.subtract(fn.last($_0),1));}),n.decimal("21.07"))) ?

")),=#20#04=((" :

","))),body($rest,$ret,$lastseen)) :

(n.truthy(n.eq($no,n.decimal("25.01"))) ?

comment($rest,$ret,$lastseen) :

(n.truthy(n.eq($no,n.decimal("21.06"))) ?

anon($next,fn.tail($rest),$ret,$lastseen) :

(n.truthy(n.eq(fn.round($no),21)) ?

n.seq($ret = n.item(fn.concat($ret,opStr($no),"(")),$qn = n.item((n.truthy(n.ne($next,"=#20#06=")) ?

$next :

n.seq())),$rest = n.item((n.truthy(fn.exists($qn)) ?

fn.tail($rest) :

$rest)),$ret = n.item((n.truthy(fn.exists($qn)) ?

fn.concat($ret,$next,",") :

$ret)),body($rest,$ret,n.seq($lastseen,$no))) :

n.seq($old = n.item($lastseen),$llast = n.item(n.filter($lastseen,function($_0) { return n.seq(fn.last($_0));})),$positional = n.item(n.eq(n.filter(n.and(n.and(n.and(n.eq($no,n.decimal("20.01")),$next),fn.matches($next,n.concat(n.concat("^([\\+\\-]?(\\p{N}+))$|^\\$[",ncname),"]+$"))),$rest),function($_0) { return n.seq(n.geq(fn.position($_0),2));}),"=#20#02=")),$hascomma = n.item(n.eq(fn.substring($ret,fn.stringLength($ret)),",")),$letopener = n.item(n.and(n.eq($no,n.decimal("2.09")),n.seq(n.or(fn.not(n.or(n.geq($llast,n.seq(n.decimal("2.09"),n.decimal("2.10"))),n.seq(n.and(n.eq($llast,n.decimal("2.08")),n.geq($hascomma,fn.false()))))),n.seq(n.eq($llast,n.decimal("20.06"))))))),$n = n.item((n.truthy(n.eq($no,n.decimal("2.09"))) ?

console.log($llast) :

n.seq())),$elsecloser = n.item((n.truthy(n.eq($no,n.decimal("2.08"))) ?

lastIndexOf($lastseen,n.decimal("2.07")) :

0)),$retncloser = n.item((n.truthy(n.eq($no,n.decimal("2.11"))) ?

lastIndexOf($lastseen,n.decimal("2.1")) :

0)),$letclose = n.item(n.and(n.and(n.eq($no,n.decimal("2.09")),fn.not(n.or(n.eq($llast,n.decimal("20.06")),fn.empty($lastseen)))),n.geq($hascomma,fn.false()))),$letcloser = n.item((n.truthy(n.and($letclose,n.geq($llast,n.seq(n.decimal("2.08"),n.decimal("2.11"))))) ?

closer($lastseen) :

0)),$ret = n.item(fn.concat($ret,(n.truthy(n.and(n.eq($no,n.decimal("20.06")),n.eq($llast,n.decimal("21.07")))) ?

(n.truthy(n.eq($next,"=#20#07=")) ?

"())" :

"(=#20#04=((") :

(n.truthy(n.geq($no,n.seq(n.decimal("2.06"),n.decimal("2.09"),n.decimal("20.01"),n.decimal("20.04")))) ?

fn.concat((n.truthy($letclose) ?

fn.concat(fn.stringJoin(n.forEach(n.seq(n.to(1,$letcloser)),")")),(n.truthy(n.eq(n.filter($lastseen,function($_0) { return n.seq(n.subtract(fn.last($_0),$letcloser));}),n.decimal("2.10"))) ?

")" :

""),(n.truthy($hascomma) ?

"" :

",")) :

""),(n.truthy($letopener) ?

"(" :

""),opStr($no),(n.truthy(n.eq($no,n.decimal("20.04"))) ?

"(" :

""),(n.truthy(n.eq($no,n.decimal("2.06"))) ?

"" :

"("),(n.truthy(n.eq($no,n.decimal("2.09"))) ?

fn.concat("$,",fn.replace($next,"^\\$|\\s","")) :

(n.truthy(n.eq($no,n.decimal("20.01"))) ?

fn.concat((n.truthy(fn.matches($next,"#20#08")) ?

"." :

(n.truthy($positional) ?

"position(.)=#5#07=" :

"")),$next) :

""))) :

(n.truthy(n.or(n.eq($no,26),n.seq(n.eq(n.filter(n.and(n.eq($no,n.decimal("2.10")),$lastseen),function($_0) { return n.seq(n.subtract(fn.last($_0),1));}),n.decimal("21.07"))))) ?

"," :

(n.truthy(n.eq($no,n.decimal("20.07"))) ?

n.seq($lastindex = n.item(lastIndexOf($lastseen,n.decimal("20.06"))),$closes = n.item(n.filter(fn.subsequence($lastseen,$lastindex,fn.count($lastseen)),function($_0) { return n.seq(n.geq($_0,n.seq(n.decimal("2.08"),n.decimal("2.11"))));})),$closes = n.item(n.seq($closes,n.decimal("2.11"))),$llast = n.item(n.filter($lastseen,function($_0) {
	return n.seq(n.geq(n.position($_0),n.subtract($lastindex,1)));
})),fn.concat(fn.stringJoin(n.forEach($closes,")")),(n.truthy(n.eq($next,"=#20#06=")) ?

"," :

(n.truthy(n.eq($llast,n.decimal("21.07"))) ?

")))" :

(n.truthy(n.eq(fn.round($llast),21)) ?

")" :

""))))) :

(n.truthy(n.geq($no,n.seq(n.decimal("2.07"),n.decimal("2.10")))) ?

fn.concat((n.truthy(n.eq($llast,n.decimal("2.11"))) ?

")" :

""),",") :

(n.truthy(n.eq($no,n.decimal("2.08"))) ?

fn.concat(fn.stringJoin(n.forEach(fn.subsequence($lastseen,n.add($elsecloser,1)),")")),",") :

(n.truthy(n.eq($no,n.decimal("2.11"))) ?

fn.concat(fn.stringJoin(n.forEach(fn.subsequence($lastseen,n.add($retncloser,1)),")")),"),") :

(n.truthy(n.eq($no,n.decimal("20.02"))) ?

(n.truthy(n.eq($llast,n.decimal("20.04"))) ?

"))" :

")") :

(n.truthy(n.eq($no,n.decimal("20.06"))) ?

"(" :

(n.truthy(n.eq($no,n.decimal("19.01"))) ?

n.concat(opStr($no),"(") :

opStr($no))))))))))))),$rest = n.item((n.truthy(n.and(n.and(n.eq($no,n.decimal("20.06")),n.eq($llast,n.decimal("21.07"))),n.eq($next,"=#20#07="))) ?

fn.tail($rest) :

(n.truthy(n.or(fn.empty($rest),fn.not(n.geq($no,n.seq(n.decimal("2.09"),n.decimal("20.01")))))) ?

$rest :

(n.truthy(n.and(n.geq($next,fns),fn.matches(n.filter($rest,function($_0) { return n.seq(n.geq(fn.position($_0),2));}),"\\)"))) ?

fn.insertBefore(fn.remove(fn.tail($rest),1),1,n.element(n.seq(n.element(n.seq(n.attribute(n.seq(1)),"(.)"))))) :

fn.tail($rest))))),$lastseen = n.item((n.truthy(n.geq($no,n.seq(n.decimal("2.06"),n.decimal("2.09"),n.decimal("20.01"),n.decimal("20.04")))) ?

n.seq($lastseen = n.item((n.truthy($letclose) ?

fn.subsequence($lastseen,1,n.subtract(fn.count($lastseen),$letcloser)) :

$lastseen)),$lastseen = n.item((n.truthy(n.eq(n.filter(n.and($letclose,$lastseen),function($_0) { return n.seq(fn.last($_0));}),n.decimal("2.10"))) ?

pop($lastseen) :

$lastseen)),($lastseen,$no)) :

(n.truthy(n.or(n.eq($no,26),n.seq(n.eq(n.filter(n.and(n.eq($no,n.decimal("2.10")),$lastseen),function($_0) { return n.seq(n.subtract(fn.last($_0),1));}),n.decimal("21.07"))))) ?

$lastseen :

(n.truthy(n.geq($no,n.decimal("20.07"))) ?

n.seq($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract(lastIndexOf($lastseen,n.decimal("20.06")),1))),(n.truthy(n.and(n.eq(fn.round(n.filter($lastseen,function($_0) { return n.seq(fn.last($_0));})),21),n.ne($next,"=#20#06="))) ?

pop($lastseen) :

$lastseen)) :

(n.truthy(n.geq($no,n.seq(n.decimal("2.07"),n.decimal("2.10")))) ?

n.seq($lastseen = n.item((n.truthy(n.or(n.eq($llast,n.decimal("2.11")),n.seq(n.and(n.eq($no,n.decimal("2.07")),n.eq($llast,n.decimal("0.01")))))) ?

pop($lastseen) :

$lastseen)),$last = n.item(n.filter(fn.indexOf($lastseen,n.subtract($no,n.decimal(n.decimal("0.01")))),function($_0) { return n.seq(fn.last($_0));})),(remove($lastseen,$last),$no)) :

(n.truthy(n.eq($no,n.decimal("2.08"))) ?

n.seq($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract($elsecloser,1))),($lastseen,$no)) :

(n.truthy(n.eq($no,n.decimal("2.11"))) ?

n.seq($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract($retncloser,1))),($lastseen,$no)) :

(n.truthy(n.and(n.and(n.eq($no,n.decimal("20.06")),n.eq($llast,n.decimal("21.07"))),n.eq($next,"=#20#07="))) ?

pop($lastseen) :

(n.truthy(n.or(n.or(n.eq($no,n.decimal("20.06")),n.eq(fn.round($no),21)),n.eq($no,n.decimal("19.01")))) ?

n.seq($lastseen,$no) :

(n.truthy(n.eq($no,n.decimal("20.02"))) ?

pop($lastseen) :

$lastseen)))))))))),$nu = n.item(console.log(n.seq($no," :: ",fn.stringJoin($old,","),"->",fn.stringJoin($lastseen,",")," || ",fn.replace(fn.replace($ret,"=#2#06=","if"),"=#2#09=","let")))),body($rest,$ret,$lastseen)))))))).slice(-1));

}

export function isArray($head,$non,$next) {

return n.item(n.and(n.and(n.eq($non,n.decimal("20.01")),n.geq(fn.matches($head,"\\)\\s*$"),fn.false())),fn.matches($head,n.concat(n.concat("^(\\s|\\(|,|",operatorRegexp),")"))));

}

export function diff($a,$b) {

var $x,$y;

return n.item(n.seq(($x = n.item(n.filter($b,function($_0) { return n.seq(fn.not(n.geq($_0,$a)));})),

$y = n.item(n.filter($a,function($_0) { return n.seq(fn.not(n.geq($_0,$b)));})),

fn.concat("+",fn.stringJoin($x,","),",","-",fn.stringJoin($y,",")))).slice(-1));

}

export function parenCloser($head,$lastseen) {

var $cp,$old,$d;

return n.item((n.truthy(fn.matches($head,"[\\(\\)]+")) ?

n.seq($cp = n.item(fn.stringToCodepoints($head)),$old = n.item($lastseen),$lastseen = n.item(n.seq($lastseen,n.forEach(n.filter($cp,function($_0) { return n.seq(n.eq($_0,40));}),n.decimal("0.01")))),$lastseen = n.item(close($lastseen,fn.count(n.filter($cp,function($_0) { return n.seq(n.eq($_0,41));})))),$d = n.item(diff($old,$lastseen)),$lastseen) :

$lastseen).slice(-1));

}

function body_2($parts,$ret) {

return n.item(body($parts,$ret,n.seq()));

}

function body_3($parts,$ret,$lastseen) {

var $head,$rest,$next,$non;

return n.item((n.truthy(fn.empty($parts)) ?

fn.concat($ret,fn.stringJoin(n.forEach(n.filter($lastseen,function($_0) { return n.seq(n.geq($_0,n.seq(n.decimal("2.08"),n.decimal("2.11"),n.decimal("20.07"))));}),")"))) :

n.seq($head = n.item(n.select(fn.head($parts),function($_0) { return n.seq(fn.string($_0));})),$rest = n.item(fn.tail($parts)),$lastseen = n.item(parenCloser($head,$lastseen)),(n.truthy(n.geq($head,"=#25#01=")) ?

comment($rest,$ret,$lastseen) :

(n.truthy(fn.matches($head,";")) ?

block($parts,(n.truthy(n.eq(n.filter($lastseen,function($_0) { return n.seq(fn.last($_0));}),n.decimal("2.18"))) ?

fn.concat($ret,fn.replace($head,";",""),")") :

$ret)) :

n.seq($next = n.item((n.truthy(fn.empty($rest)) ?

n.seq() :

n.select(fn.head($rest),function($_0) { return n.seq(fn.string($_0));}))),$non = n.item((n.truthy(fn.matches($next,operatorRegexp)) ?

opNum($next) :

0)),$rest = n.item((n.truthy(isArray($head,$non,$next)) ?

fn.insertBefore(fn.tail($rest),1,n.element(n.seq(n.element(n.seq(n.attribute(n.seq(1)),opStr(n.decimal("20.04"))))))) :

(n.truthy(n.and(n.geq($head,fns),fn.matches($next,"\\)"))) ?

fn.insertBefore(fn.tail($rest),1,n.element(n.seq(n.element(n.seq(n.attribute(n.seq(1)),"(.)"))))) :

$rest))),$head = n.item((n.truthy(n.and(n.geq($ret,""),n.eq($head,"=#20#01="))) ?

"=#20#04=" :

$head)),(n.truthy(fn.matches($head,operatorRegexp)) ?

bodyOp(opNum($head),$next,$lastseen,$rest,$ret) :

body($rest,fn.concat($ret,$head),$lastseen))))))).slice(-1));

}

export function body(... $a) {

var $s;

return n.item(n.seq(($s = n.integer(array.size($a)),

(n.truthy(n.eq($s,2)) ?

fn.apply(body_2,$a) :

(n.truthy(n.eq($s,3)) ?

fn.apply(body_3,$a) :

n.seq())))).slice(-1));

}

export function ximport($parts,$ret) {

var $rest,$maybeAt;

return n.item(n.seq(($rest = n.item(fn.subsequence($parts,6)),

$maybeAt = n.item(n.select(fn.head($rest),function($_0) { return n.seq(fn.string($_0));})),

(n.truthy(fn.matches($maybe-at,"at")) ?

block(fn.subsequence($rest,3),fn.concat($ret,"core:import($,",n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),3));}),function($_0) { return n.seq(fn.string($_0));}),",",n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),5));}),function($_0) { return n.seq(fn.string($_0));}),",",n.select(n.filter($rest,function($_0) { return n.seq(n.geq(fn.position($_0),2));}),function($_0) { return n.seq(fn.string($_0));}),")")) :

block($rest,fn.concat($ret,"core:import($,",n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),3));}),function($_0) { return n.seq(fn.string($_0));}),",",n.select(n.filter($parts,function($_0) { return n.seq(n.geq(fn.position($_0),5));}),function($_0) { return n.seq(fn.string($_0));}),")"))))).slice(-1));

}

export function block($parts,$ret) {

var $val,$rest,$no;

return n.item((n.truthy(fn.empty($parts)) ?

$ret :

n.seq($val = n.item(n.select(fn.head($parts),function($_0) { return n.seq(fn.string($_0));})),$rest = n.item(fn.tail($parts)),(n.truthy(fn.matches($val,operatorRegexp)) ?

n.seq($no = n.item(opNum($val)),(n.truthy(n.eq($no,n.decimal("2.14"))) ?

xversion($rest,$ret) :

(n.truthy(n.eq($no,n.decimal("2.16"))) ?

xmodule($rest,$ret) :

(n.truthy(n.eq($no,n.decimal("2.17"))) ?

annot($rest,$ret) :

(n.truthy(n.eq($no,n.decimal("2.19"))) ?

ximport($rest,$ret) :

body($parts,$ret)))))) :

(n.truthy(fn.matches($val,";")) ?

(n.truthy(fn.empty($rest)) ?

$ret :

block($rest,n.concat($ret,","))) :

body($parts,$ret))))).slice(-1));

}

export function toOp($opnum) {

return n.item((n.truthy(map.contains(operatorMap,$opnum)) ?

n.concat("core:",operatorMap($opnum)) :

n.concat("core:",fn.replace(operators($opnum)," ","-"))));

}

export function fromOp($op) {

var $k,$i;

return n.item(n.seq(($k = n.item(map.keys(operatorsI)),

$i = n.item(n.filter(fn.indexOf($k,fn.replace($op,"^core:","")),function($_0) { return n.seq(n.geq(fn.position($_0),1));})),

n.decimal(operatorsI(n.filter($k,function($_0) { return n.seq(n.geq(fn.position($_0),$i));}))))).slice(-1));

}

export function rename($a,$fn) {

var $t;

return n.item(n.seq(array.forEach($a,function($t) /*n.item()*/ {

return n.item((n.truthy(n.instanceOf($t,Map)) ?

n.map(n.seq(n.array(n.seq("name",$fn($t("name")))),n.array(n.seq("args",rename($t("args"),$fn))),n.array(n.seq("suffix",$t("suffix"))))) :

$t));

})).slice(-1));

}

export function escapeForRegex($key) {

var $arg,$pre;

return n.string(n.seq(($arg = n.item(operators($key)),

$pre = n.item("(^|[\\s,\\(\\);\\[\\]]+)"),

(n.truthy(fn.matches($arg,"\\p{L}+")) ?

(n.truthy(n.eq($key,n.decimal("21.06"))) ?

n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.concat($pre,$arg),"([\\s"),ncname),":]*\\s*\\(([\\$"),ncname),":\\(\\),\\?\\+\\*\\s])*\\)\\s*(as\\s+["),ncname),":\\(\\)]+)?\\s*=#20#06=)") :

(n.truthy(n.eq(fn.round($key),21)) ?

n.concat(n.concat(n.concat(n.concat($pre,$arg),"([\\s\\$"),ncname),",:]*=#20#06)") :

(n.truthy(n.or(n.eq($key,n.decimal("2.04")),n.eq(fn.round($key),22))) ?

n.concat(n.concat($pre,$arg),"(\\()") :

(n.truthy(n.eq(fn.round($key),24)) ?

n.concat(n.concat($pre,$arg),"(\\s)") :

(n.truthy(n.geq($arg,"if")) ?

n.concat(n.concat($pre,$arg),"(\\s?)") :

(n.truthy(n.geq($arg,"then")) ?

n.concat(n.concat("\\)(\\s*)",$arg),"(\\s?)") :

n.concat(n.concat("(^|\\s)",$arg),"(\\s|$)"))))))) :

n.seq($arg = n.item(fn.replace($arg,"(\\.|\\[|\\]|\\\\|\\||\\-|\\^|\\$|\\?|\\*|\\+|\\{|\\}|\\(|\\))","\\$1")),(n.truthy(n.eq($key,26)) ?

n.concat(n.concat("(\\s?)",$arg),"(\\s*[^\\p{L}])") :

(n.truthy(n.eq($key,n.decimal("2.10"))) ?

"(\\s?):\\s*=([^#])" :

(n.truthy(n.geq($key,n.seq(n.decimal("8.02"),n.decimal("17.02")))) ?

n.concat(n.concat($pre,$arg),"([\\s\\p{N}])?") :

(n.truthy(n.geq($key,n.seq(n.decimal("8.01"),n.decimal("9.01"),n.decimal("20.03")))) ?

n.concat(n.concat("([^/])",$arg),"(\\s?[^,\\)])") :

n.concat(n.concat("(\\s?)",$arg),"(\\s?)"))))))))).slice(-1));

}

export function unaryOp($op) {

return n.item(opStr(n.add(opNum($op),9)));

}

export function opInt($op) {

return n.item(n.decimal(fn.replace($op,"^=#(\\p{N}+)#?\\p{N}*=$","$1")));

}

export function opNum($op) {

return n.decimal(n.decimal(fn.replace($op,"^=#(\\p{N}+)#?(\\p{N}*)=$","$1.$2")));

}

export function opStr($op) {

return n.item(fn.concat("=#",fn.replace(fn.string($op),"\\.","#"),"="));

}

export function operatorPrecedence($val,$operator,$ret) {

var $rev,$last,$hasPrecedingOp,$isUnaryOp,$preceeds,$name,$args,$argsize,$nargs,$pre;

return n.item(n.seq(($rev = n.item(array.reverse($ret)),

$last = n.item(array.head($rev)),

$hasPrecedingOp = n.item(n.and(n.instanceOf($last,Map),fn.matches($last("name"),operatorRegexp))),

$isUnaryOp = n.item(n.and(n.geq(opInt($operator),8),n.seq(n.or(fn.empty($last),n.seq(n.and(n.and($hasPrecedingOp,n.instanceOf($last("suffix"),n.boolean())),n.geq($last("suffix"),fn.false()))))))),

$operator = n.item((n.truthy($isUnaryOp) ?

unaryOp($operator) :

$operator)),

$preceeds = n.item(n.and($hasPrecedingOp,n.ggt(opInt($operator),opInt($last("name"))))),

$name = n.item((n.truthy($preceeds) ?

$last("name") :

$operator)),

$args = n.item((n.truthy($preceeds) ?

n.seq($argsize = n.item(array.size($last("args"))),$nargs = n.item((n.truthy($isUnaryOp) ?

n.array(n.seq()) :

n.filter($last("args"),n.seq(2)))),$nargs = n.item((n.truthy($val) ?

array.append($nargs,$val) :

$nargs)),(n.truthy(n.and(n.ggt($argsize,1),$isUnaryOp)) ?

n.seq($pre = n.item(($last("args")(2))),n.array(n.seq($last("args"),(1),n.map(n.seq(n.array(n.seq("name",$pre("name"))),n.array(n.seq("args",array.append($pre("args"),n.map(n.seq(n.array(n.seq("name",$operator)),n.array(n.seq("args",$nargs)),n.array(n.seq("suffix",""))))))),n.array(n.seq("suffix",""))))))) :

n.array(n.seq($last("args"),(1),n.map(n.seq(n.array(n.seq("name",$operator)),n.array(n.seq("args",$nargs)),n.array(n.seq("suffix","")))))))) :

n.seq($nargs = n.item((n.truthy(fn.empty($last)) ?

n.array(n.seq()) :

n.array(n.seq($last)))),(n.truthy($val) ?

array.append($nargs,$val) :

$nargs)))),

array.append(array.reverse(array.tail($rev)),n.map(n.seq(n.array(n.seq("name",$name)),n.array(n.seq("args",$args)),n.array(n.seq("suffix",fn.exists($val)))))))).slice(-1));

}

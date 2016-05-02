/* xquery version "3.1" */

/*module namespace xqc="http://raddle.org/xquery-compat";

n.seq()*/

import * as console from "http://exist-db.org/xquery/console";

export const ncname = "\p{L}\p{N}\-_\.";

export const qname = n.concat(n.concat(n.concat(n.concat(n.concat("[",ncname),"]*:?"),"["),ncname),"]+");

export const operatorRegexp = "=#\p{N}+#?\p{N}*=";

export const operators = n.map(n.seq(1,",",2.01,"some",2.02,"every",2.03,"switch",2.04,"typeswitch",2.05,"try",2.06,"if",2.07,"then",2.08,"else",2.09,"let",2.1,":=",2.11,"return",2.12,"case",2.13,"default",2.14,"xquery",2.15,"version",2.16,"module",2.17,"declare",2.18,"variable",2.19,"import",3,"or",4,"and",5.01,"eq",5.02,"ne",5.03,"lt",5.04,"le",5.05,"gt",5.06,"ge",5.07,"=",5.08,"!=",5.09,"<=",5.1,">=",5.11,"<<",5.12,">>",5.13,"<",5.14,">",5.15,"is",6,"||",7,"to",8.01,"+",8.02,"-",9.01,"*",9.02,"idiv",9.03,"div",9.04,"mod",10.01,"union",10.02,"|",11.01,"intersect",11.02,"except",12,"instance of",13,"treat as",14,"castable as",15,"cast as",16,"=>",17.01,"+",17.02,"-",18,"!",19.01,"/",19.02,"//",19.03,"/*",20.01,"[",20.02,"]",20.03,"?",20.04,"[",20.05,"[",20.06,"{",20.07,"}",20.08,"@",21.01,"array",21.02,"attribute",21.03,"comment",21.04,"document",21.05,"element",21.06,"function",21.07,"map",21.08,"namespace",21.09,"processing-instruction",21.1,"text",22.01,"array",22.02,"attribute",22.03,"comment",22.04,"document-node",22.05,"element",22.06,"empty-sequence",22.07,"function",22.08,"item",22.09,"map",22.1,"namespace-node",22.11,"node",22.12,"processing-instruction",22.13,"schema-attribute",22.14,"schema-element",22.15,"text",24,"as",25.01,"(:",25.02,":)",26,":"));

export const operatorsI = fn.foldLeft(map.keys(operators),n.map(n.seq()),function($pre,$cur) /*n.item()*/ {

return map.put($pre,operators($cur),$cur);

});

export const types = n.seq("untypedAtomic","dateTime","dateTimeStamp","date","time","duration","yearMonthDuration","dayTimeDuration","float","double","decimal","integer","nonPositiveInteger","negativeInteger","long","int","short","byte","nonNegativeInteger","unsignedLong","unsignedInt","unsignedShort","unsignedByte","positiveInteger","gYearMonth","gYear","gMonthDay","gDay","gMonth","string","normalizedString","token","language","NMTOKEN","Name","NCName","ID","IDREF","ENTITY","boolean","base64Binary","hexBinary","anyURI","QName","NOTATION");

export const operatorMap = n.map(n.seq(2.09,"item",5.01,"eq",5.02,"ne",5.03,"lt",5.04,"le",5.05,"gt",5.06,"ge",5.07,"geq",5.08,"gne",5.09,"gle",5.1,"gge",5.11,"precedes",5.12,"follows",5.13,"glt",5.14,"ggt",6,"concat",8.01,"add",8.02,"subtract",9.01,"multiply",10.02,"union",17.01,"plus",17.02,"minus",18,"for-each",19.01,"select",19.02,"select-all",20.01,"filter",20.03,"lookup",20.04,"array",20.05,"filter-at",20.08,"select-attribute"));

export function normalizeQuery($query,$params) /*n.item()*/ {

var $cur,$next;

return (($query = n.item(fn.replace(fn.replace(fn.replace(fn.replace($query,"%3E",">"),"%3C","<"),"%2C",","),"%3A",":")),

$query = n.item(fn.foldLeft(n.filter(map.keys(operators),(n.and(n.ne($_0,5.07),n.ne($_0,1)))),$query,function($cur,$next) /*n.item()*/ {

return fn.replace($cur,escapeForRegex($next),(n.eq(fn.round($next),22) ? fn.concat("$1",toOp($next),"$2") : fn.concat("$1 ",opStr($next)," $2")));

})),

$query = n.item(fn.foldLeft(types,$query,function($cur,$next) /*n.item()*/ {

return (($cur = n.item(fn.replace($cur,fn.concat("xs:",$next,"\s*([^\(])"),fn.concat("core:",$next,"()$1"))),fn.replace($cur,fn.concat("xs:",$next,"\s*\("),fn.concat("core:",$next,"("))));

})),

$query = n.item(fn.replace($query,",","=#1=")),

$query = n.item(fn.replace($query,"=(#\p{N}+#?\p{N}*)=","%3D$1%3D")),

$query = n.item(fn.replace($query,"=","=#5#07=")),

$query = n.item(fn.replace($query,"%3D","=")),

$query = n.item(fn.replace($query,n.concat(n.concat("(",operatorRegexp),")")," $1 ")),

$query = n.item(fn.replace($query,"\s+"," ")),

$query = n.item(fn.replace($query,"=#19#01=\s*=#20#08=","=#20#08=")),

$query = n.item(block(n.filter(n.select(fn.analyzeString($query,"(?:^?)([^\s\(\),\.;]+)(?:$?)"),"*"),n.seq(n.geq(n.or(n.geq(fn.name(),"fn:match"),fn.matches(fn.string(),"^\s*$")),fn.false()))),"")),

$query = n.item(fn.replace($query,"\s+","")),

$query));

}

export function normalizeFilter($query) /*n.item()*/ {

return (fn.matches($query,"^([\+\-]?\p{N}+)|position$") ? n.concat(".=#5#07=",$query) : $query);

}

export function seqtype($parts,$ret,$lastseen) /*n.item()*/ {

var $head,$maybeSeqtype;

return (($head = n.item(n.select(n.filter(n.select(fn.head($parts),"fn:group"),(n.geq(n.selectAttribute($_0,"nr"),1))),fn.string())),

$maybeSeqtype = n.item((fn.matches($head,operatorRegexp) ? opNum($head) : 0)),

(n.eq($maybeSeqtype,20.06) ? body($parts,fn.concat($ret,","),($lastseen,21.06)) : seqtype(fn.tail($parts),$ret,$lastseen))));

}

function as_3($param,$parts,$ret) /*n.item()*/ {

return as($param,$parts,$ret,"n.seq()");

}

function as_4($param,$parts,$ret,$lastseen) /*n.item()*/ {

return as($param,$parts,$ret,$lastseen,fn.false(),fn.false());

}

function as_6($param,$parts,$ret,$lastseen,$subtype,$seqtype) /*n.item()*/ {

var $head,$next,$no,$non;

return (($head = n.item(n.select(fn.head($parts),fn.string())),

$next = n.item(n.select(n.filterAt($parts,(n.geq($_0,2))),fn.string())),

$no = n.item((fn.matches($head,operatorRegexp) ? opNum($head) : 0)),

$non = n.item((fn.matches($next,operatorRegexp) ? opNum($next) : 0)),

(n.eq($no,24) ? as($param,fn.tail($parts),fn.concat($ret,($subtype ? ")" : ""),","),$lastseen,$subtype,fn.true()) : (n.eq($no,1) ? ($subtype ? as($param,fn.tail($parts),fn.concat($ret,","),$lastseen,$subtype,$seqtype) : params(fn.tail($parts),fn.concat($ret,","))) : (fn.matches($head,fn.concat("core:[",ncname,"]+")) ? (fn.matches($next,"^\s*\(\s*$") ? as((),fn.subsequence($parts,3),fn.concat($ret,$head,"(",$param,",",(n.eq($head,"core:function") ? "(" : "")),$lastseen,fn.true(),$seqtype) : as((),fn.tail($parts),fn.concat($ret,$head,"(",$param,(n.eq($head,"core:function") ? ",(" : "")),$lastseen,$subtype,$seqtype)) : (fn.matches($head,"[\?\+\*]") ? as($param,fn.tail($parts),fn.concat($ret,$head),$lastseen,$subtype,$seqtype) : (fn.matches($head,"^(\(\))?\s*\)") ? (n.geq(n.and($subtype,$non),n.seq(1,24)) ? as($param,fn.tail($parts),fn.concat($ret,(n.eq($non,24) ? "" : ")")),$lastseen,fn.false(),$seqtype) : (n.eq($non,24) ? seqtype(fn.tail($parts),fn.concat($ret,($subtype ? ")" : ""),"),"),$lastseen) : (n.eq($non,20.06) ? body(fn.tail($parts),fn.concat($ret,($subtype ? ")" : ""),(fn.matches($head,"^\(\)") ? ")" : ""),"),core:item(),"),($lastseen,21.06)) : console.log($parts)))) : as($param,fn.tail($parts),fn.concat($ret,(n.and(n.eq($non,1),$seqtype) ? ")" : ""),")"),$lastseen,$subtype,$seqtype))))))));

}

export function as(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,3) ? fn.apply(as_3,$a) : (n.eq($s,4) ? fn.apply(as_4,$a) : (n.eq($s,6) ? fn.apply(as_6,$a) : n.seq())))));

}

function params_2($parts,$ret) /*n.item()*/ {

return params($parts,$ret,"n.seq()");

}

function params_3($parts,$ret,$lastseen) /*n.item()*/ {

var $maybeParam,$next;

return (($maybeParam = n.item(n.select(fn.head($parts),fn.string())),

$next = n.item(n.select(n.filterAt($parts,(n.geq($_0,2))),fn.string())),

(fn.matches($maybeParam,"^(\(\))?\s*\)") ? (n.eq($next,"=#24=") ? seqtype(fn.tail($parts),n.concat($ret,"),"),$lastseen) : body(fn.tail($parts),fn.concat($ret,"),core:item(),"),($lastseen,21.06))) : (fn.matches($maybeParam,"=#1=") ? params(fn.tail($parts),fn.concat($ret,","),$lastseen) : (fn.matches($maybeParam,"^\$") ? (n.geq($next,"=#24=") ? as(fn.replace($maybeParam,"^\$","\$,"),fn.subsequence($parts,3),$ret,$lastseen) : params(fn.tail($parts),fn.concat($ret,"core:item(",fn.replace($maybeParam,"^\$","\$,"),")"),$lastseen)) : params(fn.tail($parts),$ret,$lastseen))))));

}

export function params(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ? fn.apply(params_2,$a) : (n.eq($s,3) ? fn.apply(params_3,$a) : n.seq()))));

}

export function fn($parts,$ret) /*n.item()*/ {

return params(fn.tail($parts),n.concat(n.select(n.filter(n.concat($ret,n.select(fn.head($parts),"fn:group")),(n.geq(n.selectAttribute($_0,"nr"),1))),fn.string()),",(),("));

}

export function ns($parts,$ret) /*n.item()*/ {

var $ns,$rest;

return (($ns = n.item(fn.replace(n.select(fn.head($parts),fn.string()),"\s","")),

$rest = n.item(fn.tail($parts)),

fn.stringJoin($rest)));

}

export function var_($parts,$ret) /*n.item()*/ {

return body(fn.subsequence($parts,3),fn.concat($ret,n.select(n.filterAt($parts,(n.geq($_0,1))),fn.string()),",(),"),(2.18));

}

function annot_2($parts,$ret) /*n.item()*/ {

return annot($parts,$ret,"");

}

function annot_3($parts,$ret,$annot) /*n.item()*/ {

var $maybeAnnot,$rest;

return (($maybeAnnot = n.item(n.select(n.filter(n.select(fn.head($parts),"fn:group"),(n.geq(n.selectAttribute($_0,"nr"),1))),fn.string())),

$rest = n.item(fn.tail($parts)),

(fn.matches($maybeAnnot,"^%") ? annot($rest,$ret,fn.replace($maybeAnnot,"^%","-")) : (n.geq($maybeAnnot,"=#21#06=") ? fn($rest,n.concat(n.concat(n.concat($ret,"core:define"),$annot),"($,")) : (n.geq($maybeAnnot,"=#2#18=") ? var_($rest,n.concat(n.concat(n.concat($ret,"core:var"),$annot),"($,")) : $ret)))));

}

export function annot(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ? fn.apply(annot_2,$a) : (n.eq($s,3) ? fn.apply(annot_3,$a) : n.seq()))));

}

export function xquery($parts,$ret) /*n.item()*/ {

return block(fn.subsequence($parts,3),fn.concat($ret,"core:xq-version($,",n.select(n.filterAt($parts,(n.geq($_0,2))),fn.string()),")"));

}

export function module($parts,$ret) /*n.item()*/ {

return block(fn.subsequence($parts,5),fn.concat($ret,"core:module($,",n.select(n.filterAt($parts,(n.geq($_0,2))),fn.string()),",",n.select(n.filterAt($parts,(n.geq($_0,4))),fn.string()),",())"));

}

export function repl($lastseen,$no) /*n.item()*/ {

var $last;

return (($last = n.item(n.filter(fn.indexOf($lastseen,n.subtract($no,n.decimal(0.01))),n.seq(fn.last()))),

fn.remove($lastseen,$last)));

}

function close_2($lastseen,$no) /*n.item()*/ {

return close(fn.reverse($lastseen),$no,"n.seq()");

}

function close_3($lastseen,$no,$ret) /*n.item()*/ {

return (n.or(fn.empty($lastseen),n.eq($no,0)) ? fn.reverse(($ret,$lastseen)) : (n.ne(fn.head($lastseen),0.01) ? close(fn.tail($lastseen),$no,(fn.head($lastseen),$ret)) : close(fn.tail($lastseen),n.subtract($no,1),$ret)));

}

export function close(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ? fn.apply(close_2,$a) : (n.eq($s,3) ? fn.apply(close_3,$a) : n.seq()))));

}

function closer_1($b) /*n.item()*/ {

return closer(fn.reverse($b),0);

}

function closer_2($b,$c) /*n.item()*/ {

return (n.geq(n.and(fn.exists($b),fn.head($b)),n.seq(2.08,2.11)) ? closer(fn.tail($b),n.add($c,1)) : $c);

}

export function closer(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,1) ? fn.apply(closer_1,$a) : (n.eq($s,2) ? fn.apply(closer_2,$a) : n.seq()))));

}

export function lastIndexOf($lastseen,$a) /*n.item()*/ {

var $id;

return (($id = n.item(fn.indexOf($lastseen,$a)),

(fn.empty($id) ? 1 : n.filter($id,n.seq(fn.last())))));

}

export function pop($a) /*n.item()*/ {

return fn.reverse(fn.tail(fn.reverse($a)));

}

export function anon($head,$parts,$ret,$lastseen) /*n.item()*/ {

return params($parts,n.concat($ret,"core:function(("),$lastseen);

}

export function map($parts,$ret,$lastseen) /*n.item()*/ {

var $head,$op;

return (($head = n.item(n.select(fn.head($parts),fn.string())),

$op = n.item((fn.matches($head,operatorRegexp) ? opNum($head) : 0)),

body($parts,$ret,$lastseen)));

}

export function comment($parts,$ret,$lastseen) /*n.item()*/ {

var $head,$rest;

return (($head = n.item(n.select(fn.head($parts),fn.string())),

$rest = n.item(fn.tail($parts)),

(n.geq($head,"=#25#02=") ? body($rest,$ret,$lastseen) : comment($rest,$ret,$lastseen))));

}

export function bodyOp($no,$next,$lastseen,$rest,$ret) /*n.item()*/ {

var $old,$closer,$qn,$positional,$hascomma,$letopener,$elsecloser,$retncloser,$letclose,$letcloser,$n,$lastindex,$closes,$nu;

return (n.eq($no,1) ? ($old = n.item($lastseen),$closer = n.item(closer($lastseen)),$ret = n.item(fn.concat($ret,fn.stringJoin(n.forEach(n.seq(n.to(1,$closer)),")")),",")),$lastseen = n.item(fn.subsequence($lastseen,1,n.subtract(fn.count($lastseen),$closer))),body($rest,$ret,$lastseen)) : (n.eq($no,25.01) ? comment($rest,$ret,$lastseen) : (n.eq($no,21.06) ? anon($next,fn.tail($rest),$ret,$lastseen) : (n.eq(fn.round($no),21) ? ($ret = n.item(fn.concat($ret,opStr($no),"(")),$qn = n.item((n.ne($next,"=#20#06=") ? $next : n.seq())),$rest = n.item((fn.exists($qn) ? fn.tail($rest) : $rest)),$ret = n.item((fn.exists($qn) ? fn.concat($ret,$next,",") : $ret)),body($rest,$ret,($lastseen,$no))) : ($old = n.item($lastseen),$positional = n.item(n.and(n.and(n.eq($no,20.01),$next),fn.matches($next,"^([\+\-]?(\p{N}+|\$))|position$"))),$hascomma = n.item(n.eq(fn.substring($ret,fn.stringLength($ret)),",")),$letopener = n.item(n.and(n.eq($no,2.09),n.seq(n.or(fn.not(n.or(n.geq(n.filter($lastseen,n.seq(fn.last())),n.seq(2.09,2.1)),n.seq(n.geq(n.and(n.eq(n.filter($lastseen,n.seq(fn.last())),2.08),$hascomma),fn.false())))),n.seq(n.eq(n.filter($lastseen,n.seq(fn.last())),20.06)))))),$elsecloser = n.item((n.eq($no,2.08) ? lastIndexOf($lastseen,2.07) : 0)),$retncloser = n.item((n.eq($no,2.11) ? lastIndexOf($lastseen,2.1) : 0)),$letclose = n.item(n.geq(n.and(n.and(n.eq($no,2.09),fn.not(n.or(n.eq(n.filter($lastseen,n.seq(fn.last())),20.06),fn.empty($lastseen)))),$hascomma),fn.false())),$letcloser = n.item((n.geq(n.filter(n.and($letclose,$lastseen),n.seq(fn.last())),n.seq(2.08,2.11)) ? closer($lastseen) : 0)),$ret = n.item(fn.concat($ret,(n.geq($no,n.seq(2.06,2.09,20.01,20.04)) ? fn.concat(($letclose ? ($n = n.item(console.log(($letcloser,"||",n.filter($lastseen,n.seq(n.subtract(fn.last(),$letcloser)))))),fn.concat(fn.stringJoin(n.forEach(n.seq(n.to(1,$letcloser)),")")),(n.eq(n.filter($lastseen,n.seq(n.subtract(fn.last(),$letcloser))),2.1) ? ")" : ""),($hascomma ? "" : ","))) : ""),($letopener ? "(" : ""),($positional ? opStr(20.05) : opStr($no)),(n.eq($no,20.04) ? "(" : ""),(n.eq($no,2.06) ? "" : "("),(n.eq($no,2.09) ? fn.concat("$,",fn.replace($next,"^\$|\s","")) : (n.eq($no,20.01) ? fn.concat((fn.matches($next,"#20#08") ? "." : ($positional ? (fn.matches($next,"position") ? "." : ".=#5#07=") : "")),$next) : ""))) : (n.or(n.eq($no,26),n.seq(n.eq(n.filter(n.and(n.eq($no,2.1),$lastseen),n.seq(n.subtract(fn.last(),1))),21.07))) ? "," : (n.eq($no,20.07) ? ($lastindex = n.item(lastIndexOf($lastseen,20.06)),$closes = n.item(n.filter(fn.subsequence($lastseen,$lastindex,fn.count($lastseen)),(n.geq($_0,n.seq(2.08,2.11))))),$closes = n.item(n.seq($closes,2.11)),fn.concat(fn.stringJoin(n.forEach($closes,")")),(n.eq($next,"=#20#06=") ? "," : (n.eq(fn.round(n.filterAt($lastseen,(n.geq($_0,n.subtract($lastindex,1))))),21) ? ")" : "")))) : (n.geq($no,n.seq(2.07,2.1)) ? fn.concat((n.eq(n.filter($lastseen,n.seq(fn.last())),2.11) ? ")" : ""),",") : (n.eq($no,2.08) ? fn.concat(fn.stringJoin(n.forEach(fn.subsequence($lastseen,n.add($elsecloser,1)),")")),",") : (n.eq($no,2.11) ? fn.concat(fn.stringJoin(n.forEach(fn.subsequence($lastseen,n.add($retncloser,1)),")")),"),") : (n.eq($no,20.02) ? (n.eq(n.filter($lastseen,n.seq(fn.last())),20.04) ? "))" : ")") : (n.eq($no,20.06) ? "(" : opStr($no))))))))))),$rest = n.item((n.or(fn.empty($rest),fn.not(n.geq($no,n.seq(2.09,20.01)))) ? $rest : fn.tail($rest))),$lastseen = n.item((n.geq($no,n.seq(2.06,2.09,20.01,20.04)) ? ($lastseen = n.item(($letclose ? fn.subsequence($lastseen,1,n.subtract(fn.count($lastseen),$letcloser)) : $lastseen)),$lastseen = n.item((n.eq(n.filter(n.and($letclose,$lastseen),n.seq(fn.last())),2.1) ? pop($lastseen) : $lastseen)),($lastseen,$no)) : (n.or(n.eq($no,26),n.seq(n.eq(n.filter(n.and(n.eq($no,2.1),$lastseen),n.seq(n.subtract(fn.last(),1))),21.07))) ? $lastseen : (n.geq($no,20.07) ? ($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract(lastIndexOf($lastseen,20.06),1))),(n.and(n.eq(fn.round(n.filter($lastseen,n.seq(fn.last()))),21),n.ne($next,"=#20#06=")) ? pop($lastseen) : $lastseen)) : (n.geq($no,n.seq(2.07,2.1)) ? ($lastseen = n.item((n.or(n.eq(n.filter($lastseen,n.seq(fn.last())),2.11),n.seq(n.eq(n.filter(n.and(n.eq($no,2.07),$lastseen),n.seq(fn.last())),0.01))) ? pop($lastseen) : $lastseen)),repl($lastseen,$no)) : (n.eq($no,2.08) ? ($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract($elsecloser,1))),($lastseen,$no)) : (n.eq($no,2.11) ? ($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract($retncloser,1))),($lastseen,$no)) : (n.or(n.eq($no,20.06),n.eq(fn.round($no),21)) ? n.seq($lastseen,$no) : (n.eq($no,20.02) ? pop($lastseen) : $lastseen))))))))),$nu = n.item(console.log(($no," :: ",fn.stringJoin($old,","),"->",fn.stringJoin($lastseen,",")," || ",fn.replace(fn.replace($ret,"=#2#06=","if"),"=#2#09=","let")))),body($rest,$ret,$lastseen))))));

}

export function isArray($head,$non,$next) /*n.item()*/ {

return n.and(n.geq(n.and(n.eq($non,20.01),fn.matches($head,"\)\s*$")),fn.false()),fn.matches($head,n.concat(n.concat("^(\s|\(|,|",operatorRegexp),")")));

}

export function diff($a,$b) /*n.item()*/ {

var $x,$y;

return (($x = n.item(n.filter($b,(fn.not(n.geq($_0,$a))))),

$y = n.item(n.filter($a,(fn.not(n.geq($_0,$b))))),

fn.concat("+",fn.stringJoin($x,","),",","-",fn.stringJoin($y,","))));

}

export function parenCloser($head,$lastseen) /*n.item()*/ {

var $cp,$old,$d,$n;

return (fn.matches($head,"[\(\)]+") ? ($cp = n.item(fn.stringToCodepoints($head)),$old = n.item($lastseen),$lastseen = n.item(n.seq($lastseen,n.forEach(n.filter($cp,(n.eq($_0,40))),0.01))),$lastseen = n.item(close($lastseen,fn.count(n.filter($cp,(n.eq($_0,41)))))),$d = n.item(diff($old,$lastseen)),$n = n.item((n.ne($d,"+,-") ? console.log((") :: ",$d)) : "")),$lastseen) : $lastseen);

}

function body_2($parts,$ret) /*n.item()*/ {

return body($parts,$ret,"n.seq()");

}

function body_3($parts,$ret,$lastseen) /*n.item()*/ {

var $head,$rest,$next,$non;

return (fn.empty($parts) ? fn.concat($ret,fn.stringJoin(n.forEach(n.filter($lastseen,(n.geq($_0,n.seq(2.08,2.11,20.07)))),")"))) : ($head = n.item(n.select(fn.head($parts),fn.string())),$rest = n.item(fn.tail($parts)),$lastseen = n.item(parenCloser($head,$lastseen)),(n.geq($head,"=#25#01=") ? comment($rest,$ret,$lastseen) : (fn.matches($head,";") ? block($parts,(n.eq(n.filter($lastseen,n.seq(fn.last())),2.18) ? fn.concat($ret,fn.replace($head,";",""),")") : $ret)) : ($next = n.item((fn.empty($rest) ? n.seq() : n.select(fn.head($rest),fn.string()))),$non = n.item((fn.matches($next,operatorRegexp) ? opNum($next) : 0)),$rest = n.item((isArray($head,$non,$next) ? fn.insertBefore(fn.tail($rest),1,"n.element(n.seq("n.element(n.seq("n.attribute(n.seq(1))",opStr(20.04)))"))") : $rest)),$head = n.item((n.and(n.geq($ret,""),n.eq($head,"=#20#01=")) ? "=#20#04=" : $head)),(fn.matches($head,operatorRegexp) ? bodyOp(opNum($head),$next,$lastseen,$rest,$ret) : body($rest,fn.concat($ret,$head),$lastseen)))))));

}

export function body(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ? fn.apply(body_2,$a) : (n.eq($s,3) ? fn.apply(body_3,$a) : n.seq()))));

}

export function import_($parts,$ret) /*n.item()*/ {

var $rest,$maybeAt;

return (($rest = n.item(fn.subsequence($parts,6)),

$maybeAt = n.item(n.select(fn.head($rest),fn.string())),

(fn.matches($maybeAt,"at") ? block(fn.subsequence($rest,3),fn.concat($ret,"core:import($,",n.select(n.filterAt($parts,(n.geq($_0,3))),fn.string()),",",n.select(n.filterAt($parts,(n.geq($_0,5))),fn.string()),",",n.select(n.filterAt($rest,(n.geq($_0,2))),fn.string()),")")) : block($rest,fn.concat($ret,"core:import($,",n.select(n.filterAt($parts,(n.geq($_0,3))),fn.string()),",",n.select(n.filterAt($parts,(n.geq($_0,5))),fn.string()),")")))));

}

export function block($parts,$ret) /*n.item()*/ {

var $val,$rest,$no;

return (fn.empty($parts) ? $ret : ($val = n.item(n.select(fn.head($parts),fn.string())),$rest = n.item(fn.tail($parts)),(fn.matches($val,operatorRegexp) ? ($no = n.item(opNum($val)),(n.eq($no,2.14) ? xquery($rest,$ret) : (n.eq($no,2.16) ? module($rest,$ret) : (n.eq($no,2.17) ? annot($rest,$ret) : (n.eq($no,2.19) ? import_($rest,$ret) : body($parts,$ret)))))) : (fn.matches($val,";") ? (fn.empty($rest) ? $ret : block($rest,n.concat($ret,","))) : body($parts,$ret)))));

}

export function toOp($opnum) /*n.item()*/ {

return (map.contains(operatorMap,$opnum) ? n.concat("core:",operatorMap($opnum)) : n.concat("core:",fn.replace(operators($opnum)," ","-")));

}

export function fromOp($op) /*n.item()*/ {

var $k,$i;

return (($k = n.item(map.keys(operatorsI)),

$i = n.item(n.filterAt(fn.indexOf($k,fn.replace($op,"^core:","")),(n.geq($_0,1)))),

n.decimal(operatorsI(n.filterAt($k,(n.geq($_0,$i)))))));

}

export function rename($a,$fn) /*n.item()*/ {

var $t;

return (array.forEach($a,function($t) /*n.item()*/ {

return (n.instanceOf($t,Map) ? n.map(n.seq("name",$fn($t("name")),"args",rename($t("args"),$fn),"suffix",$t("suffix"))) : $t);

}));

}

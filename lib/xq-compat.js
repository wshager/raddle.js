import * as n from "n.js";

import * as fn from "fn.js";

import * as map from "map.js";


export const ncname = "\\p{L}\\p{N}\\-_\\."

export const qname = n.concat(n.concat(n.concat(n.concat(n.concat("[",ncname),"]*:?"),"["),ncname),"]+")

export const operatorRegexp = "=#\\p{N}+#?\\p{N}*="

export const operators = n.map(n.seq(n.array(n.seq(1,",")),n.array(n.seq(2.01,"some")),n.array(n.seq(2.02,"every")),n.array(n.seq(2.03,"switch")),n.array(n.seq(2.04,"typeswitch")),n.array(n.seq(2.05,"try")),n.array(n.seq(2.06,"if")),n.array(n.seq(2.07,"then")),n.array(n.seq(2.08,"else")),n.array(n.seq(2.09,"let")),n.array(n.seq(2.1,":=")),n.array(n.seq(2.11,"return")),n.array(n.seq(2.12,"case")),n.array(n.seq(2.13,"default")),n.array(n.seq(2.14,"xquery")),n.array(n.seq(2.15,"version")),n.array(n.seq(2.16,"module")),n.array(n.seq(2.17,"declare")),n.array(n.seq(2.18,"variable")),n.array(n.seq(2.19,"import")),n.array(n.seq(3,"or")),n.array(n.seq(4,"and")),n.array(n.seq(5.01,"eq")),n.array(n.seq(5.02,"ne")),n.array(n.seq(5.03,"lt")),n.array(n.seq(5.04,"le")),n.array(n.seq(5.05,"gt")),n.array(n.seq(5.06,"ge")),n.array(n.seq(5.07,"=")),n.array(n.seq(5.08,"!=")),n.array(n.seq(5.09,"<=")),n.array(n.seq(5.1,">=")),n.array(n.seq(5.11,"<<")),n.array(n.seq(5.12,">>")),n.array(n.seq(5.13,"<")),n.array(n.seq(5.14,">")),n.array(n.seq(5.15,"is")),n.array(n.seq(6,"||")),n.array(n.seq(7,"to")),n.array(n.seq(8.01,"+")),n.array(n.seq(8.02,"-")),n.array(n.seq(9.01,"*")),n.array(n.seq(9.02,"idiv")),n.array(n.seq(9.03,"div")),n.array(n.seq(9.04,"mod")),n.array(n.seq(10.01,"union")),n.array(n.seq(10.02,"|")),n.array(n.seq(11.01,"intersect")),n.array(n.seq(11.02,"except")),n.array(n.seq(12,"instance of")),n.array(n.seq(13,"treat as")),n.array(n.seq(14,"castable as")),n.array(n.seq(15,"cast as")),n.array(n.seq(16,"=>")),n.array(n.seq(17.01,"+")),n.array(n.seq(17.02,"-")),n.array(n.seq(18,"!")),n.array(n.seq(19.01,"/")),n.array(n.seq(19.02,"//")),n.array(n.seq(19.03,"/*")),n.array(n.seq(20.01,"[")),n.array(n.seq(20.02,"]")),n.array(n.seq(20.03,"?")),n.array(n.seq(20.04,"[")),n.array(n.seq(20.05,"[")),n.array(n.seq(20.06,"{")),n.array(n.seq(20.07,"}")),n.array(n.seq(20.08,"@")),n.array(n.seq(21.01,"array")),n.array(n.seq(21.02,"attribute")),n.array(n.seq(21.03,"comment")),n.array(n.seq(21.04,"document")),n.array(n.seq(21.05,"element")),n.array(n.seq(21.06,"function")),n.array(n.seq(21.07,"map")),n.array(n.seq(21.08,"namespace")),n.array(n.seq(21.09,"processing-instruction")),n.array(n.seq(21.1,"text")),n.array(n.seq(22.01,"array")),n.array(n.seq(22.02,"attribute")),n.array(n.seq(22.03,"comment")),n.array(n.seq(22.04,"document-node")),n.array(n.seq(22.05,"element")),n.array(n.seq(22.06,"empty-sequence")),n.array(n.seq(22.07,"function")),n.array(n.seq(22.08,"item")),n.array(n.seq(22.09,"map")),n.array(n.seq(22.1,"namespace-node")),n.array(n.seq(22.11,"node")),n.array(n.seq(22.12,"processing-instruction")),n.array(n.seq(22.13,"schema-attribute")),n.array(n.seq(22.14,"schema-element")),n.array(n.seq(22.15,"text")),n.array(n.seq(24,"as")),n.array(n.seq(25.01,"(:")),n.array(n.seq(25.02,":)")),n.array(n.seq(26,":"))))

export const operatorsI = fn.foldLeft(map.keys(operators),n.map(n.seq(n.array(n.seq()))),function($pre,$cur) /*n.item()*/ {

return map.put($pre,operators($cur),$cur);

})

export const types = n.seq("untypedAtomic","dateTime","dateTimeStamp","date","time","duration","yearMonthDuration","dayTimeDuration","float","double","decimal","integer","nonPositiveInteger","negativeInteger","long","int","short","byte","nonNegativeInteger","unsignedLong","unsignedInt","unsignedShort","unsignedByte","positiveInteger","gYearMonth","gYear","gMonthDay","gDay","gMonth","string","normalizedString","token","language","NMTOKEN","Name","NCName","ID","IDREF","ENTITY","boolean","base64Binary","hexBinary","anyURI","QName","NOTATION")

export const operatorMap = n.map(n.seq(n.array(n.seq(2.09,"item")),n.array(n.seq(5.01,"eq")),n.array(n.seq(5.02,"ne")),n.array(n.seq(5.03,"lt")),n.array(n.seq(5.04,"le")),n.array(n.seq(5.05,"gt")),n.array(n.seq(5.06,"ge")),n.array(n.seq(5.07,"geq")),n.array(n.seq(5.08,"gne")),n.array(n.seq(5.09,"gle")),n.array(n.seq(5.1,"gge")),n.array(n.seq(5.11,"precedes")),n.array(n.seq(5.12,"follows")),n.array(n.seq(5.13,"glt")),n.array(n.seq(5.14,"ggt")),n.array(n.seq(6,"concat")),n.array(n.seq(8.01,"add")),n.array(n.seq(8.02,"subtract")),n.array(n.seq(9.01,"multiply")),n.array(n.seq(10.02,"union")),n.array(n.seq(17.01,"plus")),n.array(n.seq(17.02,"minus")),n.array(n.seq(18,"for-each")),n.array(n.seq(19.01,"select")),n.array(n.seq(19.02,"select-all")),n.array(n.seq(20.01,"filter")),n.array(n.seq(20.03,"lookup")),n.array(n.seq(20.04,"array")),n.array(n.seq(20.05,"filter-at")),n.array(n.seq(20.08,"select-attribute"))))

export function normalizeQuery($query,$params) /*n.item()*/ {

var $cur,$next;

return (($query = n.item(fn.replace(fn.replace(fn.replace(fn.replace($query,"%3E",">"),"%3C","<"),"%2C",","),"%3A",":")),

$query = n.item(fn.foldLeft(n.filter(map.keys(operators),function($_0) { return n.seq(n.and(n.ne($_0,5.07),n.ne($_0,1)))}),$query,function($cur,$next) /*n.item()*/ {

return fn.replace($cur,escapeForRegex($next),(n.eq(fn.round($next),22) ?

fn.concat("$1",toOp($next),"$2") :

fn.concat("$1 ",opStr($next)," $2")));

})),

$query = n.item(fn.foldLeft(types,$query,function($cur,$next) /*n.item()*/ {

return n.seq(($cur = n.item(fn.replace($cur,fn.concat("xs:",$next,"\\s*([^\\(])"),fn.concat("core:",$next,"()$1"))),fn.replace($cur,fn.concat("xs:",$next,"\\s*\\("),fn.concat("core:",$next,"("))));

})),

$query = n.item(fn.replace($query,",","=#1=")),

$query = n.item(fn.replace($query,"=(#\\p{N}+#?\\p{N}*)=","%3D$1%3D")),

$query = n.item(fn.replace($query,"=","=#5#07=")),

$query = n.item(fn.replace($query,"%3D","=")),

$query = n.item(fn.replace($query,n.concat(n.concat("(",operatorRegexp),")")," $1 ")),

$query = n.item(fn.replace($query,"\\s+"," ")),

$query = n.item(fn.replace($query,"=#19#01=\\s*=#20#08=","=#20#08=")),

$query = n.item(block(n.filter(n.select(fn.analyzeString($query,"([^\\s\\(\\),\\.;]+)"),"*"),function($_0) { return n.seq(n.geq(n.or(n.geq(fn.name($_0),"fn:match"),fn.matches(fn.string($_0),"^\\s*$")),fn.false()))}),"")),

$query = n.item(fn.replace($query,"\\s+","")),

$query));

}

export function normalizeFilter($query) /*n.item()*/ {

return (fn.matches($query,"^([\\+\\-]?\\p{N}+)|position$") ?

n.concat(".=#5#07=",$query) :

$query);

}

export function seqtype($parts,$ret,$lastseen) /*n.item()*/ {

var $head,$maybeSeqtype;

return (($head = n.item(n.select(n.filter(n.select(fn.head($parts),"fn:group"),function($_0) { return (n.geq(n.selectAttribute($_0,"nr"),1))}),fn.string())),

$maybeSeqtype = n.item((fn.matches($head,operatorRegexp) ?

opNum($head) :

0)),

(n.eq($maybeSeqtype,20.06) ?

body($parts,fn.concat($ret,","),n.seq($lastseen,21.06)) :

seqtype(fn.tail($parts),$ret,$lastseen))));

}

function as_3($param,$parts,$ret) /*n.item()*/ {

return as($param,$parts,$ret,n.seq());

}

function as_4($param,$parts,$ret,$lastseen) /*n.item()*/ {

return as($param,$parts,$ret,$lastseen,fn.false(),fn.false());

}

function as_6($param,$parts,$ret,$lastseen,$subtype,$seqtype) /*n.item()*/ {

var $head,$next,$no,$non,$n;

return (($head = n.item(n.select(fn.head($parts),fn.string())),

$next = n.item(n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,2))}),fn.string())),

$no = n.item((fn.matches($head,operatorRegexp) ?

opNum($head) :

0)),

$non = n.item((fn.matches($next,operatorRegexp) ?

opNum($next) :

0)),

$n = n.item(console.log(n.seq($head,",",$no,",",$next,",",$subtype,",",$seqtype))),

(n.eq($no,20.06) ?

body($parts,fn.concat($ret,($subtype ?

")" :

""),","),n.seq($lastseen,21.06)) :

(n.eq($no,24) ?

as($param,fn.tail($parts),fn.concat($ret,($subtype ?

")" :

""),","),$lastseen,$subtype,fn.true()) :

(n.eq($no,1) ?

($subtype ?

as($param,fn.tail($parts),fn.concat($ret,","),$lastseen,$subtype,$seqtype) :

params(fn.tail($parts),fn.concat($ret,","))) :

(fn.matches($head,fn.concat("core:[",ncname,"]+")) ?

(fn.matches($next,"^\\s*\\(\\s*$") ?

as(n.seq(),fn.subsequence($parts,3),fn.concat($ret,$head,"(",$param,",",(n.eq($head,"core:function") ?

"(" :

"")),$lastseen,fn.true(),$seqtype) :

as(n.seq(),fn.tail($parts),fn.concat($ret,$head,"(",$param,(n.eq($head,"core:function") ?

",(" :

"")),$lastseen,$subtype,$seqtype)) :

(fn.matches($head,"[\\?\\+\\*]") ?

as($param,fn.tail($parts),fn.concat($ret,$head),$lastseen,$subtype,$seqtype) :

(fn.matches($head,"^(\\(\\))?\\s*\\)") ?

(n.geq(n.and($subtype,$non),n.seq(1,24)) ?

as($param,fn.tail($parts),fn.concat($ret,(n.eq($non,24) ?

"" :

")")),$lastseen,fn.false(),$seqtype) :

(n.eq($non,24) ?

as(n.seq(),fn.tail($parts),fn.concat($ret,($subtype ?

")" :

""),"))"),$lastseen) :

(n.eq($non,20.06) ?

body(fn.tail($parts),fn.concat($ret,($subtype ?

")" :

""),(fn.matches($head,"^\\(\\)") ?

")" :

""),"),core:item(),"),n.seq($lastseen,21.06)) :

console.log($parts)))) :

as($param,fn.tail($parts),fn.concat($ret,(n.and(n.eq($non,1),$seqtype) ?

")" :

""),")"),$lastseen,$subtype,$seqtype)))))))));

}

export function as(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,3) ?

fn.apply(as_3,$a) :

(n.eq($s,4) ?

fn.apply(as_4,$a) :

(n.eq($s,6) ?

fn.apply(as_6,$a) :

n.seq())))));

}

function params_2($parts,$ret) /*n.item()*/ {

return params($parts,$ret,n.seq());

}

function params_3($parts,$ret,$lastseen) /*n.item()*/ {

var $maybeParam,$next;

return (($maybeParam = n.item(n.select(fn.head($parts),fn.string())),

$next = n.item(n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,2))}),fn.string())),

(fn.matches($maybeParam,"^(\\(\\))?\\s*\\)") ?

(n.eq($next,"=#24=") ?

as(n.seq(),fn.tail($parts),fn.concat($ret,")"),$lastseen) :

body(fn.tail($parts),fn.concat($ret,"),core:item(),"),n.seq($lastseen,21.06))) :

(fn.matches($maybeParam,"=#1=") ?

params(fn.tail($parts),fn.concat($ret,","),$lastseen) :

(fn.matches($maybeParam,"^\\$") ?

(n.eq($next,"=#24=") ?

as(fn.replace($maybeParam,"^\\$","\\$,"),fn.subsequence($parts,3),$ret,$lastseen) :

params(fn.tail($parts),fn.concat($ret,"core:item(",fn.replace($maybeParam,"^\\$","\\$,"),")"),$lastseen)) :

params(fn.tail($parts),$ret,$lastseen))))));

}

export function params(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ?

fn.apply(params_2,$a) :

(n.eq($s,3) ?

fn.apply(params_3,$a) :

n.seq()))));

}

export function xfn($parts,$ret) /*n.item()*/ {

return params(fn.tail($parts),n.concat(n.select(n.filter(n.concat($ret,n.select(fn.head($parts),"fn:group")),function($_0) { return (n.geq(n.selectAttribute($_0,"nr"),1))}),fn.string()),",(),("));

}

export function ns($parts,$ret) /*n.item()*/ {

var $ns,$rest;

return (($ns = n.item(fn.replace(n.select(fn.head($parts),fn.string()),"\\s","")),

$rest = n.item(fn.tail($parts)),

fn.stringJoin($rest)));

}

export function xvar($parts,$ret) /*n.item()*/ {

return body(fn.subsequence($parts,3),fn.concat($ret,n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,1))}),fn.string()),",(),"),n.seq(2.18));

}

function annot_2($parts,$ret) /*n.item()*/ {

return annot($parts,$ret,"");

}

function annot_3($parts,$ret,$annot) /*n.item()*/ {

var $maybeAnnot,$rest;

return (($maybeAnnot = n.item(n.select(n.filter(n.select(fn.head($parts),"fn:group"),function($_0) { return (n.geq(n.selectAttribute($_0,"nr"),1))}),fn.string())),

$rest = n.item(fn.tail($parts)),

(fn.matches($maybeAnnot,"^%") ?

annot($rest,$ret,fn.replace($maybeAnnot,"^%","-")) :

(n.geq($maybeAnnot,"=#21#06=") ?

xfn($rest,n.concat(n.concat(n.concat($ret,"core:define"),$annot),"($,")) :

(n.geq($maybeAnnot,"=#2#18=") ?

xvar($rest,n.concat(n.concat(n.concat($ret,"core:var"),$annot),"($,")) :

$ret)))));

}

export function annot(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ?

fn.apply(annot_2,$a) :

(n.eq($s,3) ?

fn.apply(annot_3,$a) :

n.seq()))));

}

export function xversion($parts,$ret) /*n.item()*/ {

return block(fn.subsequence($parts,3),fn.concat($ret,"core:xq-version($,",n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,2))}),fn.string()),")"));

}

export function xmodule($parts,$ret) /*n.item()*/ {

return block(fn.subsequence($parts,5),fn.concat($ret,"core:module($,",n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,2))}),fn.string()),",",n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,4))}),fn.string()),",())"));

}

function close_2($lastseen,$no) /*n.item()*/ {

return close(fn.reverse($lastseen),$no,n.seq());

}

function close_3($lastseen,$no,$ret) /*n.item()*/ {

return (n.or(fn.empty($lastseen),n.eq($no,0)) ?

fn.reverse(n.seq($ret,$lastseen)) :

(n.ne(fn.head($lastseen),0.01) ?

close(fn.tail($lastseen),$no,n.seq(fn.head($lastseen),$ret)) :

close(fn.tail($lastseen),n.subtract($no,1),$ret)));

}

export function close(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ?

fn.apply(close_2,$a) :

(n.eq($s,3) ?

fn.apply(close_3,$a) :

n.seq()))));

}

function closer_1($b) /*n.item()*/ {

return closer(fn.reverse($b),0);

}

function closer_2($b,$c) /*n.item()*/ {

return (n.geq(n.and(fn.exists($b),fn.head($b)),n.seq(2.08,2.11)) ?

closer(fn.tail($b),n.add($c,1)) :

$c);

}

export function closer(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,1) ?

fn.apply(closer_1,$a) :

(n.eq($s,2) ?

fn.apply(closer_2,$a) :

n.seq()))));

}

export function lastIndexOf($lastseen,$a) /*n.item()*/ {

var $id;

return (($id = n.item(fn.indexOf($lastseen,$a)),

(fn.empty($id) ?

1 :

n.filter($id,n.seq(fn.last())))));

}

export function pop($a) /*n.item()*/ {

return fn.reverse(fn.tail(fn.reverse($a)));

}

export function anon($head,$parts,$ret,$lastseen) /*n.item()*/ {

return params($parts,n.concat($ret,"core:function(("),$lastseen);

}

export function comment($parts,$ret,$lastseen) /*n.item()*/ {

var $head,$rest;

return (($head = n.item(n.select(fn.head($parts),fn.string())),

$rest = n.item(fn.tail($parts)),

(n.geq($head,"=#25#02=") ?

body($rest,$ret,$lastseen) :

comment($rest,$ret,$lastseen))));

}

export function bodyOp($no,$next,$lastseen,$rest,$ret) /*n.item()*/ {

var $old,$closer,$qn,$llast,$positional,$hascomma,$letopener,$elsecloser,$retncloser,$letclose,$letcloser,$lastindex,$closes,$last;

return (n.eq($no,1) ?

($old = n.item($lastseen),$closer = n.item(closer($lastseen)),$lastseen = n.item(fn.subsequence($lastseen,1,n.subtract(fn.count($lastseen),$closer))),$ret = n.item(fn.concat($ret,fn.stringJoin(n.forEach(n.seq(n.to(1,$closer)),")")),(n.eq(n.filter($lastseen,n.seq(n.subtract(fn.last(),1))),21.07) ?

")),=#20#04=((" :

","))),body($rest,$ret,$lastseen)) :

(n.eq($no,25.01) ?

comment($rest,$ret,$lastseen) :

(n.eq($no,21.06) ?

anon($next,fn.tail($rest),$ret,$lastseen) :

(n.eq(fn.round($no),21) ?

($ret = n.item(fn.concat($ret,opStr($no),"(")),$qn = n.item((n.ne($next,"=#20#06=") ?

$next :

n.seq())),$rest = n.item((fn.exists($qn) ?

fn.tail($rest) :

$rest)),$ret = n.item((fn.exists($qn) ?

fn.concat($ret,$next,",") :

$ret)),body($rest,$ret,n.seq($lastseen,$no))) :

($old = n.item($lastseen),$llast = n.item(n.filter($lastseen,n.seq(fn.last()))),$positional = n.item(n.and(n.and(n.eq($no,20.01),$next),fn.matches($next,"^([\\+\\-]?(\\p{N}+|\\$))|position$"))),$hascomma = n.item(n.eq(fn.substring($ret,fn.stringLength($ret)),",")),$letopener = n.item(n.and(n.eq($no,2.09),n.seq(n.or(fn.not(n.or(n.geq($llast,n.seq(2.09,2.1)),n.seq(n.geq(n.and(n.eq($llast,2.08),$hascomma),fn.false())))),n.seq(n.eq($llast,20.06)))))),$elsecloser = n.item((n.eq($no,2.08) ?

lastIndexOf($lastseen,2.07) :

0)),$retncloser = n.item((n.eq($no,2.11) ?

lastIndexOf($lastseen,2.1) :

0)),$letclose = n.item(n.geq(n.and(n.and(n.eq($no,2.09),fn.not(n.or(n.eq($llast,20.06),fn.empty($lastseen)))),$hascomma),fn.false())),$letcloser = n.item((n.geq(n.and($letclose,$llast),n.seq(2.08,2.11)) ?

closer($lastseen) :

0)),$ret = n.item(fn.concat($ret,(n.and(n.eq($no,20.06),n.eq($llast,21.07)) ?

"(=#20#04=((" :

(n.geq($no,n.seq(2.06,2.09,20.01,20.04)) ?

fn.concat(($letclose ?

fn.concat(fn.stringJoin(n.forEach(n.seq(n.to(1,$letcloser)),")")),(n.eq(n.filter($lastseen,n.seq(n.subtract(fn.last(),$letcloser))),2.1) ?

")" :

""),($hascomma ?

"" :

",")) :

""),($letopener ?

"(" :

""),($positional ?

opStr(20.05) :

opStr($no)),(n.eq($no,20.04) ?

"(" :

""),(n.eq($no,2.06) ?

"" :

"("),(n.eq($no,2.09) ?

fn.concat("$,",fn.replace($next,"^\\$|\\s","")) :

(n.eq($no,20.01) ?

fn.concat((fn.matches($next,"#20#08") ?

"." :

($positional ?

(fn.matches($next,"position") ?

"." :

".=#5#07=") :

"")),$next) :

""))) :

(n.or(n.eq($no,26),n.seq(n.eq(n.filter(n.and(n.eq($no,2.1),$lastseen),n.seq(n.subtract(fn.last(),1))),21.07))) ?

"," :

(n.eq($no,20.07) ?

($lastindex = n.item(lastIndexOf($lastseen,20.06)),$closes = n.item(n.filter(fn.subsequence($lastseen,$lastindex,fn.count($lastseen)),function($_0) { return (n.geq($_0,n.seq(2.08,2.11)))})),$closes = n.item(n.seq($closes,2.11)),$llast = n.item(n.filterAt($lastseen,function($_0) { return (n.geq($_0,n.subtract($lastindex,1)))})),fn.concat(fn.stringJoin(n.forEach($closes,")")),(n.eq($next,"=#20#06=") ?

"," :

(n.eq($llast,21.07) ?

")))" :

(n.eq(fn.round($llast),21) ?

")" :

""))))) :

(n.geq($no,n.seq(2.07,2.1)) ?

fn.concat((n.eq($llast,2.11) ?

")" :

""),",") :

(n.eq($no,2.08) ?

fn.concat(fn.stringJoin(n.forEach(fn.subsequence($lastseen,n.add($elsecloser,1)),")")),",") :

(n.eq($no,2.11) ?

fn.concat(fn.stringJoin(n.forEach(fn.subsequence($lastseen,n.add($retncloser,1)),")")),"),") :

(n.eq($no,20.02) ?

(n.eq($llast,20.04) ?

"))" :

")") :

(n.eq($no,20.06) ?

"(" :

opStr($no)))))))))))),$rest = n.item((n.or(fn.empty($rest),fn.not(n.geq($no,n.seq(2.09,20.01)))) ?

$rest :

fn.tail($rest))),$lastseen = n.item((n.geq($no,n.seq(2.06,2.09,20.01,20.04)) ?

($lastseen = n.item(($letclose ?

fn.subsequence($lastseen,1,n.subtract(fn.count($lastseen),$letcloser)) :

$lastseen)),$lastseen = n.item((n.eq(n.filter(n.and($letclose,$lastseen),n.seq(fn.last())),2.1) ?

pop($lastseen) :

$lastseen)),($lastseen,$no)) :

(n.or(n.eq($no,26),n.seq(n.eq(n.filter(n.and(n.eq($no,2.1),$lastseen),n.seq(n.subtract(fn.last(),1))),21.07))) ?

$lastseen :

(n.geq($no,20.07) ?

($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract(lastIndexOf($lastseen,20.06),1))),(n.and(n.eq(fn.round(n.filter($lastseen,n.seq(fn.last()))),21),n.ne($next,"=#20#06=")) ?

pop($lastseen) :

$lastseen)) :

(n.geq($no,n.seq(2.07,2.1)) ?

($lastseen = n.item((n.or(n.eq($llast,2.11),n.seq(n.and(n.eq($no,2.07),n.eq($llast,0.01)))) ?

pop($lastseen) :

$lastseen)),$last = n.item(n.filter(fn.indexOf($lastseen,n.subtract($no,n.decimal(0.01))),n.seq(fn.last()))),(remove($lastseen,$last),$no)) :

(n.eq($no,2.08) ?

($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract($elsecloser,1))),($lastseen,$no)) :

(n.eq($no,2.11) ?

($lastseen = n.item(fn.subsequence($lastseen,1,n.subtract($retncloser,1))),($lastseen,$no)) :

(n.or(n.eq($no,20.06),n.eq(fn.round($no),21)) ?

n.seq($lastseen,$no) :

(n.eq($no,20.02) ?

pop($lastseen) :

$lastseen))))))))),body($rest,$ret,$lastseen))))));

}

export function isArray($head,$non,$next) /*n.item()*/ {

return n.and(n.geq(n.and(n.eq($non,20.01),fn.matches($head,"\\)\\s*$")),fn.false()),fn.matches($head,n.concat(n.concat("^(\\s|\\(|,|",operatorRegexp),")")));

}

export function diff($a,$b) /*n.item()*/ {

var $x,$y;

return (($x = n.item(n.filter($b,function($_0) { return (fn.not(n.geq($_0,$a)))})),

$y = n.item(n.filter($a,function($_0) { return (fn.not(n.geq($_0,$b)))})),

fn.concat("+",fn.stringJoin($x,","),",","-",fn.stringJoin($y,","))));

}

export function parenCloser($head,$lastseen) /*n.item()*/ {

var $cp,$old,$d;

return (fn.matches($head,"[\\(\\)]+") ?

($cp = n.item(fn.stringToCodepoints($head)),$old = n.item($lastseen),$lastseen = n.item(n.seq($lastseen,n.forEach(n.filter($cp,function($_0) { return (n.eq($_0,40))}),0.01))),$lastseen = n.item(close($lastseen,fn.count(n.filter($cp,function($_0) { return (n.eq($_0,41))})))),$d = n.item(diff($old,$lastseen)),$lastseen) :

$lastseen);

}

function body_2($parts,$ret) /*n.item()*/ {

return body($parts,$ret,n.seq());

}

function body_3($parts,$ret,$lastseen) /*n.item()*/ {

var $head,$rest,$next,$non;

return (fn.empty($parts) ?

fn.concat($ret,fn.stringJoin(n.forEach(n.filter($lastseen,function($_0) { return (n.geq($_0,n.seq(2.08,2.11,20.07)))}),")"))) :

($head = n.item(n.select(fn.head($parts),fn.string())),$rest = n.item(fn.tail($parts)),$lastseen = n.item(parenCloser($head,$lastseen)),(n.geq($head,"=#25#01=") ?

comment($rest,$ret,$lastseen) :

(fn.matches($head,";") ?

block($parts,(n.eq(n.filter($lastseen,n.seq(fn.last())),2.18) ?

fn.concat($ret,fn.replace($head,";",""),")") :

$ret)) :

($next = n.item((fn.empty($rest) ?

n.seq() :

n.select(fn.head($rest),fn.string()))),$non = n.item((fn.matches($next,operatorRegexp) ?

opNum($next) :

0)),$rest = n.item((isArray($head,$non,$next) ?

fn.insertBefore(fn.tail($rest),1,n.element(n.seq(n.element(n.seq(n.attribute(n.seq(1)),opStr(20.04)))))) :

$rest)),$head = n.item((n.and(n.geq($ret,""),n.eq($head,"=#20#01=")) ?

"=#20#04=" :

$head)),(fn.matches($head,operatorRegexp) ?

bodyOp(opNum($head),$next,$lastseen,$rest,$ret) :

body($rest,fn.concat($ret,$head),$lastseen)))))));

}

export function body(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ?

fn.apply(body_2,$a) :

(n.eq($s,3) ?

fn.apply(body_3,$a) :

n.seq()))));

}

export function ximport($parts,$ret) /*n.item()*/ {

var $rest,$maybeAt;

return (($rest = n.item(fn.subsequence($parts,6)),

$maybeAt = n.item(n.select(fn.head($rest),fn.string())),

(fn.matches($maybeAt,"at") ?

block(fn.subsequence($rest,3),fn.concat($ret,"core:import($,",n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,3))}),fn.string()),",",n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,5))}),fn.string()),",",n.select(n.filterAt($rest,function($_0) { return (n.geq($_0,2))}),fn.string()),")")) :

block($rest,fn.concat($ret,"core:import($,",n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,3))}),fn.string()),",",n.select(n.filterAt($parts,function($_0) { return (n.geq($_0,5))}),fn.string()),")")))));

}

export function block($parts,$ret) /*n.item()*/ {

var $val,$rest,$no;

return (fn.empty($parts) ?

$ret :

($val = n.item(n.select(fn.head($parts),fn.string())),$rest = n.item(fn.tail($parts)),(fn.matches($val,operatorRegexp) ?

($no = n.item(opNum($val)),(n.eq($no,2.14) ?

xversion($rest,$ret) :

(n.eq($no,2.16) ?

xmodule($rest,$ret) :

(n.eq($no,2.17) ?

annot($rest,$ret) :

(n.eq($no,2.19) ?

ximport($rest,$ret) :

body($parts,$ret)))))) :

(fn.matches($val,";") ?

(fn.empty($rest) ?

$ret :

block($rest,n.concat($ret,","))) :

body($parts,$ret)))));

}

export function toOp($opnum) /*n.item()*/ {

return (map.contains(operatorMap,$opnum) ?

n.concat("core:",operatorMap($opnum)) :

n.concat("core:",fn.replace(operators($opnum)," ","-")));

}

export function fromOp($op) /*n.item()*/ {

var $k,$i;

return (($k = n.item(map.keys(operatorsI)),

$i = n.item(n.filterAt(fn.indexOf($k,fn.replace($op,"^core:","")),function($_0) { return (n.geq($_0,1))})),

n.decimal(operatorsI(n.filterAt($k,function($_0) { return (n.geq($_0,$i))})))));

}

export function rename($a,$fn) /*n.item()*/ {

var $t;

return (array.forEach($a,function($t) /*n.item()*/ {

return (n.instanceOf($t,Map) ?

n.map(n.seq(n.array(n.seq("name",$fn($t("name")))),n.array(n.seq("args",rename($t("args"),$fn))),n.array(n.seq("suffix",$t("suffix"))))) :

$t);

}));

}

export function escapeForRegex($key) /*n.string()*/ {

var $arg,$pre;

return (($arg = n.item(operators($key)),

$pre = n.item("(^|[\\s,\\(\\);\\[\\]]+)"),

(fn.matches($arg,"\\p{L}+") ?

(n.eq($key,21.06) ?

n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.concat($pre,$arg),"([\\s"),ncname),":]*\\s*\\(([\\$"),ncname),":\\(\\),\\?\\+\\*\\s])*\\)\\s*(as\\s+["),ncname),":\\(\\)]+)?\\s*=#20#06=)") :

(n.eq(fn.round($key),21) ?

n.concat(n.concat(n.concat(n.concat($pre,$arg),"([\\s\\$"),ncname),",:]*=#20#06)") :

(n.or(n.eq($key,2.04),n.eq(fn.round($key),22)) ?

n.concat(n.concat($pre,$arg),"(\\()") :

(n.eq(fn.round($key),24) ?

n.concat(n.concat($pre,$arg),"(\\s)") :

(n.geq($arg,"if") ?

n.concat(n.concat($pre,$arg),"(\\s?)") :

(n.geq($arg,"then") ?

n.concat(n.concat("\\)(\\s*)",$arg),"(\\s?)") :

n.concat(n.concat("(^|\\s)",$arg),"(\\s|$)"))))))) :

($arg = n.item(fn.replace($arg,"(\\.|\\[|\\]|\\\\|\\||\\-|\\^|\\$|\\?|\\*|\\+|\\{|\\}|\\(|\\))","\\\\$1")),(n.eq($key,26) ?

n.concat(n.concat("(\\s?)",$arg),"(\\s*[^\\p{L}])") :

(n.eq($key,2.1) ?

"(\\s?):\\s*=([^#])" :

(n.geq($key,n.seq(8.02,17.02)) ?

n.concat(n.concat($pre,$arg),"([\\s\\p{N}])?") :

(n.geq($key,n.seq(8.01,9.01,20.03)) ?

n.concat(n.concat("([^/])",$arg),"(\\s?[^,\\)])") :

n.concat(n.concat("(\\s?)",$arg),"(\\s?)")))))))));

}

export function unaryOp($op) /*n.item()*/ {

return opStr(n.add(opNum($op),9));

}

export function opInt($op) /*n.item()*/ {

return n.decimal(fn.replace($op,"^=#(\\p{N}+)#?\\p{N}*=$","$1"));

}

export function opNum($op) /*n.decimal()*/ {

return n.decimal(fn.replace($op,"^=#(\\p{N}+)#?(\\p{N}*)=$","$1.$20"));

}

export function opStr($op) /*n.item()*/ {

return fn.concat("=#",fn.replace(fn.string($op),"\\.","#"),"=");

}

export function operatorPrecedence($val,$operator,$ret) /*n.item()*/ {

var $rev,$last,$hasPrecedingOp,$isUnaryOp,$preceeds,$name,$args,$argsize,$nargs,$pre;

return (($rev = n.item(array.reverse($ret)),

$last = n.item(array.head($rev)),

$hasPrecedingOp = n.item(n.and(n.instanceOf($last,Map),fn.matches($last("name"),operatorRegexp))),

$isUnaryOp = n.item(n.and(n.geq(opInt($operator),8),n.seq(n.or(fn.empty($last),n.seq(n.geq(n.and(n.instanceOf(n.and($hasPrecedingOp,$last("suffix")),n.boolean()),$last("suffix")),fn.false())))))),

$operator = n.item(($isUnaryOp ?

unaryOp($operator) :

$operator)),

$preceeds = n.item(n.ggt(n.and($hasPrecedingOp,opInt($operator)),opInt($last("name")))),

$name = n.item(($preceeds ?

$last("name") :

$operator)),

$args = n.item(($preceeds ?

function($_0) { return ($argsize = n.item(array.size($last("args"))),$nargs = n.item(($isUnaryOp ?

n.array(n.seq()) :

n.filterAt(n.geq($_0,$last("args")),n.seq(2)))),$nargs = n.item(($val ?

array.append($nargs,$val) :

$nargs)),(n.and(n.ggt($argsize,1),$isUnaryOp) ?

($pre = n.item(($last("args")(2))),n.array(n.seq($last("args"),(1),n.map(n.seq(n.array(n.seq("name",$pre("name"))),n.array(n.seq("args",array.append($pre("args"),n.map(n.seq(n.array(n.seq("name",$operator)),n.array(n.seq("args",$nargs)),n.array(n.seq("suffix",""))))))),n.array(n.seq("suffix",""))))))) :

n.array(n.seq($last("args"),(1),n.map(n.seq(n.array(n.seq("name",$operator)),n.array(n.seq("args",$nargs)),n.array(n.seq("suffix",""))))))))} :

($nargs = n.item((fn.empty($last) ?

n.array(n.seq()) :

n.array(n.seq($last)))),($val ?

array.append($nargs,$val) :

$nargs)))),

array.append(array.reverse(array.tail($rev)),n.map(n.seq(n.array(n.seq("name",$name)),n.array(n.seq("args",$args)),n.array(n.seq("suffix",fn.exists($val))))))));

}

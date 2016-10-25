import * as n from "./n";
import * as fn from "xvfn";
for (var k in fn.booleans) fn[k] = fn.booleans[k];
import * as map from "xvmap";
import * as array from "xvarray";
/* xquery version n.string("3.1") */

/*module namespace n.string("xqc")=n.string("http://raddle.org/xquery-compat");

n.seq()*/

export const ncname = n.string("\\p{L}\\p{N}\\-_\\.");

export const qname = n.concat(n.concat(n.concat(n.concat(n.concat(n.string("["),ncname),n.string("]*:?")),n.string("[")),ncname),n.string("]+"));

export const operatorRegexp = n.string("=#\\p{N}+#?\\p{N}*=");

export const operators = n.map(n.seq(n.pair(n.integer(1),n.string(",")),n.pair(n.decimal(2.01),n.string("some")),n.pair(n.decimal(2.02),n.string("every")),n.pair(n.decimal(2.03),n.string("switch")),n.pair(n.decimal(2.04),n.string("typeswitch")),n.pair(n.decimal(2.05),n.string("try")),n.pair(n.decimal(2.06),n.string("if")),n.pair(n.decimal(2.07),n.string("then")),n.pair(n.decimal(2.08),n.string("else")),n.pair(n.decimal(2.09),n.string("let")),n.pair(n.decimal(2.10),n.string(":=")),n.pair(n.decimal(2.11),n.string("return")),n.pair(n.decimal(2.12),n.string("case")),n.pair(n.decimal(2.13),n.string("default")),n.pair(n.decimal(2.14),n.string("xquery")),n.pair(n.decimal(2.15),n.string("version")),n.pair(n.decimal(2.16),n.string("module")),n.pair(n.decimal(2.17),n.string("declare")),n.pair(n.decimal(2.18),n.string("variable")),n.pair(n.decimal(2.19),n.string("import")),n.pair(n.integer(3),n.string("or")),n.pair(n.integer(4),n.string("and")),n.pair(n.decimal(5.01),n.string("eq")),n.pair(n.decimal(5.02),n.string("ne")),n.pair(n.decimal(5.03),n.string("lt")),n.pair(n.decimal(5.04),n.string("le")),n.pair(n.decimal(5.05),n.string("gt")),n.pair(n.decimal(5.06),n.string("ge")),n.pair(n.decimal(5.07),n.string("=")),n.pair(n.decimal(5.08),n.string("!=")),n.pair(n.decimal(5.09),n.string("<=")),n.pair(n.decimal(5.10),n.string(">=")),n.pair(n.decimal(5.11),n.string("<<")),n.pair(n.decimal(5.12),n.string(">>")),n.pair(n.decimal(5.13),n.string("<")),n.pair(n.decimal(5.14),n.string(">")),n.pair(n.decimal(5.15),n.string("is")),n.pair(n.integer(6),n.string("||")),n.pair(n.integer(7),n.string("to")),n.pair(n.decimal(8.01),n.string("+")),n.pair(n.decimal(8.02),n.string("-")),n.pair(n.decimal(9.01),n.string("*")),n.pair(n.decimal(9.02),n.string("idiv")),n.pair(n.decimal(9.03),n.string("div")),n.pair(n.decimal(9.04),n.string("mod")),n.pair(n.decimal(10.01),n.string("union")),n.pair(n.decimal(10.02),n.string("|")),n.pair(n.decimal(11.01),n.string("intersect")),n.pair(n.decimal(11.02),n.string("except")),n.pair(n.integer(12),n.string("instance of")),n.pair(n.integer(13),n.string("treat as")),n.pair(n.integer(14),n.string("castable as")),n.pair(n.integer(15),n.string("cast as")),n.pair(n.integer(16),n.string("=>")),n.pair(n.decimal(17.01),n.string("+")),n.pair(n.decimal(17.02),n.string("-")),n.pair(n.integer(18),n.string("!")),n.pair(n.decimal(19.01),n.string("/")),n.pair(n.decimal(19.02),n.string("//")),n.pair(n.decimal(19.03),n.string("/*")),n.pair(n.decimal(20.01),n.string("[")),n.pair(n.decimal(20.02),n.string("]")),n.pair(n.decimal(20.03),n.string("?")),n.pair(n.decimal(20.04),n.string("[")),n.pair(n.decimal(20.06),n.string("{")),n.pair(n.decimal(20.07),n.string("}")),n.pair(n.decimal(20.08),n.string("@")),n.pair(n.decimal(21.01),n.string("array")),n.pair(n.decimal(21.02),n.string("attribute")),n.pair(n.decimal(21.03),n.string("comment")),n.pair(n.decimal(21.04),n.string("document")),n.pair(n.decimal(21.05),n.string("element")),n.pair(n.decimal(21.06),n.string("function")),n.pair(n.decimal(21.07),n.string("map")),n.pair(n.decimal(21.08),n.string("namespace")),n.pair(n.decimal(21.09),n.string("processing-instruction")),n.pair(n.decimal(21.10),n.string("text")),n.pair(n.decimal(22.01),n.string("array")),n.pair(n.decimal(22.02),n.string("attribute")),n.pair(n.decimal(22.03),n.string("comment")),n.pair(n.decimal(22.04),n.string("document-node")),n.pair(n.decimal(22.05),n.string("element")),n.pair(n.decimal(22.06),n.string("empty-sequence")),n.pair(n.decimal(22.07),n.string("function")),n.pair(n.decimal(22.08),n.string("item")),n.pair(n.decimal(22.09),n.string("map")),n.pair(n.decimal(22.10),n.string("namespace-node")),n.pair(n.decimal(22.11),n.string("node")),n.pair(n.decimal(22.12),n.string("processing-instruction")),n.pair(n.decimal(22.13),n.string("schema-attribute")),n.pair(n.decimal(22.14),n.string("schema-element")),n.pair(n.decimal(22.15),n.string("text")),n.pair(n.integer(24),n.string("as")),n.pair(n.decimal(25.01),n.string("(:")),n.pair(n.decimal(25.02),n.string(":)")),n.pair(n.integer(26),n.string(":"))));

export const operatorsI = fn.foldLeft(map.keys(operators),n.map(n.seq()),function(...a){
    var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("pre"),$.item("cur"));
        return n.item(map.put($.get("pre"),n.call(operators,$.get("cur")),$.get("cur")));
    }
    return n.error("err:XPST0017","Anonymous function called with "+l+" arguments doesn't match any of the known signatures.");
});

export const types = n.seq(n.string("untypedAtomic"),n.string("dateTime"),n.string("dateTimeStamp"),n.string("date"),n.string("time"),n.string("duration"),n.string("yearMonthDuration"),n.string("dayTimeDuration"),n.string("float"),n.string("double"),n.string("decimal"),n.string("integer"),n.string("nonPositiveInteger"),n.string("negativeInteger"),n.string("long"),n.string("int"),n.string("short"),n.string("byte"),n.string("nonNegativeInteger"),n.string("unsignedLong"),n.string("unsignedInt"),n.string("unsignedShort"),n.string("unsignedByte"),n.string("positiveInteger"),n.string("gYearMonth"),n.string("gYear"),n.string("gMonthDay"),n.string("gDay"),n.string("gMonth"),n.string("string"),n.string("normalizedString"),n.string("token"),n.string("language"),n.string("NMTOKEN"),n.string("Name"),n.string("NCName"),n.string("ID"),n.string("IDREF"),n.string("ENTITY"),n.string("boolean"),n.string("base64Binary"),n.string("hexBinary"),n.string("anyURI"),n.string("QName"),n.string("NOTATION"));

export const operatorMap = n.map(n.seq(n.pair(n.decimal(2.06),n.string("iff")),n.pair(n.decimal(2.09),n.string("item")),n.pair(n.decimal(5.01),n.string("eq")),n.pair(n.decimal(5.02),n.string("ne")),n.pair(n.decimal(5.03),n.string("lt")),n.pair(n.decimal(5.04),n.string("le")),n.pair(n.decimal(5.05),n.string("gt")),n.pair(n.decimal(5.06),n.string("ge")),n.pair(n.decimal(5.07),n.string("geq")),n.pair(n.decimal(5.08),n.string("gne")),n.pair(n.decimal(5.09),n.string("gle")),n.pair(n.decimal(5.10),n.string("gge")),n.pair(n.decimal(5.11),n.string("precedes")),n.pair(n.decimal(5.12),n.string("follows")),n.pair(n.decimal(5.13),n.string("glt")),n.pair(n.decimal(5.14),n.string("ggt")),n.pair(n.integer(6),n.string("concat")),n.pair(n.decimal(8.01),n.string("add")),n.pair(n.decimal(8.02),n.string("subtract")),n.pair(n.decimal(9.01),n.string("multiply")),n.pair(n.decimal(10.02),n.string("union")),n.pair(n.decimal(17.01),n.string("plus")),n.pair(n.decimal(17.02),n.string("minus")),n.pair(n.integer(18),n.string("for-each")),n.pair(n.decimal(19.01),n.string("select")),n.pair(n.decimal(19.02),n.string("select-all")),n.pair(n.decimal(20.01),n.string("filter")),n.pair(n.decimal(20.03),n.string("lookup")),n.pair(n.decimal(20.04),n.string("array")),n.pair(n.decimal(20.08),n.string("select-attribute")),n.pair(n.decimal(27.01),n.string("pair"))));

export const fns = n.seq(n.string("position"),n.string("last"),n.string("name"),n.string("node-name"),n.string("nilled"),n.string("string"),n.string("data"),n.string("base-uri"),n.string("document-uri"),n.string("number"),n.string("string-length"),n.string("normalize-space"));

export function normalizeQuery(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.string("query"),$.item("params"));
        return ($.item("query",fn.replace(fn.replace(fn.replace(fn.replace($.get("query"),n.string("%3E"),n.string(">")),n.string("%3C"),n.string("<")),n.string("%2C"),n.string(",")),n.string("%3A"),n.string(":"))),

$.item("query",fn.replace($.get("query"),n.string("([\\*\\+\\?])\\s+([,\\)\\{])"),n.string("$1$2"))),

$.item("query",fn.foldLeft(n.filter(map.keys(operators),function($_0) { return n.and(n.ne($_0,n.decimal(5.07)),n.ne($_0,n.integer(1)));}),$.get("query"),function(...a){
    var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("cur"),$.item("next"));
        return n.item(fn.replace($.get("cur"),escapeForRegex($.get("next")),$.test(n.eq(fn.round($.get("next")),n.integer(22))) ?

 (fn.concat(n.string("$1"),toOp($.get("next")),n.string("$2"))) :

 (fn.concat(n.string("$1 "),opStr($.get("next")),n.string(" $2")))));
    }
    return n.error("err:XPST0017","Anonymous function called with "+l+" arguments doesn't match any of the known signatures.");
})),

$.item("query",fn.foldLeft(types,$.get("query"),function(...a){
    var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("cur"),$.item("next"));
        return ($.item("cur",fn.replace($.get("cur"),fn.concat(n.string("xs:"),$.get("next"),n.string("\\s*([^\\(])")),fn.concat(n.string("core:"),$.get("next"),n.string("()$1")))),

n.item(fn.replace($.get("cur"),fn.concat(n.string("xs:"),$.get("next"),n.string("\\s*\\(")),fn.concat(n.string("core:"),$.get("next"),n.string("(")))));
    }
    return n.error("err:XPST0017","Anonymous function called with "+l+" arguments doesn't match any of the known signatures.");
})),

$.item("query",fn.replace($.get("query"),n.string(","),n.string("=#1="))),

$.item("query",fn.replace($.get("query"),n.string("=(#\\p{N}+#?\\p{N}*)="),n.string("%3D$1%3D"))),

$.item("query",fn.replace($.get("query"),n.string("="),n.string("=#5#07="))),

$.item("query",fn.replace($.get("query"),n.string("%3D"),n.string("="))),

$.item("query",fn.replace($.get("query"),n.concat(n.concat(n.string("("),operatorRegexp),n.string(")")),n.string(" $1 "))),

$.item("query",fn.replace($.get("query"),n.string("\\s+"),n.string(" "))),

$.item("query",fn.replace($.get("query"),n.string("=#19#01=\\s*=#20#08="),n.string("=#20#08="))),

$.item("query",fn.stringJoin(fn.forEach(fn.tokenize($.get("query"),n.string(";")),function(...a){
    var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("cur"));
        return ($.item("parts",n.filter(n.select(fn.analyzeString($.get("cur"),n.string("([^\\s\\(\\),\\.]+)")),n.seq(n.string("*"))),function($_0) { return n.or(n.geq(fn.name($_0),n.string("fn:match")),n.geq(fn.matches(fn.string($_0),n.string("^\\s*$")),fn.false()));})),

$.item("ret",block($.get("parts"),n.string(""))),

n.item($.test($.get("ret")) ?

 ($.get("ret")) :

 (n.seq())));
    }
    return n.error("err:XPST0017","Anonymous function called with "+l+" arguments doesn't match any of the known signatures.");
}),n.string(","))),

$.item("query",fn.replace($.get("query"),n.string("\\s+"),n.string(""))),

n.item($.get("query")));
    }
    return n.error("err:XPST0017","Function normalizeQuery called with "+l+" arguments doesn't match any of the known signatures.");
}

export function seqtype(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==3){
        $.init($.item("parts"),$.item("ret"),$.item("lastseen"));
        return ($.item("head",n.select(n.filter(n.select(fn.head($.get("parts")),n.seq(n.string("fn:group"))),function($_0) { return n.geq(n.selectAttribute($_0,n.string("nr")),n.integer(1));}),function($_0) { return fn.string($_0);})),

$.item("maybeSeqtype",$.test(fn.matches($.get("head"),operatorRegexp)) ?

 (opNum($.get("head"))) :

 (n.integer(0))),

$.test(n.eq($.get("maybeSeqtype"),n.decimal(20.06))) ?

 (body($.get("parts"),fn.concat($.get("ret"),n.string(",")),n.seq($.get("lastseen"),n.decimal(21.06)))) :

 (seqtype(fn.tail($.get("parts")),$.get("ret"),$.get("lastseen"))));
    }
    return n.error("err:XPST0017","Function seqtype called with "+l+" arguments doesn't match any of the known signatures.");
}

export function as(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==6){
        $.init($.item("param"),$.item("parts"),$.item("ret"),$.item("lastseen"),$.item("subtype"),$.item("seqtype"));
        return ($.item("head",n.select(fn.head($.get("parts")),function($_0) { return fn.string($_0);})),

$.item("next",n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(2));}),function($_0) { return fn.string($_0);})),

$.item("no",$.test(fn.matches($.get("head"),operatorRegexp)) ?

 (opNum($.get("head"))) :

 (n.integer(0))),

$.item("non",$.test(fn.matches($.get("next"),operatorRegexp)) ?

 (opNum($.get("next"))) :

 (n.integer(0))),

$.test(n.eq($.get("no"),n.decimal(20.06))) ?

 (body($.get("parts"),fn.concat($.get("ret"),$.test($.get("subtype")) ?

 (n.string(")")) :

 (n.string("")),n.string(",")),n.seq($.get("lastseen"),n.decimal(21.06)))) :

 ($.test(n.eq($.get("no"),n.integer(24))) ?

 (as($.get("param"),fn.tail($.get("parts")),fn.concat($.get("ret"),$.test($.get("subtype")) ?

 (n.string(")")) :

 (n.string("")),n.string(",")),$.get("lastseen"),$.get("subtype"),fn.true())) :

 ($.test(n.eq($.get("no"),n.integer(1))) ?

 ($.test($.get("subtype")) ?

 (as($.get("param"),fn.tail($.get("parts")),fn.concat($.get("ret"),n.string(",")),$.get("lastseen"),$.get("subtype"),$.get("seqtype"))) :

 (params(fn.tail($.get("parts")),fn.concat($.get("ret"),n.string(",")),n.seq()))) :

 ($.test(fn.matches($.get("head"),fn.concat(n.string("core:["),ncname,n.string("]+")))) ?

 ($.test(fn.matches($.get("next"),n.string("^\\s*\\(\\s*$"))) ?

 (as(n.seq(),fn.subsequence($.get("parts"),n.integer(3)),fn.concat($.get("ret"),$.get("head"),n.string("("),$.get("param"),n.string(","),$.test(n.eq($.get("head"),n.string("core:function"))) ?

 (n.string("(")) :

 (n.string(""))),$.get("lastseen"),fn.true(),$.get("seqtype"))) :

 (as(n.seq(),fn.tail($.get("parts")),fn.concat($.get("ret"),$.get("head"),n.string("("),$.get("param"),$.test(n.eq($.get("head"),n.string("core:function"))) ?

 (n.string(",(")) :

 (n.string(""))),$.get("lastseen"),$.get("subtype"),$.get("seqtype")))) :

 ($.test(fn.matches($.get("head"),n.string("[\\?\\+\\*]"))) ?

 (as($.get("param"),fn.tail($.get("parts")),fn.concat($.get("ret"),$.get("head")),$.get("lastseen"),$.get("subtype"),$.get("seqtype"))) :

 ($.test(fn.matches($.get("head"),n.string("^(\\(\\))?\\s*\\)"))) ?

 ($.test(n.and($.get("subtype"),n.geq($.get("non"),n.seq(n.integer(1),n.integer(24))))) ?

 (as($.get("param"),fn.tail($.get("parts")),fn.concat($.get("ret"),$.test(n.eq($.get("non"),n.integer(24))) ?

 (n.string("")) :

 (n.string(")"))),$.get("lastseen"),fn.false(),$.get("seqtype"))) :

 ($.test(n.eq($.get("non"),n.integer(24))) ?

 (as(n.seq(),fn.tail($.get("parts")),fn.concat($.get("ret"),$.test($.get("subtype")) ?

 (n.string(")")) :

 (n.string("")),n.string("))")),$.get("lastseen"),fn.false(),fn.false())) :

 ($.test(n.eq($.get("non"),n.decimal(20.06))) ?

 (body(fn.tail($.get("parts")),fn.concat($.get("ret"),$.test($.get("subtype")) ?

 (n.string(")")) :

 (n.string("")),$.test(fn.matches($.get("head"),n.string("^\\(\\)"))) ?

 (n.string(")")) :

 (n.string("")),n.string("),core:item(),")),n.seq($.get("lastseen"),n.decimal(21.06)))) :

 (console.log($.get("parts")))))) :

 (as($.get("param"),fn.tail($.get("parts")),fn.concat($.get("ret"),$.test(n.and(n.eq($.get("non"),n.integer(1)),$.get("seqtype"))) ?

 (n.string(")")) :

 (n.string("")),n.string(")")),$.get("lastseen"),$.get("subtype"),$.get("seqtype")))))))));
    }
    return n.error("err:XPST0017","Function as called with "+l+" arguments doesn't match any of the known signatures.");
}

export function params(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==3){
        $.init($.item("parts"),$.item("ret"),$.item("lastseen"));
        return ($.item("maybeParam",n.select(fn.head($.get("parts")),function($_0) { return fn.string($_0);})),

$.item("next",n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(2));}),function($_0) { return fn.string($_0);})),

$.test(fn.matches($.get("maybeParam"),n.string("^(\\(\\))?\\s*\\)"))) ?

 ($.test(n.eq($.get("next"),n.string("=#24="))) ?

 (as(n.seq(),fn.tail($.get("parts")),fn.concat($.get("ret"),n.string(")")),$.get("lastseen"),fn.false(),fn.false())) :

 (body(fn.tail($.get("parts")),fn.concat($.get("ret"),n.string("),core:item(),")),n.seq($.get("lastseen"),n.decimal(21.06))))) :

 ($.test(fn.matches($.get("maybeParam"),n.string("=#1="))) ?

 (params(fn.tail($.get("parts")),fn.concat($.get("ret"),n.string(",")),$.get("lastseen"))) :

 ($.test(fn.matches($.get("maybeParam"),n.string("^\\$"))) ?

 ($.test(n.eq($.get("next"),n.string("=#24="))) ?

 (as(fn.replace($.get("maybeParam"),n.string("^\\$"),n.string("\\$,")),fn.subsequence($.get("parts"),n.integer(3)),$.get("ret"),$.get("lastseen"),fn.false(),fn.false())) :

 (params(fn.tail($.get("parts")),fn.concat($.get("ret"),n.string("core:item("),fn.replace($.get("maybeParam"),n.string("^\\$"),n.string("\\$,")),n.string(")")),$.get("lastseen")))) :

 (params(fn.tail($.get("parts")),$.get("ret"),$.get("lastseen"))))));
    }
    return n.error("err:XPST0017","Function params called with "+l+" arguments doesn't match any of the known signatures.");
}

export function xfn(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("parts"),$.item("ret"));
        return n.item(params(fn.tail($.get("parts")),fn.concat($.get("ret"),n.select(n.filter(n.select(fn.head($.get("parts")),n.seq(n.string("fn:group"))),function($_0) { return n.geq(n.selectAttribute($_0,n.string("nr")),n.integer(1));}),function($_0) { return fn.string($_0);}),n.string(",(),(")),n.seq()));
    }
    return n.error("err:XPST0017","Function xfn called with "+l+" arguments doesn't match any of the known signatures.");
}

export function ns(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("parts"),$.item("ret"));
        return ($.item("ns",fn.replace(n.select(fn.head($.get("parts")),function($_0) { return fn.string($_0);}),n.string("\\s"),n.string(""))),

$.item("rest",fn.tail($.get("parts"))),

n.item(fn.stringJoin($.get("rest"))));
    }
    return n.error("err:XPST0017","Function ns called with "+l+" arguments doesn't match any of the known signatures.");
}

export function xvar(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("parts"),$.item("ret"));
        return n.item(body(fn.subsequence($.get("parts"),n.integer(3)),fn.concat($.get("ret"),n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(1));}),function($_0) { return fn.string($_0);}),n.string(",(),")),n.seq(n.decimal(2.18))));
    }
    return n.error("err:XPST0017","Function xvar called with "+l+" arguments doesn't match any of the known signatures.");
}

export function xns(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("parts"),$.item("ret"));
        return n.item(block(fn.subsequence($.get("parts"),n.integer(4)),fn.concat($.get("ret"),n.string("core:namespace($,"),n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(1));}),n.string(","),n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(3));}),n.string(")"))));
    }
    return n.error("err:XPST0017","Function xns called with "+l+" arguments doesn't match any of the known signatures.");
}

export function annot(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==3){
        $.init($.item("parts"),$.item("ret"),$.item("annot"));
        return ($.item("maybeAnnot",n.select(n.filter(n.select(fn.head($.get("parts")),n.seq(n.string("fn:group"))),function($_0) { return n.geq(n.selectAttribute($_0,n.string("nr")),n.integer(1));}),function($_0) { return fn.string($_0);})),

$.item("rest",fn.tail($.get("parts"))),

$.test(fn.matches($.get("maybeAnnot"),n.string("^%"))) ?

 (annot($.get("rest"),$.get("ret"),fn.replace($.get("maybeAnnot"),n.string("^%"),n.string("-")))) :

 ($.test(n.geq($.get("maybeAnnot"),n.string("namespace"))) ?

 (xns($.get("rest"),$.get("ret"))) :

 ($.test(n.geq($.get("maybeAnnot"),n.string("=#21#06="))) ?

 (xfn($.get("rest"),fn.concat($.get("ret"),n.string("core:define"),$.get("annot"),n.string("($,")))) :

 ($.test(n.geq($.get("maybeAnnot"),n.string("=#2#18="))) ?

 (xvar($.get("rest"),fn.concat($.get("ret"),n.string("core:var"),$.get("annot"),n.string("($,")))) :

 ($.get("ret"))))));
    }
    return n.error("err:XPST0017","Function annot called with "+l+" arguments doesn't match any of the known signatures.");
}

export function xversion(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("parts"),$.item("ret"));
        return n.item(block(fn.subsequence($.get("parts"),n.integer(3)),fn.concat($.get("ret"),n.string("core:xq-version($,"),n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(2));}),function($_0) { return fn.string($_0);}),n.string(")"))));
    }
    return n.error("err:XPST0017","Function xversion called with "+l+" arguments doesn't match any of the known signatures.");
}

export function xmodule(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("parts"),$.item("ret"));
        return n.item(block(fn.subsequence($.get("parts"),n.integer(5)),fn.concat($.get("ret"),n.string("core:module($,"),n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(2));}),function($_0) { return fn.string($_0);}),n.string(","),n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(4));}),function($_0) { return fn.string($_0);}),n.string(",())"))));
    }
    return n.error("err:XPST0017","Function xmodule called with "+l+" arguments doesn't match any of the known signatures.");
}

export function close(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==3){
        $.init($.decimal("lastseen"),$.decimal("no"),$.decimal("ret"));
        return $.test(n.or(fn.empty($.get("lastseen")),n.eq($.get("no"),n.integer(0)))) ?

 (fn.reverse(n.seq($.get("ret"),$.get("lastseen")))) :

 ($.test(n.ne(fn.head($.get("lastseen")),n.decimal(0.01))) ?

 (close(fn.tail($.get("lastseen")),$.get("no"),n.seq(fn.head($.get("lastseen")),$.get("ret")))) :

 (close(fn.tail($.get("lastseen")),n.subtract($.get("no"),n.integer(1)),$.get("ret"))));
    }
    return n.error("err:XPST0017","Function close called with "+l+" arguments doesn't match any of the known signatures.");
}

export function closer(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.decimal("b"),$.integer("c"));
        return $.test(n.and(fn.exists($.get("b")),n.geq(fn.head($.get("b")),n.seq(n.decimal(2.08),n.decimal(2.11))))) ?

 (closer(fn.tail($.get("b")),n.add($.get("c"),n.integer(1)))) :

 ($.get("c"));
    }
    return n.error("err:XPST0017","Function closer called with "+l+" arguments doesn't match any of the known signatures.");
}

export function lastIndexOf(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.decimal("lastseen"),$.decimal("a"));
        return ($.item("id",fn.indexOf($.get("lastseen"),$.get("a"))),

n.item($.test(fn.empty($.get("id"))) ?

 (n.integer(1)) :

 (n.filter($.get("id"),function($_0) { return n.geq(fn.position($_0),fn.last($_0));}))));
    }
    return n.error("err:XPST0017","Function lastIndexOf called with "+l+" arguments doesn't match any of the known signatures.");
}

export function pop(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("a"));
        return n.item(fn.reverse(fn.tail(fn.reverse($.get("a")))));
    }
    return n.error("err:XPST0017","Function pop called with "+l+" arguments doesn't match any of the known signatures.");
}

export function anon(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==4){
        $.init($.item("head"),$.item("parts"),$.item("ret"),$.item("lastseen"));
        return n.item(params($.get("parts"),fn.concat($.get("ret"),n.string("core:function((")),$.get("lastseen")));
    }
    return n.error("err:XPST0017","Function anon called with "+l+" arguments doesn't match any of the known signatures.");
}

export function comment(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==3){
        $.init($.item("parts"),$.item("ret"),$.item("lastseen"));
        return ($.item("head",n.select(fn.head($.get("parts")),function($_0) { return fn.string($_0);})),

$.item("rest",fn.tail($.get("parts"))),

$.test(n.geq($.get("head"),n.string("=#25#02="))) ?

 (body($.get("rest"),$.get("ret"),$.get("lastseen"))) :

 (comment($.get("rest"),$.get("ret"),$.get("lastseen"))));
    }
    return n.error("err:XPST0017","Function comment called with "+l+" arguments doesn't match any of the known signatures.");
}

export function bodyOp(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==5){
        $.init($.item("no"),$.item("next"),$.item("lastseen"),$.item("rest"),$.string("ret"));
        return ($.item("llast",n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),fn.last($_0));})),

$.item("ret",$.test(n.eq($.get("llast"),n.decimal(19.01))) ?

 (fn.concat($.get("ret"),n.string(")"))) :

 ($.get("ret"))),

$.item("lastseen",$.test(n.eq($.get("llast"),n.decimal(19.01))) ?

 (pop($.get("lastseen"))) :

 ($.get("lastseen"))),

$.test(n.eq($.get("no"),n.integer(1))) ?

 ($.item("old",$.get("lastseen")),

$.item("closer",closer(fn.reverse($.get("lastseen")),n.integer(0))),

$.item("lastseen",fn.subsequence($.get("lastseen"),n.integer(1),n.subtract(fn.count($.get("lastseen")),$.get("closer")))),

$.item("ret",fn.concat($.get("ret"),fn.stringJoin(n.forEach(n.seq(n.to(n.integer(1),$.get("closer"))),n.string(")"))),$.test(n.eq(n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),n.subtract(fn.last($_0),n.integer(1)));}),n.decimal(21.07))) ?

 (n.string("),=#27#01=(")) :

 (n.string(",")))),

body($.get("rest"),$.get("ret"),$.get("lastseen"))) :

 ($.test(n.eq($.get("no"),n.decimal(25.01))) ?

 (comment($.get("rest"),$.get("ret"),$.get("lastseen"))) :

 ($.test(n.eq($.get("no"),n.decimal(21.06))) ?

 (anon($.get("next"),fn.tail($.get("rest")),$.get("ret"),$.get("lastseen"))) :

 ($.test(n.eq(fn.round($.get("no")),n.integer(21))) ?

 ($.item("ret",fn.concat($.get("ret"),opStr($.get("no")),n.string("("))),

$.item("qn",$.test(n.ne($.get("next"),n.string("=#20#06="))) ?

 ($.get("next")) :

 (n.seq())),

$.item("rest",$.test(fn.exists($.get("qn"))) ?

 (fn.tail($.get("rest"))) :

 ($.get("rest"))),

$.item("ret",$.test(fn.exists($.get("qn"))) ?

 (fn.concat($.get("ret"),$.get("next"),n.string(","))) :

 ($.get("ret"))),

body($.get("rest"),$.get("ret"),n.seq($.get("lastseen"),$.get("no")))) :

 ($.item("old",$.get("lastseen")),

$.item("llast",n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),fn.last($_0));})),

$.item("positional",n.and(n.and(n.eq($.get("no"),n.decimal(20.01)),$.get("next")),n.seq(n.or(n.seq(n.and(fn.matches($.get("next"),n.concat(n.concat(n.string("^([\\+\\-]?(\\p{N}+))$|^\\$["),ncname),n.string("]+$"))),n.eq(n.filter($.get("rest"),function($_0) { return n.geq(fn.position($_0),n.integer(2));}),n.string("=#20#02=")))),fn.matches($.get("next"),n.string("(fn:)?last")))))),

$.item("hascomma",fn.matches($.get("ret"),n.string(",$"))),

$.item("letopener",n.and(n.eq($.get("no"),n.decimal(2.09)),n.seq(n.or(fn.not(n.or(n.geq($.get("llast"),n.seq(n.decimal(2.09),n.decimal(2.10))),n.seq(n.and(n.eq($.get("llast"),n.decimal(2.08)),n.geq($.get("hascomma"),fn.false()))))),n.seq(n.eq($.get("llast"),n.decimal(20.06))))))),

$.item("elsecloser",$.test(n.eq($.get("no"),n.decimal(2.08))) ?

 (lastIndexOf($.get("lastseen"),n.decimal(2.07))) :

 (n.integer(0))),

$.item("retncloser",$.test(n.eq($.get("no"),n.decimal(2.11))) ?

 (lastIndexOf($.get("lastseen"),n.decimal(2.1))) :

 (n.integer(0))),

$.item("letclose",n.and(n.and(n.eq($.get("no"),n.decimal(2.09)),fn.not(n.or(n.eq($.get("llast"),n.decimal(20.06)),fn.empty($.get("lastseen"))))),n.geq($.get("hascomma"),fn.false()))),

$.item("letcloser",$.test(n.and($.get("letclose"),n.geq($.get("llast"),n.seq(n.decimal(2.08),n.decimal(2.11))))) ?

 (closer(fn.reverse($.get("lastseen")),n.integer(0))) :

 (n.integer(0))),

$.item("ret",fn.concat($.get("ret"),$.test(n.geq($.get("no"),n.seq(n.decimal(2.06),n.decimal(2.09),n.decimal(20.01),n.decimal(20.04)))) ?

 (fn.concat($.test($.get("letclose")) ?

 (fn.concat(fn.stringJoin(n.forEach(n.seq(n.to(n.integer(1),$.get("letcloser"))),n.string(")"))),$.test(n.eq(n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),n.subtract(fn.last($_0),$.get("letcloser")));}),n.decimal(2.10))) ?

 (n.string(")")) :

 (n.string("")),$.test($.get("hascomma")) ?

 (n.string("")) :

 (n.string(",")))) :

 (n.string("")),$.test($.get("letopener")) ?

 (n.string("(")) :

 (n.string("")),opStr($.get("no")),$.test(n.eq($.get("no"),n.decimal(20.04))) ?

 (n.string("(")) :

 (n.string("")),$.test(n.eq($.get("no"),n.decimal(2.06))) ?

 (n.string("")) :

 (n.string("(")),$.test(n.eq($.get("no"),n.decimal(2.09))) ?

 (fn.concat(n.string("$,"),fn.replace($.get("next"),n.string("^\\$|\\s"),n.string("")))) :

 ($.test(n.eq($.get("no"),n.decimal(20.01))) ?

 (fn.concat($.test(fn.matches($.get("next"),n.string("#20#08"))) ?

 (n.string(".")) :

 ($.test($.get("positional")) ?

 (n.string("position(.)=#5#07=")) :

 (n.string(""))),$.get("next"))) :

 (n.string(""))))) :

 ($.test(n.or(n.eq($.get("no"),n.integer(26)),n.seq(n.and(n.eq($.get("no"),n.decimal(2.10)),n.eq(n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),n.subtract(fn.last($_0),n.integer(1)));}),n.decimal(21.07)))))) ?

 (n.string(",")) :

 ($.test(n.eq($.get("no"),n.decimal(20.07))) ?

 ($.item("lastindex",lastIndexOf($.get("lastseen"),n.decimal(20.06))),

$.item("closes",n.filter(fn.subsequence($.get("lastseen"),$.get("lastindex"),fn.count($.get("lastseen"))),function($_0) { return n.geq($_0,n.seq(n.decimal(2.08),n.decimal(2.11)));})),

$.item("closes",$.test(n.eq($.get("next"),n.string("=#20#06="))) ?

 ($.get("closes")) :

 (n.seq($.get("closes"),n.decimal(2.11)))),

$.item("llast",n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),n.subtract($.get("lastindex"),n.integer(1)));})),

fn.concat($.test(n.eq(fn.round($.get("llast")),n.integer(21))) ?

 (n.string(")")) :

 (n.string("")),$.test(n.and(n.seq(n.or(n.eq($.get("llast"),n.decimal(21.07)),fn.empty($.get("llast")))),n.geq(fn.matches($.get("ret"),n.string("\\($")),fn.false()))) ?

 (n.string(")")) :

 (n.string("")),fn.stringJoin(n.forEach($.get("closes"),n.string(")"))),$.test(n.eq($.get("next"),n.string("=#20#06="))) ?

 (n.string(",")) :

 (n.string("")))) :

 ($.test(n.geq($.get("no"),n.seq(n.decimal(2.07),n.decimal(2.10)))) ?

 (fn.concat($.test(n.eq($.get("llast"),n.decimal(2.11))) ?

 (n.string(")")) :

 (n.string("")),n.string(","))) :

 ($.test(n.eq($.get("no"),n.decimal(2.08))) ?

 (fn.concat(fn.stringJoin(n.forEach(fn.subsequence($.get("lastseen"),n.add($.get("elsecloser"),n.integer(1))),n.string(")"))),n.string(","))) :

 ($.test(n.eq($.get("no"),n.decimal(2.11))) ?

 (fn.concat(fn.stringJoin(n.forEach(fn.subsequence($.get("lastseen"),n.add($.get("retncloser"),n.integer(1))),n.string(")"))),n.string("),"))) :

 ($.test(n.eq($.get("no"),n.decimal(20.02))) ?

 ($.test(n.eq($.get("llast"),n.decimal(20.04))) ?

 (n.string("))")) :

 (n.string(")"))) :

 ($.test(n.eq($.get("no"),n.decimal(20.06))) ?

 ($.test(n.or(n.eq($.get("llast"),n.decimal(21.07)),n.ne(fn.round($.get("llast")),n.integer(21)))) ?

 ($.test(n.or(fn.empty($.get("next")),n.eq($.get("next"),n.string("=#20#07=")))) ?

 (n.string("(")) :

 (n.string("(=#27#01=("))) :

 (n.string("("))) :

 ($.test(n.eq($.get("no"),n.decimal(19.01))) ?

 (n.concat(opStr($.get("no")),n.string("("))) :

 (opStr($.get("no"))))))))))))),

$.item("rest",$.test(n.or(fn.empty($.get("rest")),fn.not(n.geq($.get("no"),n.seq(n.decimal(2.09),n.decimal(20.01)))))) ?

 ($.get("rest")) :

 ($.test(n.and(n.geq($.get("next"),fns),fn.matches(n.filter($.get("rest"),function($_0) { return n.geq(fn.position($_0),n.integer(2));}),n.string("\\)")))) ?

 (fn.insertBefore(fn.remove(fn.tail($.get("rest")),n.integer(1)),n.integer(1),n.element(n.string("fn:match"),n.seq(n.element(n.string("fn:group"),n.seq(n.attribute(n.string("nr"),n.seq(n.integer(1))),n.string("(.)"))))))) :

 (fn.tail($.get("rest"))))),

$.item("lastseen",$.test(n.geq($.get("no"),n.seq(n.decimal(2.06),n.decimal(2.09),n.decimal(20.01),n.decimal(20.04)))) ?

 ($.item("lastseen",$.test($.get("letclose")) ?

 (fn.subsequence($.get("lastseen"),n.integer(1),n.subtract(fn.count($.get("lastseen")),$.get("letcloser")))) :

 ($.get("lastseen"))),

$.item("lastseen",$.test(n.and($.get("letclose"),n.eq(n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),fn.last($_0));}),n.decimal(2.10)))) ?

 (pop($.get("lastseen"))) :

 ($.get("lastseen"))),

n.seq($.get("lastseen"),

$.get("no"))) :

 ($.test(n.or(n.eq($.get("no"),n.integer(26)),n.seq(n.and(n.eq($.get("no"),n.decimal(2.10)),n.eq(n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),n.subtract(fn.last($_0),n.integer(1)));}),n.decimal(21.07)))))) ?

 ($.get("lastseen")) :

 ($.test(n.geq($.get("no"),n.decimal(20.07))) ?

 ($.item("lastseen",fn.subsequence($.get("lastseen"),n.integer(1),n.subtract(lastIndexOf($.get("lastseen"),n.decimal(20.06)),n.integer(1)))),

$.test(n.and(n.eq(fn.round(n.filter($.get("lastseen"),function($_0) { return n.geq(fn.position($_0),fn.last($_0));})),n.integer(21)),n.eq($.get("next"),n.string("=#20#06=")))) ?

 ($.get("lastseen")) :

 (pop($.get("lastseen")))) :

 ($.test(n.geq($.get("no"),n.seq(n.decimal(2.07),n.decimal(2.10)))) ?

 ($.item("lastseen",$.test(n.or(n.eq($.get("llast"),n.decimal(2.11)),n.seq(n.and(n.eq($.get("no"),n.decimal(2.07)),n.eq($.get("llast"),n.decimal(0.01)))))) ?

 (pop($.get("lastseen"))) :

 ($.get("lastseen"))),

$.item("last",n.filter(fn.indexOf($.get("lastseen"),n.subtract($.get("no"),n.decimal(n.decimal(0.01)))),function($_0) { return n.geq(fn.position($_0),fn.last($_0));})),

n.seq(fn.remove($.get("lastseen"),$.get("last")),

$.get("no"))) :

 ($.test(n.eq($.get("no"),n.decimal(2.08))) ?

 ($.item("lastseen",fn.subsequence($.get("lastseen"),n.integer(1),n.subtract($.get("elsecloser"),n.integer(1)))),

n.seq($.get("lastseen"),

$.get("no"))) :

 ($.test(n.eq($.get("no"),n.decimal(2.11))) ?

 ($.item("lastseen",fn.subsequence($.get("lastseen"),n.integer(1),n.subtract($.get("retncloser"),n.integer(1)))),

n.seq($.get("lastseen"),

$.get("no"))) :

 ($.test(n.or(n.or(n.eq($.get("no"),n.decimal(20.06)),n.eq(fn.round($.get("no")),n.integer(21))),n.eq($.get("no"),n.decimal(19.01)))) ?

 (n.seq($.get("lastseen"),$.get("no"))) :

 ($.test(n.eq($.get("no"),n.decimal(20.02))) ?

 (pop($.get("lastseen"))) :

 ($.get("lastseen")))))))))),

body($.get("rest"),$.get("ret"),$.get("lastseen")))))));
    }
    return n.error("err:XPST0017","Function bodyOp called with "+l+" arguments doesn't match any of the known signatures.");
}

export function isArray(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==3){
        $.init($.item("head"),$.item("non"),$.item("next"));
        return n.item(n.and(n.and(n.eq($.get("non"),n.decimal(20.01)),n.geq(fn.matches($.get("head"),n.string("\\)\\s*$")),fn.false())),fn.matches($.get("head"),n.concat(n.concat(n.string("^(\\s|\\(|,|"),operatorRegexp),n.string(")")))));
    }
    return n.error("err:XPST0017","Function isArray called with "+l+" arguments doesn't match any of the known signatures.");
}

export function parenCloser(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("head"),$.item("lastseen"));
        return n.item($.test(fn.matches($.get("head"),n.string("[\\(\\)]+"))) ?

 ($.item("cp",fn.stringToCodepoints($.get("head"))),

$.item("old",$.get("lastseen")),

$.item("lastseen",n.seq($.get("lastseen"),n.forEach(n.filter($.get("cp"),function($_0) { return n.eq($_0,n.integer(40));}),n.decimal(0.01)))),

close(fn.reverse($.get("lastseen")),fn.count(n.filter($.get("cp"),function($_0) { return n.eq($_0,n.integer(41));})),n.seq())) :

 ($.get("lastseen")));
    }
    return n.error("err:XPST0017","Function parenCloser called with "+l+" arguments doesn't match any of the known signatures.");
}

export function body(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==3){
        $.init($.item("parts"),$.item("ret"),$.item("lastseen"));
        return $.test(fn.empty($.get("parts"))) ?

 (fn.concat($.get("ret"),fn.stringJoin(n.forEach(n.filter($.get("lastseen"),function($_0) { return n.geq($_0,n.seq(n.decimal(2.08),n.decimal(2.11),n.decimal(20.07),n.decimal(2.18)));}),n.string(")"))))) :

 ($.item("head",n.select(fn.head($.get("parts")),function($_0) { return fn.string($_0);})),

$.item("rest",fn.tail($.get("parts"))),

$.item("lastseen",parenCloser($.get("head"),$.get("lastseen"))),

$.test(n.geq($.get("head"),n.string("=#25#01="))) ?

 (comment($.get("rest"),$.get("ret"),$.get("lastseen"))) :

 ($.test(fn.matches($.get("head"),n.string(";"))) ?

 (block($.get("parts"),$.get("ret"))) :

 ($.item("next",$.test(fn.empty($.get("rest"))) ?

 (n.seq()) :

 (n.select(fn.head($.get("rest")),function($_0) { return fn.string($_0);}))),

$.item("non",$.test(fn.matches($.get("next"),operatorRegexp)) ?

 (opNum($.get("next"))) :

 (n.integer(0))),

$.item("rest",$.test(isArray($.get("head"),$.get("non"),$.get("next"))) ?

 (fn.insertBefore(fn.tail($.get("rest")),n.integer(1),n.element(n.string("fn:match"),n.seq(n.element(n.string("fn:group"),n.seq(n.attribute(n.string("nr"),n.seq(n.integer(1))),opStr(n.decimal(20.04)))))))) :

 ($.test(n.and(n.geq($.get("head"),fns),fn.matches($.get("next"),n.string("\\)")))) ?

 (fn.insertBefore(fn.tail($.get("rest")),n.integer(1),n.element(n.string("fn:match"),n.seq(n.element(n.string("fn:group"),n.seq(n.attribute(n.string("nr"),n.seq(n.integer(1))),n.string("(.)"))))))) :

 ($.get("rest")))),

$.item("head",$.test(n.and(fn.empty($.get("ret")),n.eq($.get("head"),n.string("=#20#01=")))) ?

 (n.string("=#20#04=")) :

 ($.get("head"))),

$.test(fn.matches($.get("head"),operatorRegexp)) ?

 (bodyOp(opNum($.get("head")),$.get("next"),$.get("lastseen"),$.get("rest"),$.get("ret"))) :

 (body($.get("rest"),fn.concat($.get("ret"),$.get("head")),$.get("lastseen"))))));
    }
    return n.error("err:XPST0017","Function body called with "+l+" arguments doesn't match any of the known signatures.");
}

export function ximport(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("parts"),$.item("ret"));
        return ($.item("rest",fn.subsequence($.get("parts"),n.integer(6))),

$.item("maybeAt",n.select(fn.head($.get("rest")),function($_0) { return fn.string($_0);})),

n.item($.test(fn.matches($.get("maybeAt"),n.string("at"))) ?

 (block(fn.subsequence($.get("rest"),n.integer(3)),fn.concat($.get("ret"),n.string("core:import($,"),n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(3));}),function($_0) { return fn.string($_0);}),n.string(","),n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(5));}),function($_0) { return fn.string($_0);}),n.string(","),n.select(n.filter($.get("rest"),function($_0) { return n.geq(fn.position($_0),n.integer(2));}),function($_0) { return fn.string($_0);}),n.string(")")))) :

 (block($.get("rest"),fn.concat($.get("ret"),n.string("core:import($,"),n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(3));}),function($_0) { return fn.string($_0);}),n.string(","),n.select(n.filter($.get("parts"),function($_0) { return n.geq(fn.position($_0),n.integer(5));}),function($_0) { return fn.string($_0);}),n.string(")"))))));
    }
    return n.error("err:XPST0017","Function ximport called with "+l+" arguments doesn't match any of the known signatures.");
}

export function block(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("parts"),$.item("ret"));
        return $.test(fn.empty($.get("parts"))) ?

 ($.get("ret")) :

 ($.item("val",n.select(fn.head($.get("parts")),function($_0) { return fn.string($_0);})),

$.item("rest",fn.tail($.get("parts"))),

$.test(fn.matches($.get("val"),operatorRegexp)) ?

 ($.item("no",opNum($.get("val"))),

$.test(n.eq($.get("no"),n.decimal(2.14))) ?

 (xversion($.get("rest"),$.get("ret"))) :

 ($.test(n.eq($.get("no"),n.decimal(2.16))) ?

 (xmodule($.get("rest"),$.get("ret"))) :

 ($.test(n.eq($.get("no"),n.decimal(2.17))) ?

 (annot($.get("rest"),$.get("ret"),n.string(""))) :

 ($.test(n.eq($.get("no"),n.decimal(2.19))) ?

 (ximport($.get("rest"),$.get("ret"))) :

 (body($.get("parts"),$.get("ret"),n.seq())))))) :

 ($.test(fn.matches($.get("val"),n.string(";"))) ?

 ($.test(fn.empty($.get("rest"))) ?

 ($.get("ret")) :

 (block($.get("rest"),fn.concat($.get("ret"),n.string(","))))) :

 (body($.get("parts"),$.get("ret"),n.seq()))));
    }
    return n.error("err:XPST0017","Function block called with "+l+" arguments doesn't match any of the known signatures.");
}

export function toOp(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("opnum"));
        return n.item($.test(map.contains(operatorMap,$.get("opnum"))) ?

 (n.concat(n.string("core:"),n.call(operatorMap,$.get("opnum")))) :

 (n.concat(n.string("core:"),fn.replace(n.call(operators,$.get("opnum")),n.string(" "),n.string("-")))));
    }
    return n.error("err:XPST0017","Function toOp called with "+l+" arguments doesn't match any of the known signatures.");
}

export function fromOp(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("op"));
        return ($.item("k",map.keys(operatorsI)),

$.item("i",n.filter(fn.indexOf($.get("k"),fn.replace($.get("op"),n.string("^core:"),n.string(""))),function($_0) { return n.geq(fn.position($_0),n.integer(1));})),

n.item(n.decimal(n.call(operatorsI,n.filter($.get("k"),function($_0) { return n.geq(fn.position($_0),$.get("i"));})))));
    }
    return n.error("err:XPST0017","Function fromOp called with "+l+" arguments doesn't match any of the known signatures.");
}

export function rename(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==2){
        $.init($.item("a"),$.item("fn"));
        return array.forEach($.get("a"),function(...a){
    var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("t"));
        return n.item($.test(n.instanceOf($.get("t"),Map)) ?

 (n.map(n.seq(n.pair(n.string("name"),n.call($.get("fn"),n.call($.get("t"),n.string("name")))),n.pair(n.string("args"),rename(n.call($.get("t"),n.string("args")),$.get("fn"))),n.pair(n.string("suffix"),n.call($.get("t"),n.string("suffix")))))) :

 ($.get("t")));
    }
    return n.error("err:XPST0017","Anonymous function called with "+l+" arguments doesn't match any of the known signatures.");
});
    }
    return n.error("err:XPST0017","Function rename called with "+l+" arguments doesn't match any of the known signatures.");
}

export function escapeForRegex(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("key"));
        return ($.item("arg",n.call(operators,$.get("key"))),

$.item("pre",n.string("(^|[\\s,\\(\\);\\[\\]]+)")),

n.string($.test(fn.matches($.get("arg"),n.string("\\p{L}+"))) ?

 ($.test(n.eq($.get("key"),n.decimal(2.17))) ?

 (n.concat(n.concat(n.string("(\\s?|;?)"),$.get("arg")),n.string("(\\s?)"))) :

 ($.test(n.eq($.get("key"),n.decimal(21.06))) ?

 (n.concat(n.concat(n.concat(n.concat($.get("pre"),$.get("arg")),n.string("([\\s")),ncname),n.string(":]*\\s*\\((\\$|\\)))"))) :

 ($.test(n.eq(fn.round($.get("key")),n.integer(21))) ?

 (n.concat(n.concat(n.concat(n.concat($.get("pre"),$.get("arg")),n.string("([\\s\\$")),ncname),n.string(",:]*=#20#06)"))) :

 ($.test(n.or(n.eq($.get("key"),n.decimal(2.04)),n.eq(fn.round($.get("key")),n.integer(22)))) ?

 (n.concat(n.concat($.get("pre"),$.get("arg")),n.string("(\\()"))) :

 ($.test(n.eq(fn.round($.get("key")),n.integer(24))) ?

 (n.concat(n.concat($.get("pre"),$.get("arg")),n.string("(\\s)"))) :

 ($.test(n.geq($.get("arg"),n.string("if"))) ?

 (n.concat(n.concat($.get("pre"),$.get("arg")),n.string("(\\s?)"))) :

 ($.test(n.geq($.get("arg"),n.string("then"))) ?

 (n.concat(n.concat(n.string("\\)(\\s*)"),$.get("arg")),n.string("(\\s?)"))) :

 (n.concat(n.concat(n.string("(^|\\s)"),$.get("arg")),n.string("(\\s|$)")))))))))) :

 ($.item("arg",fn.replace($.get("arg"),n.string("(\\.|\\[|\\]|\\\\|\\||\\-|\\^|\\$|\\?|\\*|\\+|\\{|\\}|\\(|\\))"),n.string("\\\\$1"))),

$.test(n.eq($.get("key"),n.integer(26))) ?

 (n.concat(n.concat(n.string("(\\s?)"),$.get("arg")),n.string("(\\s*[^\\p{L}])"))) :

 ($.test(n.eq($.get("key"),n.decimal(2.10))) ?

 (n.string("(\\s?):\\s*=([^#])")) :

 ($.test(n.geq($.get("key"),n.seq(n.decimal(8.02),n.decimal(17.02)))) ?

 (n.concat(n.concat($.get("pre"),$.get("arg")),n.string("([\\s\\p{N}])?"))) :

 ($.test(n.geq($.get("key"),n.seq(n.decimal(8.01),n.decimal(9.01),n.decimal(20.03)))) ?

 (n.concat(n.concat(n.string("([^/])"),$.get("arg")),n.string("(\\s*[^,\\)\\{])"))) :

 (n.concat(n.concat(n.string("(\\s?)"),$.get("arg")),n.string("(\\s?)")))))))));
    }
    return n.error("err:XPST0017","Function escapeForRegex called with "+l+" arguments doesn't match any of the known signatures.");
}

export function unaryOp(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("op"));
        return n.item(opStr(n.add(opNum($.get("op")),n.integer(9))));
    }
    return n.error("err:XPST0017","Function unaryOp called with "+l+" arguments doesn't match any of the known signatures.");
}

export function opInt(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("op"));
        return n.item(n.decimal(fn.replace($.get("op"),n.string("^=#(\\p{N}+)#?\\p{N}*=$"),n.string("$1"))));
    }
    return n.error("err:XPST0017","Function opInt called with "+l+" arguments doesn't match any of the known signatures.");
}

export function opNum(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("op"));
        return n.decimal(n.decimal(fn.replace($.get("op"),n.string("^=#(\\p{N}+)#?(\\p{N}*)=$"),n.string("$1.$2"))));
    }
    return n.error("err:XPST0017","Function opNum called with "+l+" arguments doesn't match any of the known signatures.");
}

export function opStr(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==1){
        $.init($.item("op"));
        return n.item(fn.concat(n.string("=#"),fn.replace(fn.string($.get("op")),n.string("\\."),n.string("#")),n.string("=")));
    }
    return n.error("err:XPST0017","Function opStr called with "+l+" arguments doesn't match any of the known signatures.");
}

export function operatorPrecedence(... a) {
	var l = a.length,
        $ = n.frame(a);
    if(l==3){
        $.init($.item("val"),$.item("operator"),$.item("ret"));
        return ($.item("rev",array.reverse($.get("ret"))),

$.item("last",array.head($.get("rev"))),

$.item("hasPrecedingOp",n.and(n.instanceOf($.get("last"),Map),fn.matches(n.call($.get("last"),n.string("name")),operatorRegexp))),

$.item("isUnaryOp",n.and(n.geq(opInt($.get("operator")),n.integer(8)),n.seq(n.or(fn.empty($.get("last")),n.seq(n.and(n.and($.get("hasPrecedingOp"),n.instanceOf(n.call($.get("last"),n.string("suffix")),n.boolean())),n.geq(n.call($.get("last"),n.string("suffix")),fn.false()))))))),

$.item("operator",$.test($.get("isUnaryOp")) ?

 (unaryOp($.get("operator"))) :

 ($.get("operator"))),

$.item("preceeds",n.and($.get("hasPrecedingOp"),n.ggt(opInt($.get("operator")),opInt(n.call($.get("last"),n.string("name")))))),

$.item("name",$.test($.get("preceeds")) ?

 (n.call($.get("last"),n.string("name"))) :

 ($.get("operator"))),

$.item("args",$.test($.get("preceeds")) ?

 (function($_0) { return $.item("argsize",array.size(n.call($.get("last"),n.string("args")))),

$.item("nargs",$.test($.get("isUnaryOp")) ?

 (n.array(n.seq())) :

 (n.filter(n.call(n.string("core:geq"),n.seq(fn.position($_0),n.call($.get("last"),n.string("args")))),n.seq(n.integer(2))))),

$.item("nargs",$.test($.get("val")) ?

 (array.append($.get("nargs"),$.get("val"))) :

 ($.get("nargs"))),

$.test(n.and(n.ggt($.get("argsize"),n.integer(1)),$.get("isUnaryOp"))) ?

 ($.item("pre",n.call(n.call(n.string("core:call"),n.seq($.get("last"),n.seq(n.string("args")))),n.seq(n.integer(2)))),

n.array(n.seq(n.call($.get("last"),n.seq(n.string("args"))),n.seq(n.integer(1)),n.map(n.seq(n.pair(n.string("name"),n.call($.get("pre"),n.string("name"))),n.pair(n.string("args"),array.append(n.call($.get("pre"),n.string("args")),n.map(n.seq(n.pair(n.string("name"),$.get("operator")),n.pair(n.string("args"),$.get("nargs")),n.pair(n.string("suffix"),n.string("")))))),n.pair(n.string("suffix"),n.string(""))))))) :

 (n.array(n.seq(n.call($.get("last"),n.seq(n.string("args"))),n.seq(n.integer(1)),n.map(n.seq(n.pair(n.string("name"),$.get("operator")),n.pair(n.string("args"),$.get("nargs")),n.pair(n.string("suffix"),n.string("")))))));}) :

 ($.item("nargs",$.test(fn.empty($.get("last"))) ?

 (n.array(n.seq())) :

 (n.array(n.seq($.get("last"))))),

$.test($.get("val")) ?

 (array.append($.get("nargs"),$.get("val"))) :

 ($.get("nargs")))),

n.item(array.append(array.reverse(array.tail($.get("rev"))),n.map(n.seq(n.pair(n.string("name"),$.get("name")),n.pair(n.string("args"),$.get("args")),n.pair(n.string("suffix"),fn.exists($.get("val"))))))));
    }
    return n.error("err:XPST0017","Function operatorPrecedence called with "+l+" arguments doesn't match any of the known signatures.");
}

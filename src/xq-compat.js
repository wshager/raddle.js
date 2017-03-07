import * as n from "./n";

import * as fn from "xvfn";

for (var k in fn.booleans) fn[k] = fn.booleans[k];

import * as map from "xvmap";

import * as array from "xvarray";

import * as console from "./console";

var $ = n.frame();
/* xquery version n.string("3.1") */

/*module namespace n.string("xqc")=n.string("http://raddle.org/xquery-compat");

n.seq()
.sort(function(a, b) {
    return a.gt(b) ? 1 : a.lt(b) ? -1 : 0;
})
*/

export const ncname = n.string("\\p{L}\\p{N}\\-_\\.@");

export const qname = n.concat(n.concat(n.concat(n.concat(n.concat(n.string("^(\\p{L}|@)["), ncname), n.string("]*:?")), n.string("[")), ncname), n.string("]*"));

export const operatorRegexp = n.string("=#\\p{N}+#?\\p{N}*=");

export const operators = n.map(n.seq(n.pair(n.integer(1), n.string(",")), n.pair(n.decimal(2.01), n.string("some")), n.pair(n.decimal(2.02), n.string("every")), n.pair(n.decimal(2.03), n.string("switch")), n.pair(n.decimal(2.04), n.string("typeswitch")), n.pair(n.decimal(2.05), n.string("try")), n.pair(n.decimal(2.06), n.string("if")), n.pair(n.decimal(2.07), n.string("then")), n.pair(n.decimal(2.08), n.string("else")), n.pair(n.decimal(2.09), n.string("let")), n.pair(n.decimal(2.10), n.string(":=")), n.pair(n.decimal(2.11), n.string("return")), n.pair(n.decimal(2.12), n.string("case")), n.pair(n.decimal(2.13), n.string("default")), n.pair(n.decimal(2.14), n.string("xquery")), n.pair(n.decimal(2.15), n.string("version")), n.pair(n.decimal(2.16), n.string("module")), n.pair(n.decimal(2.17), n.string("declare")), n.pair(n.decimal(2.18), n.string("variable")), n.pair(n.decimal(2.19), n.string("import")), n.pair(n.integer(3), n.string("or")), n.pair(n.integer(4), n.string("and")), n.pair(n.decimal(5.01), n.string("eq")), n.pair(n.decimal(5.02), n.string("ne")), n.pair(n.decimal(5.03), n.string("lt")), n.pair(n.decimal(5.04), n.string("le")), n.pair(n.decimal(5.05), n.string("gt")), n.pair(n.decimal(5.06), n.string("ge")), n.pair(n.decimal(5.07), n.string("=")), n.pair(n.decimal(5.08), n.string("!=")), n.pair(n.decimal(5.09), n.string("<=")), n.pair(n.decimal(5.10), n.string(">=")), n.pair(n.decimal(5.11), n.string("<<")), n.pair(n.decimal(5.12), n.string(">>")), n.pair(n.decimal(5.13), n.string("<")), n.pair(n.decimal(5.14), n.string(">")), n.pair(n.decimal(5.15), n.string("is")), n.pair(n.integer(6), n.string("||")), n.pair(n.integer(7), n.string("to")), n.pair(n.decimal(8.01), n.string("+")), n.pair(n.decimal(8.02), n.string("-")), n.pair(n.decimal(9.01), n.string("*")), n.pair(n.decimal(9.02), n.string("idiv")), n.pair(n.decimal(9.03), n.string("div")), n.pair(n.decimal(9.04), n.string("mod")), n.pair(n.decimal(10.01), n.string("union")), n.pair(n.decimal(10.02), n.string("|")), n.pair(n.decimal(11.01), n.string("intersect")), n.pair(n.decimal(11.02), n.string("except")), n.pair(n.integer(12), n.string("instance of")), n.pair(n.integer(13), n.string("treat as")), n.pair(n.integer(14), n.string("castable as")), n.pair(n.integer(15), n.string("cast as")), n.pair(n.integer(16), n.string("=>")), n.pair(n.decimal(17.01), n.string("+")), n.pair(n.decimal(17.02), n.string("-")), n.pair(n.integer(18), n.string("!")), n.pair(n.decimal(19.01), n.string("/")), n.pair(n.decimal(20.01), n.string("[")), n.pair(n.decimal(20.02), n.string("]")), n.pair(n.decimal(20.03), n.string("?")), n.pair(n.decimal(20.04), n.string("[")), n.pair(n.decimal(20.06), n.string("{")), n.pair(n.decimal(20.07), n.string("}")), n.pair(n.decimal(21.01), n.string("array")), n.pair(n.decimal(21.02), n.string("attribute")), n.pair(n.decimal(21.03), n.string("comment")), n.pair(n.decimal(21.04), n.string("document")), n.pair(n.decimal(21.05), n.string("element")), n.pair(n.decimal(21.06), n.string("function")), n.pair(n.decimal(21.07), n.string("map")), n.pair(n.decimal(21.08), n.string("namespace")), n.pair(n.decimal(21.09), n.string("processing-instruction")), n.pair(n.decimal(21.10), n.string("text")), n.pair(n.decimal(22.01), n.string("array")), n.pair(n.decimal(22.02), n.string("attribute")), n.pair(n.decimal(22.03), n.string("comment")), n.pair(n.decimal(22.04), n.string("document-node")), n.pair(n.decimal(22.05), n.string("element")), n.pair(n.decimal(22.06), n.string("empty-sequence")), n.pair(n.decimal(22.07), n.string("function")), n.pair(n.decimal(22.08), n.string("item")), n.pair(n.decimal(22.09), n.string("map")), n.pair(n.decimal(22.10), n.string("namespace-node")), n.pair(n.decimal(22.11), n.string("node")), n.pair(n.decimal(22.12), n.string("processing-instruction")), n.pair(n.decimal(22.13), n.string("schema-attribute")), n.pair(n.decimal(22.14), n.string("schema-element")), n.pair(n.decimal(22.15), n.string("text")), n.pair(n.integer(24), n.string("as")), n.pair(n.decimal(25.01), n.string("(:")), n.pair(n.decimal(25.02), n.string(":)")), n.pair(n.integer(26), n.string(":"))));

export const types = n.seq(n.string("untypedAtomic"), n.string("dateTime"), n.string("dateTimeStamp"), n.string("date"), n.string("time"), n.string("duration"), n.string("yearMonthDuration"), n.string("dayTimeDuration"), n.string("float"), n.string("double"), n.string("decimal"), n.string("integer"), n.string("nonPositiveInteger"), n.string("negativeInteger"), n.string("long"), n.string("int"), n.string("short"), n.string("byte"), n.string("nonNegativeInteger"), n.string("unsignedLong"), n.string("unsignedInt"), n.string("unsignedShort"), n.string("unsignedByte"), n.string("positiveInteger"), n.string("gYearMonth"), n.string("gYear"), n.string("gMonthDay"), n.string("gDay"), n.string("gMonth"), n.string("string"), n.string("normalizedString"), n.string("token"), n.string("language"), n.string("NMTOKEN"), n.string("Name"), n.string("NCName"), n.string("ID"), n.string("IDREF"), n.string("ENTITY"), n.string("boolean"), n.string("base64Binary"), n.string("hexBinary"), n.string("anyURI"), n.string("QName"), n.string("NOTATION"));

export const operatorMap = n.map(n.seq(n.pair(n.decimal(2.06), n.string("iff")), n.pair(n.decimal(2.09), n.string("item")), n.pair(n.decimal(5.01), n.string("eq")), n.pair(n.decimal(5.02), n.string("ne")), n.pair(n.decimal(5.03), n.string("lt")), n.pair(n.decimal(5.04), n.string("le")), n.pair(n.decimal(5.05), n.string("gt")), n.pair(n.decimal(5.06), n.string("ge")), n.pair(n.decimal(5.07), n.string("geq")), n.pair(n.decimal(5.08), n.string("gne")), n.pair(n.decimal(5.09), n.string("gle")), n.pair(n.decimal(5.10), n.string("gge")), n.pair(n.decimal(5.11), n.string("precedes")), n.pair(n.decimal(5.12), n.string("follows")), n.pair(n.decimal(5.13), n.string("glt")), n.pair(n.decimal(5.14), n.string("ggt")), n.pair(n.integer(6), n.string("concat")), n.pair(n.decimal(8.01), n.string("add")), n.pair(n.decimal(8.02), n.string("subtract")), n.pair(n.decimal(9.01), n.string("multiply")), n.pair(n.decimal(10.02), n.string("union")), n.pair(n.decimal(17.01), n.string("plus")), n.pair(n.decimal(17.02), n.string("minus")), n.pair(n.integer(18), n.string("for-each")), n.pair(n.decimal(19.01), n.string("select")), n.pair(n.decimal(20.01), n.string("filter")), n.pair(n.decimal(20.03), n.string("lookup")), n.pair(n.decimal(20.04), n.string("array")), n.pair(n.decimal(27.01), n.string("pair"))));

export const lrOp = n.seq(n.integer(3), n.integer(4), n.decimal(5.01), n.decimal(5.02), n.decimal(5.03), n.decimal(5.04), n.decimal(5.05), n.decimal(5.06), n.decimal(5.07), n.decimal(5.08), n.decimal(5.09), n.decimal(5.10), n.decimal(5.11), n.decimal(5.12), n.decimal(5.13), n.decimal(5.14), n.decimal(5.15), n.integer(6), n.integer(7), n.decimal(8.01), n.decimal(8.02), n.decimal(9.01), n.decimal(9.02), n.decimal(9.03), n.decimal(9.04), n.decimal(10.01), n.decimal(10.02), n.decimal(11.01), n.decimal(11.02), n.integer(12), n.integer(13), n.integer(14), n.integer(15), n.integer(18), n.decimal(19.01), n.decimal(20.03), n.integer(24));

export const fns = n.seq(n.string("position"), n.string("last"), n.string("name"), n.string("node-name"), n.string("nilled"), n.string("string"), n.string("data"), n.string("base-uri"), n.string("document-uri"), n.string("number"), n.string("string-length"), n.string("normalize-space"));

export function normalizeQuery$2(...$_a) {
    var $ = n.frame($_a)
        .string("query", n.zeroOrOne)
        .item("params");
    $ = $("query", fn.replace(fn.replace(fn.replace(fn.replace($("query"), n.string("%3E"), n.string(">")), n.string("%3C"), n.string("<")), n.string("%2C"), n.string(",")), n.string("%3A"), n.string(":")));
    $ = $("query", fn.replace($("query"), n.string("([\\*\\+\\?])\\s+([,\\)\\{])"), n.string("$1$2")));
    $ = $("query", fn.foldLeft(n.filter(map.keys(n.call($("params"), n.string("$operators"))).sort(function(a, b) {
        return a.gt(b) ? 1 : a.lt(b) ? -1 : 0;
    }), $_0 => $.test(n.ne($_0, n.decimal(5.07))) && $.test(n.ne($_0, n.integer(1)))), $("query"), function(...$_a) {
        $ = $.frame($_a)
            .item("cur")
            .item("next");
        return fn.replace($("cur"), escapeForRegex($("next"), $("params")), ($ => {
            if ($.test(n.eq(fn.floor($("next")), n.integer(22)))) {
                return fn.concat(n.string("$1"), toOp($("next"), $("params")), n.string("$2"));
            } else {
                return fn.concat(n.string("$1 "), opStr($("next")), n.string(" $2"));
            }
        })($.frame()));

    }));
    $ = $("query", fn.foldLeft(types, $("query"), function(...$_a) {
        $ = $.frame($_a)
            .item("cur")
            .item("next");
        $ = $("cur", fn.replace($("cur"), fn.concat(n.string("xs:"), $("next"), n.string("\\s*([^\\(])")), fn.concat(n.string("core:"), $("next"), n.string("()$1"))));
        return fn.replace($("cur"), fn.concat(n.string("xs:"), $("next"), n.string("\\s*\\(")), fn.concat(n.string("core:"), $("next"), n.string("(")));

    }));
    $ = $("query", fn.replace($("query"), n.string(","), n.string("=#1=")));
    $ = $("query", fn.replace($("query"), n.string("=(#\\p{N}+#?\\p{N}*)="), n.string("%3D$1%3D")));
    $ = $("query", fn.replace($("query"), n.string("="), n.string("=#5#07=")));
    $ = $("query", fn.replace($("query"), n.string("%3D"), n.string("=")));
    $ = $("query", fn.replace($("query"), n.concat(n.concat(n.string("("), operatorRegexp), n.string(")")), n.string(" $1 ")));
    $ = $("query", fn.replace($("query"), n.string("\\s+"), n.string(" ")));
    $ = $("query", fn.replace($("query"), n.string("=#19#01=\\s*=#19#01="), n.string("=#19#01= descendant::")));
    $ = $("query", fn.forEach(fn.tokenize($("query"), n.string(";")), function(...$_a) {
        $ = $.frame($_a)
            .item("cur");
        $ = $("parts", n.select(fn.analyzeString($("cur"), n.string("([^\\s\\(\\),\\.]+)")), n.string("*"), $_0 => n.filter($_0, $_0 => $.test(n.geq(fn.name($_0), n.string("fn:match"))) || $.test(n.geq(fn.matches(fn.string($_0), n.string("^\\s*$")), fn.false())))));
        $ = $("ret", block($("parts"), n.string("")));
        return ($ => {
            if ($.test($("ret"))) {
                return fn.replace($("ret"), n.string("\\s+"), n.string(""));
            } else {
                return n.seq();
            }
        })($.frame());

    }));
    return $("query");

}

export function seqtype$3(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret")
        .item("lastseen");
    $ = $("head", n.select(n.select(fn.head($("parts")), n.string("fn:group"), $_0 => n.filter($_0, $_0 => n.geq(n.select($_0, n.string("@nr")), n.integer(1)))), $_0 => fn.string($_0)));
    $ = $("maybeSeqtype", ($ => {
        if ($.test(fn.matches($("head"), operatorRegexp))) {
            return opNum($("head"));
        } else {
            return n.integer(0);
        }
    })($.frame()));
    return ($ => {
        if ($.test(n.eq($("maybeSeqtype"), n.decimal(20.06)))) {
            return body($("parts"), fn.concat($("ret"), n.string(",")), array.append($("lastseen"), n.decimal(21.06)));
        } else {
            return seqtype(fn.tail($("parts")), $("ret"), $("lastseen"));
        }
    })($.frame());

}

export function as$6(...$_a) {
    var $ = n.frame($_a)
        .item("param")
        .item("parts")
        .item("ret")
        .item("lastseen")
        .item("subtype")
        .item("seqtype");
    $ = $("head", n.select(fn.head($("parts")), $_0 => fn.string($_0)));
    $ = $("next", n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(2))), $_0 => fn.string($_0)));
    $ = $("no", ($ => {
        if ($.test(fn.matches($("head"), operatorRegexp))) {
            return opNum($("head"));
        } else {
            return n.integer(0);
        }
    })($.frame()));
    $ = $("non", ($ => {
        if ($.test(fn.matches($("next"), operatorRegexp))) {
            return opNum($("next"));
        } else {
            return n.integer(0);
        }
    })($.frame()));
    return ($ => {
        if ($.test(n.eq($("no"), n.decimal(20.06)))) {
            return body($("parts"), fn.concat($("ret"), ($ => {
                if ($.test($("subtype"))) {
                    return n.string(")");
                } else {
                    return n.string("");
                }
            })($.frame()), n.string(",")), array.append($("lastseen"), n.decimal(21.06)));
        } else {
            return ($ => {
                if ($.test(n.eq($("no"), n.integer(24)))) {
                    return as($("param"), fn.tail($("parts")), fn.concat($("ret"), ($ => {
                        if ($.test($("subtype"))) {
                            return n.string(")");
                        } else {
                            return n.string("");
                        }
                    })($.frame()), n.string(",")), $("lastseen"), $("subtype"), fn.true());
                } else {
                    return ($ => {
                        if ($.test(n.eq($("no"), n.integer(1)))) {
                            return ($ => {
                                if ($.test($("subtype"))) {
                                    return as($("param"), fn.tail($("parts")), fn.concat($("ret"), n.string(",")), $("lastseen"), $("subtype"), $("seqtype"));
                                } else {
                                    return params(fn.tail($("parts")), fn.concat($("ret"), n.string(",")));
                                }
                            })($.frame());
                        } else {
                            return ($ => {
                                if ($.test(fn.matches($("head"), fn.concat(n.string("core:["), ncname, n.string("]+"))))) {
                                    return ($ => {
                                        if ($.test(fn.matches($("next"), n.string("^\\s*\\(\\s*$")))) {
                                            return as(n.seq(), fn.subsequence($("parts"), n.integer(3)), fn.concat($("ret"), $("head"), n.string("("), $("param"), n.string(","), ($ => {
                                                if ($.test(n.eq($("head"), n.string("core:anon")))) {
                                                    return n.string("(");
                                                } else {
                                                    return n.string("");
                                                }
                                            })($.frame())), $("lastseen"), fn.true(), $("seqtype"));
                                        } else {
                                            return as(n.seq(), fn.tail($("parts")), fn.concat($("ret"), $("head"), n.string("("), $("param"), ($ => {
                                                if ($.test(n.eq($("head"), n.string("core:anon")))) {
                                                    return n.string(",(");
                                                } else {
                                                    return n.string("");
                                                }
                                            })($.frame())), $("lastseen"), $("subtype"), $("seqtype"));
                                        }
                                    })($.frame());
                                } else {
                                    return ($ => {
                                        if ($.test(fn.matches($("head"), n.string("[\\?\\+\\*]")))) {
                                            return as($("param"), fn.tail($("parts")), fn.concat($("ret"), $("head")), $("lastseen"), $("subtype"), $("seqtype"));
                                        } else {
                                            return ($ => {
                                                if ($.test(fn.matches($("head"), n.string("^(\\(\\))?\\s*\\)")))) {
                                                    return ($ => {
                                                        if ($.test($.test($("subtype")) && $.test(n.geq($("non"), n.seq(n.integer(1), n.integer(24)))))) {
                                                            return as($("param"), fn.tail($("parts")), fn.concat($("ret"), ($ => {
                                                                if ($.test(n.eq($("non"), n.integer(24)))) {
                                                                    return n.string("");
                                                                } else {
                                                                    return n.string(")");
                                                                }
                                                            })($.frame())), $("lastseen"), fn.false(), $("seqtype"));
                                                        } else {
                                                            return ($ => {
                                                                if ($.test(n.eq($("non"), n.integer(24)))) {
                                                                    return as(n.seq(), fn.tail($("parts")), fn.concat($("ret"), ($ => {
                                                                        if ($.test($("subtype"))) {
                                                                            return n.string(")");
                                                                        } else {
                                                                            return n.string("");
                                                                        }
                                                                    })($.frame()), n.string("))")), $("lastseen"), fn.false(), fn.false());
                                                                } else {
                                                                    return ($ => {
                                                                        if ($.test(n.eq($("non"), n.decimal(20.06)))) {
                                                                            return body(fn.tail($("parts")), fn.concat($("ret"), ($ => {
                                                                                if ($.test($("subtype"))) {
                                                                                    return n.string(")");
                                                                                } else {
                                                                                    return n.string("");
                                                                                }
                                                                            })($.frame()), ($ => {
                                                                                if ($.test(fn.matches($("head"), n.string("^\\(\\)")))) {
                                                                                    return n.string(")");
                                                                                } else {
                                                                                    return n.string("");
                                                                                }
                                                                            })($.frame()), n.string("),core:item(),")), array.append($("lastseen"), n.decimal(21.06)));
                                                                        } else {
                                                                            return console.log(n.seq(n.string("what"), $("parts")));
                                                                        }
                                                                    })($.frame());
                                                                }
                                                            })($.frame());
                                                        }
                                                    })($.frame());
                                                } else {
                                                    return as($("param"), fn.tail($("parts")), fn.concat($("ret"), ($ => {
                                                        if ($.test($.test(n.eq($("non"), n.integer(1))) && $.test($("seqtype")))) {
                                                            return n.string(")");
                                                        } else {
                                                            return n.string("");
                                                        }
                                                    })($.frame()), n.string(")")), $("lastseen"), $("subtype"), $("seqtype"));
                                                }
                                            })($.frame());
                                        }
                                    })($.frame());
                                }
                            })($.frame());
                        }
                    })($.frame());
                }
            })($.frame());
        }
    })($.frame());

}

export function params$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    return params($("parts"), $("ret"), n.array(n.seq()));

}

export function params$3(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret")
        .item("lastseen");
    $ = $("maybeParam", n.select(fn.head($("parts")), $_0 => fn.string($_0)));
    $ = $("rest", fn.tail($("parts")));
    return ($ => {
        if ($.test(fn.matches($("maybeParam"), n.string("^\\(?\\s*\\)")))) {
            return ($ => {
                if ($.test(n.eq(n.select(fn.head($("rest")), $_0 => fn.string($_0)), n.string("=#24=")))) {
                    return as(n.seq(), $("rest"), fn.concat($("ret"), n.string(")")), $("lastseen"), fn.false(), fn.false());
                } else {
                    return body($("rest"), fn.concat($("ret"), n.string("),core:item(),")), array.append($("lastseen"), n.decimal(21.06)));
                }
            })($.frame());
        } else {
            return ($ => {
                if ($.test(fn.matches($("maybeParam"), n.string("=#1=")))) {
                    return params($("rest"), fn.concat($("ret"), n.string(",")), $("lastseen"));
                } else {
                    return ($ => {
                        if ($.test(fn.matches($("maybeParam"), n.string("^\\$")))) {
                            return ($ => {
                                if ($.test(n.eq(n.select(fn.head($("rest")), $_0 => fn.string($_0)), n.string("=#24=")))) {
                                    return as(fn.replace($("maybeParam"), n.string("^\\$"), n.string("\\$,")), fn.tail($("rest")), $("ret"), $("lastseen"), fn.false(), fn.false());
                                } else {
                                    return params($("rest"), fn.concat($("ret"), n.string("core:item("), fn.replace($("maybeParam"), n.string("^\\$"), n.string("\\$,")), n.string(")")), $("lastseen"));
                                }
                            })($.frame());
                        } else {
                            return params($("rest"), $("ret"), $("lastseen"));
                        }
                    })($.frame());
                }
            })($.frame());
        }
    })($.frame());

}

export function xfn$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    return params(fn.tail($("parts")), fn.concat($("ret"), n.select(n.select(fn.head($("parts")), n.string("fn:group"), $_0 => n.filter($_0, $_0 => n.geq(n.select($_0, n.string("@nr")), n.integer(1)))), $_0 => fn.string($_0)), n.string(",(),(")));

}

export function xvar$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    return body(fn.subsequence($("parts"), n.integer(3)), fn.concat($("ret"), n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(1))), $_0 => fn.string($_0)), n.string(",(),")), n.array(n.seq(n.decimal(2.18))));

}

export function xns$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    return block(fn.subsequence($("parts"), n.integer(4)), fn.concat($("ret"), n.string("core:namespace($,"), n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(1))), n.string(","), n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(3))), n.string(")")));

}

export function annot$3(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret")
        .item("annot");
    $ = $("maybeAnnot", n.select(n.select(fn.head($("parts")), n.string("fn:group"), $_0 => n.filter($_0, $_0 => n.geq(n.select($_0, n.string("@nr")), n.integer(1)))), $_0 => fn.string($_0)));
    $ = $("rest", fn.tail($("parts")));
    return ($ => {
        if ($.test(fn.matches($("maybeAnnot"), n.string("^%")))) {
            return annot($("rest"), $("ret"), fn.replace($("maybeAnnot"), n.string("^%"), n.string("-")));
        } else {
            return ($ => {
                if ($.test(n.geq($("maybeAnnot"), n.string("namespace")))) {
                    return xns($("rest"), $("ret"));
                } else {
                    return ($ => {
                        if ($.test(n.geq($("maybeAnnot"), n.string("=#21#06=")))) {
                            return xfn($("rest"), fn.concat($("ret"), n.string("core:define"), $("annot"), n.string("($,")));
                        } else {
                            return ($ => {
                                if ($.test(n.geq($("maybeAnnot"), n.string("=#2#18=")))) {
                                    return xvar($("rest"), fn.concat($("ret"), n.string("core:xvar"), $("annot"), n.string("($,")));
                                } else {
                                    return $("ret");
                                }
                            })($.frame());
                        }
                    })($.frame());
                }
            })($.frame());
        }
    })($.frame());

}

export function xversion$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    return block(fn.subsequence($("parts"), n.integer(3)), fn.concat($("ret"), n.string("core:xq-version($,"), n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(2))), $_0 => fn.string($_0)), n.string(")")));

}

export function xmodule$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    return block(fn.subsequence($("parts"), n.integer(5)), fn.concat($("ret"), n.string("core:module($,"), n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(2))), $_0 => fn.string($_0)), n.string(","), n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(4))), $_0 => fn.string($_0)), n.string(",())")));

}

export function close$2(...$_a) {
    var $ = n.frame($_a)
        .item("lastseen")
        .integer("no");
    return array.reverse(close($("lastseen"), $("no"), n.array(n.seq()), array.size($("lastseen"))));

}

export function close$4(...$_a) {
    var $ = n.frame($_a)
        .item("lastseen")
        .integer("no")
        .item("ret")
        .item("s");
    return ($ => {
        if ($.test($.test(n.eq($("no"), n.integer(0))) || $.test(n.eq($("s"), n.integer(0))))) {
            return array.join(n.seq($("ret"), array.reverse($("lastseen"))));
        } else {
            $ = $("last", array.get($("lastseen"), $("s")));
            return ($ => {
                if ($.test(n.eq($("last"), n.integer(40)))) {
                    return close(array.remove($("lastseen"), $("s")), n.subtract($("no"), n.integer(1)), $("ret"), n.subtract($("s"), n.integer(1)));
                } else {
                    return close(array.remove($("lastseen"), $("s")), $("no"), array.append($("ret"), $("last")), n.subtract($("s"), n.integer(1)));
                }
            })($.frame());

        }
    })($.frame());

}

export function closer$2(...$_a) {
    var $ = n.frame($_a)
        .item("b")
        .integer("c");
    return ($ => {
        if ($.test($.test(n.gt(array.size($("b")), n.integer(0))) && $.test(n.geq(a.last($("b")), n.seq(n.decimal(2.08), n.decimal(2.11)))))) {
            return closer(a.pop($("b")), n.add($("c"), n.integer(1)));
        } else {
            return $("c");
        }
    })($.frame());

}

export function filter$2(...$_a) {
    var $ = n.frame($_a)
        .item("a")
        .item("b");
    return array.filter($("a"), function(...$_a) {
        $ = $.frame($_a)
            .item("x");
        return n.geq($("x"), $("b"));

    });

}

export function repeatString$2(...$_a) {
    var $ = n.frame($_a)
        .item("a")
        .item("b");
    return fn.stringJoin(n.forEach(n.seq(n.to(n.integer(1), $("a"))), $("b")));

}

export function anon$4(...$_a) {
    var $ = n.frame($_a)
        .item("head")
        .item("parts")
        .item("ret")
        .item("lastseen");
    return params($("parts"), fn.concat($("ret"), n.string("core:anon($,(")), $("lastseen"));

}

export function comment$3(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret")
        .item("lastseen");
    $ = $("head", n.select(fn.head($("parts")), $_0 => fn.string($_0)));
    $ = $("rest", fn.tail($("parts")));
    return ($ => {
        if ($.test(n.geq($("head"), n.string("=#25#02=")))) {
            return body($("rest"), $("ret"), $("lastseen"));
        } else {
            return comment($("rest"), $("ret"), $("lastseen"));
        }
    })($.frame());

}

export function detectGroupBy$1(...$_a) {
    var $ = n.frame($_a)
        .item("parts");
    $ = $("head", n.select(fn.head($("parts")), $_0 => fn.string($_0)));
    return ($ => {
        if ($.test(n.eq($("head"), n.string("=#2#23=")))) {
            return fn.true();
        } else {
            return ($ => {
                if ($.test($.test(n.eq($("head"), n.string("=#2#11="))) || $.test(fn.empty($("parts"))))) {
                    return fn.false();
                } else {
                    return detectGroupBy(fn.tail($("parts")));
                }
            })($.frame());
        }
    })($.frame());

}

export function opLet$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    return ($ => {
        if ($.test(n.eq($("llast"), n.decimal(2.22)))) {
            $ = $("lastseen", array.append(array.append(a.pop($("lastseen")), n.decimal(21.07)), n.decimal(20.06)));
            return opLet($("rest"), fn.concat($("ret"), n.string("=#18="), n.string("core:anon($,("), a.last($("temp")), n.string("),core:item()*,")), $("lastseen"), n.decimal(20.06), a.pop($("temp")));

        } else {
            $ = $("hascomma", $.test(n.eq($("llast"), n.decimal(2.07))) || $.test(n.seq($.test(n.eq($("llast"), n.decimal(2.08))) && $.test(fn.matches($("ret"), n.string(",$"))))));
            $ = $("letopener", $.test(fn.not($.test(n.geq($("llast"), n.seq(n.decimal(2.09), n.decimal(2.10)))) || $.test(n.seq($.test(n.eq($("llast"), n.decimal(2.08))) && $.test(n.geq($("hascomma"), fn.false())))))) || $.test(n.eq($("llast"), n.decimal(20.06))));
            $ = $("letclose", $.test(fn.not($.test(n.eq($("llast"), n.decimal(20.06))) || $.test(n.eq(array.size($("lastseen")), n.integer(0))))) && $.test(n.eq($("hascomma"), fn.false())));
            $ = $("letcloser", ($ => {
                if ($.test($.test($("letclose")) && $.test(n.geq($("llast"), n.seq(n.decimal(2.08), n.decimal(2.11), n.decimal(19.01)))))) {
                    return closer($("lastseen"), n.integer(0));
                } else {
                    return n.integer(0);
                }
            })($.frame()));
            $ = $("last", n.subtract(array.size($("lastseen")), $("letcloser")));
            $ = $("ret", fn.concat($("ret"), ($ => {
                if ($.test($("letclose"))) {
                    return fn.concat(repeatString($("letcloser"), n.string(")")), ($ => {
                        if ($.test(n.eq(array.get($("lastseen"), $("last")), n.decimal(2.10)))) {
                            return n.string(")");
                        } else {
                            return n.string("");
                        }
                    })($.frame()), ($ => {
                        if ($.test($("hascomma"))) {
                            return n.string("");
                        } else {
                            return n.string(",");
                        }
                    })($.frame()));
                } else {
                    return n.string("");
                }
            })($.frame()), ($ => {
                if ($.test($("letopener"))) {
                    return n.string("(");
                } else {
                    return n.string("");
                }
            })($.frame()), n.string("=#2#09="), fn.concat(n.string("($,"), fn.replace(n.select(fn.head($("rest")), $_0 => fn.string($_0)), n.string("^\\$|\\s"), n.string("")))));
            $ = $("lastseen", ($ => {
                if ($.test($("letclose"))) {
                    return array.subarray($("lastseen"), n.integer(1), $("last"));
                } else {
                    return $("lastseen");
                }
            })($.frame()));
            $ = $("lastseen", ($ => {
                if ($.test($.test($("letclose")) && $.test(n.eq(a.last($("lastseen")), n.decimal(2.10))))) {
                    return a.pop($("lastseen"));
                } else {
                    return $("lastseen");
                }
            })($.frame()));
            return body(fn.tail($("rest")), $("ret"), array.append($("lastseen"), n.decimal(2.09)), $("temp"));

        }
    })($.frame());

}

export function opComma$3(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen");
    $ = $("closer", closer($("lastseen"), n.integer(0)));
    $ = $("s", array.size($("lastseen")));
    $ = $("lastseen", array.subarray($("lastseen"), n.integer(1), n.subtract($("s"), $("closer"))));
    $ = $("ret", fn.concat($("ret"), repeatString($("closer"), n.string(")")), ($ => {
        if ($.test(n.eq(array.get($("lastseen"), n.subtract($("s"), n.integer(1))), n.decimal(21.07)))) {
            return n.string("),=#27#01=(");
        } else {
            return n.string(",");
        }
    })($.frame())));
    return body($("rest"), $("ret"), $("lastseen"));

}

export function opCloseCurly$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    $ = $("lastindex", a.lastIndexOf($("lastseen"), n.decimal(20.06)));
    $ = $("closes", filter(array.subarray($("lastseen"), n.add($("lastindex"), n.integer(1))), n.seq(n.decimal(2.08), n.decimal(2.11))));
    $ = $("reopen", n.eq(n.select(fn.head($("rest")), $_0 => fn.string($_0)), n.string("=#20#06=")));
    $ = $("closes", ($ => {
        if ($.test($("reopen"))) {
            return $("closes");
        } else {
            return array.append($("closes"), n.decimal(2.11));
        }
    })($.frame()));
    $ = $("lastseen", array.subarray($("lastseen"), n.integer(1), n.subtract($("lastindex"), n.integer(1))));
    $ = $("llast", a.last($("lastseen")));
    $ = $("ret", fn.concat($("ret"), ($ => {
        if ($.test(n.eq(fn.floor($("llast")), n.integer(21)))) {
            return n.string(")");
        } else {
            return n.string("");
        }
    })($.frame()), ($ => {
        if ($.test($.test(n.seq($.test(n.eq($("llast"), n.decimal(21.07))) || $.test(fn.empty($("llast"))))) && $.test(n.geq(fn.matches($("ret"), n.string("\\($")), fn.false())))) {
            return n.string(")");
        } else {
            return n.string("");
        }
    })($.frame()), repeatString(array.size($("closes")), n.string(")")), ($ => {
        if ($.test($("reopen"))) {
            return n.string(",");
        } else {
            return n.string("");
        }
    })($.frame())));
    $ = $("lastseen", ($ => {
        if ($.test($.test(n.eq(fn.floor($("llast")), n.integer(21))) && $.test($("reopen")))) {
            return $("lastseen");
        } else {
            return a.pop($("lastseen"));
        }
    })($.frame()));
    return body($("rest"), $("ret"), $("lastseen"), $("temp"));

}

export function opConstructor$4(...$_a) {
    var $ = n.frame($_a)
        .item("no")
        .item("rest")
        .item("ret")
        .item("lastseen");
    $ = $("ret", fn.concat($("ret"), opStr($("no")), n.string("(")));
    $ = $("next", n.select(fn.head($("rest")), $_0 => fn.string($_0)));
    $ = $("qn", ($ => {
        if ($.test(n.ne($("next"), n.string("=#20#06=")))) {
            return $("next");
        } else {
            return n.seq();
        }
    })($.frame()));
    $ = $("rest", ($ => {
        if ($.test(fn.exists($("qn")))) {
            return fn.tail($("rest"));
        } else {
            return $("rest");
        }
    })($.frame()));
    $ = $("ret", ($ => {
        if ($.test(fn.exists($("qn")))) {
            return fn.concat($("ret"), $("next"), n.string(","));
        } else {
            return $("ret");
        }
    })($.frame()));
    return body($("rest"), $("ret"), array.append($("lastseen"), $("no")));

}

export function opThen$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    $ = $("ret", fn.concat($("ret"), ($ => {
        if ($.test(n.eq($("llast"), n.decimal(2.11)))) {
            return n.string(")");
        } else {
            return n.string("");
        }
    })($.frame()), n.string(",")));
    $ = $("lastseen", ($ => {
        if ($.test($.test(n.eq($("llast"), n.decimal(2.11))) || $.test(n.eq($("llast"), n.integer(40))))) {
            return a.pop($("lastseen"));
        } else {
            return $("lastseen");
        }
    })($.frame()));
    $ = $("last", a.lastIndexOf($("lastseen"), n.decimal(2.06)));
    $ = $("lastseen", ($ => {
        if ($.test(n.gt($("last"), n.integer(0)))) {
            return array.append(array.remove($("lastseen"), $("last")), n.decimal(2.07));
        } else {
            return $("lastseen");
        }
    })($.frame()));
    return body($("rest"), $("ret"), $("lastseen"), $("temp"));

}

export function opAssign$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    return ($ => {
        if ($.test(n.eq(array.get($("lastseen"), n.subtract(array.size($("lastseen")), n.integer(1))), n.decimal(21.07)))) {
            return body($("rest"), fn.concat($("ret"), n.string(",")), $("lastseen"));
        } else {
            $ = $("ret", fn.concat($("ret"), ($ => {
                if ($.test(n.eq($("llast"), n.decimal(2.11)))) {
                    return n.string(")");
                } else {
                    return n.string("");
                }
            })($.frame()), n.string(",")));
            $ = $("lastseen", ($ => {
                if ($.test(n.eq($("llast"), n.decimal(2.11)))) {
                    return a.pop($("lastseen"));
                } else {
                    return $("lastseen");
                }
            })($.frame()));
            $ = $("last", a.lastIndexOf($("lastseen"), n.decimal(2.09)));
            $ = $("lastseen", ($ => {
                if ($.test(n.gt($("last"), n.integer(0)))) {
                    return array.append(array.remove($("lastseen"), $("last")), n.decimal(2.10));
                } else {
                    return $("lastseen");
                }
            })($.frame()));
            return body($("rest"), $("ret"), $("lastseen"), $("temp"));

        }
    })($.frame());

}

export function opElse$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    $ = $("closer", a.lastIndexOf($("lastseen"), n.decimal(2.07)));
    $ = $("ret", fn.concat($("ret"), repeatString(n.subtract(array.size($("lastseen")), $("closer")), n.string(")")), n.string(",")));
    $ = $("lastseen", array.subarray($("lastseen"), n.integer(1), n.subtract($("closer"), n.integer(1))));
    return body($("rest"), $("ret"), array.append($("lastseen"), n.decimal(2.08)), $("temp"));

}

export function opReturn$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    return ($ => {
        if ($.test(n.eq($("llast"), n.decimal(2.22)))) {
            return body($("rest"), fn.concat($("ret"), n.string("=#18=core:anon($,("), a.last($("temp")), n.string("),core:item()*,(")), array.append(array.append(a.pop($("lastseen")), n.decimal(2.11)), n.decimal(2.11)), a.pop($("temp")));
        } else {
            $ = $("closer", a.lastIndexOf($("lastseen"), n.decimal(2.10)));
            $ = $("ret", fn.concat($("ret"), repeatString(n.subtract(array.size($("lastseen")), $("closer")), n.string(")")), n.string("),")));
            $ = $("lastseen", array.subarray($("lastseen"), n.integer(1), n.subtract($("closer"), n.integer(1))));
            return body($("rest"), $("ret"), array.append($("lastseen"), n.decimal(2.11)));

        }
    })($.frame());

}

export function opCloseSquare$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    $ = $("ret", fn.concat($("ret"), ($ => {
        if ($.test($.test(n.geq($("llast"), n.seq(n.decimal(19.01), n.decimal(20.04)))) || $.test(n.seq($.test(n.eq($("llast"), n.decimal(20.01))) && $.test(n.eq(array.get($("lastseen"), n.subtract(array.size($("lastseen")), n.integer(1))), n.decimal(19.01))))))) {
            return n.string("))");
        } else {
            return n.string(")");
        }
    })($.frame())));
    $ = $("lastseen", ($ => {
        if ($.test($.test(n.geq($("llast"), n.decimal(19.01))) || $.test(n.seq($.test(n.eq($("llast"), n.decimal(20.01))) && $.test(n.eq(array.get($("lastseen"), n.subtract(array.size($("lastseen")), n.integer(1))), n.decimal(19.01))))))) {
            return a.pop(a.pop($("lastseen")));
        } else {
            return a.pop($("lastseen"));
        }
    })($.frame()));
    return body($("rest"), $("ret"), $("lastseen"), $("temp"));

}

export function opOpenSquare$4(...$_a) {
    var $ = n.frame($_a)
        .item("no")
        .item("rest")
        .item("ret")
        .item("lastseen");
    $ = $("ret", fn.concat($("ret"), opStr($("no")), ($ => {
        if ($.test(n.eq($("no"), n.decimal(20.04)))) {
            return n.string("((");
        } else {
            return n.string("(");
        }
    })($.frame())));
    return body($("rest"), $("ret"), array.append($("lastseen"), $("no")));

}

export function opOpenCurly$4(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast");
    $ = $("ret", fn.concat($("ret"), ($ => {
        if ($.test($.test(n.eq($("llast"), n.decimal(21.07))) || $.test(n.ne(fn.floor($("llast")), n.integer(21))))) {
            $ = $("next", n.select(fn.head($("rest")), $_0 => fn.string($_0)));
            return ($ => {
                if ($.test($.test(fn.empty($("next"))) || $.test(n.eq($("next"), n.string("=#20#07="))))) {
                    return n.string("(");
                } else {
                    return n.string("(=#27#01=(");
                }
            })($.frame());

        } else {
            return n.string("(");
        }
    })($.frame())));
    return body($("rest"), $("ret"), array.append($("lastseen"), n.decimal(20.06)));

}

export function opSelect$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    $ = $("ret", fn.concat($("ret"), ($ => {
        if ($.test(n.eq($("llast"), n.decimal(19.01)))) {
            return n.string(",");
        } else {
            return n.string("=#19#01=(");
        }
    })($.frame())));
    $ = $("lastseen", ($ => {
        if ($.test(n.geq($("llast"), n.decimal(19.01)))) {
            return $("lastseen");
        } else {
            return array.append($("lastseen"), n.decimal(19.01));
        }
    })($.frame()));
    return body($("rest"), $("ret"), $("lastseen"), $("temp"));

}

export function opFor$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    return body($("rest"), $("ret"), array.append($("lastseen"), n.decimal(2.21)), $("temp"));

}

export function opIn$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("ret")
        .item("lastseen")
        .item("llast")
        .item("temp");
    return body($("rest"), $("ret"), array.append(a.pop($("lastseen")), n.decimal(2.22)), $("temp"));

}

export function bodyOp$5(...$_a) {
    var $ = n.frame($_a)
        .item("no")
        .item("rest")
        .string("ret")
        .item("lastseen")
        .item("temp");
    $ = $("llast", a.last($("lastseen")));
    $ = $("hasFilter", n.eq($("llast"), n.decimal(19.01)));
    $ = $("ret", fn.concat($("ret"), ($ => {
        if ($.test($("hasFilter"))) {
            return ($ => {
                if ($.test(n.eq($("no"), n.decimal(20.01)))) {
                    return n.string(",");
                } else {
                    return n.string(")");
                }
            })($.frame());
        } else {
            return n.string("");
        }
    })($.frame())));
    $ = $("lastseen", ($ => {
        if ($.test($("hasFilter"))) {
            return ($ => {
                if ($.test(n.eq($("no"), n.decimal(20.01)))) {
                    return $("lastseen");
                } else {
                    return a.pop($("lastseen"));
                }
            })($.frame());
        } else {
            return $("lastseen");
        }
    })($.frame()));
    $ = $("llast", ($ => {
        if ($.test($("hasFilter"))) {
            return a.last($("lastseen"));
        } else {
            return $("llast");
        }
    })($.frame()));
    return ($ => {
        if ($.test(n.eq($("no"), n.integer(1)))) {
            return opComma($("rest"), $("ret"), $("lastseen"));
        } else {
            return ($ => {
                if ($.test(n.eq($("no"), n.decimal(2.06)))) {
                    return body($("rest"), fn.concat($("ret"), opStr($("no"))), array.append($("lastseen"), $("no")));
                } else {
                    return ($ => {
                        if ($.test(n.eq($("no"), n.decimal(2.07)))) {
                            return opThen($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                        } else {
                            return ($ => {
                                if ($.test(n.eq($("no"), n.decimal(2.08)))) {
                                    return opElse($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                } else {
                                    return ($ => {
                                        if ($.test(n.eq($("no"), n.decimal(2.09)))) {
                                            return opLet($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                        } else {
                                            return ($ => {
                                                if ($.test(n.geq($("no"), n.decimal(2.10)))) {
                                                    return opAssign($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                                } else {
                                                    return ($ => {
                                                        if ($.test(n.eq($("no"), n.decimal(2.11)))) {
                                                            return opReturn($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                                        } else {
                                                            return ($ => {
                                                                if ($.test(n.eq($("no"), n.decimal(2.21)))) {
                                                                    return opFor($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                                                } else {
                                                                    return ($ => {
                                                                        if ($.test(n.eq($("no"), n.decimal(2.22)))) {
                                                                            return opIn($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                                                        } else {
                                                                            return ($ => {
                                                                                if ($.test(n.eq($("no"), n.decimal(19.01)))) {
                                                                                    return opSelect($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                                                                } else {
                                                                                    return ($ => {
                                                                                        if ($.test(n.eq($("no"), n.decimal(20.07)))) {
                                                                                            return opCloseCurly($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                                                                        } else {
                                                                                            return ($ => {
                                                                                                if ($.test(n.eq($("no"), n.decimal(20.02)))) {
                                                                                                    return opCloseSquare($("rest"), $("ret"), $("lastseen"), $("llast"), $("temp"));
                                                                                                } else {
                                                                                                    return ($ => {
                                                                                                        if ($.test(n.eq($("no"), n.decimal(20.06)))) {
                                                                                                            return opOpenCurly($("rest"), $("ret"), $("lastseen"), $("llast"));
                                                                                                        } else {
                                                                                                            return ($ => {
                                                                                                                if ($.test(n.eq($("no"), n.decimal(21.06)))) {
                                                                                                                    return anon(n.select(fn.head($("rest")), $_0 => fn.string($_0)), fn.tail($("rest")), $("ret"), $("lastseen"));
                                                                                                                } else {
                                                                                                                    return ($ => {
                                                                                                                        if ($.test(n.eq($("no"), n.decimal(25.01)))) {
                                                                                                                            return comment($("rest"), $("ret"), $("lastseen"));
                                                                                                                        } else {
                                                                                                                            return ($ => {
                                                                                                                                if ($.test(n.eq($("no"), n.integer(26)))) {
                                                                                                                                    return body($("rest"), fn.concat($("ret"), n.string(",")), $("lastseen"));
                                                                                                                                } else {
                                                                                                                                    return ($ => {
                                                                                                                                        if ($.test(n.eq(fn.floor($("no")), n.integer(21)))) {
                                                                                                                                            return opConstructor($("no"), $("rest"), $("ret"), $("lastseen"));
                                                                                                                                        } else {
                                                                                                                                            return ($ => {
                                                                                                                                                if ($.test(n.geq($("no"), n.seq(n.decimal(20.01), n.decimal(20.04))))) {
                                                                                                                                                    return opOpenSquare($("no"), $("rest"), $("ret"), $("lastseen"));
                                                                                                                                                } else {
                                                                                                                                                    return body($("rest"), fn.concat($("ret"), opStr($("no"))), $("lastseen"), $("temp"));
                                                                                                                                                }
                                                                                                                                            })($.frame());
                                                                                                                                        }
                                                                                                                                    })($.frame());
                                                                                                                                }
                                                                                                                            })($.frame());
                                                                                                                        }
                                                                                                                    })($.frame());
                                                                                                                }
                                                                                                            })($.frame());
                                                                                                        }
                                                                                                    })($.frame());
                                                                                                }
                                                                                            })($.frame());
                                                                                        }
                                                                                    })($.frame());
                                                                                }
                                                                            })($.frame());
                                                                        }
                                                                    })($.frame());
                                                                }
                                                            })($.frame());
                                                        }
                                                    })($.frame());
                                                }
                                            })($.frame());
                                        }
                                    })($.frame());
                                }
                            })($.frame());
                        }
                    })($.frame());
                }
            })($.frame());
        }
    })($.frame());

}

export function parenCloser$2(...$_a) {
    var $ = n.frame($_a)
        .item("head")
        .item("lastseen");
    return ($ => {
        if ($.test(fn.matches($("head"), n.string("[\\(\\)]+")))) {
            $ = $("cp", fn.stringToCodepoints($("head")));
            $ = $("lastseen", fn.foldLeft(n.filter($("cp"), $_0 => n.eq($_0, n.integer(40))), $("lastseen"), function(...$_a) {
                $ = $.frame($_a)
                    .item("pre")
                    .item("cur");
                return array.append($("pre"), $("cur"));

            }));
            return close($("lastseen"), fn.count(n.filter($("cp"), $_0 => n.eq($_0, n.integer(41)))));

        } else {
            return $("lastseen");
        }
    })($.frame());

}

export function body$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    return body($("parts"), $("ret"), n.array(n.seq()));

}

export function body$3(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret")
        .item("lastseen");
    return body($("parts"), $("ret"), $("lastseen"), n.array(n.seq()));

}

export function body$4(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret")
        .item("lastseen")
        .item("temp");
    return ($ => {
        if ($.test(fn.empty($("parts")))) {
            return fn.concat($("ret"), repeatString(array.size(filter($("lastseen"), n.seq(n.decimal(2.08), n.decimal(2.11), n.decimal(20.07), n.decimal(2.18), n.decimal(19.01)))), n.string(")")));
        } else {
            $ = $("head", n.select(fn.head($("parts")), $_0 => fn.string($_0)));
            $ = $("rest", fn.tail($("parts")));
            $ = $("llast", a.last($("lastseen")));
            $ = $("lastseen", ($ => {
                if ($.test(n.eq($("llast"), n.integer(0)))) {
                    return a.pop($("lastseen"));
                } else {
                    return $("lastseen");
                }
            })($.frame()));
            $ = $("lastseen", parenCloser($("head"), $("lastseen")));
            return ($ => {
                if ($.test(n.geq($("head"), n.string("=#25#01=")))) {
                    return comment($("rest"), $("ret"), $("lastseen"));
                } else {
                    return ($ => {
                        if ($.test(fn.matches($("head"), n.string(";")))) {
                            return block($("parts"), $("ret"));
                        } else {
                            $ = $("rest", ($ => {
                                if ($.test(n.geq($("head"), fns))) {
                                    $ = $("next", n.select(fn.head($("rest")), $_0 => fn.string($_0)));
                                    return ($ => {
                                        if ($.test(fn.matches($("next"), n.string("[^\\.]\\)")))) {
                                            return fn.insertBefore(fn.tail($("rest")), n.integer(1), $("n.seq($("
                                                n.seq($("n.seq(n.integer(1))"), fn.replace($("next"), n.string("^([^\\)]*)\\)"), n.string("$1.)")))
                                                "))"));
                                        } else {
                                            return $("rest");
                                        }
                                    })($.frame());

                                } else {
                                    return $("rest");
                                }
                            })($.frame()));
                            $ = $("head", ($ => {
                                if ($.test($.test(n.eq($("head"), n.string("=#20#01="))) && $.test(n.ne($("llast"), n.integer(0))))) {
                                    return n.string("=#20#04=");
                                } else {
                                    return $("head");
                                }
                            })($.frame()));
                            return ($ => {
                                if ($.test(fn.matches($("head"), operatorRegexp))) {
                                    return bodyOp(opNum($("head")), $("rest"), $("ret"), $("lastseen"), $("temp"));
                                } else {
                                    return ($ => {
                                        if ($.test(n.eq($("llast"), n.decimal(2.21)))) {
                                            return body($("rest"), $("ret"), $("lastseen"), array.append($("temp"), $("head")));
                                        } else {
                                            return body($("rest"), fn.concat($("ret"), $("head")), ($ => {
                                                if ($.test(fn.matches($("head"), n.string("\\(")))) {
                                                    return $("lastseen");
                                                } else {
                                                    return array.append($("lastseen"), n.integer(0));
                                                }
                                            })($.frame()), $("temp"));
                                        }
                                    })($.frame());
                                }
                            })($.frame());

                        }
                    })($.frame());
                }
            })($.frame());

        }
    })($.frame());

}

export function ximport$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    $ = $("rest", fn.subsequence($("parts"), n.integer(6)));
    $ = $("maybeAt", n.select(fn.head($("rest")), $_0 => fn.string($_0)));
    return ($ => {
        if ($.test(fn.matches($("maybeAt"), n.string("at")))) {
            return block(fn.subsequence($("rest"), n.integer(3)), fn.concat($("ret"), n.string("core:ximport($,"), n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(3))), $_0 => fn.string($_0)), n.string(","), n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(5))), $_0 => fn.string($_0)), n.string(","), n.select(n.filter($("rest"), $_0 => n.geq(fn.position($_0), n.integer(2))), $_0 => fn.string($_0)), n.string(")")));
        } else {
            return block($("rest"), fn.concat($("ret"), n.string("core:ximport($,"), n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(3))), $_0 => fn.string($_0)), n.string(","), n.select(n.filter($("parts"), $_0 => n.geq(fn.position($_0), n.integer(5))), $_0 => fn.string($_0)), n.string(")")));
        }
    })($.frame());

}

export function block$2(...$_a) {
    var $ = n.frame($_a)
        .item("parts")
        .item("ret");
    return ($ => {
        if ($.test(fn.empty($("parts")))) {
            return $("ret");
        } else {
            $ = $("val", n.select(fn.head($("parts")), $_0 => fn.string($_0)));
            return ($ => {
                if ($.test(fn.matches($("val"), operatorRegexp))) {
                    $ = $("no", opNum($("val")));
                    return ($ => {
                        if ($.test(n.eq($("no"), n.decimal(2.14)))) {
                            return xversion(fn.tail($("parts")), $("ret"));
                        } else {
                            return ($ => {
                                if ($.test(n.eq($("no"), n.decimal(2.16)))) {
                                    return xmodule(fn.tail($("parts")), $("ret"));
                                } else {
                                    return ($ => {
                                        if ($.test(n.eq($("no"), n.decimal(2.17)))) {
                                            return annot(fn.tail($("parts")), $("ret"), n.string(""));
                                        } else {
                                            return ($ => {
                                                if ($.test(n.eq($("no"), n.decimal(2.19)))) {
                                                    return ximport(fn.tail($("parts")), $("ret"));
                                                } else {
                                                    return body($("parts"), $("ret"));
                                                }
                                            })($.frame());
                                        }
                                    })($.frame());
                                }
                            })($.frame());
                        }
                    })($.frame());

                } else {
                    return body($("parts"), $("ret"));
                }
            })($.frame());

        }
    })($.frame());

}

export function toOp$2(...$_a) {
    var $ = n.frame($_a)
        .item("opnum")
        .item("params");
    return ($ => {
        if ($.test(map.contains(n.call($("params"), n.string("$operator-map")), $("opnum")))) {
            return n.call(n.concat(n.string("core:"), n.call($("params"), n.string("$operator-map"))), $("opnum"));
        } else {
            return n.concat(n.string("core:"), fn.replace(n.call(n.call($("params"), n.string("$operators")), $("opnum")), n.string(" "), n.string("-")));
        }
    })($.frame());

}

export function escapeForRegex$2(...$_a) {
    var $ = n.frame($_a)
        .item("key")
        .item("params");
    $ = $("arg", n.call(n.call($("params"), n.string("$operators")), $("key")));
    $ = $("pre", n.string("(^|[\\s,\\(\\);\\[\\]]+)"));
    return ($ => {
        if ($.test(fn.matches($("arg"), n.string("\\p{L}+")))) {
            return ($ => {
                if ($.test(n.eq($("key"), n.decimal(2.17)))) {
                    return n.concat(n.concat(n.string("(\\s?|;?)"), $("arg")), n.string("(\\s?)"));
                } else {
                    return ($ => {
                        if ($.test(n.eq($("key"), n.decimal(21.06)))) {
                            return n.concat(n.concat(n.concat(n.concat($("pre"), $("arg")), n.string("([\\s")), ncname), n.string(":]*\\s*\\((\\$|\\)))"));
                        } else {
                            return ($ => {
                                if ($.test(n.eq(fn.floor($("key")), n.integer(21)))) {
                                    return n.concat(n.concat(n.concat(n.concat($("pre"), $("arg")), n.string("([\\s\\$")), ncname), n.string(",:]*=#20#06)"));
                                } else {
                                    return ($ => {
                                        if ($.test($.test(n.eq($("key"), n.decimal(2.04))) || $.test(n.eq(fn.floor($("key")), n.integer(22))))) {
                                            return n.concat(n.concat($("pre"), $("arg")), n.string("(\\()"));
                                        } else {
                                            return ($ => {
                                                if ($.test(n.eq(fn.floor($("key")), n.integer(24)))) {
                                                    return n.concat(n.concat($("pre"), $("arg")), n.string("(\\s)"));
                                                } else {
                                                    return ($ => {
                                                        if ($.test(n.geq($("arg"), n.string("if")))) {
                                                            return n.concat(n.concat($("pre"), $("arg")), n.string("(\\s?)"));
                                                        } else {
                                                            return ($ => {
                                                                if ($.test(n.geq($("arg"), n.string("then")))) {
                                                                    return n.concat(n.concat(n.string("\\)(\\s*)"), $("arg")), n.string("(\\s?)"));
                                                                } else {
                                                                    return n.concat(n.concat(n.string("(^|\\s)"), $("arg")), n.string("(\\s|$)"));
                                                                }
                                                            })($.frame());
                                                        }
                                                    })($.frame());
                                                }
                                            })($.frame());
                                        }
                                    })($.frame());
                                }
                            })($.frame());
                        }
                    })($.frame());
                }
            })($.frame());
        } else {
            $ = $("arg", fn.replace($("arg"), n.string("(\\.|\\[|\\]|\\\\|\\||\\-|\\^|\\$|\\?|\\*|\\+|\\{|\\}|\\(|\\))"), n.string("\\\\$1")));
            return ($ => {
                if ($.test(n.eq($("key"), n.integer(26)))) {
                    return n.concat(n.concat(n.string("(\\s?)"), $("arg")), n.string("(\\s*[^\\p{L}_])"));
                } else {
                    return ($ => {
                        if ($.test(n.eq($("key"), n.decimal(2.10)))) {
                            return n.string("(\\s?):\\s*=([^#])");
                        } else {
                            return ($ => {
                                if ($.test(n.geq($("key"), n.seq(n.decimal(8.02), n.decimal(17.02))))) {
                                    return n.concat(n.concat(n.string("(^|\\s|[^\\p{L}\\p{N}]\\p{N}+|[\\(\\)\\.,])"), $("arg")), n.string("([\\s\\p{N}])?"));
                                } else {
                                    return ($ => {
                                        if ($.test(n.geq($("key"), n.seq(n.decimal(8.01), n.decimal(9.01), n.decimal(20.03))))) {
                                            return n.concat(n.concat(n.string("([^/])"), $("arg")), n.string("(\\s*[^,\\)\\{])"));
                                        } else {
                                            return n.concat(n.concat(n.string("(\\s?)"), $("arg")), n.string("(\\s?)"));
                                        }
                                    })($.frame());
                                }
                            })($.frame());
                        }
                    })($.frame());
                }
            })($.frame());

        }
    })($.frame());

}

export function unaryOp$1(...$_a) {
    var $ = n.frame($_a)
        .item("op");
    return ($ => {
        if ($.test(n.eq(fn.floor($("op")), n.integer(17)))) {
            return $("op");
        } else {
            return n.add($("op"), n.integer(9));
        }
    })($.frame());

}

export function opNum$1(...$_a) {
    var $ = n.frame($_a)
        .item("op");
    return ($ => {
        if ($.test(n.ne($("op"), n.string("")))) {
            return n.decimal(fn.replace($("op"), n.string("^=#(\\p{N}+)#?(\\p{N}*)=$"), n.string("$1.$2")));
        } else {
            return n.integer(0);
        }
    })($.frame());

}

export function opStr$1(...$_a) {
    var $ = n.frame($_a)
        .item("op");
    return fn.concat(n.string("=#"), fn.replace(fn.string($("op")), n.string("\\."), n.string("#")), n.string("="));

}

export function opIn(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opIn$5.apply(this, $_a);
    }

    return n.error(opIn, $_l);
}

export function as(...$_a) {
    var $_l = $_a.length;
    if ($_l === 6) {
        return as$6.apply(this, $_a);
    }

    return n.error(as, $_l);
}

export function toOp(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return toOp$2.apply(this, $_a);
    }

    return n.error(toOp, $_l);
}

export function opOpenSquare(...$_a) {
    var $_l = $_a.length;
    if ($_l === 4) {
        return opOpenSquare$4.apply(this, $_a);
    }

    return n.error(opOpenSquare, $_l);
}

export function opOpenCurly(...$_a) {
    var $_l = $_a.length;
    if ($_l === 4) {
        return opOpenCurly$4.apply(this, $_a);
    }

    return n.error(opOpenCurly, $_l);
}

export function escapeForRegex(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return escapeForRegex$2.apply(this, $_a);
    }

    return n.error(escapeForRegex, $_l);
}

export function filter(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return filter$2.apply(this, $_a);
    }

    return n.error(filter, $_l);
}

export function close(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return close$2.apply(this, $_a);
    }
    if ($_l === 4) {
        return close$4.apply(this, $_a);
    }

    return n.error(close, $_l);
}

export function seqtype(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return seqtype$3.apply(this, $_a);
    }

    return n.error(seqtype, $_l);
}

export function closer(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return closer$2.apply(this, $_a);
    }

    return n.error(closer, $_l);
}

export function opNum(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return opNum$1.apply(this, $_a);
    }

    return n.error(opNum, $_l);
}

export function opAssign(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opAssign$5.apply(this, $_a);
    }

    return n.error(opAssign, $_l);
}

export function opReturn(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opReturn$5.apply(this, $_a);
    }

    return n.error(opReturn, $_l);
}

export function parenCloser(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return parenCloser$2.apply(this, $_a);
    }

    return n.error(parenCloser, $_l);
}

export function xns(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return xns$2.apply(this, $_a);
    }

    return n.error(xns, $_l);
}

export function ximport(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return ximport$2.apply(this, $_a);
    }

    return n.error(ximport, $_l);
}

export function opFor(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opFor$5.apply(this, $_a);
    }

    return n.error(opFor, $_l);
}

export function opCloseSquare(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opCloseSquare$5.apply(this, $_a);
    }

    return n.error(opCloseSquare, $_l);
}

export function unaryOp(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return unaryOp$1.apply(this, $_a);
    }

    return n.error(unaryOp, $_l);
}

export function comment(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return comment$3.apply(this, $_a);
    }

    return n.error(comment, $_l);
}

export function xfn(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return xfn$2.apply(this, $_a);
    }

    return n.error(xfn, $_l);
}

export function xversion(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return xversion$2.apply(this, $_a);
    }

    return n.error(xversion, $_l);
}

export function body(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return body$2.apply(this, $_a);
    }
    if ($_l === 3) {
        return body$3.apply(this, $_a);
    }
    if ($_l === 4) {
        return body$4.apply(this, $_a);
    }

    return n.error(body, $_l);
}

export function repeatString(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return repeatString$2.apply(this, $_a);
    }

    return n.error(repeatString, $_l);
}

export function xmodule(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return xmodule$2.apply(this, $_a);
    }

    return n.error(xmodule, $_l);
}

export function opStr(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return opStr$1.apply(this, $_a);
    }

    return n.error(opStr, $_l);
}

export function opElse(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opElse$5.apply(this, $_a);
    }

    return n.error(opElse, $_l);
}

export function annot(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return annot$3.apply(this, $_a);
    }

    return n.error(annot, $_l);
}

export function params(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return params$2.apply(this, $_a);
    }
    if ($_l === 3) {
        return params$3.apply(this, $_a);
    }

    return n.error(params, $_l);
}

export function normalizeQuery(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return normalizeQuery$2.apply(this, $_a);
    }

    return n.error(normalizeQuery, $_l);
}

export function opSelect(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opSelect$5.apply(this, $_a);
    }

    return n.error(opSelect, $_l);
}

export function opComma(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return opComma$3.apply(this, $_a);
    }

    return n.error(opComma, $_l);
}

export function opThen(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opThen$5.apply(this, $_a);
    }

    return n.error(opThen, $_l);
}

export function opCloseCurly(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opCloseCurly$5.apply(this, $_a);
    }

    return n.error(opCloseCurly, $_l);
}

export function bodyOp(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return bodyOp$5.apply(this, $_a);
    }

    return n.error(bodyOp, $_l);
}

export function anon(...$_a) {
    var $_l = $_a.length;
    if ($_l === 4) {
        return anon$4.apply(this, $_a);
    }

    return n.error(anon, $_l);
}

export function block(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return block$2.apply(this, $_a);
    }

    return n.error(block, $_l);
}

export function opConstructor(...$_a) {
    var $_l = $_a.length;
    if ($_l === 4) {
        return opConstructor$4.apply(this, $_a);
    }

    return n.error(opConstructor, $_l);
}

export function xvar(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return xvar$2.apply(this, $_a);
    }

    return n.error(xvar, $_l);
}

export function opLet(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return opLet$5.apply(this, $_a);
    }

    return n.error(opLet, $_l);
}

export function detectGroupBy(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return detectGroupBy$1.apply(this, $_a);
    }

    return n.error(detectGroupBy, $_l);
}

import * as n from "n.js";

import fn from "fn.js";

import * as map from "map.js";

import * as array from "array.js";

import * as console from "console.js";

/* xquery version n.string("3.1") */

/*module namespace n.string("xqc")=n.string("http://raddle.org/xquery-compat");

n.seq()*/

export const ncname = n.string("\\p{L}\\p{N}\\-_\\.");

export const qname = n.concat(n.concat(n.concat(n.concat(n.concat(n.string("["), ncname), n.string("]*:?")), n.string("[")), ncname), n.string("]+"));

export const operatorRegexp = n.string("=#\\p{N}+#?\\p{N}*=");

export const operators = n.map(n.seq(n.array(n.seq(n.integer(1), n.string(","))), n.array(n.seq(n.decimal(2.01), n.string("some"))), n.array(n.seq(n.decimal(2.02), n.string("every"))), n.array(n.seq(n.decimal(2.03), n.string("switch"))), n.array(n.seq(n.decimal(2.04), n.string("typeswitch"))), n.array(n.seq(n.decimal(2.05), n.string("try"))), n.array(n.seq(n.decimal(2.06), n.string("if"))), n.array(n.seq(n.decimal(2.07), n.string("then"))), n.array(n.seq(n.decimal(2.08), n.string("else"))), n.array(n.seq(n.decimal(2.09), n.string("let"))), n.array(n.seq(n.decimal(2.10), n.string(":="))), n.array(n.seq(n.decimal(2.11), n.string("return"))), n.array(n.seq(n.decimal(2.12), n.string("case"))), n.array(n.seq(n.decimal(2.13), n.string("default"))), n.array(n.seq(n.decimal(2.14), n.string("xquery"))), n.array(n.seq(n.decimal(2.15), n.string("version"))), n.array(n.seq(n.decimal(2.16), n.string("module"))), n.array(n.seq(n.decimal(2.17), n.string("declare"))), n.array(n.seq(n.decimal(2.18), n.string("variable"))), n.array(n.seq(n.decimal(2.19), n.string("import"))), n.array(n.seq(n.integer(3), n.string("or"))), n.array(n.seq(n.integer(4), n.string("and"))), n.array(n.seq(n.decimal(5.01), n.string("eq"))), n.array(n.seq(n.decimal(5.02), n.string("ne"))), n.array(n.seq(n.decimal(5.03), n.string("lt"))), n.array(n.seq(n.decimal(5.04), n.string("le"))), n.array(n.seq(n.decimal(5.05), n.string("gt"))), n.array(n.seq(n.decimal(5.06), n.string("ge"))), n.array(n.seq(n.decimal(5.07), n.string("="))), n.array(n.seq(n.decimal(5.08), n.string("!="))), n.array(n.seq(n.decimal(5.09), n.string("<="))), n.array(n.seq(n.decimal(5.10), n.string(">="))), n.array(n.seq(n.decimal(5.11), n.string("<<"))), n.array(n.seq(n.decimal(5.12), n.string(">>"))), n.array(n.seq(n.decimal(5.13), n.string("<"))), n.array(n.seq(n.decimal(5.14), n.string(">"))), n.array(n.seq(n.decimal(5.15), n.string("is"))), n.array(n.seq(n.integer(6), n.string("||"))), n.array(n.seq(n.integer(7), n.string("to"))), n.array(n.seq(n.decimal(8.01), n.string("+"))), n.array(n.seq(n.decimal(8.02), n.string("-"))), n.array(n.seq(n.decimal(9.01), n.string("*"))), n.array(n.seq(n.decimal(9.02), n.string("idiv"))), n.array(n.seq(n.decimal(9.03), n.string("div"))), n.array(n.seq(n.decimal(9.04), n.string("mod"))), n.array(n.seq(n.decimal(10.01), n.string("union"))), n.array(n.seq(n.decimal(10.02), n.string("|"))), n.array(n.seq(n.decimal(11.01), n.string("intersect"))), n.array(n.seq(n.decimal(11.02), n.string("except"))), n.array(n.seq(n.integer(12), n.string("instance of"))), n.array(n.seq(n.integer(13), n.string("treat as"))), n.array(n.seq(n.integer(14), n.string("castable as"))), n.array(n.seq(n.integer(15), n.string("cast as"))), n.array(n.seq(n.integer(16), n.string("=>"))), n.array(n.seq(n.decimal(17.01), n.string("+"))), n.array(n.seq(n.decimal(17.02), n.string("-"))), n.array(n.seq(n.integer(18), n.string("!"))), n.array(n.seq(n.decimal(19.01), n.string("/"))), n.array(n.seq(n.decimal(19.02), n.string("//"))), n.array(n.seq(n.decimal(19.03), n.string("/*"))), n.array(n.seq(n.decimal(20.01), n.string("["))), n.array(n.seq(n.decimal(20.02), n.string("]"))), n.array(n.seq(n.decimal(20.03), n.string("?"))), n.array(n.seq(n.decimal(20.04), n.string("["))), n.array(n.seq(n.decimal(20.06), n.string("{"))), n.array(n.seq(n.decimal(20.07), n.string("}"))), n.array(n.seq(n.decimal(20.08), n.string("@"))), n.array(n.seq(n.decimal(21.01), n.string("array"))), n.array(n.seq(n.decimal(21.02), n.string("attribute"))), n.array(n.seq(n.decimal(21.03), n.string("comment"))), n.array(n.seq(n.decimal(21.04), n.string("document"))), n.array(n.seq(n.decimal(21.05), n.string("element"))), n.array(n.seq(n.decimal(21.06), n.string("function"))), n.array(n.seq(n.decimal(21.07), n.string("map"))), n.array(n.seq(n.decimal(21.08), n.string("namespace"))), n.array(n.seq(n.decimal(21.09), n.string("processing-instruction"))), n.array(n.seq(n.decimal(21.10), n.string("text"))), n.array(n.seq(n.decimal(22.01), n.string("array"))), n.array(n.seq(n.decimal(22.02), n.string("attribute"))), n.array(n.seq(n.decimal(22.03), n.string("comment"))), n.array(n.seq(n.decimal(22.04), n.string("document-node"))), n.array(n.seq(n.decimal(22.05), n.string("element"))), n.array(n.seq(n.decimal(22.06), n.string("empty-sequence"))), n.array(n.seq(n.decimal(22.07), n.string("function"))), n.array(n.seq(n.decimal(22.08), n.string("item"))), n.array(n.seq(n.decimal(22.09), n.string("map"))), n.array(n.seq(n.decimal(22.10), n.string("namespace-node"))), n.array(n.seq(n.decimal(22.11), n.string("node"))), n.array(n.seq(n.decimal(22.12), n.string("processing-instruction"))), n.array(n.seq(n.decimal(22.13), n.string("schema-attribute"))), n.array(n.seq(n.decimal(22.14), n.string("schema-element"))), n.array(n.seq(n.decimal(22.15), n.string("text"))), n.array(n.seq(n.integer(24), n.string("as"))), n.array(n.seq(n.decimal(25.01), n.string("(:"))), n.array(n.seq(n.decimal(25.02), n.string(":)"))), n.array(n.seq(n.integer(26), n.string(":")))));

export const operatorsI = fn.foldLeft(map.keys(operators), n.map(n.seq()), function() {

    return n.initialize(arguments, [
        ["pre", null, "item"],
        ["cur", null, "item"]
    ], function($) {

        return n.stop($, n.item(map.put(n.fetch($, "pre"), n.call(operators, n.fetch($, "cur")), n.fetch($, "cur"))));
    });

});

export const types = n.seq(n.string("untypedAtomic"), n.string("dateTime"), n.string("dateTimeStamp"), n.string("date"), n.string("time"), n.string("duration"), n.string("yearMonthDuration"), n.string("dayTimeDuration"), n.string("float"), n.string("double"), n.string("decimal"), n.string("integer"), n.string("nonPositiveInteger"), n.string("negativeInteger"), n.string("long"), n.string("int"), n.string("short"), n.string("byte"), n.string("nonNegativeInteger"), n.string("unsignedLong"), n.string("unsignedInt"), n.string("unsignedShort"), n.string("unsignedByte"), n.string("positiveInteger"), n.string("gYearMonth"), n.string("gYear"), n.string("gMonthDay"), n.string("gDay"), n.string("gMonth"), n.string("string"), n.string("normalizedString"), n.string("token"), n.string("language"), n.string("NMTOKEN"), n.string("Name"), n.string("NCName"), n.string("ID"), n.string("IDREF"), n.string("ENTITY"), n.string("boolean"), n.string("base64Binary"), n.string("hexBinary"), n.string("anyURI"), n.string("QName"), n.string("NOTATION"));

export const operatorMap = n.map(n.seq(n.array(n.seq(n.decimal(2.06), n.string("iff"))), n.array(n.seq(n.decimal(2.09), n.string("item"))), n.array(n.seq(n.decimal(5.01), n.string("eq"))), n.array(n.seq(n.decimal(5.02), n.string("ne"))), n.array(n.seq(n.decimal(5.03), n.string("lt"))), n.array(n.seq(n.decimal(5.04), n.string("le"))), n.array(n.seq(n.decimal(5.05), n.string("gt"))), n.array(n.seq(n.decimal(5.06), n.string("ge"))), n.array(n.seq(n.decimal(5.07), n.string("geq"))), n.array(n.seq(n.decimal(5.08), n.string("gne"))), n.array(n.seq(n.decimal(5.09), n.string("gle"))), n.array(n.seq(n.decimal(5.10), n.string("gge"))), n.array(n.seq(n.decimal(5.11), n.string("precedes"))), n.array(n.seq(n.decimal(5.12), n.string("follows"))), n.array(n.seq(n.decimal(5.13), n.string("glt"))), n.array(n.seq(n.decimal(5.14), n.string("ggt"))), n.array(n.seq(n.integer(6), n.string("concat"))), n.array(n.seq(n.decimal(8.01), n.string("add"))), n.array(n.seq(n.decimal(8.02), n.string("subtract"))), n.array(n.seq(n.decimal(9.01), n.string("multiply"))), n.array(n.seq(n.decimal(10.02), n.string("union"))), n.array(n.seq(n.decimal(17.01), n.string("plus"))), n.array(n.seq(n.decimal(17.02), n.string("minus"))), n.array(n.seq(n.integer(18), n.string("for-each"))), n.array(n.seq(n.decimal(19.01), n.string("select"))), n.array(n.seq(n.decimal(19.02), n.string("select-all"))), n.array(n.seq(n.decimal(20.01), n.string("filter"))), n.array(n.seq(n.decimal(20.03), n.string("lookup"))), n.array(n.seq(n.decimal(20.04), n.string("array"))), n.array(n.seq(n.decimal(20.08), n.string("select-attribute")))));

export const fns = n.seq(n.string("position"), n.string("last"), n.string("name"), n.string("node-name"), n.string("nilled"), n.string("string"), n.string("data"), n.string("base-uri"), n.string("document-uri"), n.string("number"), n.string("string-length"), n.string("normalize-space"));

export function normalizeQuery() {

    return n.initialize(arguments, [
        ["query", null, "string"],
        ["params", null, "item"]
    ], function($) {

        return (n.put($, "query", n.item(fn.replace(fn.replace(fn.replace(fn.replace(n.fetch($, "query"), n.string("%3E"), n.string(">")), n.string("%3C"), n.string("<")), n.string("%2C"), n.string(",")), n.string("%3A"), n.string(":")))),

            n.put($, "query", n.item(fn.foldLeft(n.filter(map.keys(operators), function($_0) {
                return n.and(n.ne($_0, n.decimal(5.07)), n.ne($_0, n.integer(1)));
            }), n.fetch($, "query"), function() {

                return n.initialize(arguments, [
                    ["cur", null, "item"],
                    ["next", null, "item"]
                ], function($) {

                    return n.stop($, n.item(fn.replace(n.fetch($, "cur"), escapeForRegex(n.fetch($, "next")), n.iff($, n.eq(fn.round(n.fetch($, "next")), n.integer(22)),

                        function($) {

                            return fn.concat(n.string("$1"), toOp(n.fetch($, "next")), n.string("$2"));

                        },

                        function($) {

                            return fn.concat(n.string("$1 "), opStr(n.fetch($, "next")), n.string(" $2"));

                        }))));
                });

            }))),

            n.put($, "query", n.item(fn.foldLeft(types, n.fetch($, "query"), function() {

                return n.initialize(arguments, [
                    ["cur", null, "item"],
                    ["next", null, "item"]
                ], function($) {

                    return (n.put($, "cur", n.item(fn.replace(n.fetch($, "cur"), fn.concat(n.string("xs:"), n.fetch($, "next"), n.string("\\s*([^\\(])")), fn.concat(n.string("core:"), n.fetch($, "next"), n.string("()$1"))))),

                        n.stop($, n.item(fn.replace(n.fetch($, "cur"), fn.concat(n.string("xs:"), n.fetch($, "next"), n.string("\\s*\\(")), fn.concat(n.string("core:"), n.fetch($, "next"), n.string("("))))));
                });

            }))),

            n.put($, "query", n.item(fn.replace(n.fetch($, "query"), n.string(","), n.string("=#1=")))),

            n.put($, "query", n.item(fn.replace(n.fetch($, "query"), n.string("=(#\\p{N}+#?\\p{N}*)="), n.string("%3D$1%3D")))),

            n.put($, "query", n.item(fn.replace(n.fetch($, "query"), n.string("="), n.string("=#5#07=")))),

            n.put($, "query", n.item(fn.replace(n.fetch($, "query"), n.string("%3D"), n.string("=")))),

            n.put($, "query", n.item(fn.replace(n.fetch($, "query"), n.concat(n.concat(n.string("("), operatorRegexp), n.string(")")), n.string(" $1 ")))),

            n.put($, "query", n.item(fn.replace(n.fetch($, "query"), n.string("\\s+"), n.string(" ")))),

            n.put($, "query", n.item(fn.replace(n.fetch($, "query"), n.string("=#19#01=\\s*=#20#08="), n.string("=#20#08=")))),

            /*n.put($, "query", n.item(block(n.filter(n.select(fn.analyzeString(n.fetch($, "query"), n.string("([^\\s\\(\\),\\.;]+)")), n.seq(n.string("*"))), function($_0) {
                return n.or(n.geq(fn.name($_0), n.string("fn:match")), n.geq(fn.matches(fn.string($_0), n.string("^\\s*$")), fn.false()));
            }), n.string("")))),

            n.put($, "query", n.item(fn.replace(n.fetch($, "query"), n.string("\\s+"), n.string("")))),*/

            n.stop($, n.item(n.fetch($, "query"))));
    });

}

export function seqtype() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"],
        ["lastseen", null, "item"]
    ], function($) {

        return (n.put($, "head", n.item(n.select(n.filter(n.select(fn.head(n.fetch($, "parts")), n.seq(n.string("fn:group"))), function($_0) {
                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(1));
            }), function($_0) {
                return fn.string($_0);
            }))),

            n.put($, "maybeSeqtype", n.item(n.iff($, fn.matches(n.fetch($, "head"), operatorRegexp),

                function($) {

                    return opNum(n.fetch($, "head"));

                },

                function($) {

                    return n.integer(0);

                }))),

            n.stop($, n.item(n.iff($, n.eq(n.fetch($, "maybeSeqtype"), n.decimal(20.06)),

                function($) {

                    return body(n.fetch($, "parts"), fn.concat(n.fetch($, "ret"), n.string(",")), n.seq(n.fetch($, "lastseen"), n.decimal(21.06)));

                },

                function($) {

                    return seqtype(fn.tail(n.fetch($, "parts")), n.fetch($, "ret"), n.fetch($, "lastseen"));

                }))));
    });

}


export function as() {

    return n.initialize(arguments, [
        ["param", null, "item"],
        ["parts", null, "item"],
        ["ret", null, "item"],
        ["lastseen", n.seq(), "item"],
        ["subtype", fn.false(), "item"],
        ["seqtype", fn.false(), "item"]
    ], function($) {

        return (n.put($, "head", n.item(n.select(fn.head(n.fetch($, "parts")), function($_0) {
                return fn.string($_0);
            }))),

            n.put($, "next", n.item(n.select(n.filter(n.fetch($, "parts"), function($_0) {
                return n.geq(fn.position($_0), n.integer(2));
            }), function($_0) {
                return fn.string($_0);
            }))),

            n.put($, "no", n.item(n.iff($, fn.matches(n.fetch($, "head"), operatorRegexp),

                function($) {

                    return opNum(n.fetch($, "head"));

                },

                function($) {

                    return n.integer(0);

                }))),

            n.put($, "non", n.item(n.iff($, fn.matches(n.fetch($, "next"), operatorRegexp),

                function($) {

                    return opNum(n.fetch($, "next"));

                },

                function($) {

                    return n.integer(0);

                }))),

            n.iff($, n.eq(n.fetch($, "no"), n.decimal(20.06)),

                function($) {

                    return n.stop($, n.item(body(n.fetch($, "parts"), fn.concat(n.fetch($, "ret"), n.iff($, n.fetch($, "subtype"),

                        function($) {

                            return n.string(")");

                        },

                        function($) {

                            return n.string("");

                        }), n.string(",")), n.seq(n.fetch($, "lastseen"), n.decimal(21.06)))));

                },

                function($) {

                    return n.iff($, n.eq(n.fetch($, "no"), n.integer(24)),

                        function($) {

                            return n.cont($,n.fetch($, "param"), fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.iff($, n.fetch($, "subtype"),

                                function($) {

                                    return n.string(")");

                                },

                                function($) {

                                    return n.string("");

                                }), n.string(",")), n.fetch($, "lastseen"), n.fetch($, "subtype"), fn.true());

                        },

                        function($) {

                            return n.iff($, n.eq(n.fetch($, "no"), n.integer(1)),

                                function($) {

                                    return n.iff($, n.fetch($, "subtype"),

                                        function($) {

                                            return n.cont($,n.fetch($, "param"), fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.string(",")), n.fetch($, "lastseen"), n.fetch($, "subtype"), n.fetch($, "seqtype"));

                                        },

                                        function($) {

                                            return n.stop($,n.item(params(fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.string(",")))));

                                        });

                                },

                                function($) {

                                    return n.iff($, fn.matches(n.fetch($, "head"), fn.concat(n.string("core:["), ncname, n.string("]+"))),

                                        function($) {

                                            return n.iff($, fn.matches(n.fetch($, "next"), n.string("^\\s*\\(\\s*$")),

                                                function($) {

                                                    return n.cont($,n.seq(), fn.subsequence(n.fetch($, "parts"), n.integer(3)), fn.concat(n.fetch($, "ret"), n.fetch($, "head"), n.string("("), n.fetch($, "param"), n.string(","), n.iff($, n.eq(n.fetch($, "head"), n.string("core:function")),

                                                        function($) {

                                                            return n.string("(");

                                                        },

                                                        function($) {

                                                            return n.string("");

                                                        })), n.fetch($, "lastseen"), fn.true(), n.fetch($, "seqtype"));

                                                },

                                                function($) {

                                                    return n.cont($,n.seq(), fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.fetch($, "head"), n.string("("), n.fetch($, "param"), n.iff($, n.eq(n.fetch($, "head"), n.string("core:function")),

                                                        function($) {

                                                            return n.string(",(");

                                                        },

                                                        function($) {

                                                            return n.string("");

                                                        })), n.fetch($, "lastseen"), n.fetch($, "subtype"), n.fetch($, "seqtype"));

                                                });

                                        },

                                        function($) {

                                            return n.iff($, fn.matches(n.fetch($, "head"), n.string("[\\?\\+\\*]")),

                                                function($) {

                                                    return n.cont($,n.fetch($, "param"), fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.fetch($, "head")), n.fetch($, "lastseen"), n.fetch($, "subtype"), n.fetch($, "seqtype"));

                                                },

                                                function($) {

                                                    return n.iff($, fn.matches(n.fetch($, "head"), n.string("^(\\(\\))?\\s*\\)")),

                                                        function($) {

                                                            return n.iff($, n.and(n.fetch($, "subtype"), n.geq(n.fetch($, "non"), n.seq(n.integer(1), n.integer(24)))),

                                                                function($) {

                                                                    return n.cont($,n.fetch($, "param"), fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.iff($, n.eq(n.fetch($, "non"), n.integer(24)),

                                                                        function($) {

                                                                            return n.string("");

                                                                        },

                                                                        function($) {

                                                                            return n.string(")");

                                                                        })), n.fetch($, "lastseen"), fn.false(), n.fetch($, "seqtype"));

                                                                },

                                                                function($) {

                                                                    return n.iff($, n.eq(n.fetch($, "non"), n.integer(24)),

                                                                        function($) {

                                                                            return n.cont($,n.seq(), fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.iff($, n.fetch($, "subtype"),

                                                                                function($) {

                                                                                    return n.string(")");

                                                                                },

                                                                                function($) {

                                                                                    return n.string("");

                                                                                }), n.string("))")), n.fetch($, "lastseen"));

                                                                        },

                                                                        function($) {

                                                                            return n.stop($,n.item(n.iff($, n.eq(n.fetch($, "non"), n.decimal(20.06)),

                                                                                function($) {

                                                                                    return body(fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.iff($, n.fetch($, "subtype"),

                                                                                        function($) {

                                                                                            return n.string(")");

                                                                                        },

                                                                                        function($) {

                                                                                            return n.string("");

                                                                                        }), n.iff($, fn.matches(n.fetch($, "head"), n.string("^\\(\\)")),

                                                                                        function($) {

                                                                                            return n.string(")");

                                                                                        },

                                                                                        function($) {

                                                                                            return n.string("");

                                                                                        }), n.string("),core:item(),")), n.seq(n.fetch($, "lastseen"), n.decimal(21.06)));

                                                                                },

                                                                                function($) {

                                                                                    return console.log(n.fetch($, "parts"));

                                                                                })));

                                                                        });

                                                                });

                                                        },

                                                        function($) {

                                                            return n.cont($,n.fetch($, "param"), fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.iff($, n.and(n.eq(n.fetch($, "non"), n.integer(1)), n.fetch($, "seqtype")),

                                                                function($) {

                                                                    return n.string(")");

                                                                },

                                                                function($) {

                                                                    return n.string("");

                                                                }), n.string(")")), n.fetch($, "lastseen"), n.fetch($, "subtype"), n.fetch($, "seqtype"));

                                                        });

                                                });

                                        });

                                });

                        });

                }));
    });

}

export function params() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"],
        ["lastseen", n.seq(), "item"]
    ], function($) {

        return (n.put($, "maybeParam", n.item(n.select(fn.head(n.fetch($, "parts")), function($_0) {
                return fn.string($_0);
            }))),

            n.put($, "next", n.item(n.select(n.filter(n.fetch($, "parts"), function($_0) {
                return n.geq(fn.position($_0), n.integer(2));
            }), function($_0) {
                return fn.string($_0);
            }))),

            n.iff($, fn.matches(n.fetch($, "maybeParam"), n.string("^(\\(\\))?\\s*\\)")),

                function($) {
                    return n.stop($, n.item(n.iff($, n.eq(n.fetch($, "next"), n.string("=#24=")),

                        function($) {

                            return as(n.seq(), fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.string(")")), n.fetch($, "lastseen"));

                        },

                        function($) {

                            return body(fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.string("),core:item(),")), n.seq(n.fetch($, "lastseen"), n.decimal(21.06)));

                        })));

                },

                function($) {

                    return n.iff($, fn.matches(n.fetch($, "maybeParam"), n.string("=#1=")),

                        function($) {

                            return n.cont($,fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.string(",")), n.fetch($, "lastseen"));

                        },

                        function($) {

                            return n.iff($, fn.matches(n.fetch($, "maybeParam"), n.string("^\\$")),

                                function($) {

                                    return n.iff($, n.eq(n.fetch($, "next"), n.string("=#24=")),

                                        function($) {
                                            return n.stop($,n.fetch($,"ret"));
                                            //return n.stop($,as(fn.replace(n.fetch($, "maybeParam"), n.string("^\\$"), n.string("\\$,")), fn.subsequence(n.fetch($, "parts"), n.integer(3)), n.fetch($, "ret"), n.fetch($, "lastseen")));

                                        },

                                        function($) {

                                            return n.cont($,fn.tail(n.fetch($, "parts")), fn.concat(n.fetch($, "ret"), n.string("core:item("), fn.replace(n.fetch($, "maybeParam"), n.string("^\\$"), n.string("\\$,")), n.string(")")), n.fetch($, "lastseen"));

                                        });

                                },

                                function($) {

                                    return n.cont($,fn.tail(n.fetch($, "parts")), n.fetch($, "ret"), n.fetch($, "lastseen"));

                                });

                        });

                }));
    });

}


export function xfn() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.stop($, n.item(params(fn.tail(n.fetch($, "parts")), n.concat(n.concat(n.fetch($, "ret"), n.select(n.filter(n.select(fn.head(n.fetch($, "parts")), n.seq(n.string("fn:group"))), function($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(1));
        }), function($_0) {
            return fn.string($_0);
        })), n.string(",(),(")))));
    });

}

export function ns() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return (n.put($, "ns", n.item(fn.replace(n.select(fn.head(n.fetch($, "parts")), function($_0) {
                return fn.string($_0);
            }), n.string("\\s"), n.string("")))),

            n.put($, "rest", n.item(fn.tail(n.fetch($, "parts")))),

            n.stop($, n.item(fn.stringJoin(n.fetch($, "rest")))));
    });

}

export function xvar() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.stop($,n.item(n.fetch($,"ret")));
/*
        return n.stop($, n.item(body(fn.subsequence(n.fetch($, "parts"), n.integer(3)), fn.concat(n.fetch($, "ret"), n.select(n.filter(n.fetch($, "parts"), function($_0) {
            return n.geq(fn.position($_0), n.integer(1));
        }), function($_0) {
            return fn.string($_0);
        }), n.string(",(),")), n.seq(n.decimal(2.18)))));*/
    });

}

export function annot() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"],
        ["annot", n.string(""), "item"]
    ], function($) {

        return (n.put($, "maybeAnnot", n.item(n.select(n.filter(n.select(fn.head(n.fetch($, "parts")), n.seq(n.string("fn:group"))), function($_0) {
                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(1));
            }), function($_0) {
                return fn.string($_0);
            }))),

            n.put($, "rest", n.item(fn.tail(n.fetch($, "parts")))),

            n.iff($, fn.matches(n.fetch($, "maybeAnnot"), n.string("^%")),

                function($) {

                    return n.cont($,n.fetch($, "rest"), n.fetch($, "ret"), fn.replace(n.fetch($, "maybeAnnot"), n.string("^%"), n.string("-")));

                },

                function($) {

                    return n.stop($, n.item(n.iff($, n.geq(n.fetch($, "maybeAnnot"), n.string("=#21#06=")),

                        function($) {

                            return xfn(n.fetch($, "rest"), n.concat(n.concat(n.concat(n.fetch($, "ret"), n.string("core:define")), n.fetch($, "annot")), n.string("($,")));

                        },

                        function($) {

                            return n.iff($, n.geq(n.fetch($, "maybeAnnot"), n.string("=#2#18=")),

                                function($) {

                                    return xvar(n.fetch($, "rest"), n.concat(n.concat(n.concat(n.fetch($, "ret"), n.string("core:var")), n.fetch($, "annot")), n.string("($,")));

                                },

                                function($) {

                                    return n.fetch($, "ret");

                                });

                        })));

                }));
    });

}

export function xversion() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.stop($, n.item(block(fn.subsequence(n.fetch($, "parts"), n.integer(3)), fn.concat(n.fetch($, "ret"), n.string("core:xq-version($,"), n.select(n.filter(n.fetch($, "parts"), function($_0) {
            return n.geq(fn.position($_0), n.integer(2));
        }), function($_0) {
            return fn.string($_0);
        }), n.string(")")))));
    });

}

export function xmodule() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.stop($, n.item(block(fn.subsequence(n.fetch($, "parts"), n.integer(5)), fn.concat(n.fetch($, "ret"), n.string("core:module($,"), n.select(n.filter(n.fetch($, "parts"), function($_0) {
            return n.geq(fn.position($_0), n.integer(2));
        }), function($_0) {
            return fn.string($_0);
        }), n.string(","), n.select(n.filter(n.fetch($, "parts"), function($_0) {
            return n.geq(fn.position($_0), n.integer(4));
        }), function($_0) {
            return fn.string($_0);
        }), n.string(",())")))));
    });

}

function close_2() {

    return n.initialize(arguments, [
        ["lastseen", null, "decimal"],
        ["no", null, "decimal"]
    ], function($) {

        return n.stop($, n.item(close(fn.reverse(n.fetch($, "lastseen")), n.fetch($, "no"), n.seq())));
    });

}

function close_3() {

    return n.initialize(arguments, [
        ["lastseen", null, "decimal"],
        ["no", null, "decimal"],
        ["ret", null, "decimal"]
    ], function($) {

        return n.stop($, n.item(n.iff($, n.or(fn.empty(n.fetch($, "lastseen")), n.eq(n.fetch($, "no"), n.integer(0))),

            function($) {

                return fn.reverse(n.seq(n.fetch($, "ret"), n.fetch($, "lastseen")));

            },

            function($) {

                return n.iff($, n.ne(fn.head(n.fetch($, "lastseen")), n.decimal(0.01)),

                    function($) {

                        return close(fn.tail(n.fetch($, "lastseen")), n.fetch($, "no"), n.seq(fn.head(n.fetch($, "lastseen")), n.fetch($, "ret")));

                    },

                    function($) {

                        return close(fn.tail(n.fetch($, "lastseen")), n.subtract(n.fetch($, "no"), n.integer(1)), n.fetch($, "ret"));

                    });

            })));
    });

}

export function close() {

    return n.initialize(arguments, [
        ["a...", null, "item"]
    ], function($) {

        return (n.put($, "s", n.integer(array.size(n.fetch($, "a")))),

            n.stop($, n.item(n.iff($, n.eq(n.fetch($, "s"), n.integer(2)),

                function($) {

                    return fn.apply(close_2, n.fetch($, "a"));

                },

                function($) {

                    return n.iff($, n.eq(n.fetch($, "s"), n.integer(3)),

                        function($) {

                            return fn.apply(close_3, n.fetch($, "a"));

                        },

                        function($) {

                            return n.seq();

                        });

                }))));
    });

}

function closer_1() {

    return n.initialize(arguments, [
        ["b", null, "decimal"]
    ], function($) {

        return n.stop($, n.item(closer(fn.reverse(n.fetch($, "b")), n.integer(0))));
    });

}

function closer_2() {

    return n.initialize(arguments, [
        ["b", null, "decimal"],
        ["c", null, "integer"]
    ], function($) {

        return n.stop($, n.item(n.iff($, n.and(fn.exists(n.fetch($, "b")), n.geq(fn.head(n.fetch($, "b")), n.seq(n.decimal(2.08), n.decimal(2.11)))),

            function($) {

                return closer(fn.tail(n.fetch($, "b")), n.add(n.fetch($, "c"), n.integer(1)));

            },

            function($) {

                return n.fetch($, "c");

            })));
    });

}

export function closer() {

    return n.initialize(arguments, [
        ["a...", null, "item"]
    ], function($) {

        return (n.put($, "s", n.integer(array.size(n.fetch($, "a")))),

            n.stop($, n.item(n.iff($, n.eq(n.fetch($, "s"), n.integer(1)),

                function($) {

                    return fn.apply(closer_1, n.fetch($, "a"));

                },

                function($) {

                    return n.iff($, n.eq(n.fetch($, "s"), n.integer(2)),

                        function($) {

                            return fn.apply(closer_2, n.fetch($, "a"));

                        },

                        function($) {

                            return n.seq();

                        });

                }))));
    });

}

export function lastIndexOf() {

    return n.initialize(arguments, [
        ["lastseen", null, "decimal"],
        ["a", null, "decimal"]
    ], function($) {

        return (n.put($, "id", n.item(fn.indexOf(n.fetch($, "lastseen"), n.fetch($, "a")))),

            n.stop($, n.item(n.iff($, fn.empty(n.fetch($, "id")),

                function($) {

                    return n.integer(1);

                },

                function($) {

                    return n.filter(n.fetch($, "id"), function($_0) {
                        return fn.last($_0);
                    });

                }))));
    });

}

export function pop() {

    return n.initialize(arguments, [
        ["a", null, "item"]
    ], function($) {

        return n.stop($, n.item(fn.reverse(fn.tail(fn.reverse(n.fetch($, "a"))))));
    });

}

export function anon() {

    return n.initialize(arguments, [
        ["head", null, "item"],
        ["parts", null, "item"],
        ["ret", null, "item"],
        ["lastseen", null, "item"]
    ], function($) {

        return n.stop($, n.item(params(n.fetch($, "parts"), n.concat(n.fetch($, "ret"), n.string("core:function((")), n.fetch($, "lastseen"))));
    });

}

export function comment() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"],
        ["lastseen", null, "item"]
    ], function($) {

        return (n.put($, "head", n.item(n.select(fn.head(n.fetch($, "parts")), function($_0) {
                return fn.string($_0);
            }))),

            n.put($, "rest", n.item(fn.tail(n.fetch($, "parts")))),

            n.iff($, n.geq(n.fetch($, "head"), n.string("=#25#02=")),

                function($) {

                    return n.stop($, n.item(body(n.fetch($, "rest"), n.fetch($, "ret"), n.fetch($, "lastseen"))));

                },

                function($) {

                    return n.cont($,n.fetch($, "rest"), n.fetch($, "ret"), n.fetch($, "lastseen"));

                }));
    });

}

export function bodyOp() {

    return n.initialize(arguments, [
        ["no", null, "item"],
        ["next", null, "item"],
        ["lastseen", null, "item"],
        ["rest", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return (n.put($, "llast", n.item(n.filter(n.fetch($, "lastseen"), function($_0) {
                return fn.last($_0);
            }))),

            n.put($, "ret", n.item(n.iff($, n.eq(n.fetch($, "llast"), n.decimal(19.01)),

                function($) {

                    return fn.concat(n.fetch($, "ret"), n.string(")"));

                },

                function($) {

                    return n.fetch($, "ret");

                }))),

            n.put($, "lastseen", n.item(n.iff($, n.eq(n.fetch($, "llast"), n.decimal(19.01)),

                function($) {

                    return pop(n.fetch($, "lastseen"));

                },

                function($) {

                    return n.fetch($, "lastseen");

                }))),

            n.stop($, n.item(n.iff($, n.eq(n.fetch($, "no"), n.integer(1)),

                function($) {

                    return n.put($, "old", n.item(n.fetch($, "lastseen"))),

                        n.put($, "closer", n.item(closer(n.fetch($, "lastseen")))),

                        n.put($, "lastseen", n.item(fn.subsequence(n.fetch($, "lastseen"), n.integer(1), n.subtract(fn.count(n.fetch($, "lastseen")), n.fetch($, "closer"))))),

                        n.put($, "ret", n.item(fn.concat(n.fetch($, "ret"), fn.stringJoin(n.forEach(n.seq(n.to(n.integer(1), n.fetch($, "closer"))), n.string(")"))), n.iff($, n.eq(n.filter(n.fetch($, "lastseen"), function($_0) {
                                return n.subtract(fn.last($_0), n.integer(1));
                            }), n.decimal(21.07)),

                            function($) {

                                return n.string(")),=#20#04=((");

                            },

                            function($) {

                                return n.string(",");

                            })))),

                        body(n.fetch($, "rest"), n.fetch($, "ret"), n.fetch($, "lastseen"));

                },

                function($) {

                    return n.iff($, n.eq(n.fetch($, "no"), n.decimal(25.01)),

                        function($) {

                            return comment(n.fetch($, "rest"), n.fetch($, "ret"), n.fetch($, "lastseen"));

                        },

                        function($) {

                            return n.iff($, n.eq(n.fetch($, "no"), n.decimal(21.06)),

                                function($) {

                                    return anon(n.fetch($, "next"), fn.tail(n.fetch($, "rest")), n.fetch($, "ret"), n.fetch($, "lastseen"));

                                },

                                function($) {

                                    return n.iff($, n.eq(fn.round(n.fetch($, "no")), n.integer(21)),

                                        function($) {

                                            return n.put($, "ret", n.item(fn.concat(n.fetch($, "ret"), opStr(n.fetch($, "no")), n.string("(")))),

                                                n.put($, "qn", n.item(n.iff($, n.ne(n.fetch($, "next"), n.string("=#20#06=")),

                                                    function($) {

                                                        return n.fetch($, "next");

                                                    },

                                                    function($) {

                                                        return n.seq();

                                                    }))),

                                                n.put($, "rest", n.item(n.iff($, fn.exists(n.fetch($, "qn")),

                                                    function($) {

                                                        return fn.tail(n.fetch($, "rest"));

                                                    },

                                                    function($) {

                                                        return n.fetch($, "rest");

                                                    }))),

                                                n.put($, "ret", n.item(n.iff($, fn.exists(n.fetch($, "qn")),

                                                    function($) {

                                                        return fn.concat(n.fetch($, "ret"), n.fetch($, "next"), n.string(","));

                                                    },

                                                    function($) {

                                                        return n.fetch($, "ret");

                                                    }))),

                                                body(n.fetch($, "rest"), n.fetch($, "ret"), n.seq(n.fetch($, "lastseen"), n.fetch($, "no")));

                                        },

                                        function($) {

                                            return n.put($, "old", n.item(n.fetch($, "lastseen"))),

                                                n.put($, "llast", n.item(n.filter(n.fetch($, "lastseen"), function($_0) {
                                                    return fn.last($_0);
                                                }))),

                                                n.put($, "positional", n.item(n.and(n.and(n.and(n.eq(n.fetch($, "no"), n.decimal(20.01)), n.fetch($, "next")), fn.matches(n.fetch($, "next"), n.concat(n.concat(n.string("^([\\+\\-]?(\\p{N}+))$|^\\$["), ncname), n.string("]+$")))), n.eq(n.filter(n.fetch($, "rest"), function($_0) {
                                                    return n.geq(fn.position($_0), n.integer(2));
                                                }), n.string("=#20#02="))))),

                                                n.put($, "hascomma", n.item(n.eq(fn.substring(n.fetch($, "ret"), fn.stringLength(n.fetch($, "ret"))), n.string(",")))),

                                                n.put($, "letopener", n.item(n.and(n.eq(n.fetch($, "no"), n.decimal(2.09)), n.seq(n.or(fn.not(n.or(n.geq(n.fetch($, "llast"), n.seq(n.decimal(2.09), n.decimal(2.10))), n.seq(n.and(n.eq(n.fetch($, "llast"), n.decimal(2.08)), n.geq(n.fetch($, "hascomma"), fn.false()))))), n.seq(n.eq(n.fetch($, "llast"), n.decimal(20.06)))))))),

                                                n.put($, "elsecloser", n.item(n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.08)),

                                                    function($) {

                                                        return lastIndexOf(n.fetch($, "lastseen"), n.decimal(2.07));

                                                    },

                                                    function($) {

                                                        return n.integer(0);

                                                    }))),

                                                n.put($, "retncloser", n.item(n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.11)),

                                                    function($) {

                                                        return lastIndexOf(n.fetch($, "lastseen"), n.decimal(2.1));

                                                    },

                                                    function($) {

                                                        return n.integer(0);

                                                    }))),

                                                n.put($, "letclose", n.item(n.and(n.and(n.eq(n.fetch($, "no"), n.decimal(2.09)), fn.not(n.or(n.eq(n.fetch($, "llast"), n.decimal(20.06)), fn.empty(n.fetch($, "lastseen"))))), n.geq(n.fetch($, "hascomma"), fn.false())))),

                                                n.put($, "letcloser", n.item(n.iff($, n.and(n.fetch($, "letclose"), n.geq(n.fetch($, "llast"), n.seq(n.decimal(2.08), n.decimal(2.11)))),

                                                    function($) {

                                                        return closer(n.fetch($, "lastseen"));

                                                    },

                                                    function($) {

                                                        return n.integer(0);

                                                    }))),

                                                n.put($, "ret", n.item(fn.concat(n.fetch($, "ret"), n.iff($, n.and(n.eq(n.fetch($, "no"), n.decimal(20.06)), n.eq(n.fetch($, "llast"), n.decimal(21.07))),

                                                    function($) {

                                                        return n.iff($, n.eq(n.fetch($, "next"), n.string("=#20#07=")),

                                                            function($) {

                                                                return n.string("())");

                                                            },

                                                            function($) {

                                                                return n.string("(=#20#04=((");

                                                            });

                                                    },

                                                    function($) {

                                                        return n.iff($, n.geq(n.fetch($, "no"), n.seq(n.decimal(2.06), n.decimal(2.09), n.decimal(20.01), n.decimal(20.04))),

                                                            function($) {

                                                                return fn.concat(n.iff($, n.fetch($, "letclose"),

                                                                    function($) {

                                                                        return fn.concat(fn.stringJoin(n.forEach(n.seq(n.to(n.integer(1), n.fetch($, "letcloser"))), n.string(")"))), n.iff($, n.eq(n.filter(n.fetch($, "lastseen"), function($_0) {
                                                                                return n.subtract(fn.last($_0), n.fetch($, "letcloser"));
                                                                            }), n.decimal(2.10)),

                                                                            function($) {

                                                                                return n.string(")");

                                                                            },

                                                                            function($) {

                                                                                return n.string("");

                                                                            }), n.iff($, n.fetch($, "hascomma"),

                                                                            function($) {

                                                                                return n.string("");

                                                                            },

                                                                            function($) {

                                                                                return n.string(",");

                                                                            }));

                                                                    },

                                                                    function($) {

                                                                        return n.string("");

                                                                    }), n.iff($, n.fetch($, "letopener"),

                                                                    function($) {

                                                                        return n.string("(");

                                                                    },

                                                                    function($) {

                                                                        return n.string("");

                                                                    }), opStr(n.fetch($, "no")), n.iff($, n.eq(n.fetch($, "no"), n.decimal(20.04)),

                                                                    function($) {

                                                                        return n.string("(");

                                                                    },

                                                                    function($) {

                                                                        return n.string("");

                                                                    }), n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.06)),

                                                                    function($) {

                                                                        return n.string("");

                                                                    },

                                                                    function($) {

                                                                        return n.string("(");

                                                                    }), n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.09)),

                                                                    function($) {

                                                                        return fn.concat(n.string("$,"), fn.replace(n.fetch($, "next"), n.string("^\\$|\\s"), n.string("")));

                                                                    },

                                                                    function($) {

                                                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(20.01)),

                                                                            function($) {

                                                                                return fn.concat(n.iff($, fn.matches(n.fetch($, "next"), n.string("#20#08")),

                                                                                    function($) {

                                                                                        return n.string(".");

                                                                                    },

                                                                                    function($) {

                                                                                        return n.iff($, n.fetch($, "positional"),

                                                                                            function($) {

                                                                                                return n.string("position(.)=#5#07=");

                                                                                            },

                                                                                            function($) {

                                                                                                return n.string("");

                                                                                            });

                                                                                    }), n.fetch($, "next"));

                                                                            },

                                                                            function($) {

                                                                                return n.string("");

                                                                            });

                                                                    }));

                                                            },

                                                            function($) {

                                                                return n.iff($, n.or(n.eq(n.fetch($, "no"), n.integer(26)), n.seq(n.and(n.eq(n.fetch($, "no"), n.decimal(2.10)), n.eq(n.filter(n.fetch($, "lastseen"), function($_0) {
                                                                        return n.subtract(fn.last($_0), n.integer(1));
                                                                    }), n.decimal(21.07))))),

                                                                    function($) {

                                                                        return n.string(",");

                                                                    },

                                                                    function($) {

                                                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(20.07)),

                                                                            function($) {

                                                                                return n.put($, "lastindex", n.item(lastIndexOf(n.fetch($, "lastseen"), n.decimal(20.06)))),

                                                                                    n.put($, "closes", n.item(n.filter(fn.subsequence(n.fetch($, "lastseen"), n.fetch($, "lastindex"), fn.count(n.fetch($, "lastseen"))), function($_0) {
                                                                                        return n.geq($_0, n.seq(n.decimal(2.08), n.decimal(2.11)));
                                                                                    }))),

                                                                                    n.put($, "closes", n.item(n.seq(n.fetch($, "closes"), n.decimal(2.11)))),

                                                                                    n.put($, "llast", n.item(n.filter(n.fetch($, "lastseen"), n.seq(n.subtract(n.fetch($, "lastindex"), n.integer(1)))))),

                                                                                    fn.concat(fn.stringJoin(n.forEach(n.fetch($, "closes"), n.string(")"))), n.iff($, n.eq(n.fetch($, "next"), n.string("=#20#06=")),

                                                                                        function($) {

                                                                                            return n.string(",");

                                                                                        },

                                                                                        function($) {

                                                                                            return n.iff($, n.eq(n.fetch($, "llast"), n.decimal(21.07)),

                                                                                                function($) {

                                                                                                    return n.string(")))");

                                                                                                },

                                                                                                function($) {

                                                                                                    return n.iff($, n.eq(fn.round(n.fetch($, "llast")), n.integer(21)),

                                                                                                        function($) {

                                                                                                            return n.string(")");

                                                                                                        },

                                                                                                        function($) {

                                                                                                            return n.string("");

                                                                                                        });

                                                                                                });

                                                                                        }));

                                                                            },

                                                                            function($) {

                                                                                return n.iff($, n.geq(n.fetch($, "no"), n.seq(n.decimal(2.07), n.decimal(2.10))),

                                                                                    function($) {

                                                                                        return fn.concat(n.iff($, n.eq(n.fetch($, "llast"), n.decimal(2.11)),

                                                                                            function($) {

                                                                                                return n.string(")");

                                                                                            },

                                                                                            function($) {

                                                                                                return n.string("");

                                                                                            }), n.string(","));

                                                                                    },

                                                                                    function($) {

                                                                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.08)),

                                                                                            function($) {

                                                                                                return fn.concat(fn.stringJoin(n.forEach(fn.subsequence(n.fetch($, "lastseen"), n.add(n.fetch($, "elsecloser"), n.integer(1))), n.string(")"))), n.string(","));

                                                                                            },

                                                                                            function($) {

                                                                                                return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.11)),

                                                                                                    function($) {

                                                                                                        return fn.concat(fn.stringJoin(n.forEach(fn.subsequence(n.fetch($, "lastseen"), n.add(n.fetch($, "retncloser"), n.integer(1))), n.string(")"))), n.string("),"));

                                                                                                    },

                                                                                                    function($) {

                                                                                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(20.02)),

                                                                                                            function($) {

                                                                                                                return n.iff($, n.eq(n.fetch($, "llast"), n.decimal(20.04)),

                                                                                                                    function($) {

                                                                                                                        return n.string("))");

                                                                                                                    },

                                                                                                                    function($) {

                                                                                                                        return n.string(")");

                                                                                                                    });

                                                                                                            },

                                                                                                            function($) {

                                                                                                                return n.iff($, n.eq(n.fetch($, "no"), n.decimal(20.06)),

                                                                                                                    function($) {

                                                                                                                        return n.string("(");

                                                                                                                    },

                                                                                                                    function($) {

                                                                                                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(19.01)),

                                                                                                                            function($) {

                                                                                                                                return n.concat(opStr(n.fetch($, "no")), n.string("("));

                                                                                                                            },

                                                                                                                            function($) {

                                                                                                                                return opStr(n.fetch($, "no"));

                                                                                                                            });

                                                                                                                    });

                                                                                                            });

                                                                                                    });

                                                                                            });

                                                                                    });

                                                                            });

                                                                    });

                                                            });

                                                    })))),

                                                n.put($, "rest", n.item(n.iff($, n.and(n.and(n.eq(n.fetch($, "no"), n.decimal(20.06)), n.eq(n.fetch($, "llast"), n.decimal(21.07))), n.eq(n.fetch($, "next"), n.string("=#20#07="))),

                                                    function($) {

                                                        return fn.tail(n.fetch($, "rest"));

                                                    },

                                                    function($) {

                                                        return n.iff($, n.or(fn.empty(n.fetch($, "rest")), fn.not(n.geq(n.fetch($, "no"), n.seq(n.decimal(2.09), n.decimal(20.01))))),

                                                            function($) {

                                                                return n.fetch($, "rest");

                                                            },

                                                            function($) {

                                                                return n.iff($, n.and(n.geq(n.fetch($, "next"), fns), fn.matches(n.filter(n.fetch($, "rest"), function($_0) {
                                                                        return n.geq(fn.position($_0), n.integer(2));
                                                                    }), n.string("\\)"))),

                                                                    function($) {

                                                                        return fn.insertBefore(fn.remove(fn.tail(n.fetch($, "rest")), n.integer(1)), n.integer(1), n.element(n.string("fn:match"), n.seq(n.element(n.string("fn:group"), n.seq(n.attribute(n.string("nr"), n.seq(n.integer(1))), n.string("(.)"))))));

                                                                    },

                                                                    function($) {

                                                                        return fn.tail(n.fetch($, "rest"));

                                                                    });

                                                            });

                                                    }))),

                                                n.put($, "lastseen", n.item(n.iff($, n.geq(n.fetch($, "no"), n.seq(n.decimal(2.06), n.decimal(2.09), n.decimal(20.01), n.decimal(20.04))),

                                                    function($) {

                                                        return n.put($, "lastseen", n.item(n.iff($, n.fetch($, "letclose"),

                                                                function($) {

                                                                    return fn.subsequence(n.fetch($, "lastseen"), n.integer(1), n.subtract(fn.count(n.fetch($, "lastseen")), n.fetch($, "letcloser")));

                                                                },

                                                                function($) {

                                                                    return n.fetch($, "lastseen");

                                                                }))),

                                                            n.put($, "lastseen", n.item(n.iff($, n.and(n.fetch($, "letclose"), n.eq(n.filter(n.fetch($, "lastseen"), function($_0) {
                                                                    return fn.last($_0);
                                                                }), n.decimal(2.10))),

                                                                function($) {

                                                                    return pop(n.fetch($, "lastseen"));

                                                                },

                                                                function($) {

                                                                    return n.fetch($, "lastseen");

                                                                }))),

                                                            (n.fetch($, "lastseen"), n.fetch($, "no"));

                                                    },

                                                    function($) {

                                                        return n.iff($, n.or(n.eq(n.fetch($, "no"), n.integer(26)), n.seq(n.and(n.eq(n.fetch($, "no"), n.decimal(2.10)), n.eq(n.filter(n.fetch($, "lastseen"), function($_0) {
                                                                return n.subtract(fn.last($_0), n.integer(1));
                                                            }), n.decimal(21.07))))),

                                                            function($) {

                                                                return n.fetch($, "lastseen");

                                                            },

                                                            function($) {

                                                                return n.iff($, n.geq(n.fetch($, "no"), n.decimal(20.07)),

                                                                    function($) {

                                                                        return n.put($, "lastseen", n.item(fn.subsequence(n.fetch($, "lastseen"), n.integer(1), n.subtract(lastIndexOf(n.fetch($, "lastseen"), n.decimal(20.06)), n.integer(1))))),

                                                                            n.iff($, n.and(n.eq(fn.round(n.filter(n.fetch($, "lastseen"), function($_0) {
                                                                                    return fn.last($_0);
                                                                                })), n.integer(21)), n.ne(n.fetch($, "next"), n.string("=#20#06="))),

                                                                                function($) {

                                                                                    return pop(n.fetch($, "lastseen"));

                                                                                },

                                                                                function($) {

                                                                                    return n.fetch($, "lastseen");

                                                                                });

                                                                    },

                                                                    function($) {

                                                                        return n.iff($, n.geq(n.fetch($, "no"), n.seq(n.decimal(2.07), n.decimal(2.10))),

                                                                            function($) {

                                                                                return n.put($, "lastseen", n.item(n.iff($, n.or(n.eq(n.fetch($, "llast"), n.decimal(2.11)), n.seq(n.and(n.eq(n.fetch($, "no"), n.decimal(2.07)), n.eq(n.fetch($, "llast"), n.decimal(0.01))))),

                                                                                        function($) {

                                                                                            return pop(n.fetch($, "lastseen"));

                                                                                        },

                                                                                        function($) {

                                                                                            return n.fetch($, "lastseen");

                                                                                        }))),

                                                                                    n.put($, "last", n.item(n.filter(fn.indexOf(n.fetch($, "lastseen"), n.subtract(n.fetch($, "no"), n.decimal(n.decimal(0.01)))), function($_0) {
                                                                                        return fn.last($_0);
                                                                                    }))),

                                                                                    n.seq(fn.remove(n.fetch($, "lastseen"), n.fetch($, "last")), n.fetch($, "no"));

                                                                            },

                                                                            function($) {

                                                                                return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.08)),

                                                                                    function($) {

                                                                                        return n.put($, "lastseen", n.item(fn.subsequence(n.fetch($, "lastseen"), n.integer(1), n.subtract(n.fetch($, "elsecloser"), n.integer(1))))),

                                                                                            (n.fetch($, "lastseen"), n.fetch($, "no"));

                                                                                    },

                                                                                    function($) {

                                                                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.11)),

                                                                                            function($) {

                                                                                                return n.put($, "lastseen", n.item(fn.subsequence(n.fetch($, "lastseen"), n.integer(1), n.subtract(n.fetch($, "retncloser"), n.integer(1))))),

                                                                                                    (n.fetch($, "lastseen"), n.fetch($, "no"));

                                                                                            },

                                                                                            function($) {

                                                                                                return n.iff($, n.and(n.and(n.eq(n.fetch($, "no"), n.decimal(20.06)), n.eq(n.fetch($, "llast"), n.decimal(21.07))), n.eq(n.fetch($, "next"), n.string("=#20#07="))),

                                                                                                    function($) {

                                                                                                        return pop(n.fetch($, "lastseen"));

                                                                                                    },

                                                                                                    function($) {

                                                                                                        return n.iff($, n.or(n.or(n.eq(n.fetch($, "no"), n.decimal(20.06)), n.eq(fn.round(n.fetch($, "no")), n.integer(21))), n.eq(n.fetch($, "no"), n.decimal(19.01))),

                                                                                                            function($) {

                                                                                                                return n.seq(n.fetch($, "lastseen"), n.fetch($, "no"));

                                                                                                            },

                                                                                                            function($) {

                                                                                                                return n.iff($, n.eq(n.fetch($, "no"), n.decimal(20.02)),

                                                                                                                    function($) {

                                                                                                                        return pop(n.fetch($, "lastseen"));

                                                                                                                    },

                                                                                                                    function($) {

                                                                                                                        return n.fetch($, "lastseen");

                                                                                                                    });

                                                                                                            });

                                                                                                    });

                                                                                            });

                                                                                    });

                                                                            });

                                                                    });

                                                            });

                                                    }))),

                                                body(n.fetch($, "rest"), n.fetch($, "ret"), n.fetch($, "lastseen"));

                                        });

                                });

                        });

                }))));
    });

}

export function isArray() {

    return n.initialize(arguments, [
        ["head", null, "item"],
        ["non", null, "item"],
        ["next", null, "item"]
    ], function($) {

        return n.stop($, n.item(n.and(n.and(n.eq(n.fetch($, "non"), n.decimal(20.01)), n.geq(fn.matches(n.fetch($, "head"), n.string("\\)\\s*$")), fn.false())), fn.matches(n.fetch($, "head"), n.concat(n.concat(n.string("^(\\s|\\(|,|"), operatorRegexp), n.string(")"))))));
    });

}

export function diff() {

    return n.initialize(arguments, [
        ["a", null, "item"],
        ["b", null, "item"]
    ], function($) {

        return (n.put($, "x", n.item(n.filter(n.fetch($, "b"), function($_0) {
                return fn.not(n.geq($_0, n.fetch($, "a")));
            }))),

            n.put($, "y", n.item(n.filter(n.fetch($, "a"), function($_0) {
                return fn.not(n.geq($_0, n.fetch($, "b")));
            }))),

            n.stop($, n.item(fn.concat(n.string("+"), fn.stringJoin(n.fetch($, "x"), n.string(",")), n.string(","), n.string("-"), fn.stringJoin(n.fetch($, "y"), n.string(","))))));
    });

}

export function parenCloser() {

    return n.initialize(arguments, [
        ["head", null, "item"],
        ["lastseen", null, "item"]
    ], function($) {

        return n.stop($, n.item(n.iff($, fn.matches(n.fetch($, "head"), n.string("[\\(\\)]+")),

            function($) {

                return n.put($, "cp", n.item(fn.stringToCodepoints(n.fetch($, "head")))),

                    n.put($, "old", n.item(n.fetch($, "lastseen"))),

                    n.put($, "lastseen", n.item(n.seq(n.fetch($, "lastseen"), n.forEach(n.filter(n.fetch($, "cp"), function($_0) {
                        return n.eq($_0, n.integer(40));
                    }), n.decimal(0.01))))),

                    n.put($, "lastseen", n.item(close(n.fetch($, "lastseen"), fn.count(n.filter(n.fetch($, "cp"), function($_0) {
                        return n.eq($_0, n.integer(41));
                    }))))),

                    n.fetch($, "lastseen");

            },

            function($) {

                return n.fetch($, "lastseen");

            })));
    });

}


export function body() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"],
        ["lastseen", n.seq(), "item"]
    ], function($) {

        return n.iff($, fn.empty(n.fetch($, "parts")),

            function($) {

                return n.stop($, n.item(fn.concat(n.fetch($, "ret"), fn.stringJoin(n.forEach(n.filter(n.fetch($, "lastseen"), function($_0) {
                    return n.geq($_0, n.seq(n.decimal(2.08), n.decimal(2.11), n.decimal(20.07)));
                }), n.string(")"))))));

            },

            function($) {

                return n.put($, "head", n.item(n.select(fn.head(n.fetch($, "parts")), function($_0) {
                        return fn.string($_0);
                    }))),

                    n.put($, "rest", n.item(fn.tail(n.fetch($, "parts")))),

                    n.put($, "lastseen", n.item(parenCloser(n.fetch($, "head"), n.fetch($, "lastseen")))),

                    n.iff($, n.geq(n.fetch($, "head"), n.string("=#25#01=")),

                        function($) {

                            return n.stop($, n.item(comment(n.fetch($, "rest"), n.fetch($, "ret"), n.fetch($, "lastseen"))));

                        },

                        function($) {

                            return n.iff($, fn.matches(n.fetch($, "head"), n.string(";")),

                                function($) {

                                    return n.stop($, n.item(block(n.fetch($, "parts"), n.iff($, n.eq(n.filter(n.fetch($, "lastseen"), function($_0) {
                                            return fn.last($_0);
                                        }), n.decimal(2.18)),

                                        function($) {

                                            return fn.concat(n.fetch($, "ret"), fn.replace(n.fetch($, "head"), n.string(";"), n.string("")), n.string(")"));

                                        },

                                        function($) {

                                            return n.fetch($, "ret");

                                        }))));

                                },

                                function($) {

                                    return n.put($, "next", n.item(n.iff($, fn.empty(n.fetch($, "rest")),

                                            function($) {

                                                return n.seq();

                                            },

                                            function($) {

                                                return n.select(fn.head(n.fetch($, "rest")), function($_0) {
                                                    return fn.string($_0);
                                                });

                                            }))),

                                        n.put($, "non", n.item(n.iff($, fn.matches(n.fetch($, "next"), operatorRegexp),

                                            function($) {

                                                return opNum(n.fetch($, "next"));

                                            },

                                            function($) {

                                                return n.integer(0);

                                            }))),

                                        n.put($, "rest", n.item(n.iff($, isArray(n.fetch($, "head"), n.fetch($, "non"), n.fetch($, "next")),

                                            function($) {

                                                return fn.insertBefore(fn.tail(n.fetch($, "rest")), n.integer(1), n.element(n.string("fn:match"), n.seq(n.element(n.string("fn:group"), n.seq(n.attribute(n.string("nr"), n.seq(n.integer(1))), opStr(n.decimal(20.04)))))));

                                            },

                                            function($) {

                                                return n.iff($, n.and(n.geq(n.fetch($, "head"), fns), fn.matches(n.fetch($, "next"), n.string("\\)"))),

                                                    function($) {

                                                        return fn.insertBefore(fn.tail(n.fetch($, "rest")), n.integer(1), n.element(n.string("fn:match"), n.seq(n.element(n.string("fn:group"), n.seq(n.attribute(n.string("nr"), n.seq(n.integer(1))), n.string("(.)"))))));

                                                    },

                                                    function($) {

                                                        return n.fetch($, "rest");

                                                    });

                                            }))),

                                        n.put($, "head", n.item(n.iff($, n.and(n.geq(n.fetch($, "ret"), n.string("")), n.eq(n.fetch($, "head"), n.string("=#20#01="))),

                                            function($) {

                                                return n.string("=#20#04=");

                                            },

                                            function($) {

                                                return n.fetch($, "head");

                                            }))),

                                        n.iff($, fn.matches(n.fetch($, "head"), operatorRegexp),

                                            function($) {

                                                return n.stop($, n.item(bodyOp(opNum(n.fetch($, "head")), n.fetch($, "next"), n.fetch($, "lastseen"), n.fetch($, "rest"), n.fetch($, "ret"))));

                                            },

                                            function($) {

                                                return n.cont($,n.fetch($, "rest"), fn.concat(n.fetch($, "ret"), n.fetch($, "head")), n.fetch($, "lastseen"));

                                            });

                                });

                        });

            });
    });

}

export function ximport() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return (n.put($, "rest", n.item(fn.subsequence(n.fetch($, "parts"), n.integer(6)))),

            n.put($, "maybeAt", n.item(n.select(fn.head(n.fetch($, "rest")), function($_0) {
                return fn.string($_0);
            }))),

            n.stop($, n.item(n.iff($, fn.matches(n.fetch($, "maybeAt"), n.string("at")),

                function($) {

                    return block(fn.subsequence(n.fetch($, "rest"), n.integer(3)), fn.concat(n.fetch($, "ret"), n.string("core:import($,"), n.select(n.filter(n.fetch($, "parts"), function($_0) {
                        return n.geq(fn.position($_0), n.integer(3));
                    }), function($_0) {
                        return fn.string($_0);
                    }), n.string(","), n.select(n.filter(n.fetch($, "parts"), function($_0) {
                        return n.geq(fn.position($_0), n.integer(5));
                    }), function($_0) {
                        return fn.string($_0);
                    }), n.string(","), n.select(n.filter(n.fetch($, "rest"), function($_0) {
                        return n.geq(fn.position($_0), n.integer(2));
                    }), function($_0) {
                        return fn.string($_0);
                    }), n.string(")")));

                },

                function($) {

                    return block(n.fetch($, "rest"), fn.concat(n.fetch($, "ret"), n.string("core:import($,"), n.select(n.filter(n.fetch($, "parts"), function($_0) {
                        return n.geq(fn.position($_0), n.integer(3));
                    }), function($_0) {
                        return fn.string($_0);
                    }), n.string(","), n.select(n.filter(n.fetch($, "parts"), function($_0) {
                        return n.geq(fn.position($_0), n.integer(5));
                    }), function($_0) {
                        return fn.string($_0);
                    }), n.string(")")));

                }))));
    });

}

export function block() {

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.iff($, fn.empty(n.fetch($, "parts")),

            function($) {

                return n.stop($, n.item(n.fetch($, "ret")));

            },

            function($) {

                return n.put($, "val", n.item(n.select(fn.head(n.fetch($, "parts")), function($_0) {
                        return fn.string($_0);
                    }))),

                    n.put($, "rest", n.item(fn.tail(n.fetch($, "parts")))),

                    n.iff($, fn.matches(n.fetch($, "val"), operatorRegexp),

                        function($) {

//                            return n.cont($,n.fetch($, "rest"), n.concat(n.fetch($, "ret"), n.string(opNum(n.fetch($, "val")))));
                            return  n.stop($,n.item(n.put($, "no", n.item(opNum(n.fetch($, "val")))),

                                n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.14)),

                                    function($) {

                                        return xversion(n.fetch($, "rest"), n.fetch($, "ret"));

                                    },

                                    function($) {

                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.16)),

                                            function($) {

                                                return xmodule(n.fetch($, "rest"), n.fetch($, "ret"));

                                            },

                                            function($) {

                                                return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.17)),

                                                    function($) {

                                                        return annot(n.fetch($, "rest"), n.fetch($, "ret"));

                                                    },

                                                    function($) {

                                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.19)),

                                                            function($) {

                                                                return ximport(n.fetch($, "rest"), n.fetch($, "ret"));

                                                            },

                                                            function($) {

                                                                return body(n.fetch($, "parts"), n.fetch($, "ret"));

                                                            });

                                                    });

                                            });

                                    })));

                        },

                        function($) {
                            //return n.cont($,n.fetch($, "rest"), n.concat(n.fetch($, "ret"), n.string(n.fetch($,"val"))));
                            return n.iff($, fn.matches(n.fetch($, "val"), n.string(";")),

                                function($) {

                                    return n.iff($, fn.empty(n.fetch($, "rest")),

                                        function($) {

                                            return n.stop($,n.item(n.fetch($, "ret")));

                                        },

                                        function($) {

                                            return n.cont($,n.fetch($, "rest"), n.concat(n.fetch($, "ret"), n.string(",")));

                                        });

                                },

                                function($) {

                                    //return n.cont($,n.fetch($, "rest"), n.concat(n.fetch($, "ret"), n.string(n.fetch($,"val"))));
                                    return  n.stop($,n.item(body(n.fetch($, "parts"), n.fetch($, "ret"))));

                                });

                        });

            });
    });

}

export function toOp() {

    return n.initialize(arguments, [
        ["opnum", null, "item"]
    ], function($) {

        return n.stop($, n.item(n.iff($, map.contains(operatorMap, n.fetch($, "opnum")),

            function($) {

                return n.concat(n.string("core:"), n.call(operatorMap, n.fetch($, "opnum")));

            },

            function($) {

                return n.concat(n.string("core:"), fn.replace(n.call(operators, n.fetch($, "opnum")), n.string(" "), n.string("-")));

            })));
    });

}

export function fromOp() {

    return n.initialize(arguments, [
        ["op", null, "item"]
    ], function($) {

        return (n.put($, "k", n.item(map.keys(operatorsI))),

            n.put($, "i", n.item(n.filter(fn.indexOf(n.fetch($, "k"), fn.replace(n.fetch($, "op"), n.string("^core:"), n.string(""))), function($_0) {
                return n.geq(fn.position($_0), n.integer(1));
            }))),

            n.stop($, n.item(n.decimal(n.call(operatorsI, n.filter(n.fetch($, "k"), function($_0) {
                return n.geq(fn.position($_0), n.fetch($, "i"));
            }))))));
    });

}

export function rename() {

    return n.initialize(arguments, [
        ["a", null, "item"],
        ["fn", null, "item"]
    ], function($) {

        return array.forEach(n.fetch($, "a"), function() {

            return n.initialize(arguments, [
                ["t", null, "item"]
            ], function($) {

                return n.stop($, n.item(n.iff($, n.instanceOf(n.fetch($, "t"), Map),

                    function($) {

                        return n.map(n.seq(n.array(n.seq(n.string("name"), n.call(n.fetch($, "fn"), n.call(n.fetch($, "t"), n.string("name"))))), n.array(n.seq(n.string("args"), rename(n.call(n.fetch($, "t"), n.string("args")), n.fetch($, "fn")))), n.array(n.seq(n.string("suffix"), n.call(n.fetch($, "t"), n.string("suffix"))))));

                    },

                    function($) {

                        return n.fetch($, "t");

                    })));
            });

        });
    });

}

export function escapeForRegex() {

    return n.initialize(arguments, [
        ["key", null, "item"]
    ], function($) {

        return (n.put($, "arg", n.item(n.call(operators, n.fetch($, "key")))),

            n.put($, "pre", n.item(n.string("(^|[\\s,\\(\\);\\[\\]]+)"))),

            n.stop($, n.string(n.iff($, fn.matches(n.fetch($, "arg"), n.string("\\p{L}+")),

                function($) {

                    return n.iff($, n.eq(n.fetch($, "key"), n.decimal(21.06)),

                        function($) {

                            return n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("([\\s")), ncname), n.string(":]*\\s*\\(([\\$")), ncname), n.string(":\\(\\),\\?\\+\\*\\s])*\\)\\s*(as\\s+[")), ncname), n.string(":\\(\\)]+)?\\s*(=#20#06=|\\{))"));

                        },

                        function($) {

                            return n.iff($, n.eq(fn.round(n.fetch($, "key")), n.integer(21)),

                                function($) {

                                    return n.concat(n.concat(n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("([\\s\\$")), ncname), n.string(",:]*=#20#06)"));

                                },

                                function($) {

                                    return n.iff($, n.or(n.eq(n.fetch($, "key"), n.decimal(2.04)), n.eq(fn.round(n.fetch($, "key")), n.integer(22))),

                                        function($) {

                                            return n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("(\\()"));

                                        },

                                        function($) {

                                            return n.iff($, n.eq(fn.round(n.fetch($, "key")), n.integer(24)),

                                                function($) {

                                                    return n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("(\\s)"));

                                                },

                                                function($) {

                                                    return n.iff($, n.geq(n.fetch($, "arg"), n.string("if")),

                                                        function($) {

                                                            return n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("(\\s?)"));

                                                        },

                                                        function($) {

                                                            return n.iff($, n.geq(n.fetch($, "arg"), n.string("then")),

                                                                function($) {

                                                                    return n.concat(n.concat(n.string("\\)(\\s*)"), n.fetch($, "arg")), n.string("(\\s?)"));

                                                                },

                                                                function($) {

                                                                    return n.concat(n.concat(n.string("(^|\\s)"), n.fetch($, "arg")), n.string("(\\s|$)"));

                                                                });

                                                        });

                                                });

                                        });

                                });

                        });

                },

                function($) {

                    return n.put($, "arg", n.item(fn.replace(n.fetch($, "arg"), n.string("(\\.|\\[|\\]|\\\\|\\||\\-|\\^|\\$|\\?|\\*|\\+|\\{|\\}|\\(|\\))"), n.string("\\\\$1")))),

                        n.iff($, n.eq(n.fetch($, "key"), n.integer(26)),

                            function($) {

                                return n.concat(n.concat(n.string("(\\s?)"), n.fetch($, "arg")), n.string("(\\s*[^\\p{L}])"));

                            },

                            function($) {

                                return n.iff($, n.eq(n.fetch($, "key"), n.decimal(2.10)),

                                    function($) {

                                        return n.string("(\\s?):\\s*=([^#])");

                                    },

                                    function($) {

                                        return n.iff($, n.geq(n.fetch($, "key"), n.seq(n.decimal(8.02), n.decimal(17.02))),

                                            function($) {

                                                return n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("([\\s\\p{N}])?"));

                                            },

                                            function($) {

                                                return n.iff($, n.geq(n.fetch($, "key"), n.seq(n.decimal(8.01), n.decimal(9.01), n.decimal(20.03))),

                                                    function($) {

                                                        return n.concat(n.concat(n.string("([^/])"), n.fetch($, "arg")), n.string("(\\s?[^,\\)])"));

                                                    },

                                                    function($) {

                                                        return n.concat(n.concat(n.string("(\\s?)"), n.fetch($, "arg")), n.string("(\\s?)"));

                                                    });

                                            });

                                    });

                            });

                }))));
    });

}

export function unaryOp() {

    return n.initialize(arguments, [
        ["op", null, "item"]
    ], function($) {

        return n.stop($, n.item(opStr(n.add(opNum(n.fetch($, "op")), n.integer(9)))));
    });

}

export function opInt() {

    return n.initialize(arguments, [
        ["op", null, "item"]
    ], function($) {

        return n.stop($, n.item(n.decimal(fn.replace(n.fetch($, "op"), n.string("^=#(\\p{N}+)#?\\p{N}*=$"), n.string("$1")))));
    });

}

export function opNum() {

    return n.initialize(arguments, [
        ["op", null, "item"]
    ], function($) {

        return n.stop($, n.decimal(n.decimal(fn.replace(n.fetch($, "op"), n.string("^=#(\\p{N}+)#?(\\p{N}*)=$"), n.string("$1.$2")))));
    });

}

export function opStr() {

    return n.initialize(arguments, [
        ["op", null, "item"]
    ], function($) {

        return n.stop($, n.item(fn.concat(n.string("=#"), fn.replace(fn.string(n.fetch($, "op")), n.string("\\."), n.string("#")), n.string("="))));
    });

}

export function operatorPrecedence() {

    return n.initialize(arguments, [
        ["val", null, "item"],
        ["operator", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return (n.put($, "rev", n.item(array.reverse(n.fetch($, "ret")))),

            n.put($, "last", n.item(array.head(n.fetch($, "rev")))),

            n.put($, "hasPrecedingOp", n.item(n.and(n.instanceOf(n.fetch($, "last"), Map), fn.matches(n.call(n.fetch($, "last"), n.string("name")), operatorRegexp)))),

            n.put($, "isUnaryOp", n.item(n.and(n.geq(opInt(n.fetch($, "operator")), n.integer(8)), n.seq(n.or(fn.empty(n.fetch($, "last")), n.seq(n.and(n.and(n.fetch($, "hasPrecedingOp"), n.instanceOf(n.call(n.fetch($, "last"), n.string("suffix")), n.boolean())), n.geq(n.call(n.fetch($, "last"), n.string("suffix")), fn.false())))))))),

            n.put($, "operator", n.item(n.iff($, n.fetch($, "isUnaryOp"),

                function($) {

                    return unaryOp(n.fetch($, "operator"));

                },

                function($) {

                    return n.fetch($, "operator");

                }))),

            n.put($, "preceeds", n.item(n.and(n.fetch($, "hasPrecedingOp"), n.ggt(opInt(n.fetch($, "operator")), opInt(n.call(n.fetch($, "last"), n.string("name"))))))),

            n.put($, "name", n.item(n.iff($, n.fetch($, "preceeds"),

                function($) {

                    return n.call(n.fetch($, "last"), n.string("name"));

                },

                function($) {

                    return n.fetch($, "operator");

                }))),

            n.put($, "args", n.item(n.iff($, n.fetch($, "preceeds"),

                function($) {

                    return n.put($, "n", n.item(console.log(n.seq(n.fetch($, "operator"), n.string(","), n.fetch($, "preceeds"))))),

                        n.put($, "argsize", n.item(array.size(n.call(n.fetch($, "last"), n.string("args"))))),

                        n.put($, "nargs", n.item(n.iff($, n.fetch($, "isUnaryOp"),

                            function($) {

                                return n.array(n.seq());

                            },

                            function($) {

                                return n.filter(n.call(n.fetch($, "last"), n.string("args")), n.seq(n.integer(2)));

                            }))),

                        n.put($, "nargs", n.item(n.iff($, n.fetch($, "val"),

                            function($) {

                                return array.append(n.fetch($, "nargs"), n.fetch($, "val"));

                            },

                            function($) {

                                return n.fetch($, "nargs");

                            }))),

                        n.iff($, n.and(n.ggt(n.fetch($, "argsize"), n.integer(1)), n.fetch($, "isUnaryOp")),

                            function($) {

                                return n.put($, "pre", n.item((n.call(n.fetch($, "last"), n.string("args"))(n.integer(2))))),

                                    n.array(n.seq(n.call(n.fetch($, "last"), n.string("args")), n.integer(1), n.map(n.seq(n.array(n.seq(n.string("name"), n.call(n.fetch($, "pre"), n.string("name")))), n.array(n.seq(n.string("args"), array.append(n.call(n.fetch($, "pre"), n.string("args")), n.map(n.seq(n.array(n.seq(n.string("name"), n.fetch($, "operator"))), n.array(n.seq(n.string("args"), n.fetch($, "nargs"))), n.array(n.seq(n.string("suffix"), n.string("")))))))), n.array(n.seq(n.string("suffix"), n.string("")))))));

                            },

                            function($) {

                                return n.array(n.seq(n.call(n.fetch($, "last"), n.string("args")), n.integer(1), n.map(n.seq(n.array(n.seq(n.string("name"), n.fetch($, "operator"))), n.array(n.seq(n.string("args"), n.fetch($, "nargs"))), n.array(n.seq(n.string("suffix"), n.string("")))))));

                            });

                },

                function($) {

                    return n.put($, "nargs", n.item(n.iff($, fn.empty(n.fetch($, "last")),

                            function($) {

                                return n.array(n.seq());

                            },

                            function($) {

                                return n.array(n.seq(n.fetch($, "last")));

                            }))),

                        n.iff($, n.fetch($, "val"),

                            function($) {

                                return array.append(n.fetch($, "nargs"), n.fetch($, "val"));

                            },

                            function($) {

                                return n.fetch($, "nargs");

                            });

                }))),

            n.stop($, n.item(array.append(array.reverse(array.tail(n.fetch($, "rev"))), n.map(n.seq(n.array(n.seq(n.string("name"), n.fetch($, "name"))), n.array(n.seq(n.string("args"), n.fetch($, "args"))), n.array(n.seq(n.string("suffix"), fn.exists(n.fetch($, "val"))))))))));
    });

}

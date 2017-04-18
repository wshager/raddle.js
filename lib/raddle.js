"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.operatorMap = exports.operators = exports.protocolRegexp = exports.parenRegexp = exports.chars = exports.ncname = exports.suffix = undefined;
exports.mapPut$3 = mapPut$3;
exports.parseStrings$3 = parseStrings$3;
exports.normalizeQuery$2 = normalizeQuery$2;
exports.processStrings$3 = processStrings$3;
exports.parse$1 = parse$1;
exports.parse$2 = parse$2;
exports.clipString$1 = clipString$1;
exports.valueFromStrings$2 = valueFromStrings$2;
exports.upsert$3 = upsert$3;
exports.wrapQname$1 = wrapQname$1;
exports.findContextItem$1 = findContextItem$1;
exports.wrap$3 = wrap$3;
exports.wrap$4 = wrap$4;
exports.wrap$5 = wrap$5;
exports.wrap$6 = wrap$6;
exports.importModule$2 = importModule$2;
exports.stringify$2 = stringify$2;
exports.stringify$3 = stringify$3;
exports.clip$1 = clip$1;
exports.camelCase$1 = camelCase$1;
exports.capitalize$1 = capitalize$1;
exports.processStrings = processStrings;
exports.findContextItem = findContextItem;
exports.camelCase = camelCase;
exports.parseStrings = parseStrings;
exports.normalizeQuery = normalizeQuery;
exports.wrap = wrap;
exports.stringify = stringify;
exports.capitalize = capitalize;
exports.clipString = clipString;
exports.upsert = upsert;
exports.clip = clip;
exports.parse = parse;
exports.importModule = importModule;
exports.wrapQname = wrapQname;
exports.valueFromStrings = valueFromStrings;
exports.mapPut = mapPut;

var _xqCompat = require("./xq-compat");

var xqc = _interopRequireWildcard(_xqCompat);

var _n = require("./n");

var n = _interopRequireWildcard(_n);

var _arrayUtil = require("./array-util");

var a = _interopRequireWildcard(_arrayUtil);

var _env = require("./env");

var env = _interopRequireWildcard(_env);

var _console = require("./console");

var console = _interopRequireWildcard(_console);

var _map = require("../node_modules/frink/lib/map");

var map = _interopRequireWildcard(_map);

var _array = require("../node_modules/frink/lib/array");

var array = _interopRequireWildcard(_array);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// mix in bools you shall!
const fn = {
    true: b => true,
    false: b => false
};
for (var k in n) fn[k] = n[k];

var $ = n.frame();

const suffix = exports.suffix = n.string("\\+\\*\\-\\?");

const ncname = exports.ncname = xqc.ncname;

const chars = exports.chars = n.concat(n.concat(suffix, ncname), n.string("\\$%/#@\\^:"));

const parenRegexp = exports.parenRegexp = fn.concat(n.string("(\\)["), suffix, n.string("]?)|("), xqc.operatorRegexp, n.string("|,)?(["), chars, n.string("]*)(\\(?)"));

const protocolRegexp = exports.protocolRegexp = n.string("^((http[s]?|ftp|xmldb|xmldb:exist|file):/)?/*(.*)$");

const operators = exports.operators = n.map(n.seq(n.pair(n.integer(3), n.string("|")), n.pair(n.integer(4), env.AMP), n.pair(n.decimal(5.01), n.string("=eq=")), n.pair(n.decimal(5.02), n.string("=ne=")), n.pair(n.decimal(5.03), n.string("=lt=")), n.pair(n.decimal(5.04), n.string("=le=")), n.pair(n.decimal(5.05), n.string("=gt=")), n.pair(n.decimal(5.06), n.string("=ge=")), n.pair(n.decimal(5.07), n.string("=")), n.pair(n.decimal(5.08), n.string("!=")), n.pair(n.decimal(5.09), n.string("=<==")), n.pair(n.decimal(5.10), n.string("=>==")), n.pair(n.decimal(5.11), n.string("=<<=")), n.pair(n.decimal(5.12), n.string("=>>=")), n.pair(n.decimal(5.13), n.string("=<=")), n.pair(n.decimal(5.14), n.string("=>=")), n.pair(n.integer(6), n.string("||")), n.pair(n.decimal(8.01), n.string("+")), n.pair(n.decimal(8.02), n.string("-")), n.pair(n.decimal(9.01), n.string("*")), n.pair(n.decimal(9.02), n.string("idiv")), n.pair(n.decimal(9.03), n.string("div")), n.pair(n.decimal(9.04), n.string("mod")), n.pair(n.decimal(17.01), n.string("+")), n.pair(n.decimal(17.02), n.string("-")), n.pair(n.integer(18), n.string("!")), n.pair(n.decimal(20.01), n.string("[")), n.pair(n.decimal(20.02), n.string("]")), n.pair(n.decimal(20.04), n.string("[")), n.pair(n.decimal(20.06), n.string("{")), n.pair(n.decimal(20.07), n.string("}")), n.pair(n.decimal(21.01), n.string("array")), n.pair(n.decimal(21.02), n.string("attribute")), n.pair(n.decimal(21.03), n.string("comment")), n.pair(n.decimal(21.04), n.string("document")), n.pair(n.decimal(21.05), n.string("element")), n.pair(n.decimal(21.06), n.string("function")), n.pair(n.decimal(21.07), n.string("map")), n.pair(n.decimal(21.08), n.string("namespace")), n.pair(n.decimal(21.09), n.string("processing-instruction")), n.pair(n.decimal(21.10), n.string("text")), n.pair(n.decimal(22.01), n.string("array")), n.pair(n.decimal(22.02), n.string("attribute")), n.pair(n.decimal(22.03), n.string("comment")), n.pair(n.decimal(22.04), n.string("document-node")), n.pair(n.decimal(22.05), n.string("element")), n.pair(n.decimal(22.06), n.string("empty-sequence")), n.pair(n.decimal(22.07), n.string("function")), n.pair(n.decimal(22.08), n.string("item")), n.pair(n.decimal(22.09), n.string("map")), n.pair(n.decimal(22.10), n.string("namespace-node")), n.pair(n.decimal(22.11), n.string("node")), n.pair(n.decimal(22.12), n.string("processing-instruction")), n.pair(n.decimal(22.13), n.string("schema-attribute")), n.pair(n.decimal(22.14), n.string("schema-element")), n.pair(n.decimal(22.15), n.string("text")), n.pair(n.decimal(25.01), n.string("(:")), n.pair(n.decimal(25.02), n.string(":)")), n.pair(n.integer(26), n.string(":"))));

const operatorMap = exports.operatorMap = n.map(n.seq(n.pair(n.integer(3), n.string("or")), n.pair(n.integer(4), n.string("and")), n.pair(n.decimal(5.01), n.string("eq")), n.pair(n.decimal(5.02), n.string("ne")), n.pair(n.decimal(5.03), n.string("lt")), n.pair(n.decimal(5.04), n.string("le")), n.pair(n.decimal(5.05), n.string("gt")), n.pair(n.decimal(5.06), n.string("ge")), n.pair(n.decimal(5.07), n.string("geq")), n.pair(n.decimal(5.08), n.string("gne")), n.pair(n.decimal(5.09), n.string("gle")), n.pair(n.decimal(5.10), n.string("gge")), n.pair(n.decimal(5.11), n.string("precedes")), n.pair(n.decimal(5.12), n.string("follows")), n.pair(n.decimal(5.13), n.string("glt")), n.pair(n.decimal(5.14), n.string("ggt")), n.pair(n.integer(6), n.string("concat")), n.pair(n.decimal(8.01), n.string("add")), n.pair(n.decimal(8.02), n.string("subtract")), n.pair(n.decimal(9.01), n.string("multiply")), n.pair(n.decimal(10.02), n.string("union")), n.pair(n.decimal(17.01), n.string("plus")), n.pair(n.decimal(17.02), n.string("minus")), n.pair(n.integer(18), n.string("for-each")), n.pair(n.decimal(19.01), n.string("select")), n.pair(n.decimal(20.01), n.string("filter")), n.pair(n.decimal(20.03), n.string("lookup")), n.pair(n.decimal(20.04), n.string("array")), n.pair(n.decimal(27.01), n.string("pair"))));

function mapPut$3(...$_a) {
    var $ = n.frame($_a).item("map").item("key").item("val");
    return map.new(n.seq($("map"), n.map(n.seq(n.pair($("key"), $("val"))))));
}

function parseStrings$3(...$_a) {
    var $ = n.frame($_a).item("strings").item("normalizer").item("params");
    $ = $("string", n.call($("strings"), n.string("$%0")));
    $ = $("string", n.call($("normalizer"), $("string"), $("params")));
    $ = $("parts", ($ => {
        if ($.test(fn.empty(fn.tail($("string"))))) {
            return fn.tokenize($("string"), n.string(";"));
        } else {
            return $("string");
        }
    })($.frame()));
    return array.join(fn.forEach($("parts"), function (...$_a) {
        $ = $.frame($_a).item("block");
        return wrap(n.select(fn.analyzeString($("block"), parenRegexp), n.string("fn:match")), $("strings"), $("params"));
    }));
}

function normalizeQuery$2(...$_a) {
    var $ = n.frame($_a).string("query", n.zeroOrOne).item("params");
    return fn.replace($("query"), n.string("\\s"), n.string(""));
}

function processStrings$3(...$_a) {
    var $ = n.frame($_a).item("strings").item("ret").item("index");
    return ($ => {
        if ($.test(fn.empty($("strings")))) {
            return $("ret");
        } else {
            $ = $("head", fn.head($("strings")));
            return ($ => {
                if ($.test(n.eq(fn.name($("head")), n.string("fn:match")))) {
                    $ = $("string", n.select($("head"), $_0 => fn.string($_0)));
                    $ = $("index", ($ => {
                        if ($.test(map.contains($("ret"), $("string")))) {
                            return $("index");
                        } else {
                            return n.add($("index"), n.integer(1));
                        }
                    })($.frame()));
                    $ = $("key", n.concat(n.string("$%"), $("index")));
                    $ = $("ret", map.put($("ret"), $("key"), fn.concat(env.QUOT, clipString($("string")), env.QUOT)));
                    $ = $("ret", map.put($("ret"), n.string("$%0"), fn.concat(n.call($("ret"), n.string("$%0")), $("key"))));
                    return processStrings(fn.tail($("strings")), $("ret"), $("index"));
                } else {
                    $ = $("ret", map.put($("ret"), n.string("$%0"), fn.concat(n.call($("ret"), n.string("$%0")), n.select($("head"), $_0 => fn.string($_0)))));
                    return processStrings(fn.tail($("strings")), $("ret"), $("index"));
                }
            })($.frame());
        }
    })($.frame());
}

function parse$1(...$_a) {
    var $ = n.frame($_a).string("query", n.zeroOrOne);
    return parse($("query"), n.map(n.seq()));
}

function parse$2(...$_a) {
    var $ = n.frame($_a).string("query", n.zeroOrOne).item("params");
    $ = $("params", ($ => {
        if ($.test(fn.matches($("query"), n.string("^\\s*xquery\\s+version")))) {
            return map.put($("params"), n.string("$compat"), n.string("xquery"));
        } else {
            return $("params");
        }
    })($.frame()));
    $ = $("strings", processStrings(n.select(fn.analyzeString($("query"), fn.concat(n.string("('[^']*')|("), env.QUOT, n.string("[^"), env.QUOT, n.string("]*"), env.QUOT, n.string(")"))), n.string("*")), n.map(n.seq(n.pair(n.string("$%0"), n.string("")))), n.integer(1)));
    $ = $("params", ($ => {
        if ($.test(n.eq(n.call($("params"), n.string("$compat")), n.string("xquery")))) {
            return map.put(map.put($("params"), n.string("$operators"), xqc.operators), n.string("$operator-map"), xqc.operatorMap);
        } else {
            return ($ => {
                if ($.test(n.eq(n.call($("params"), n.string("$compat")), n.string("rql")))) {
                    return map.put(map.put($("params"), n.string("$operators"), operators), n.string("$operator-map"), operatorMap);
                } else {
                    return $("params");
                }
            })($.frame());
        }
    })($.frame()));
    return parseStrings($("strings"), ($ => {
        if ($.test(n.eq(n.call($("params"), n.string("$compat")), n.string("")))) {
            return normalizeQuery;
        } else {
            return xqc.normalizeQuery;
        }
    })($.frame()), $("params"));
}

function clipString$1(...$_a) {
    var $ = n.frame($_a).string("str");
    return fn.substring($("str"), n.integer(2), n.subtract(fn.stringLength($("str")), n.integer(2)));
}

function valueFromStrings$2(...$_a) {
    var $ = n.frame($_a).string("val", n.zeroOrOne).item("strings");
    return ($ => {
        if ($.test($("val"))) {
            return ($ => {
                if ($.test(fn.matches($("val"), n.string("\\$%[0-9]+")))) {
                    return n.call($("strings"), $("val"));
                } else {
                    return $("val");
                }
            })($.frame());
        } else {
            return n.string("");
        }
    })($.frame());
}

function upsert$3(...$_a) {
    var $ = n.frame($_a).item("ret").item("index").item("val");
    var v = $("val");
    return ($ => {
        if ($.test(n.lt(array.size($("ret")), $("index")))) {
            return array.append($("ret"), n.array(n.seq($("val"))));
        } else {
            return a.put($("ret"), $("index"), array.append(n.call($("ret"), $("index")), $("val")));
        }
    })($.frame());
}

function wrapQname$1(...$_a) {
    var $ = n.frame($_a).item("args");
    return ($ => {
        if ($.test(n.instanceOf($("args"), n.map()))) {
            return n.map(n.seq(n.pair(n.string("name"), n.call($("args"), n.string("name"))), n.pair(n.string("args"), array.forEach(n.call($("args"), n.string("args")), function (...$_a) {
                $ = $.frame($_a).item("arg");
                return ($ => {
                    if ($.test($.test(n.instanceOf($("arg"), n.string())) && $.test(fn.matches($("arg"), xqc.qname)))) {
                        return n.map(n.seq(n.pair(n.string("name"), n.string("core:select")), n.pair(n.string("args"), n.array(n.seq(n.string("."), $("arg")))), n.pair(n.string("suffix"), n.string(""))));
                    } else {
                        return wrapQname($("arg"));
                    }
                })($.frame());
            })), n.pair(n.string("suffix"), n.string(""))));
        } else {
            return ($ => {
                if ($.test(n.instanceOf($("args"), n.array(n.item())))) {
                    return array.forEach($("args"), function (...$_a) {
                        $ = $.frame($_a).item("arg");
                        return ($ => {
                            if ($.test($.test(n.instanceOf($("arg"), n.string())) && $.test(fn.matches($("arg"), xqc.qname)))) {
                                return n.map(n.seq(n.pair(n.string("name"), n.string("core:select")), n.pair(n.string("args"), n.array(n.seq(n.string("."), $("arg")))), n.pair(n.string("suffix"), n.string(""))));
                            } else {
                                return wrapQname($("arg"));
                            }
                        })($.frame());
                    });
                } else {
                    return $("args");
                }
            })($.frame());
        }
    })($.frame());
}

function findContextItem$1(...$_a) {
    var $ = n.frame($_a).item("value");
    return ($ => {
        if ($.test(n.eq(array.size($("value")), n.integer(0)))) {
            return n.seq();
        } else {
            $ = $("cx", array.filter($("value"), function (...$_a) {
                $ = $.frame($_a).item("_");
                return $.test(n.instanceOf($("_"), n.string())) && $.test(fn.matches($("_"), n.string("^\\.$")));
            }));
            return ($ => {
                if ($.test(n.gt(array.size($("cx")), n.integer(0)))) {
                    return array.flatten($("cx"));
                } else {
                    return array.flatten(a.forEachAt($("value"), function (...$_a) {
                        $ = $.frame($_a).item("_").item("at");
                        return ($ => {
                            if ($.test(n.instanceOf($("_"), n.map()))) {
                                return ($ => {
                                    if ($.test(n.geq(n.call($("_"), n.string("name")), n.seq(n.string(""), n.string("last"), n.string("fn:last"))))) {
                                        return n.seq();
                                    } else {
                                        return ($ => {
                                            if ($.test(n.eq(n.call($("_"), n.string("name")), n.string("core:filter")))) {
                                                return findContextItem(n.array(n.seq(n.call(n.call($("_"), n.string("args")), n.integer(1)))));
                                            } else {
                                                return findContextItem(n.call($("_"), n.string("args")));
                                            }
                                        })($.frame());
                                    }
                                })($.frame());
                            } else {
                                return n.seq();
                            }
                        })($.frame());
                    }));
                }
            })($.frame());
        }
    })($.frame());
}

function wrap$3(...$_a) {
    var $ = n.frame($_a).item("match").item("strings").item("params");
    return wrap($("match"), $("strings"), $("params"), n.array(n.seq()));
}

function wrap$4(...$_a) {
    var $ = n.frame($_a).item("match").item("strings").item("params").item("ret");
    return wrap($("match"), $("strings"), $("params"), $("ret"), n.integer(1));
}

function wrap$5(...$_a) {
    var $ = n.frame($_a).item("match").item("strings").item("params").item("ret").item("depth");
    return wrap($("match"), $("strings"), $("params"), $("ret"), $("depth"), fn.false());
}

function wrap$6(...$_a) {
    var $ = n.frame($_a).item("match").item("strings").item("params").item("ret").item("depth").item("wasComma");
    return ($ => {
        if ($.test(fn.empty($("match")))) {
            return n.call($("ret"), n.integer(1));
        } else {
            $ = $("group", n.select(fn.head($("match")), n.string("fn:group")));
            $ = $("rest", fn.tail($("match")));
            $ = $("separator", n.select(n.filter($("group"), $_0 => n.geq(n.select($_0, n.string("@nr")), n.integer(2))), $_0 => fn.string($_0)));
            $ = $("value", valueFromStrings(n.select(n.filter($("group"), $_0 => n.geq(n.select($_0, n.string("@nr")), n.integer(3))), $_0 => fn.string($_0)), $("strings")));
            $ = $("isComma", fn.matches($("separator"), n.string(",")));
            $ = $("isOp", $.test(n.geq($("isComma"), fn.false())) && $.test(fn.matches($("separator"), n.concat(xqc.operatorRegexp, n.string("+")))));
            $ = $("op", ($ => {
                if ($.test($("isOp"))) {
                    return xqc.opNum($("separator"));
                } else {
                    return n.seq();
                }
            })($.frame()));

            return ($ => {
                if ($.test(n.geq(n.select($("group"), n.string("@nr")), n.integer(4)))) {
                    $ = $("ret", ($ => {
                        if ($.test($("isComma"))) {
                            return upsert($("ret"), $("depth"), n.map(n.seq(n.pair(n.string("name"), $("value")), n.pair(n.string("args"), n.array(n.seq())), n.pair(n.string("suffix"), n.string("")))));
                        } else {
                            return ($ => {
                                if ($.test($("isOp"))) {
                                    $ = $("operator", xqc.toOp($("op"), $("params")));
                                    $ = $("dest", ($ => {
                                        if ($.test(n.lt(array.size($("ret")), $("depth")))) {
                                            return n.array(n.seq());
                                        } else {
                                            return n.call($("ret"), $("depth"));
                                        }
                                    })($.frame()));
                                    $ = $("len", array.size($("dest")));
                                    $ = $("last", ($ => {
                                        if ($.test(n.gt($("len"), n.integer(0)))) {
                                            return n.call($("dest"), $("len"));
                                        } else {
                                            return n.seq();
                                        }
                                    })($.frame()));
                                    $ = $("filter", n.eq($("op"), n.decimal(20.01)));
                                    $ = $("filterContext", ($ => {
                                        if ($.test($.test($("filter")) && $.test(n.gt($("depth"), n.integer(1))))) {
                                            $ = $("prev", n.call($("ret"), n.subtract($("depth"), n.integer(1))));
                                            $ = $("s", array.size($("prev")));
                                            return n.call($("prev"), $("s"));
                                        } else {
                                            return n.seq();
                                        }
                                    })($.frame()));
                                    $ = $("selectFilter", $.test(n.instanceOf($("filterContext"), n.map())) && $.test(n.eq(n.call($("filterContext"), n.string("op")), n.decimal(19.01))));
                                    return ($ => {
                                        if ($.test($.test(n.geq($("op"), xqc.lrOp)) || $.test(n.seq($.test($("filter")) && $.test(n.eq($("selectFilter"), fn.false())))))) {
                                            $ = $("args", ($ => {
                                                if ($.test($.test(n.geq($("op"), n.seq(n.decimal(19.01), n.decimal(20.01)))) && $.test(n.eq($("value"), n.string(""))))) {
                                                    return n.array(n.seq());
                                                } else {
                                                    return n.array(n.seq(n.map(n.seq(n.pair(n.string("name"), $("value")), n.pair(n.string("args"), n.array(n.seq())), n.pair(n.string("suffix"), n.string(""))))));
                                                }
                                            })($.frame()));
                                            $ = $("prevOp", ($ => {
                                                if ($.test($.test(n.instanceOf($("last"), n.map())) && $.test(map.contains($("last"), n.string("op"))))) {
                                                    return n.call($("last"), n.string("op"));
                                                } else {
                                                    return n.seq();
                                                }
                                            })($.frame()));
                                            $ = $("hasPrecedingOp", $.test(fn.exists($("prevOp"))) && $.test(n.geq($("prevOp"), xqc.lrOp)));
                                            $ = $("isUnaryOp", ($ => {
                                                if ($.test(n.geq(fn.round($("op")), n.seq(n.integer(8), n.integer(17))))) {
                                                    return $.test($("wasComma")) || $.test($("hasPrecedingOp"));
                                                } else {
                                                    return fn.false();
                                                }
                                            })($.frame()));
                                            $ = $("preceeds", $.test($("hasPrecedingOp")) && $.test(n.gt(fn.round($("op")), fn.round($("prevOp")))));
                                            return ($ => {
                                                if ($.test($("isUnaryOp"))) {
                                                    $ = $("operator", xqc.toOp(xqc.unaryOp($("op")), $("params")));
                                                    $ = $("dest", ($ => {
                                                        if ($.test($.test($("preceeds")) && $.test(n.lt(array.size(n.call($("last"), n.string("args"))), n.integer(2))))) {
                                                            return a.put($("dest"), $("len"), map.put($("last"), n.string("args"), n.array(n.seq(n.call(n.call($("last"), n.string("args")), n.integer(1)), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op")), n.pair(n.string("nest"), n.ne($("value"), n.string("")))))))));
                                                        } else {
                                                            return array.append($("dest"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op")), n.pair(n.string("nest"), n.ne($("value"), n.string(""))))));
                                                        }
                                                    })($.frame()));
                                                    return a.put($("ret"), $("depth"), $("dest"));
                                                } else {
                                                    return ($ => {
                                                        if ($.test($("preceeds"))) {
                                                            $ = $("args", array.insertBefore($("args"), n.integer(1), n.call(n.call($("last"), n.string("args")), n.integer(2))));
                                                            $ = $("dest", a.put($("dest"), $("len"), map.new(n.seq($("last"), n.map(n.seq(n.pair(n.string("args"), n.array(n.seq(n.call(n.call($("last"), n.string("args")), n.integer(1)), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op"))))))), n.pair(n.string("nest"), fn.true())))))));
                                                            return a.put($("ret"), $("depth"), $("dest"));
                                                        } else {
                                                            $ = $("args", array.insertBefore($("args"), n.integer(1), $("last")));
                                                            $ = $("dest", a.put($("dest"), $("len"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op")), n.pair(n.string("nest"), n.ne($("value"), n.string("")))))));
                                                            return a.put($("ret"), $("depth"), $("dest"));
                                                        }
                                                    })($.frame());
                                                }
                                            })($.frame());
                                        } else {
                                            return ($ => {
                                                if ($.test(n.ne($("value"), n.string("")))) {
                                                    $ = $("args", n.array(n.seq($("last"), n.map(n.seq(n.pair(n.string("name"), $("value")), n.pair(n.string("args"), n.array(n.seq())), n.pair(n.string("suffix"), n.string("")))))));
                                                    $ = $("dest", a.put($("dest"), $("len"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op")), n.pair(n.string("nest"), n.ne($("value"), n.string("")))))));
                                                    return a.put($("ret"), $("depth"), $("dest"));
                                                } else {
                                                    return upsert($("ret"), $("depth"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), n.array(n.seq())), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op")))));
                                                }
                                            })($.frame());
                                        }
                                    })($.frame());
                                } else {
                                    return upsert($("ret"), $("depth"), n.map(n.seq(
                                        n.pair(n.string("name"), $("value")),
                                        n.pair(n.string("args"), n.array(n.seq())),
                                        n.pair(n.string("suffix"), n.string("")),
                                        n.pair(n.string("call"), $.test(n.ge(array.size($("ret")), $("depth"))) && $.test(n.eq($("value"), n.string(""))))
                                    )));
                                }
                            })($.frame());
                        }
                    })($.frame()));
                    return wrap($("rest"), $("strings"), $("params"), $("ret"), n.add($("depth"), n.integer(1)), $.test($("isComma")) && $.test(n.eq($("value"), n.string(""))));
                } else {
                    return ($ => {
                        if ($.test($.test($.test($("value")) || $.test($("isComma"))) || $.test($("isOp")))) {
                            $ = $("ret", ($ => {
                                if ($.test($("isOp"))) {
                                    return ($ => {
                                        if ($.test(n.lt(array.size($("ret")), $("depth")))) {
                                            $ = $("op", xqc.unaryOp($("op")));

                                            $ = $("args", ($ => {
                                                if ($.test(n.ne($("value"), n.string("")))) {
                                                    return n.array(n.seq($("value")));
                                                } else {
                                                    return n.array(n.seq());
                                                }
                                            })($.frame()));
                                            $ = $("operator", xqc.toOp($("op"), $("params")));
                                            return array.append($("ret"), n.array(n.seq(n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op")))))));
                                        } else {

                                            $ = $("dest", n.call($("ret"), $("depth")));
                                            $ = $("len", array.size($("dest")));
                                            $ = $("last", n.call($("dest"), $("len")));
                                            $ = $("prevOp", ($ => {
                                                if ($.test($.test(n.instanceOf($("last"), n.map())) && $.test(map.contains($("last"), n.string("op"))))) {
                                                    return n.call($("last"), n.string("op"));
                                                } else {
                                                    return n.seq();
                                                }
                                            })($.frame()));
                                            $ = $("hasPrecedingOp", $.test(fn.exists($("prevOp"))) && $.test(n.geq($("prevOp"), xqc.lrOp)));
                                            $ = $("isUnaryOp", ($ => {
                                                if ($.test(n.geq(fn.round($("op")), n.seq(n.integer(8), n.integer(17))))) {
                                                    return $.test($("wasComma")) || $.test($("hasPrecedingOp"));
                                                } else {
                                                    return fn.false();
                                                }
                                            })($.frame()));
                                            $ = $("preceeds", $.test($("hasPrecedingOp")) && $.test(n.gt(fn.round($("op")), fn.round($("prevOp")))));
                                            $ = $("op", ($ => {
                                                if ($.test($("isUnaryOp"))) {
                                                    return xqc.unaryOp($("op"));
                                                } else {
                                                    return $("op");
                                                }
                                            })($.frame()));
                                            $ = $("operator", xqc.toOp($("op"), $("params")));
                                            $ = $("dest", ($ => {
                                                if ($.test($("isUnaryOp"))) {
                                                    $ = $("args", ($ => {
                                                        if ($.test(n.ne($("value"), n.string("")))) {
                                                            return n.array(n.seq($("value")));
                                                        } else {
                                                            return n.array(n.seq());
                                                        }
                                                    })($.frame()));
                                                    return ($ => {
                                                        if ($.test($.test($("preceeds")) && $.test(n.lt(array.size(n.call($("last"), n.string("args"))), n.integer(2))))) {
                                                            return a.put($("dest"), $("len"), map.put($("last"), n.string("args"), n.array(n.seq(n.call(n.call($("last"), n.string("args")), n.integer(1)), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op"))))))));
                                                        } else {
                                                            return array.append($("dest"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op")))));
                                                        }
                                                    })($.frame());
                                                } else {
                                                    return ($ => {
                                                        if ($.test($("preceeds"))) {
                                                            $ = $("args", n.array(n.seq(n.call(n.call($("last"), n.string("args")), n.integer(2)))));
                                                            $ = $("args", ($ => {
                                                                if ($.test(n.ne($("value"), n.string("")))) {
                                                                    return array.append($("args"), $("value"));
                                                                } else {
                                                                    return $("args");
                                                                }
                                                            })($.frame()));
                                                            $ = $("next", map.put($("last"), n.string("args"), n.array(n.seq(n.call(n.call($("last"), n.string("args")), n.integer(1)), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op"))))))));
                                                            return a.put($("dest"), $("len"), $("next"));
                                                        } else {
                                                            $ = $("args", ($ => {
                                                                if ($.test(n.ne($("value"), n.string("")))) {
                                                                    return n.array(n.seq($("last"), $("value")));
                                                                } else {
                                                                    return n.array(n.seq($("last")));
                                                                }
                                                            })($.frame()));
                                                            return a.put($("dest"), $("len"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op")))));
                                                        }
                                                    })($.frame());
                                                }
                                            })($.frame()));
                                            return a.put($("ret"), $("depth"), $("dest"));
                                        }
                                    })($.frame());
                                } else {
                                    return ($ => {
                                        if ($.test(n.ne($("value"), n.string("")))) {
                                            return upsert($("ret"), $("depth"), $("value"));
                                        } else {
                                            return $("ret");
                                        }
                                    })($.frame());
                                }
                            })($.frame()));
                            return wrap($("rest"), $("strings"), $("params"), $("ret"), $("depth"), $.test($("isComma")) && $.test(n.eq($("value"), n.string(""))));
                        } else {
                            return ($ => {
                                if ($.test(n.geq(n.select($("group"), n.string("@nr")), n.integer(1)))) {
                                    return ($ => {
                                        if ($.test($.test(n.lt(array.size($("ret")), $("depth"))) || $.test(n.lt($("depth"), n.integer(2))))) {
                                            $ = $("suffix", fn.replace(n.select($("group"), $_0 => fn.string($_0)), n.string("\\)"), n.string("")));
                                            $ = $("ret", ($ => {
                                                if ($.test(n.ne($("suffix"), n.string("")))) {
                                                    $ = $("dest", n.call($("ret"), n.subtract($("depth"), n.integer(1))));
                                                    $ = $("len", array.size($("dest")));
                                                    $ = $("last", map.put(n.call($("dest"), $("len")), n.string("suffix"), $("suffix")));
                                                    $ = $("dest", a.put($("dest"), $("len"), $("last")));
                                                    return a.put($("ret"), n.subtract($("depth"), n.integer(1)), $("dest"));
                                                } else {
                                                    return $("ret");
                                                }
                                            })($.frame()));
                                            return wrap($("rest"), $("strings"), $("params"), $("ret"), n.subtract($("depth"), n.integer(1)));
                                        } else {
                                            $ = $("args", n.call($("ret"), $("depth")));
                                            $ = $("dest", n.call($("ret"), n.subtract($("depth"), n.integer(1))));
                                            $ = $("len", array.size($("dest")));
                                            $ = $("last", n.call($("dest"), $("len")));
                                            $ = $("s", array.size(n.call($("last"), n.string("args"))));
                                            $ = $("next", ($ => {
                                                if ($.test(n.gt($("s"), n.integer(0)))) {
                                                    return n.call(n.call($("last"), n.string("args")), $("s"));
                                                } else {
                                                    return n.seq();
                                                }
                                            })($.frame()));
                                            $ = $("nest", $.test(n.instanceOf($("next"), n.map())) && $.test(n.seq($.test(n.call($("last"), n.string("nest"))) || $.test(n.eq(n.call($("next"), n.string("name")), n.string(""))))));
                                            $ = $("op", ($ => {
                                                if ($.test($("nest"))) {
                                                    return n.call($("next"), n.string("op"));
                                                } else {
                                                    return ($ => {
                                                        if ($.test(n.instanceOf($("last"), n.map()))) {
                                                            return n.call($("last"), n.string("op"));
                                                        } else {
                                                            return n.seq();
                                                        }
                                                    })($.frame());
                                                }
                                            })($.frame()));

                                            $ = $("args", ($ => {
                                                if ($.test($("nest"))) {
                                                    $ = $("ns", array.size(n.call($("next"), n.string("args"))));
                                                    $ = $("maybeseq", ($ => {
                                                        if ($.test(n.gt($("ns"), n.integer(0)))) {
                                                            return n.call(n.call($("next"), n.string("args")), $("ns"));
                                                        } else {
                                                            return n.seq();
                                                        }
                                                    })($.frame()));
                                                    $ = $("isSeq", $.test($.test(n.instanceOf($("maybeseq"), n.map())) && $.test(n.ne($("op"), n.decimal(19.01)))) && $.test(n.eq(map.contains($("maybeseq"), n.string("op")), fn.false())));
                                                    return ($ => {
                                                        if ($.test($("isSeq"))) {
                                                            return a.put(n.call($("next"), n.string("args")), $("ns"), map.put($("maybeseq"), n.string("args"), array.join(n.seq(n.call($("maybeseq"), n.string("args")), $("args")))));
                                                        } else {
                                                            return array.join(n.seq(n.call($("next"), n.string("args")), $("args")));
                                                        }
                                                    })($.frame());
                                                } else {
                                                    return array.join(n.seq(n.call($("last"), n.string("args")), $("args")));
                                                }
                                            })($.frame()));

                                            $ = $("args", ($ => {
                                                if ($.test(n.eq($("op"), n.decimal(19.01)))) {
                                                    return array.forEach($("args"), function (...$_a) {
                                                        $ = $.frame($_a).item("_");
                                                        return ($ => {
                                                            if ($.test(n.instanceOf($("_"), n.map()))) {
                                                                return ($ => {
                                                                    if ($.test(n.eq(n.call($("_"), n.string("name")), n.string("")))) {
                                                                        return $("_");
                                                                    } else {
                                                                        return ($ => {
                                                                            if ($.test(n.geq(findContextItem(n.array(n.seq($("_")))), n.string(".")))) {
                                                                                return n.map(n.seq(n.pair(n.string("name"), n.string("")), n.pair(n.string("args"), n.array(n.seq($("_")))), n.pair(n.string("suffix"), n.string(""))));
                                                                            } else {
                                                                                return $("_");
                                                                            }
                                                                        })($.frame());
                                                                    }
                                                                })($.frame());
                                                            } else {
                                                                return $("_");
                                                            }
                                                        })($.frame());
                                                    });
                                                } else {
                                                    return ($ => {
                                                        if ($.test(n.eq($("op"), n.decimal(20.01)))) {
                                                            $ = $("isImplicit", n.eq(array.size($("args")), n.integer(1)));
                                                            $ = $("first", ($ => {
                                                                if ($.test($("isImplicit"))) {
                                                                    return n.string(".");
                                                                } else {
                                                                    $ = $("first", n.call($("args"), n.integer(1)));
                                                                    return ($ => {
                                                                        if ($.test(n.geq(findContextItem(n.array(n.seq($("first")))), n.string(".")))) {
                                                                            return $("first");
                                                                        } else {
                                                                            return n.call(wrapQname(n.array(n.seq($("first")))), n.integer(1));
                                                                        }
                                                                    })($.frame());
                                                                }
                                                            })($.frame()));
                                                            $ = $("second", ($ => {
                                                                if ($.test($("isImplicit"))) {
                                                                    return n.call($("args"), n.integer(1));
                                                                } else {
                                                                    return n.call($("args"), n.integer(2));
                                                                }
                                                            })($.frame()));
                                                            $ = $("second", ($ => {
                                                                if ($.test(n.geq(findContextItem(n.array(n.seq($("second")))), n.string(".")))) {
                                                                    return $("second");
                                                                } else {
                                                                    return n.call(wrapQname(n.array(n.seq($("second")))), n.integer(1));
                                                                }
                                                            })($.frame()));
                                                            $ = $("second", ($ => {
                                                                if ($.test(n.geq(findContextItem(n.array(n.seq($("second")))), n.string(".")))) {
                                                                    return $("second");
                                                                } else {
                                                                    return n.map(n.seq(n.pair(n.string("name"), n.string("core:geq")), n.pair(n.string("args"), n.array(n.seq(n.map(n.seq(n.pair(n.string("name"), n.string("position")), n.pair(n.string("args"), n.array(n.seq(n.string(".")))), n.pair(n.string("suffix"), n.string("")))), $("second")))), n.pair(n.string("suffix"), n.string(""))));
                                                                }
                                                            })($.frame()));
                                                            $ = $("second", n.map(n.seq(n.pair(n.string("name"), n.string("")), n.pair(n.string("args"), n.array(n.seq($("second")))), n.pair(n.string("suffix"), n.string("")))));
                                                            return n.array(n.seq($("first"), $("second")));
                                                        } else {
                                                            return $("args");
                                                        }
                                                    })($.frame());
                                                }
                                            })($.frame()));
                                            $ = $("dest", ($ => {
                                                if ($.test($("nest"))) {
                                                    $ = $("val", n.map(n.seq(n.pair(n.string("name"), n.call($("next"), n.string("name"))), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")))));
                                                    return a.put($("dest"), $("len"), n.map(n.seq(n.pair(n.string("name"), n.call($("last"), n.string("name"))), n.pair(n.string("args"), a.put(n.call($("last"), n.string("args")), $("s"), $("val"))), n.pair(n.string("suffix"), fn.replace(n.select($("group"), $_0 => fn.string($_0)), n.string("\\)"), n.string(""))), n.pair(n.string("op"), n.call($("last"), n.string("op"))), n.pair(n.string("nest"), n.call($("last"), n.string("nest"))))));
                                                } else {
                                                    $ = $("val", n.map(n.seq(
                                                        n.pair(n.string("name"), n.call($("last"), n.string("name"))),
                                                        n.pair(n.string("args"), $("args")),
                                                        n.pair(n.string("suffix"), fn.replace(n.select($("group"), $_0 => fn.string($_0)), n.string("\\)"), n.string(""))),
                                                        n.pair(n.string("call"), n.call($("last"), n.string("call"))))));
                                                    return a.put($("dest"), $("len"), $("val"));
                                                }
                                            })($.frame()));
                                            return wrap($("rest"), $("strings"), $("params"), array.append(array.subarray($("ret"), n.integer(1), n.subtract($("depth"), n.integer(2))), $("dest")), n.subtract($("depth"), n.integer(1)));
                                        }
                                    })($.frame());
                                } else {
                                    return n.call($("ret"), n.integer(1));
                                }
                            })($.frame());
                        }
                    })($.frame());
                }
            })($.frame());
        }
    })($.frame());
}

function importModule$2(...$_a) {
    var $ = n.frame($_a).item("name").item("params");
    $ = $("mappath", ($ => {
        if ($.test(map.contains($("params"), n.string("modules")))) {
            return n.call($("params"), n.string("modules"));
        } else {
            return n.string("modules.xml");
        }
    })($.frame()));
    $ = $("map", n.select(n.select(fn.doc($("mappath")), n.string("root")), n.string("module")));
    $ = $("location", n.anyURI(n.select(n.filter($("map"), $_0 => n.geq(n.select($_0, n.string("@name")), $("name"))), n.string("@location"))));
    $ = $("uri", n.anyURI(n.select(n.filter($("map"), $_0 => n.geq(n.select($_0, n.string("@name")), $("name"))), n.string("@uri"))));
    $ = $("module", ($ => {
        if ($.test($("location"))) {
            return inspect.inspectModule($("location"));
        } else {
            return inspect.inspectModuleUri($("uri"));
        }
    })($.frame()));
    return n.try(util.importModule(n.anyURI(n.select($("module"), n.string("@uri"))), n.select($("module"), n.string("@prefix")), n.anyURI(n.select($("module"), n.string("@location")))), n.seq());
}

function stringify$2(...$_a) {
    var $ = n.frame($_a).item("a").item("params");
    return stringify($("a"), $("params"), fn.true());
}

function stringify$3(...$_a) {
    var $ = n.frame($_a).item("a").item("params").item("top");
    $ = $("s", array.size($("a")));
    return a.foldLeftAt($("a"), n.string(""), function (...$_a) {
        $ = $.frame($_a).item("acc").item("t").item("i");
        $ = $("isMap", n.instanceOf($("t"), n.map()));
        $ = $("ret", ($ => {
            if ($.test($("isMap"))) {
                return fn.concat(n.call($("t"), n.string("name")), n.string("("), fn.stringJoin(stringify(n.call($("t"), n.string("args")), $("params"), fn.false()), n.string(",")), n.string(")"), ($ => {
                    if ($.test(n.instanceOf(n.call($("t"), n.string("suffix")), n.string()))) {
                        return n.call($("t"), n.string("suffix"));
                    } else {
                        return n.string("");
                    }
                })($.frame()));
            } else {
                return ($ => {
                    if ($.test(n.instanceOf($("t"), n.array(n.item())))) {
                        return fn.concat(n.string("("), stringify($("t"), $("params"), fn.false()), n.string(")"));
                    } else {
                        return $("t");
                    }
                })($.frame());
            }
        })($.frame()));
        return fn.concat($("acc"), ($ => {
            if ($.test(n.gt($("i"), n.integer(1)))) {
                return ($ => {
                    if ($.test($("top"))) {
                        return fn.concat(n.string(";"), env.LF);
                    } else {
                        return ($ => {
                            if ($.test($.test($("isMap")) && $.test(n.call($("t"), n.string("call"))))) {
                                return n.string("");
                            } else {
                                return n.string(",");
                            }
                        })($.frame());
                    }
                })($.frame());
            } else {
                return n.string("");
            }
        })($.frame()), $("ret"));
    });
}

function clip$1(...$_a) {
    var $ = n.frame($_a).item("name");
    return ($ => {
        if ($.test(fn.matches($("name"), fn.concat(n.string("^"), env.QUOT, n.string(".*"), env.QUOT, n.string("$"))))) {
            return clipString($("name"));
        } else {
            return $("name");
        }
    })($.frame());
}

function camelCase$1(...$_a) {
    var $ = n.frame($_a).item("name");
    $ = $("p", fn.tokenize($("name"), n.string("\\-")));
    return n.concat(fn.head($("p")), fn.stringJoin(fn.forEach(fn.tail($("p")), function (...$_a) {
        $ = $.frame($_a).item("_");
        $ = $("c", fn.stringToCodepoints($("_")));
        return fn.concat(fn.upperCase(fn.codepointsToString(fn.head($("c")))), fn.codepointsToString(fn.tail($("c"))));
    })));
}

function capitalize$1(...$_a) {
    var $ = n.frame($_a).item("str");
    $ = $("cp", fn.stringToCodepoints($("str")));
    return fn.codepointsToString(n.seq(fn.stringToCodepoints(fn.upperCase(fn.codepointsToString(fn.head($("cp"))))), fn.tail($("cp"))));
}

function processStrings(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return processStrings$3.apply(this, $_a);
    }

    return n.error(processStrings, $_l);
}

function findContextItem(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return findContextItem$1.apply(this, $_a);
    }

    return n.error(findContextItem, $_l);
}

function camelCase(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return camelCase$1.apply(this, $_a);
    }

    return n.error(camelCase, $_l);
}

function parseStrings(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return parseStrings$3.apply(this, $_a);
    }

    return n.error(parseStrings, $_l);
}

function normalizeQuery(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return normalizeQuery$2.apply(this, $_a);
    }

    return n.error(normalizeQuery, $_l);
}

function wrap(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return wrap$3.apply(this, $_a);
    }
    if ($_l === 4) {
        return wrap$4.apply(this, $_a);
    }
    if ($_l === 5) {
        return wrap$5.apply(this, $_a);
    }
    if ($_l === 6) {
        return wrap$6.apply(this, $_a);
    }

    return n.error(wrap, $_l);
}

function stringify(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return stringify$2.apply(this, $_a);
    }
    if ($_l === 3) {
        return stringify$3.apply(this, $_a);
    }

    return n.error(stringify, $_l);
}

function capitalize(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return capitalize$1.apply(this, $_a);
    }

    return n.error(capitalize, $_l);
}

function clipString(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return clipString$1.apply(this, $_a);
    }

    return n.error(clipString, $_l);
}

function upsert(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return upsert$3.apply(this, $_a);
    }

    return n.error(upsert, $_l);
}

function clip(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return clip$1.apply(this, $_a);
    }

    return n.error(clip, $_l);
}

function parse(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return parse$1.apply(this, $_a);
    }
    if ($_l === 2) {
        return parse$2.apply(this, $_a);
    }

    return n.error(parse, $_l);
}

function importModule(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return importModule$2.apply(this, $_a);
    }

    return n.error(importModule, $_l);
}

function wrapQname(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return wrapQname$1.apply(this, $_a);
    }

    return n.error(wrapQname, $_l);
}

function valueFromStrings(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return valueFromStrings$2.apply(this, $_a);
    }

    return n.error(valueFromStrings, $_l);
}

function mapPut(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return mapPut$3.apply(this, $_a);
    }

    return n.error(mapPut, $_l);
}

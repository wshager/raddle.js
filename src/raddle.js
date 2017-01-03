import * as xqc from "./xq-compat";

import * as n from "./n";

import * as a from "./array-util";

import * as console from "./console";

import * as fn from "xvfn";

import * as map from "xvmap";

import * as array from "xvarray";

var $ = n.frame();

export const suffix = n.string("\\+\\*\\-\\?");

export const ncname = xqc.ncname;

export const chars = n.concat(n.concat(suffix, ncname), n.string("\\$%/#@\\^:"));

export const parenRegexp = fn.concat(n.string("(\\)["), suffix, n.string("]?)|("), xqc.operatorRegexp, n.string("|,)?(["), chars, n.string("]*)(\\(?)"));

export const protocolRegexp = n.string("^((http[s]?|ftp|xmldb|xmldb:exist|file):/)?/*(.*)$");

export function mapPut$3(...$_a) {
    var $ = n.frame($_a)
        .item("map")
        .item("key")
        .item("val");
    return map.new(n.seq($("map"), n.map(n.seq(n.pair($("key"), $("val"))))));

}

export function parseStrings$3(...$_a) {
    var $ = n.frame($_a)
        .item("strings")
        .item("normalizer")
        .item("params");
    $ = $("string", n.call($("strings"), n.string("$%0")));
    $ = $("string", n.call($("normalizer"), $("string"), $("params")));
    $ = $("parts", fn.tokenize($("string"), n.string(";")));
    return array.join(fn.forEach($("parts"), function(...$_a) {
        $ = $.frame($_a)
            .item("block");
        return wrap(n.select(fn.analyzeString($("block"), parenRegexp), n.string("fn:match")), $("strings"));

    }));

}

export function rqlCompat$2(...$_a) {
    var $ = n.frame($_a)
        .item("query")
        .item("params");
    $ = $("query", fn.replace($("query"), n.string("&amp;"), n.string(" and ")));
    return $("query");

}

export function normalizeQuery$2(...$_a) {
    var $ = n.frame($_a)
        .string("query", n.zeroOrOne)
        .item("params");
    return fn.replace($("query"), n.string("\\s"), n.string(""));

}

export function processStrings$3(...$_a) {
    var $ = n.frame($_a)
        .item("strings")
        .item("ret")
        .item("index");
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
                    $ = $("ret", map.put($("ret"), $("key"), fn.concat(n.string("\""), clipString($("string")), n.string("\""))));
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

export function parse$1(...$_a) {
    var $ = n.frame($_a)
        .string("query", n.zeroOrOne);
    return parse($("query"), n.map(n.seq()));

}

export function parse$2(...$_a) {
    var $ = n.frame($_a)
        .string("query", n.zeroOrOne)
        .item("params");
    $ = $("strings", processStrings(n.select(fn.analyzeString($("query"), n.string("('[^']*')|(\"[^\"]*\")")), n.string("*")), n.map(n.seq(n.pair(n.string("$%0"), n.string("")))), n.integer(1)));
    return parseStrings($("strings"), ($ => {
        if ($.test(n.geq(n.call($("params"), n.string("$compat")), n.string("xquery")))) {
            return function(...$_a) {
                $ = $.frame($_a)
                    .item("query")
                    .item("params");
                return normalizeQuery(xqc.normalizeQuery(rqlCompat($("query"), $("params")), $("params")), $("params"));

            };
        } else {
            return normalizeQuery;
        }
    })($.frame()), $("params"));

}

export function getIndexFromTokens$1(...$_a) {
    var $ = n.frame($_a)
        .item("tok");
    return fn.forEach(n.to(n.integer(1), fn.count(fn.indexOf($("tok"), n.integer(1)))), function(...$_a) {
        $ = $.frame($_a)
            .item("i");
        $ = $("x", n.filter(fn.indexOf($("tok"), n.minus(n.integer(1))), $_0 => n.geq(fn.position($_0), $("i"))));
        $ = $("y", n.filter(fn.indexOf($("tok"), n.integer(1)), $_0 => n.geq(fn.position($_0), $("i"))));
        return ($ => {
            if ($.test($.test(fn.exists($("x"))) && $.test(n.glt($("x"), $("y"))))) {
                return n.seq();
            } else {
                return n.add($("y"), n.integer(1));
            }
        })($.frame());

    });

}

export function getIndex$1(...$_a) {
    var $ = n.frame($_a)
        .item("rest");
    return n.filter(getIndexFromTokens(fn.forEach($("rest"), function(...$_a) {
        $ = $.frame($_a)
            .item("_");
        $ = $("_", n.select(n.select($("_"), n.select($_0, n.string("fn:group"))), n.select($_0, n.string("@nr"))));
        return ($ => {
            if ($.test(n.geq($("_"), n.integer(1)))) {
                return n.integer(1);
            } else {
                return ($ => {
                    if ($.test(n.geq($("_"), n.integer(4)))) {
                        return n.minus(n.integer(1));
                    } else {
                        return n.integer(0);
                    }
                })($.frame());
            }
        })($.frame());

    })), $_0 => n.geq(fn.position($_0), n.integer(1)));

}

export function clipString$1(...$_a) {
    var $ = n.frame($_a)
        .string("str");
    return fn.substring($("str"), n.integer(2), n.subtract(fn.stringLength($("str")), n.integer(2)));

}

export function valueFromStrings$2(...$_a) {
    var $ = n.frame($_a)
        .string("val", n.zeroOrOne)
        .item("strings");
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

export function upsert$3(...$_a) {
    var $ = n.frame($_a)
        .item("ret")
        .item("index")
        .item("val");
    return ($ => {
        if ($.test(n.lt(array.size($("ret")), $("index")))) {
            return array.append($("ret"), n.array(n.seq($("val"))));
        } else {
            return a.put($("ret"), $("index"), array.append(n.call($("ret"), $("index")), $("val")));
        }
    })($.frame());

}

export function wrapQname$1(...$_a) {
    var $ = n.frame($_a)
        .item("args");
    return ($ => {
        if ($.test(n.instanceOf($("args"), n.map()))) {
            return n.map(n.seq(n.pair(n.string("name"), n.call($("args"), n.string("name"))), n.pair(n.string("args"), array.forEach(n.call($("args"), n.string("args")), function(...$_a) {
                $ = $.frame($_a)
                    .item("arg");
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
                    return array.forEach($("args"), function(...$_a) {
                        $ = $.frame($_a)
                            .item("arg");
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

export function findContextItem$1(...$_a) {
    var $ = n.frame($_a)
        .item("value");
    return ($ => {
        if ($.test(n.eq(array.size($("value")), n.integer(0)))) {
            return n.seq();
        } else {
            $ = $("cx", array.filter($("value"), function(...$_a) {
                $ = $.frame($_a)
                    .item("_");
                return $.test(n.instanceOf($("_"), n.string())) && $.test(fn.matches($("_"), n.string("^\\.$")));

            }));
            return ($ => {
                if ($.test(n.gt(array.size($("cx")), n.integer(0)))) {
                    return array.flatten($("cx"));
                } else {
                    return array.flatten(a.forEachAt($("value"), function(...$_a) {
                        $ = $.frame($_a)
                            .item("_")
                            .item("at");
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

export function wrap$2(...$_a) {
    var $ = n.frame($_a)
        .item("match")
        .item("strings");
    return wrap($("match"), $("strings"), n.array(n.seq()));

}

export function wrap$3(...$_a) {
    var $ = n.frame($_a)
        .item("match")
        .item("strings")
        .item("ret");
    return wrap($("match"), $("strings"), $("ret"), n.integer(1));

}

export function wrap$4(...$_a) {
    var $ = n.frame($_a)
        .item("match")
        .item("strings")
        .item("ret")
        .item("depth");
    return wrap($("match"), $("strings"), $("ret"), $("depth"), fn.false());

}

export function wrap$5(...$_a) {
    var $ = n.frame($_a)
        .item("match")
        .item("strings")
        .item("ret")
        .item("depth")
        .item("wasComma");
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
                                    $ = $("operator", xqc.toOp($("op")));
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
                                                    $ = $("operator", xqc.toOp(xqc.unaryOp($("op"))));
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
                                                            $ = $("dest", a.put($("dest"), $("len"), n.map(n.seq(n.pair(n.string("name"), n.call($("last"), n.string("name"))), n.pair(n.string("args"), n.array(n.seq(n.call(n.call($("last"), n.string("args")), n.integer(1)), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("op"))))))), n.pair(n.string("nest"), fn.true()), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("op"), $("prevOp"))))));
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
                                    return upsert($("ret"), $("depth"), n.map(n.seq(n.pair(n.string("name"), $("value")), n.pair(n.string("args"), n.array(n.seq())), n.pair(n.string("suffix"), n.string("")), n.pair(n.string("call"), $.test(n.ge(array.size($("ret")), $("depth"))) && $.test(n.eq($("value"), n.string("")))))));
                                }
                            })($.frame());
                        }
                    })($.frame()));
                    return wrap($("rest"), $("strings"), $("ret"), n.add($("depth"), n.integer(1)), $.test($("isComma")) && $.test(n.eq($("value"), n.string(""))));
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
                                            $ = $("operator", xqc.toOp($("op")));
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
                                            $ = $("operator", xqc.toOp($("op")));
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
                            return wrap($("rest"), $("strings"), $("ret"), $("depth"), $.test($("isComma")) && $.test(n.eq($("value"), n.string(""))));
                        } else {
                            return ($ => {
                                if ($.test(n.geq(n.select($("group"), n.string("@nr")), n.integer(1)))) {
                                    return ($ => {
                                        if ($.test($.test(n.lt(array.size($("ret")), $("depth"))) || $.test(n.lt($("depth"), n.integer(2))))) {
                                            return wrap($("rest"), $("strings"), $("ret"), n.subtract($("depth"), n.integer(1)));
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
                                                    return array.forEach($("args"), function(...$_a) {
                                                        $ = $.frame($_a)
                                                            .item("_");
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
                                                    $ = $("val", n.map(n.seq(n.pair(n.string("name"), n.call($("last"), n.string("name"))), n.pair(n.string("args"), $("args")), n.pair(n.string("suffix"), fn.replace(n.select($("group"), $_0 => fn.string($_0)), n.string("\\)"), n.string(""))), n.pair(n.string("call"), n.call($("last"), n.string("call"))))));
                                                    return a.put($("dest"), $("len"), $("val"));
                                                }
                                            })($.frame()));
                                            return wrap($("rest"), $("strings"), array.append(array.subarray($("ret"), n.integer(1), n.subtract($("depth"), n.integer(2))), $("dest")), n.subtract($("depth"), n.integer(1)));
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

export function importModule$2(...$_a) {
    var $ = n.frame($_a)
        .item("name")
        .item("params");
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

export function stringify$2(...$_a) {
    var $ = n.frame($_a)
        .item("a")
        .item("params");
    return stringify($("a"), $("params"), fn.true());

}

export function stringify$3(...$_a) {
    var $ = n.frame($_a)
        .item("a")
        .item("params")
        .item("top");
    $ = $("s", array.size($("a")));
    return a.foldLeftAt($("a"), n.string(""), function(...$_a) {
        $ = $.frame($_a)
            .item("acc")
            .item("t")
            .item("i");
        $ = $("isMap", n.instanceOf($("t"), n.map()));
        $ = $("ret", ($ => {
            if ($.test($("isMap"))) {
                return fn.concat(n.call($("t"), n.string("name")), n.string("("), fn.stringJoin(array.flatten(stringify(n.call($("t"), n.string("args")), $("params"), fn.false())), n.string(",")), n.string(")"), ($ => {
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
                        return n.string(";\r\n");
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

export function transpile$3(...$_a) {
    var $ = n.frame($_a)
        .item("tree")
        .item("lang")
        .item("params");
    $ = $("module", n.import(n.concat(n.concat(n.string("../lib/"), $("lang")), n.string(".xql"))));
    $ = $("frame", map.put($("params"), n.string("$imports"), n.map(n.seq(n.pair(n.string("core"), $("module"))))));
    $ = $("func", n.call(n.call($("module"), n.string("$exports")), n.string("core:transpile#2")));
    return n.call($("func"), $("tree"), $("frame"));

}

export function exec$2(...$_a) {
    var $ = n.frame($_a)
        .item("query")
        .item("params");
    $ = $("core", n.import(n.string("../lib/core.xql")));
    $ = $("n", n.import(n.string("../lib/n.xql")));
    return ($ => {
        if ($.test(map.contains($("params"), n.string("$transpile")))) {
            return ($ => {
                if ($.test(n.eq(n.call($("params"), n.string("$transpile")), n.string("rdl")))) {
                    return stringify(parse($("query"), $("params")), $("params"));
                } else {
                    return transpile(parse($("query"), $("params")), n.call($("params"), n.string("$transpile")), $("params"));
                }
            })($.frame());
        } else {
            $ = $("frame", map.put($("params"), n.string("$imports"), n.map(n.seq(n.pair(n.string("core"), $("core")), n.pair(n.string("n"), $("n"))))));
            $ = $("fn", n.eval(parse($("query"), $("params"))));
            return n.call($("fn"), $("frame"));
        }
    })($.frame());

}

export function clip$1(...$_a) {
    var $ = n.frame($_a)
        .item("name");
    return ($ => {
        if ($.test(fn.matches($("name"), n.string("^\".*\"$")))) {
            return clipString($("name"));
        } else {
            return $("name");
        }
    })($.frame());

}

export function camelCase$1(...$_a) {
    var $ = n.frame($_a)
        .item("name");
    $ = $("p", fn.tokenize($("name"), n.string("\\-")));
    return n.concat(fn.head($("p")), fn.stringJoin(fn.forEach(fn.tail($("p")), function(...$_a) {
        $ = $.frame($_a)
            .item("_");
        $ = $("c", fn.stringToCodepoints($("_")));
        return fn.concat(fn.upperCase(fn.codepointsToString(fn.head($("c")))), fn.codepointsToString(fn.tail($("c"))));

    })));

}

export function capitalize$1(...$_a) {
    var $ = n.frame($_a)
        .item("str");
    $ = $("cp", fn.stringToCodepoints($("str")));
    return fn.codepointsToString(n.seq(fn.stringToCodepoints(fn.upperCase(fn.codepointsToString(fn.head($("cp"))))), fn.tail($("cp"))));

}

export function rqlCompat(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return rqlCompat$2.apply(this, $_a);
    }

    return n.error(rqlCompat, $_l);
}

export function processStrings(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return processStrings$3.apply(this, $_a);
    }

    return n.error(processStrings, $_l);
}

export function findContextItem(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return findContextItem$1.apply(this, $_a);
    }

    return n.error(findContextItem, $_l);
}

export function camelCase(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return camelCase$1.apply(this, $_a);
    }

    return n.error(camelCase, $_l);
}

export function parseStrings(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return parseStrings$3.apply(this, $_a);
    }

    return n.error(parseStrings, $_l);
}

export function normalizeQuery(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return normalizeQuery$2.apply(this, $_a);
    }

    return n.error(normalizeQuery, $_l);
}

export function wrap(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return wrap$2.apply(this, $_a);
    }

    if ($_l === 3) {
        return wrap$3.apply(this, $_a);
    }

    if ($_l === 4) {
        return wrap$4.apply(this, $_a);
    }

    if ($_l === 5) {
        return wrap$5.apply(this, $_a);
    }

    return n.error(wrap, $_l);
}

export function stringify(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return stringify$2.apply(this, $_a);
    }

    if ($_l === 3) {
        return stringify$3.apply(this, $_a);
    }

    return n.error(stringify, $_l);
}

export function getIndexFromTokens(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return getIndexFromTokens$1.apply(this, $_a);
    }

    return n.error(getIndexFromTokens, $_l);
}

export function capitalize(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return capitalize$1.apply(this, $_a);
    }

    return n.error(capitalize, $_l);
}

export function clipString(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return clipString$1.apply(this, $_a);
    }

    return n.error(clipString, $_l);
}

export function upsert(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return upsert$3.apply(this, $_a);
    }

    return n.error(upsert, $_l);
}

export function clip(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return clip$1.apply(this, $_a);
    }

    return n.error(clip, $_l);
}

export function exec(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return exec$2.apply(this, $_a);
    }

    return n.error(exec, $_l);
}

export function parse(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return parse$1.apply(this, $_a);
    }

    if ($_l === 2) {
        return parse$2.apply(this, $_a);
    }

    return n.error(parse, $_l);
}

export function importModule(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return importModule$2.apply(this, $_a);
    }

    return n.error(importModule, $_l);
}

export function wrapQname(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return wrapQname$1.apply(this, $_a);
    }

    return n.error(wrapQname, $_l);
}

export function transpile(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return transpile$3.apply(this, $_a);
    }

    return n.error(transpile, $_l);
}

export function getIndex(...$_a) {
    var $_l = $_a.length;
    if ($_l === 1) {
        return getIndex$1.apply(this, $_a);
    }

    return n.error(getIndex, $_l);
}

export function valueFromStrings(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return valueFromStrings$2.apply(this, $_a);
    }

    return n.error(valueFromStrings, $_l);
}

export function mapPut(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return mapPut$3.apply(this, $_a);
    }

    return n.error(mapPut, $_l);
}

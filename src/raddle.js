import * as xqc from "./xq-compat.js";

import * as n from "./n.js";

import * as a from "./array-util.js";

import * as console from "./console.js";

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
        .element("strings")
        .item("normalizer")
        .item("params");
    $ = $("string", fn.stringJoin(fn.forEach(n.to(n.integer(1), fn.count($("strings"))), function(...$_a) {
        $ = $.frame($_a)
            .item("i");
        return ($ => {
            if ($.test(n.eq(fn.name(n.filter($("strings"), function($_0) {
                    return n.geq(fn.position($_0), $("i"));
                })), n.string("match")))) {
                return n.concat(n.string("$%"), $("i"));
            } else {
                return n.select(n.filter($("strings"), function($_0) {
                    return n.geq(fn.position($_0), $("i"));
                }), function($_0) {
                    return fn.string($_0);
                });
            }
        })($.frame());
    })));
    $ = $("string", n.call($("normalizer"), $("string"), $("params")));
    return array.join(fn.forEach(fn.tokenize($("string"), n.string(";")), function(...$_a) {
        $ = $.frame($_a)
            .item("block");
        $ = $("ret", wrap(n.select(fn.analyzeString($("block"), parenRegexp), n.seq(n.string("fn:match"))), $("strings")));
        return xqc.rename($("ret"), function(...$_a) {
            $ = $.frame($_a)
                .item("name");
            return ($ => {
                if ($.test(fn.matches($("name"), xqc.operatorRegexp))) {
                    return xqc.toOp(xqc.opNum($("name")));
                } else {
                    return $("name");
                }
            })($.frame());
        });

    }));

}

export function normalizeQuery$2(...$_a) {
    var $ = n.frame($_a)
        .string("query")
        .item("params");
    return fn.replace($("query"), n.string("&#9;|&#10;|&#13;"), n.string(""));
}

export function parse$1(...$_a) {
    var $ = n.frame($_a)
        .string("query");
    return parse($("query"), n.map(n.seq()));
}

export function parse$2(...$_a) {
    var $ = n.frame($_a)
        .string("query")
        .item("params");
    return parseStrings(n.select(fn.analyzeString($("query"), n.string("('[^']*')|(&quot;[^&quot;]*&quot;)")), n.seq(n.string("*"))), ($ => {
        if ($.test(n.geq(n.call($("params"), n.string("$compat")), n.string("xquery")))) {
            return function(...$_a) {
                $ = $.frame($_a)
                    .item("query")
                    .item("params");
                return normalizeQuery(xqc.normalizeQuery($("query"), $("params")), $("params"));
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
        $ = $("x", n.filter(fn.indexOf($("tok"), n.minus(n.integer(1))), function($_0) {
            return n.geq(fn.position($_0), $("i"));
        }));
        $ = $("y", n.filter(fn.indexOf($("tok"), n.integer(1)), function($_0) {
            return n.geq(fn.position($_0), $("i"));
        }));
        return ($ => {
            if ($.test($.test(fn.exists($("x"))) && $.test(n.glt($("x"), $("y"))))) {
                return n.seq(n.seq());
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
        $ = $("_", n.select($("_"), n.string("fn:group"), n.string("@nr")));
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

    })), function($_0) {
        return n.geq(fn.position($_0), n.integer(1));
    });
}

export function clipString$1(...$_a) {
    var $ = n.frame($_a)
        .string("str");
    return fn.substring($("str"), n.integer(2), n.subtract(fn.stringLength($("str")), n.integer(2)));
}

export function valueFromStrings$2(...$_a) {
    var $ = n.frame($_a)
        .string("val")
        .item("strings");
    return ($ => {
        if ($.test(fn.matches($("val"), n.string("\\$%[0-9]+")))) {
            return fn.concat(n.string("&quot;"), clipString(n.filter($("strings"), n.seq(fn.number(fn.replace($("val"), n.string("\\$%([0-9]+)"), n.string("$1")))))), n.string("&quot;"));
        } else {
            return $("val");
        }
    })($.frame());
}

export function appendOrNest$5(...$_a) {
    var $ = n.frame($_a)
        .item("next")
        .item("strings")
        .item("group")
        .item("ret")
        .item("suffix");
    $ = $("x", ($ => {
        if ($.test(n.filter($("group"), function($_0) {
                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
            }))) {
            return n.map(n.seq(n.pair(n.string("name"), valueFromStrings(n.select(n.filter($("group"), function($_0) {
                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
            }), function($_0) {
                return fn.string($_0);
            }), $("strings"))), n.pair(n.string("args"), wrap($("next"), $("strings"))), n.pair(n.string("suffix"), $("suffix"))));
        } else {
            return wrap($("next"), $("strings"));
        }
    })($.frame()));
    return ($ => {
        if ($.test(fn.matches(n.select(n.filter($("group"), function($_0) {
                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
            }), function($_0) {
                return fn.string($_0);
            }), n.concat(n.concat(n.string("^"), xqc.operatorRegexp), n.string("$"))))) {
            $ = $("operator", n.select(n.filter($("group"), function($_0) {
                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
            }), function($_0) {
                return fn.string($_0);
            }));
            return ($ => {
                if ($.test(n.ggt(array.size($("ret")), n.integer(0)))) {
                    $ = $("rev", array.reverse($("ret")));
                    $ = $("last", array.head($("rev")));
                    $ = $("ret", array.reverse(array.tail($("rev"))));
                    $ = $("op", xqc.opInt($("operator")));
                    return ($ => {
                        if ($.test(fn.empty($("last")))) {
                            return array.append($("ret"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("x")), n.pair(n.string("suffix"), n.string("")))));
                        } else {
                            $ = $("hasPrecedingOp", $.test(n.instanceOf($("last"), n.map())) && $.test(fn.matches(n.call($("last"), n.string("name")), xqc.operatorRegexp)));
                            $ = $("prevOp", ($ => {
                                if ($.test($("hasPrecedingOp"))) {
                                    return xqc.opInt(n.call($("last"), n.string("name")));
                                } else {
                                    return n.seq(n.seq());
                                }
                            })($.frame()));
                            $ = $("preceeds", $.test($.test($("hasPrecedingOp")) && $.test(n.ggt($("op"), $("prevOp")))) && $.test(fn.not($.test(n.eq($("op"), n.integer(20))) && $.test(n.eq($("prevOp"), n.integer(19))))));
                            return ($ => {
                                if ($.test($("preceeds"))) {
                                    $ = $("y", n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), n.array(n.seq(n.call($("last"), n.seq(n.string("args"))), n.seq(n.integer(2)), $("x")))), n.pair(n.string("suffix"), n.string("")))));
                                    return array.append($("ret"), n.map(n.seq(n.pair(n.string("name"), n.call($("last"), n.string("name"))), n.pair(n.string("args"), n.array(n.seq(n.call($("last"), n.seq(n.string("args"))), n.seq(n.integer(1)), $("y")))), n.pair(n.string("suffix"), n.string("")))));
                                } else {
                                    return array.append($("ret"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), n.array(n.seq($("last"), $("x")))), n.pair(n.string("suffix"), n.string("")))));
                                }
                            })($.frame());
                        }
                    })($.frame());
                } else {
                    return array.append($("ret"), n.map(n.seq(n.pair(n.string("name"), $("operator")), n.pair(n.string("args"), $("x")), n.pair(n.string("suffix"), n.string("")))));
                }
            })($.frame());
        } else {
            return array.append($("ret"), $("x"));
        }
    })($.frame());

}

export function appendPropOrValue$4(...$_a) {
    var $ = n.frame($_a)
        .item("string")
        .item("operator")
        .item("strings")
        .item("ret");
    return ($ => {
        if ($.test(fn.matches($("operator"), n.concat(xqc.operatorRegexp, n.string("+"))))) {
            return ($ => {
                if ($.test(n.ggt(array.size($("ret")), n.integer(0)))) {
                    return xqc.operatorPrecedence(($ => {
                        if ($.test(fn.exists($("string")))) {
                            return valueFromStrings($("string"), $("strings"));
                        } else {
                            return n.seq(n.seq());
                        }
                    })($.frame()), $("operator"), $("ret"));
                } else {
                    return array.append($("ret"), n.map(n.seq(n.pair(n.string("name"), xqc.unaryOp($("operator"))), n.pair(n.string("args"), n.array(n.seq(valueFromStrings($("string"), $("strings"))))), n.pair(n.string("suffix"), n.string("")))));
                }
            })($.frame());
        } else {
            return array.append($("ret"), valueFromStrings($("string"), $("strings")));
        }
    })($.frame());
}

export function wrapOpenParen$5(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("strings")
        .item("index")
        .item("group")
        .item("ret");
    return wrap(fn.subsequence($("rest"), $("index")), $("strings"), appendOrNest(fn.subsequence($("rest"), n.integer(1), $("index")), $("strings"), $("group"), $("ret"), fn.replace(n.filter($("rest"), $_ => n.seq(n.subtract($("index"), n.integer(1)))), n.string("\\)"), n.string(""))));
}

export function wrap$4(...$_a) {
    var $ = n.frame($_a)
        .item("rest")
        .item("strings")
        .item("ret")
        .item("group");
    return ($ => {
        if ($.test(fn.exists($("rest")))) {
            return ($ => {
                if ($.test(n.filter($("group"), function($_0) {
                        return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(4));
                    }))) {
                    return wrapOpenParen($("rest"), $("strings"), getIndex($("rest")), $("group"), $("ret"));
                } else {
                    return ($ => {
                        if ($.test($.test(n.filter($("group"), function($_0) {
                                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
                            })) || $.test(fn.matches(n.select(n.filter($("group"), function($_0) {
                                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
                            }), function($_0) {
                                return fn.string($_0);
                            }), n.concat(xqc.operatorRegexp, n.string("+|,")))))) {
                            return wrap($("rest"), $("strings"), appendPropOrValue(n.select(n.filter($("group"), function($_0) {
                                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
                            }), function($_0) {
                                return fn.string($_0);
                            }), n.select(n.filter($("group"), function($_0) {
                                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
                            }), function($_0) {
                                return fn.string($_0);
                            }), $("strings"), $("ret")));
                        } else {
                            return wrap($("rest"), $("strings"), $("ret"));
                        }
                    })($.frame());
                }
            })($.frame());
        } else {
            return $("ret");
        }
    })($.frame());
}

export function wrap$3(...$_a) {
    var $ = n.frame($_a)
        .item("match")
        .item("strings")
        .item("ret");
    return wrap(fn.tail($("match")), $("strings"), $("ret"), n.select(fn.head($("match")), n.seq(n.string("fn:group"))));
}

export function wrap$2(...$_a) {
    var $ = n.frame($_a)
        .item("match")
        .item("strings");
    return wrap($("match"), $("strings"), n.array(n.seq()));
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
    $ = $("map", n.select(n.select(fn.doc($("mappath")), n.seq(n.string("root"))), n.seq(n.string("module"))));
    $ = $("location", n.anyURI(n.selectAttribute(n.filter($("map"), function($_0) {
        return n.geq(n.selectAttribute($_0, n.string("name")), $("name"));
    }), n.string("location"))));
    $ = $("uri", n.anyURI(n.selectAttribute(n.filter($("map"), function($_0) {
        return n.geq(n.selectAttribute($_0, n.string("name")), $("name"));
    }), n.string("uri"))));
    $ = $("module", ($ => {
        if ($.test($("location"))) {
            return inspect.inspectModule($("location"));
        } else {
            return inspect.inspectModuleUri($("uri"));
        }
    })($.frame()));
    return n.try(util.importModule(n.anyURI(n.selectAttribute($("module"), n.string("uri"))), n.selectAttribute($("module"), n.string("prefix")), n.anyURI(n.selectAttribute($("module"), n.string("location")))), n.seq());

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
        $ = $("type", ($ => {
            if ($.test(n.instanceOf($("t"), n.map()))) {
                return n.integer(1);
            } else {
                return ($ => {
                    if ($.test(n.instanceOf($("t"), n.array(n.item())))) {
                        return n.integer(2);
                    } else {
                        return n.integer(0);
                    }
                })($.frame());
            }
        })($.frame()));
        $ = $("ret", ($ => {
            if ($.test(n.eq($("type"), n.integer(1)))) {
                return fn.concat(n.call($("t"), n.string("name")), n.string("("), fn.stringJoin(array.flatten(stringify(n.call($("t"), n.string("args")), $("params"), fn.false())), n.string(",")), n.string(")"), ($ => {
                    if ($.test(n.instanceOf(n.call($("t"), n.string("suffix")), n.string()))) {
                        return n.call($("t"), n.string("suffix"));
                    } else {
                        return n.string("");
                    }
                })($.frame()));
            } else {
                return ($ => {
                    if ($.test(n.eq($("type"), n.integer(2)))) {
                        return fn.concat(n.string("("), stringify($("t"), $("params"), fn.false()), n.string(")"));
                    } else {
                        return $("t");
                    }
                })($.frame());
            }
        })($.frame()));
        return fn.concat($("acc"), ($ => {
            if ($.test($.test(n.ggt($("i"), n.integer(1))) && $.test(fn.not($.test(n.eq($("type"), n.integer(1))) && $.test(n.eq(n.call($("t"), n.string("name")), n.string(""))))))) {
                return ($ => {
                    if ($.test($("top"))) {
                        return n.string(",&#10;&#13;");
                    } else {
                        return n.string(",");
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
    $ = $("func", n.call(n.call(n.string("core:call"), n.seq($("module"), n.seq(n.string("$exports")))), n.seq(n.string("core:transpile#2"))));
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
        if ($.test(fn.matches($("name"), n.string("^&quot;.*&quot;$")))) {
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

export function wrapOpenParen(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return wrapOpenParen$5.apply(this, $_a);
    }

    return n.error(wrapOpenParen, $_l);
}

export function wrap(...$_a) {
    var $_l = $_a.length;
    if ($_l === 4) {
        return wrap$4.apply(this, $_a);
    }

    if ($_l === 3) {
        return wrap$3.apply(this, $_a);
    }

    if ($_l === 2) {
        return wrap$2.apply(this, $_a);
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

export function appendOrNest(...$_a) {
    var $_l = $_a.length;
    if ($_l === 5) {
        return appendOrNest$5.apply(this, $_a);
    }

    return n.error(appendOrNest, $_l);
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

export function appendPropOrValue(...$_a) {
    var $_l = $_a.length;
    if ($_l === 4) {
        return appendPropOrValue$4.apply(this, $_a);
    }

    return n.error(appendPropOrValue, $_l);
}

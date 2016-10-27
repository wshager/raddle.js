"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.protocolRegexp = exports.parenRegexp = exports.chars = exports.ncname = exports.suffix = undefined;
exports.mapPut = mapPut;
exports.parseStrings = parseStrings;
exports.normalizeQuery = normalizeQuery;
exports.parse = parse;
exports.getIndexFromTokens = getIndexFromTokens;
exports.getIndex = getIndex;
exports.clipString = clipString;
exports.valueFromStrings = valueFromStrings;
exports.appendOrNest = appendOrNest;
exports.appendPropOrValue = appendPropOrValue;
exports.wrapOpenParen = wrapOpenParen;
exports.wrap = wrap;
exports.importModule = importModule;
exports.stringify = stringify;
exports.transpile = transpile;
exports.exec = exec;
exports.clip = clip;
exports.camelCase = camelCase;
exports.capitalize = capitalize;

var _xqCompat = require("./xq-compat.js");

var xqc = _interopRequireWildcard(_xqCompat);

var _n = require("./n.js");

var n = _interopRequireWildcard(_n);

var _arrayUtil = require("./array-util.js");

var a = _interopRequireWildcard(_arrayUtil);

var _console = require("./console.js");

var console = _interopRequireWildcard(_console);

var _xvfn = require("xvfn");

var fn = _interopRequireWildcard(_xvfn);

var _xvmap = require("xvmap");

var map = _interopRequireWildcard(_xvmap);

var _xvarray = require("xvarray");

var array = _interopRequireWildcard(_xvarray);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const suffix = exports.suffix = n.string("\\+\\*\\-\\?");

const ncname = exports.ncname = xqc.ncname;

const chars = exports.chars = n.concat(n.concat(suffix, ncname), n.string("\\$%/#@\\^:"));

const parenRegexp = exports.parenRegexp = fn.concat(n.string("(\\)["), suffix, n.string("]?)|("), xqc.operatorRegexp, n.string("|,)?(["), chars, n.string("]*)(\\(?)"));

const protocolRegexp = exports.protocolRegexp = n.string("^((http[s]?|ftp|xmldb|xmldb:exist|file):/)?/*(.*)$");

function mapPut(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 3) {
        $.init($.item("map"), $.item("key"), $.item("val"));
        return n.item(map.new(n.seq($.get("map"), n.map(n.seq(n.pair($.get("key"), $.get("val")))))));
    }
    return n.error(mapPut, $_l);
}

function parseStrings(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 3) {
        $.init($.element("strings"), $.item("normalizer"), $.item("params"));
        return $.item("string", fn.stringJoin(fn.forEach(n.to(n.integer(1), fn.count($.get("strings"))), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("i"));
                return n.item($.test(n.eq(fn.name(n.filter($.get("strings"), function ($_0) {
                    return n.geq(fn.position($_0), $.get("i"));
                })), n.string("match"))) ? n.concat(n.string("$%"), $.get("i")) : n.select(n.filter($.get("strings"), function ($_0) {
                    return n.geq(fn.position($_0), $.get("i"));
                }), function ($_0) {
                    return fn.string($_0);
                }));
            }
            return n.error($_l);
        }))), $.item("string", n.call($.get("normalizer"), $.get("string"), $.get("params"))), n.item(array.join(fn.forEach(fn.tokenize($.get("string"), n.string(";")), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("block"));
                return $.item("ret", wrap(n.select(fn.analyzeString($.get("block"), parenRegexp), n.seq(n.string("fn:match"))), $.get("strings"))), n.item(xqc.rename($.get("ret"), function (...$_a) {
                    var $_l = $_a.length;
                    $ = n.frame($, $_a);
                    if ($_l == 1) {
                        $.init($.item("name"));
                        return n.item($.test(fn.matches($.get("name"), xqc.operatorRegexp)) ? xqc.toOp(xqc.opNum($.get("name"))) : $.get("name"));
                    }
                    return n.error($_l);
                }));
            }
            return n.error($_l);
        })));
    }
    return n.error(parseStrings, $_l);
}

function normalizeQuery(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.string("query"), $.item("params"));
        return n.item(fn.replace($.get("query"), n.string("&#9;|&#10;|&#13;"), n.string("")));
    }
    return n.error(normalizeQuery, $_l);
}

function parse(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.string("query"));
        return n.item(parse($.get("query"), n.map(n.seq())));
    }

    if ($_l == 2) {
        $.init($.string("query"), $.item("params"));
        return parseStrings(n.select(fn.analyzeString($.get("query"), n.string("('[^']*')|(&quot;[^&quot;]*&quot;)")), n.seq(n.string("*"))), $.test(n.geq(n.call($.get("params"), n.string("$compat")), n.string("xquery"))) ? function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 2) {
                $.init($.item("query"), $.item("params"));
                return n.item(normalizeQuery(xqc.normalizeQuery($.get("query"), $.get("params")), $.get("params")));
            }
            return n.error($_l);
        } : normalizeQuery, $.get("params"));
    }
    return n.error(parse, $_l);
}

function getIndexFromTokens(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("tok"));
        return fn.forEach(n.to(n.integer(1), fn.count(fn.indexOf($.get("tok"), n.integer(1)))), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("i"));
                var x = n.filter(fn.indexOf($.get("tok"), n.minus(n.integer(1))), function ($_0) {
                    return n.geq(fn.position($_0), $.get("i"));
                });
                var y = n.filter(fn.indexOf($.get("tok"), n.integer(1)), function ($_0) {
                    return n.geq(fn.position($_0), $.get("i"));
                });
                return n.item($.test(n.and(fn.exists(x), n.glt(x, y))) ? n.seq() : n.add(y, n.integer(1)));
            }
            return n.error($_l);
        });
    }
    return n.error(getIndexFromTokens, $_l);
}

function getIndex(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("rest"));
        return n.filter(getIndexFromTokens(fn.forEach($.get("rest"), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("_"));
                var ret = ($.item("_", n.select($.get("_"), n.string("fn:group"), n.string("@nr"))),
                n.item($.test(n.geq($.get("_"), n.integer(1))) ? n.integer(1) : $.test(n.geq($.get("_"), n.integer(4))) ? n.minus(n.integer(1)) : n.integer(0)));
                return ret;
            }
            return n.error($_l);
        })), function ($_0) {
            return n.geq(fn.position($_0), n.integer(1));
        });
    }
    return n.error(getIndex, $_l);
}

function clipString(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.string("str"));
        return n.item(fn.substring($.get("str"), n.integer(2), n.subtract(fn.stringLength($.get("str")), n.integer(2))));
    }
    return n.error(clipString, $_l);
}

function valueFromStrings(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.string("val"), $.item("strings"));
        return n.item($.test(fn.matches($.get("val"), n.string("\\$%[0-9]+"))) ? fn.concat(n.string("&quot;"), clipString(n.filter($.get("strings"), n.seq(fn.number(fn.replace($.get("val"), n.string("\\$%([0-9]+)"), n.string("$1")))))), n.string("&quot;")) : $.get("val"));
    }
    return n.error(valueFromStrings, $_l);
}

function appendOrNest(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 5) {
        $.init($.item("next"), $.item("strings"), $.item("group"), $.item("ret"), $.item("suffix"));
        $ = $.item("x", $.test(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
        })) ? n.map(n.seq(n.pair(n.string("name"), valueFromStrings(n.select(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
        }), function ($_0) {
            return fn.string($_0);
        }), $.get("strings"))), n.pair(n.string("args"), wrap($.get("next"), $.get("strings"))), n.pair(n.string("suffix"), $.get("suffix")))) : wrap($.get("next"), $.get("strings")));
        var ret = n.item($.test(fn.matches(n.select(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
        }), function ($_0) {
            return fn.string($_0);
        }), n.concat(n.concat(n.string("^"), xqc.operatorRegexp), n.string("$")))) ? ($.item("operator", n.select(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
        }), function ($_0) {
            return fn.string($_0);
        })),
        $.test(n.ggt(array.size($.get("ret")), n.integer(0))) ? ($.item("rev", array.reverse($.get("ret"))), $.item("last", array.head($.get("rev"))), $.item("ret", array.reverse(array.tail($.get("rev")))), $.item("op", xqc.opInt($.get("operator"))), $.test(fn.empty($.get("last"))) ?
        array.append($.get("ret"), n.map(n.seq(n.pair(n.string("name"), $.get("operator")), n.pair(n.string("args"), $.get("x")), n.pair(n.string("suffix"), n.string(""))))) :
        ($.item("hasPrecedingOp", n.and(n.instanceOf($.get("last"), n.map()), fn.matches(n.call($.get("last"), n.string("name")), xqc.operatorRegexp))),
        $.item("prevOp", $.test($.get("hasPrecedingOp")) ? xqc.opInt(n.call($.get("last"), n.string("name"))) : n.seq()),
        $.item("preceeds", n.and(n.and($.get("hasPrecedingOp"), n.ggt($.get("op"), $.get("prevOp"))), fn.not(n.and(n.eq($.get("op"), n.integer(20)), n.eq($.get("prevOp"), n.integer(19)))))),
        $.test($.get("preceeds")) ? ($.item("y", n.map(n.seq(n.pair(n.string("name"), $.get("operator")), n.pair(n.string("args"), n.array(n.seq(n.call($.get("last"), n.seq(n.string("args"))), n.seq(n.integer(2)), $.get("x")))), n.pair(n.string("suffix"), n.string(""))))), array.append($.get("ret"), n.map(n.seq(n.pair(n.string("name"), n.call($.get("last"), n.string("name"))), n.pair(n.string("args"), n.array(n.seq(n.call($.get("last"), n.seq(n.string("args"))), n.seq(n.integer(1)), $.get("y")))), n.pair(n.string("suffix"), n.string("")))))) :
        array.append($.get("ret"), n.map(n.seq(n.pair(n.string("name"), $.get("operator")), n.pair(n.string("args"), n.array(n.seq($.get("last"), $.get("x")))), n.pair(n.string("suffix"), n.string(""))))))) :
        array.append($.get("ret"), n.map(n.seq(n.pair(n.string("name"), $.get("operator")), n.pair(n.string("args"), $.get("x")), n.pair(n.string("suffix"), n.string("")))))) :
        array.append($.get("ret"), $.get("x")));
        return ret;
    }
    return n.error(appendOrNest, $_l);
}

function appendPropOrValue(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 4) {
        $.init($.item("string"), $.item("operator"), $.item("strings"), $.item("ret"));
        return n.item($.test(fn.matches($.get("operator"), n.concat(xqc.operatorRegexp, n.string("+")))) ?
        $.test(n.ggt(array.size($.get("ret")), n.integer(0))) ?
        xqc.operatorPrecedence($.test(fn.exists($.get("string"))) ?
        valueFromStrings($.get("string"), $.get("strings")) : n.seq(), $.get("operator"), $.get("ret")) :
        array.append($.get("ret"), n.map(n.seq(n.pair(n.string("name"), xqc.unaryOp($.get("operator"))), n.pair(n.string("args"), n.array(n.seq(valueFromStrings($.get("string"), $.get("strings"))))), n.pair(n.string("suffix"), n.string(""))))) :
        array.append($.get("ret"), valueFromStrings($.get("string"), $.get("strings"))));
    }
    return n.error(appendPropOrValue, $_l);
}

function wrapOpenParen(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 5) {
        $.init($.item("rest"), $.item("strings"), $.item("index"), $.item("group"), $.item("ret"));
        return n.item(wrap(fn.subsequence($.get("rest"), $.get("index")), $.get("strings"), appendOrNest(fn.subsequence($.get("rest"), n.integer(1), $.get("index")), $.get("strings"), $.get("group"), $.get("ret"), fn.replace(n.filter($.get("rest"), $ => n.seq(n.subtract($.get("index"), n.integer(1)))), n.string("\\)"), n.string("")))));
    }
    return n.error(wrapOpenParen, $_l);
}

function wrap(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 4) {
        $.init($.item("rest"), $.item("strings"), $.item("ret"), $.item("group"));
        return n.item($.test(fn.exists($.get("rest"))) ? $.test(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(4));
        })) ? wrapOpenParen($.get("rest"), $.get("strings"), getIndex($.get("rest")), $.get("group"), $.get("ret")) : $.test(n.or(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
        }), fn.matches(n.select(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
        }), function ($_0) {
            return fn.string($_0);
        }), n.concat(xqc.operatorRegexp, n.string("+|,"))))) ? wrap($.get("rest"), $.get("strings"), appendPropOrValue(n.select(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
        }), function ($_0) {
            return fn.string($_0);
        }), n.select(n.filter($.get("group"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
        }), function ($_0) {
            return fn.string($_0);
        }), $.get("strings"), $.get("ret"))) : wrap($.get("rest"), $.get("strings"), $.get("ret")) : $.get("ret"));
    }

    if ($_l == 3) {
        $.init($.item("match"), $.item("strings"), $.item("ret"));
        return n.item(wrap(fn.tail($.get("match")), $.get("strings"), $.get("ret"), n.select(fn.head($.get("match")), n.seq(n.string("fn:group")))));
    }

    if ($_l == 2) {
        $.init($.item("match"), $.item("strings"));
        return n.item(wrap($.get("match"), $.get("strings"), n.array(n.seq())));
    }
    return n.error(wrap, $_l);
}

function importModule(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("name"), $.item("params"));
        return $.item("mappath", $.test(map.contains($.get("params"), n.string("modules"))) ? n.call($.get("params"), n.string("modules")) : n.string("modules.xml")), $.item("map", n.select(n.select(fn.doc($.get("mappath")), n.seq(n.string("root"))), n.seq(n.string("module")))), $.item("location", n.anyURI(n.selectAttribute(n.filter($.get("map"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("name")), $.get("name"));
        }), n.string("location")))), $.item("uri", n.anyURI(n.selectAttribute(n.filter($.get("map"), function ($_0) {
            return n.geq(n.selectAttribute($_0, n.string("name")), $.get("name"));
        }), n.string("uri")))), $.item("module", $.test($.get("location")) ? inspect.inspectModule($.get("location")) : inspect.inspectModuleUri($.get("uri"))), n.item(n.try(util.importModule(n.anyURI(n.selectAttribute($.get("module"), n.string("uri"))), n.selectAttribute($.get("module"), n.string("prefix")), n.anyURI(n.selectAttribute($.get("module"), n.string("location")))), n.seq()));
    }
    return n.error(importModule, $_l);
}

function stringify(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("a"), $.item("params"));
        return n.item(stringify($.get("a"), $.get("params"), fn.true()));
    }

    if ($_l == 3) {
        $.init($.item("a"), $.item("params"), $.item("top"));
        return $.item("s", array.size($.get("a"))), n.item(a.foldLeftAt($.get("a"), n.string(""), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 3) {
                $.init($.item("acc"), $.item("t"), $.item("i"));
                return $.item("type", $.test(n.instanceOf($.get("t"), n.map())) ? n.integer(1) : $.test(n.instanceOf($.get("t"), n.array(n.item()))) ? n.integer(2) : n.integer(0)), $.item("ret", $.test(n.eq($.get("type"), n.integer(1))) ? fn.concat(n.call($.get("t"), n.string("name")), n.string("("), fn.stringJoin(array.flatten(stringify(n.call($.get("t"), n.string("args")), $.get("params"), fn.false())), n.string(",")), n.string(")"), $.test(n.instanceOf(n.call($.get("t"), n.string("suffix")), n.string())) ? n.call($.get("t"), n.string("suffix")) : n.string("")) : $.test(n.eq($.get("type"), n.integer(2))) ? fn.concat(n.string("("), stringify($.get("t"), $.get("params"), fn.false()), n.string(")")) : $.get("t")), n.item(fn.concat($.get("acc"), $.test(n.and(n.ggt($.get("i"), n.integer(1)), fn.not(n.and(n.eq($.get("type"), n.integer(1)), n.eq(n.call($.get("t"), n.string("name")), n.string("")))))) ? $.test($.get("top")) ? n.string(",&#10;&#13;") : n.string(",") : n.string(""), $.get("ret")));
            }
            return n.error($_l);
        }));
    }
    return n.error(stringify, $_l);
}

function transpile(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 3) {
        $.init($.item("tree"), $.item("lang"), $.item("params"));
        return $.item("module", n.import(n.concat(n.concat(n.string("../lib/"), $.get("lang")), n.string(".xql")))), $.item("frame", map.put($.get("params"), n.string("$imports"), n.map(n.seq(n.pair(n.string("core"), $.get("module")))))), $.item("func", n.call(n.call(n.string("core:call"), n.seq($.get("module"), n.seq(n.string("$exports")))), n.seq(n.string("core:transpile#2")))), n.item(n.call($.get("func"), $.get("tree"), $.get("frame")));
    }
    return n.error(transpile, $_l);
}

function exec(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("query"), $.item("params"));
        return $.item("core", n.import(n.string("../lib/core.xql"))), $.item("n", n.import(n.string("../lib/n.xql"))), n.item($.test(map.contains($.get("params"), n.string("$transpile"))) ? $.test(n.eq(n.call($.get("params"), n.string("$transpile")), n.string("rdl"))) ? stringify(parse($.get("query"), $.get("params")), $.get("params")) : transpile(parse($.get("query"), $.get("params")), n.call($.get("params"), n.string("$transpile")), $.get("params")) : ($.item("frame", map.put($.get("params"), n.string("$imports"), n.map(n.seq(n.pair(n.string("core"), $.get("core")), n.pair(n.string("n"), $.get("n")))))), $.item("fn", n.eval(parse($.get("query"), $.get("params")))), n.call($.get("fn"), $.get("frame"))));
    }
    return n.error(exec, $_l);
}

function clip(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("name"));
        return n.item($.test(fn.matches($.get("name"), n.string("^&quot;.*&quot;$"))) ? clipString($.get("name")) : $.get("name"));
    }
    return n.error(clip, $_l);
}

function camelCase(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("name"));
        return $.item("p", fn.tokenize($.get("name"), n.string("\\-"))), n.item(n.concat(fn.head($.get("p")), fn.stringJoin(fn.forEach(fn.tail($.get("p")), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("_"));
                return $.item("c", fn.stringToCodepoints($.get("_"))), n.item(fn.concat(fn.upperCase(fn.codepointsToString(fn.head($.get("c")))), fn.codepointsToString(fn.tail($.get("c")))));
            }
            return n.error($_l);
        }))));
    }
    return n.error(camelCase, $_l);
}

function capitalize(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("str"));
        return $.item("cp", fn.stringToCodepoints($.get("str"))), n.item(fn.codepointsToString(n.seq(fn.stringToCodepoints(fn.upperCase(fn.codepointsToString(fn.head($.get("cp"))))), fn.tail($.get("cp")))));
    }
    return n.error(capitalize, $_l);
}

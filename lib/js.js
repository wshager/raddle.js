"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.module = exports.autoConverted = exports.nativeOps = exports.typemap = undefined;
exports.xqVersion = xqVersion;
exports.isFnSeq = isFnSeq;
exports.isCaller = isCaller;
exports.processArgs = processArgs;
exports.native = native;
exports.pair = pair;
exports._init = _init;
exports.init = init;
exports.transpile = transpile;
exports.processTree = processTree;
exports.resolveModule = resolveModule;
exports.call = call;
exports.processValue = processValue;
exports.isCurrentModule = isCurrentModule;
exports.convert = convert;
exports.serialize = serialize;
exports.resolveFunction = resolveFunction;
exports.namespace = namespace;
exports.ximport = ximport;
exports.anonName = anonName;
exports.xvar = xvar;
exports.define = define;
exports.definePrivate = definePrivate;
exports.describe = describe;
exports.anon = anon;
exports.iff = iff;
exports.typegen1 = typegen1;
exports.select = select;
exports.selectAttribute = selectAttribute;
exports.typegen2 = typegen2;
exports._typegen = _typegen;
exports.typegen = typegen;

var _raddle = require("./raddle.js");

var rdl = _interopRequireWildcard(_raddle);

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

for (var k in fn.booleans) fn[k] = fn.booleans[k];

const typemap = exports.typemap = n.map(n.seq(n.pair(n.string("boolean"), n.integer(0)), n.pair(n.string("integer"), n.integer(0)), n.pair(n.string("decimal"), n.integer(0)), n.pair(n.string("string"), n.integer(0)), n.pair(n.string("item"), n.integer(0)), n.pair(n.string("anyURI"), n.integer(0)), n.pair(n.string("map"), n.integer(2)), n.pair(n.string("anon"), n.integer(2)), n.pair(n.string("array"), n.integer(1)), n.pair(n.string("element"), n.integer(1)), n.pair(n.string("attribute"), n.integer(1))));

const nativeOps = exports.nativeOps = n.seq(n.string("or"), n.string("and"), n.string("eq"), n.string("ne"), n.string("lt"), n.string("le"), n.string("gt"), n.string("ge"), n.string("add"), n.string("subtract"), n.string("plus"), n.string("minus"), n.string("multiply"), n.string("div"), n.string("mod"), n.string("geq"), n.string("gne"), n.string("ggt"), n.string("glt"), n.string("gge"), n.string("gle"), n.string("concat"), n.string("filter"), n.string("filter-at"), n.string("for-each"), n.string("for-each-at"), n.string("to"), n.string("instance-of"));

const autoConverted = exports.autoConverted = n.map(n.seq(n.pair(n.string("true"), n.string("true()")), n.pair(n.string("false"), n.string("false()")), n.pair(n.string("null"), n.string("()")), n.pair(n.string("undefined"), n.string("()")), n.pair(n.string("Infinity"), n.string("1 div 0e0")), n.pair(n.string("-Infinity"), n.string("-1 div 0e0"))));

function xqVersion(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("frame"), $.item("version"));
        return n.item(n.concat(n.concat(n.string("/* xquery version "), $.get("version")), n.string(" */")));
    }
    return n.error(xqVersion, $_l);
}

function isFnSeq(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("value"));
        return $.test(n.instanceOf($.get("value"), n.string())) ? fn.concat(n.string("isFnSeq("), $.get("value"), n.string(")")) : $.test(n.eq(array.size($.get("value")), n.integer(0))) ? n.seq() : array.flatten(array.forEach($.get("value"), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("_"));
                return n.item($.test(n.instanceOf($.get("_"), n.map())) ? isFnSeq(n.call($.get("_"), n.string("args"))) : $.test(n.and(n.instanceOf($.get("_"), n.string()), fn.matches($.get("_"), n.string("^\\.$|^\\$$")))) ? $.get("_") : n.seq());
            }
            return n.error($_l);
        }));
    }
    return n.error(isFnSeq, $_l);
}

function isCaller(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("args"));
        return $.test(n.instanceOf($.get("args"), n.string())) ? fn.concat(n.string("isCaller("), $.get("args"), n.string(")")) : a.foldLeft($.get("args"), fn.false(), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 2) {
                $.init($.item("pre"), $.item("arg"));
                return n.item(n.or($.get("pre"), n.seq(n.and(n.instanceOf($.get("arg"), n.map()), n.eq(n.call($.get("arg"), n.string("name")), n.string(""))))));
            }
            return n.error($_l);
        });
    }
    return n.error(isCaller, $_l);
}

function processArgs(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("frame"), $.item("args"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("processArgs("), $.get("frame"), n.string(","), $.get("args"), n.string(")")) : ($.item("name", n.call($.get("frame"), n.string("$caller"))), $.item("isInit", fn.matches($.get("name"), n.string("^core:init"))), $.item("isDefn", n.geq($.get("name"), n.seq(n.string("core:define-private#6"), n.string("core:define#6")))), $.item("isAnon", n.eq($.get("name"), n.string("core:anon#4"))), $.item("isTypegen", fn.matches($.get("name"), n.concat(n.concat(n.string("^core:(typegen|"), fn.stringJoin(map.keys(typemap), n.string("|"))), n.string(")")))), a.foldLeftAt($.get("args"), n.array(n.seq()), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 3) {
                $.init($.item("pre"), $.item("arg"), $.item("at"));
                return n.item($.test(n.instanceOf($.get("arg"), n.array(n.item()))) ? ($.item("isParams", n.or(n.seq(n.and($.get("isDefn"), n.geq($.get("at"), n.integer(4)))), n.seq(n.and($.get("isAnon"), n.geq($.get("at"), n.integer(1)))))), $.item("isBody", n.or(n.seq(n.and($.get("isDefn"), n.geq($.get("at"), n.integer(6)))), n.seq(n.and($.get("isAnon"), n.geq($.get("at"), n.integer(3)))))), $.item("fnSeq", isFnSeq($.get("arg"))), $.item("isFnSeq", n.ggt(fn.count($.get("fnSeq")), n.integer(0))), array.append($.get("pre"), $.test($.get("isParams")) ? $.get("arg") : $.test(n.and(n.geq($.get("isFnSeq"), fn.false()), n.geq($.get("isBody"), fn.false()))) ? a.forEachAt($.get("arg"), function (...$_a) {
                    var $_l = $_a.length;
                    $ = n.frame($, $_a);
                    if ($_l == 2) {
                        $.init($.item("_"), $.item("at"));
                        return n.item($.test(n.instanceOf($.get("_"), n.array(n.item()))) ? processTree($.get("_"), $.get("frame")) : processValue($.get("_"), map.put($.get("frame"), n.string("$at"), $.get("at"))));
                    }
                    return n.error($_l);
                }) : ($.item("ret", processTree($.get("arg"), $.get("frame"), n.and($.get("isBody"), $.get("isFnSeq")), n.string(""), $.get("at"), $.test($.get("isBody")) ? n.call($.get("pre"), n.subtract($.get("at"), n.integer(1))) : n.seq())), $.test(n.geq($.get("fnSeq"), n.string("."))) ? fn.concat(n.string("function($_0) { return "), $.get("ret"), n.string(";}")) : $.test($.get("isFnSeq")) ? $.get("ret") : $.get("ret")))) : $.test(n.instanceOf($.get("arg"), n.map())) ? ($.item("s", array.size($.get("pre"))), $.test(n.and(n.and(n.ne(n.call($.get("arg"), n.string("name")), n.string("")), n.ggt(array.size($.get("args")), $.get("at"))), isCaller(array.subarray($.get("args"), n.add($.get("at"), n.integer(1)))))) ? array.append($.get("pre"), n.map(n.seq(n.pair(n.string("name"), n.string("core:call")), n.pair(n.string("args"), n.array(n.seq(n.call($.get("arg"), n.string("name")), n.map(n.seq(n.pair(n.string("name"), n.string("")), n.pair(n.string("args"), n.call($.get("arg"), n.string("args"))))))))))) : $.test(n.and(n.eq(n.call($.get("arg"), n.string("name")), n.string("")), n.ggt($.get("s"), n.integer(1)))) ? ($.item("last", n.call($.get("pre"), $.get("s"))), $.test(n.and(n.instanceOf($.get("last"), n.map()), n.eq(n.call($.get("last"), n.string("name")), n.string("core:call")))) ? a.put($.get("pre"), $.get("s"), n.map(n.seq(n.pair(n.string("name"), n.string("core:call")), n.pair(n.string("args"), n.array(n.seq($.get("last"), n.map(n.seq(n.pair(n.string("name"), n.string("")), n.pair(n.string("args"), n.call($.get("arg"), n.string("args"))))))))))) : array.append($.get("pre"), processValue($.get("arg"), $.get("frame")))) : array.append($.get("pre"), processValue($.get("arg"), $.get("frame")))) : $.test(n.eq($.get("arg"), n.string("."))) ? array.append($.get("pre"), n.string("$_0")) : $.test(n.eq($.get("arg"), n.string("$"))) ? array.append($.get("pre"), $.get("frame")) : $.test(fn.matches($.get("arg"), n.concat(n.concat(n.string("^\\$["), rdl.ncname), n.string("]+$")))) ? array.append($.get("pre"), $.test(fn.matches($.get("arg"), n.string("^\\$\\p{N}"))) ? fn.replace($.get("arg"), n.string("^\\$"), n.string("\\$_")) : serialize(n.array(n.seq($.get("arg"), $.get("frame"))))) : $.test(n.or(n.seq(n.and(n.seq(n.or($.get("isDefn"), $.get("isTypegen"))), n.eq($.get("at"), n.integer(2)))), n.seq(n.and($.get("isInit"), n.eq($.get("at"), n.integer(1)))))) ? array.append($.get("pre"), $.get("arg")) : $.test(fn.matches($.get("arg"), n.concat(n.concat(n.string("^_["), rdl.suffix), n.string("]?$")))) ? array.append($.get("pre"), fn.replace($.get("arg"), n.string("^_"), n.concat(n.string("_"), n.call($.get("frame"), n.string("$at"))))) : array.append($.get("pre"), serialize(n.array(n.seq($.get("arg"), $.get("frame"))))));
            }
            return n.error($_l);
        })));
    }
    return n.error(processArgs, $_l);
}

function native(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("op"), $.item("a"));
        return n.item(fn.concat(n.string("n."), rdl.camelCase($.get("op")), n.string("("), $.get("a"), n.string(")")));
    }

    if ($_l == 3) {
        $.init($.item("op"), $.item("a"), $.item("b"));
        return n.item(fn.concat(n.string("n."), rdl.camelCase($.get("op")), n.string("("), $.get("a"), n.string(","), $.get("b"), n.string(")")));
    }
    return n.error(native, $_l);
}

function pair(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("key"), $.item("val"));
        return n.item(fn.concat(n.string("n.pair("), $.get("key"), n.string(","), $.get("val"), n.string(")")));
    }
    return n.error(pair, $_l);
}

function _init(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("name"), $.item("a"));
        return n.item($.test(n.instanceOf($.get("a"), n.string())) ? fn.concat(n.string("_init("), $.get("name"), n.string(","), $.get("a"), n.string(")")) : ($.item("private", fn.false()), $.item("parts", fn.tokenize(rdl.clip($.get("name")), n.string(":"))), $.item("fname", rdl.camelCase(n.filter($.get("parts"), function ($_0) {
            return n.geq(fn.position($_0), fn.last($_0));
        }))), fn.concat($.test($.get("private")) ? n.string("") : n.string("export "), n.string("function "), $.get("fname"), n.string("(...$_a) {&#13;&#9;"), n.string("var $_l = $_a.length,&#13;&#9;&#9;"), n.string("$ = n.frame($_a);&#13;&#9;"), fn.stringJoin(array.flatten($.get("a")), n.string("&#13;")), n.string("&#13;&#9;"), n.string("return n.error("), $.get("fname"), n.string(",$_l);&#13;}"))));
    }
    return n.error(_init, $_l);
}

function init(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("name"), $.item("a"));
        return n.item(_init($.get("name"), n.array(n.seq($.get("a")))));
    }

    if ($_l == 3) {
        $.init($.item("name"), $.item("a"), $.item("b"));
        return n.item(_init($.get("name"), n.array(n.seq($.get("a"), $.get("b")))));
    }

    if ($_l == 4) {
        $.init($.item("name"), $.item("a"), $.item("b"), $.item("c"));
        return n.item(_init($.get("name"), n.array(n.seq($.get("a"), $.get("b"), $.get("c")))));
    }

    if ($_l == 5) {
        $.init($.item("name"), $.item("a"), $.item("b"), $.item("c"), $.item("d"));
        return n.item(_init($.get("name"), n.array(n.seq($.get("a"), $.get("b"), $.get("c"), $.get("d")))));
    }

    if ($_l == 6) {
        $.init($.item("name"), $.item("a"), $.item("b"), $.item("c"), $.item("d"), $.item("e"));
        return n.item(_init($.get("name"), n.array(n.seq($.get("a"), $.get("b"), $.get("c"), $.get("d"), $.get("e")))));
    }

    if ($_l == 7) {
        $.init($.item("name"), $.item("a"), $.item("b"), $.item("c"), $.item("d"), $.item("e"), $.item("f"));
        return n.item(_init($.get("name"), n.array(n.seq($.get("a"), $.get("b"), $.get("c"), $.get("d"), $.get("e"), $.get("f")))));
    }
    return n.error(init, $_l);
}

function transpile(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("value"), $.item("frame"));
        return $.item("frame", map.put($.get("frame"), n.string("$tree"), $.get("value"))), $.item("distinct", a.foldLeftAt($.get("value"), n.map(n.seq()), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 3) {
                $.init($.item("pre"), $.item("cur"), $.item("i"));
                return n.item($.test(n.geq(n.call($.get("cur"), n.string("name")), n.seq(n.string("core:define"), n.string("core:define-private")))) ? ($.item("name", n.call(n.call(n.string("core:call"), n.seq($.get("cur"), n.seq(n.string("args")))), n.seq(n.integer(2)))), $.test(map.contains($.get("pre"), $.get("name"))) ? $.get("pre") : map.put($.get("pre"), $.get("name"), $.get("i"))) : $.get("pre"));
            }
            return n.error($_l);
        })), $.item("value", array.filter(a.foldLeftAt($.get("value"), n.array(n.seq()), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 3) {
                $.init($.item("pre"), $.item("cur"), $.item("i"));
                return n.item($.test(n.geq(n.call($.get("cur"), n.string("name")), n.seq(n.string("core:define"), n.string("core:define-private")))) ? ($.item("name", n.call(n.call(n.string("core:call"), n.seq($.get("cur"), n.seq(n.string("args")))), n.seq(n.integer(2)))), $.item("index", n.call($.get("distinct"), $.get("name"))), $.test(n.eq($.get("index"), $.get("i"))) ? array.append($.get("pre"), n.map(n.seq(n.pair(n.string("name"), n.string("core:init")), n.pair(n.string("args"), n.array(n.seq($.get("name"), $.get("cur")))), n.pair(n.string("suffix"), n.string(""))))) : ($.item("last", n.call($.get("pre"), $.get("index"))), a.put(array.append($.get("pre"), n.seq()), $.get("index"), n.map(n.seq(n.pair(n.string("name"), n.string("core:init")), n.pair(n.string("args"), array.append(n.call($.get("last"), n.string("args")), $.get("cur"))), n.pair(n.string("suffix"), n.string(""))))))) : array.append($.get("pre"), $.get("cur")));
            }
            return n.error($_l);
        }), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("a"));
                return n.item(fn.exists($.get("a")));
            }
            return n.error($_l);
        })), n.item(processTree($.get("value"), $.get("frame"), fn.true()));
    }
    return n.error(transpile, $_l);
}

function processTree(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("tree"), $.item("frame"));
        var ret = n.item($.test(n.instanceOf($.get("tree"), n.string())) ? fn.concat(n.string("processTree("), $.get("tree"), n.string(","), $.get("frame"), n.string(")")) : processTree($.get("tree"), $.get("frame"), fn.false()));
        return ret;
    }

    if ($_l == 3) {
        $.init($.item("tree"), $.item("frame"), $.item("top"));
        return n.item($.test(n.instanceOf($.get("tree"), n.string())) ? fn.concat(n.string("processTree("), $.get("tree"), n.string(","), $.get("frame"), n.string(","), $.get("top"), n.string(")")) : processTree($.get("tree"), $.get("frame"), $.get("top"), n.string(""), n.integer(1), n.seq()));
    }

    if ($_l == 5) {
        $.init($.item("tree"), $.item("frame"), $.item("top"), $.item("ret"), $.item("at"));
        return n.item($.test(n.instanceOf($.get("tree"), n.string())) ? fn.concat(n.string("processTree("), $.get("tree"), n.string(","), $.get("frame"), n.string(","), $.get("top"), n.string(","), $.get("ret"), n.string(","), $.get("at"), n.string(")")) : processTree($.get("tree"), $.get("frame"), $.get("top"), $.get("ret"), $.get("at"), n.seq()));
    }

    if ($_l == 6) {
        $.init($.item("tree"), $.item("frame"), $.item("top"), $.item("ret"), $.item("at"), $.item("seqtype"));

        return n.item($.test(n.instanceOf($.get("tree"), n.string())) ? fn.concat(n.string("processTree("), $.get("tree"), n.string(","), $.get("frame"), n.string(","), $.get("top"), n.string(","), $.get("ret"), n.string(","), $.get("at"), n.string(","), $.get("seqtype"), n.string(")")) :
        $.test(n.ggt(array.size($.get("tree")), n.integer(0))) ?
        ($.item("frame", map.put($.get("frame"), n.string("$at"), $.get("at"))),
        $.item("head", array.head($.get("tree"))),
        $.item("frame", $.test(n.and(n.instanceOf($.get("head"), n.map()), n.eq(n.call($.get("head"), n.string("name")), n.string("core:module")))) ?
        map.put($.get("frame"), n.string("$prefix"), n.call(n.call(n.seq($.get("head"), n.seq(n.string("args")))), n.seq(n.integer(2)))) :
        $.get("frame")), $.item("val", processValue($.get("head"), $.get("frame"))), $.item("isBody", n.or(n.seq(n.geq(n.call($.get("frame"), n.string("$caller")), n.seq(n.string("core:define#6"), n.string("core:define-private#6")))), n.seq(n.geq(n.call($.get("frame"), n.string("$caller")), n.string("core:anon#4"))))), $.item("isSeq", n.instanceOf($.get("val"), n.array(n.item()))), $.item("val", $.test($.get("isSeq")) ? ($.item("s", array.size($.get("val"))), fn.concat(n.string("("), a.foldLeftAt($.get("val"), n.string(""), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 3) {
                $.init($.item("pre"), $.item("cur"), $.item("at"));
                return n.item(fn.concat($.get("pre"), $.test(n.and($.get("seqtype"), n.eq($.get("at"), $.get("s")))) ? fn.concat(n.string(",&#13;"), fn.substring($.get("seqtype"), n.integer(1), n.subtract(fn.stringLength($.get("seqtype")), n.integer(1))), $.get("cur"), n.string(")")) : fn.concat($.test(n.ggt($.get("at"), n.integer(1))) ? n.string(",&#13;") : n.string(""), $.get("cur"))));
            }
            return n.error($_l);
        }), n.string(")"))) : $.test(n.and(n.eq($.get("top"), fn.false()), $.get("isBody"))) ? $.test($.get("seqtype")) ? fn.concat(fn.substring($.get("seqtype"), n.integer(1), n.subtract(fn.stringLength($.get("seqtype")), n.integer(1))), $.get("val"), n.string(")")) : $.get("val") : $.get("val")), $.item("ret", fn.concat($.get("ret"), $.test(n.and(n.and(n.ne($.get("ret"), n.string("")), n.ggt($.get("at"), n.integer(1))), n.geq($.get("isBody"), fn.false()))) ? $.test($.get("top")) ? n.string("&#10;&#13;") : n.string(",&#10;&#13;") : n.string(""), $.get("val"))), processTree(array.tail($.get("tree")), $.get("frame"), $.get("top"), $.get("ret"), n.add($.get("at"), n.integer(1)), n.seq())) : $.test(n.geq($.get("at"), n.integer(1))) ? n.string("n.seq()") : $.get("ret"));
    }
    return n.error(processTree, $_l);
}

function resolveModule(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("tree"), $.item("name"));
        return $.test(n.instanceOf($.get("tree"), n.map())) ? $.test(n.and(n.eq(n.call($.get("tree"), n.string("name")), n.string("core:define")), n.call($.get("tree"), n.string("args")))) ? n.eq(n.seq(n.integer(2)), $.get("name")) : $.get("tree") : $.test(n.instanceOf($.get("tree"), n.array(n.item()))) ? array.flatten(array.forEach($.get("tree"), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("arg"));
                return n.item();
            }
            return n.error($_l);
        })) : n.seq();
    }
    return n.error(resolveModule, $_l);
}

function call(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("a"), $.item("b"));
        return n.item(fn.concat(n.string("n.call("), $.get("a"), n.string(","), $.get("b"), n.string(")")));
    }
    return n.error(call, $_l);
}

function processValue(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("value"), $.item("frame"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ?
            fn.concat(n.string("processValue("), $.get("value"), n.string(","), $.get("frame"), n.string(")")) :
            $.test(n.instanceOf($.get("value"), n.map())) ?
            ($.item("name", n.call($.get("value"), n.string("name"))), $.item("args", n.call($.get("value"), n.string("args"))), $.item("s", $.test(map.contains($.get("value"), n.string("args"))) ?
            array.size($.get("args")) :
            n.integer(0)), $.test(map.contains($.get("value"), n.string("$tree"))) ? n.string("") :
            $.test(fn.matches($.get("name"), n.concat(n.concat(n.string("^core:["), rdl.ncname), n.string("]+$")))) ?
            ($.item("local", fn.replace($.get("name"), n.string("^core:"), n.string(""))), $.item("isType", n.geq($.get("local"), map.keys(typemap))), $.item("isNative", n.geq(nativeOps, $.get("local"))), $.item("s", $.test(n.or($.get("isType"), $.get("isNative"))) ? n.add($.get("s"), n.integer(1)) :
            $.get("s")), $.item("isDefn", n.geq($.get("local"), n.seq(n.string("define"), n.string("define-private")))), $.item("isFn", n.or(n.seq(n.and($.get("isDefn"), n.eq($.get("s"), n.integer(6)))), n.seq(n.and(n.eq($.get("local"), n.string("anon")), n.eq($.get("s"), n.integer(4)))))), $.item("frame", map.put($.get("frame"), n.string("$caller"), fn.concat($.get("name"), n.string("#"), $.get("s")))), $.item("args", processArgs($.get("frame"), $.get("args"))), $.item("args", $.test(n.or($.get("isType"), $.get("isNative"))) ?
            array.insertBefore($.get("args"), n.integer(1), $.get("local")) : $.get("args")), $.item("args", a.forEach($.get("args"), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("_"));
                console.log($.get("_"));
                return n.item($.test(n.and(n.instanceOf($.get("_"), n.array(n.item())), fn.not($.get("isFn")))) ? fn.concat(n.string("n.seq("), fn.stringJoin(array.flatten($.get("_")), n.string(",")), n.string(")")) :
                    $.test(n.and(n.instanceOf($.get("_"), n.map()),
                        n.eq(n.call($.get("_"), n.string("name")), n.string("core:call"))
                    )) ? processValue($.get("_"), $.get("frame")) : $.get("_"));
            }
            return n.error($_l);
        })), $.item("s", array.size($.get("args"))),
        console.log($.get("args")),
        $.item("fn", $.test($.get("isType")) ?
            ($.item("a", n.call(typemap, $.get("local"))), $.item("f", fn.concat(n.string("core:typegen"), $.test(n.ggt($.get("a"), n.integer(0))) ?
            $.get("a") :
            n.string(""))),
            exports[$.get("f").first().split(/:/)[1]]) : //fn.functionLookup(fn.QName(n.string("http://raddle.org/javascript"), $.get("f")), $.get("s"))) :
        $.test($.get("isNative")) ?
        native : //fn.functionLookup(fn.QName(n.string("http://raddle.org/javascript"), n.string("core:native")), $.get("s")) :
        exports[$.get("name").first().split(/:/)[1]]), //fn.functionLookup(fn.QName(n.string("http://raddle.org/javascript"), $.get("name")), $.get("s"))),
        $.item("n", $.test(fn.empty($.get("fn"))) ?
        console.log(n.seq($.get("name"), n.string("#"), array.size($.get("args")), n.string(","), $.get("args"))) : n.seq()), fn.apply($.get("fn"), $.get("args"))) :
        $.test(n.eq($.get("name"), n.string(""))) ?
        ($.item("args", processArgs(map.put($.get("frame"), n.string("$caller"), n.string("")), $.get("args"))), a.forEach($.get("args"), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("_"));
                return n.item($.test(n.instanceOf($.get("_"), n.array(n.item()))) ? fn.concat(n.string("n.seq("), fn.stringJoin(array.flatten($.get("_")), n.string(",")), n.string(")")) : $.test(n.and(n.instanceOf($.get("_"), n.map()), n.eq(n.call($.get("_"), n.string("name")), n.string("core:call")))) ? processValue($.get("_"), $.get("frame")) : $.get("_"));
            }
            return n.error($_l);
        })) : ($.item("frame", map.put($.get("frame"), n.string("$caller"), fn.concat($.get("name"), n.string("#"), $.get("s")))), $.item("args", processArgs($.get("frame"), $.get("args"))), $.item("ret", a.foldLeftAt($.get("args"), n.string(""), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 3) {
                $.init($.item("pre"), $.item("cur"), $.item("at"));
                return n.item(fn.concat($.get("pre"), $.test(n.ggt($.get("at"), n.integer(1))) ? n.string(",") : n.string(""), $.test(n.instanceOf($.get("cur"), n.array(n.item()))) ? fn.concat(n.string("n.seq("), fn.stringJoin(array.flatten($.get("cur")), n.string(",")), n.string(")")) : $.test(n.instanceOf($.get("cur"), n.map())) ? processValue($.get("cur"), $.get("frame")) : $.get("cur")));
            }
            return n.error($_l);
        })), $.test(fn.matches($.get("name"), n.string("^(\\$.*)$|^([^#]+#[0-9]+)$"))) ? fn.concat(n.string("n.call("), convert($.get("name"), $.get("frame")), n.string(","), $.get("ret"), n.string(")")) : fn.concat(anonName($.get("frame"), $.get("name"), $.get("s"), n.string("fn")), n.string("("), $.get("ret"), n.string(")")))) : $.test(n.instanceOf($.get("value"), n.array(n.item()))) ? fn.concat(n.string("n.seq("), processTree($.get("value"), $.get("frame")), n.string(")")) : $.test(fn.matches($.get("value"), n.concat(n.concat(n.string("^_["), rdl.suffix), n.string("]?$")))) ? fn.replace($.get("value"), n.string("^_"), n.concat(n.string("\\$_"), n.call($.get("frame"), n.string("$at")))) : serialize(n.array(n.seq($.get("value"), $.get("frame")))));
    }
    return n.error(processValue, $_l);
}

function isCurrentModule(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("frame"), $.item("name"));
        return n.item(fn.concat(n.string("isCurrentModule("), $.get("frame"), n.string(","), $.get("name"), n.string(")")));
    }
    return n.error(isCurrentModule, $_l);
}

function convert(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("string"), $.item("frame"));
        //console.log($.get("string"),fn.matches($.get("string"), n.string("^(&quot;[^&quot;]*&quot;)$")));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("convert("), $.get("string"), n.string(","), $.get("frame"), n.string(")")) : $.test(fn.matches($.get("string"), n.string("^n\\.call"))) ? $.get("string") : $.test(fn.matches($.get("string"), n.string("^(\\$.*)$|^([^#]+#[0-9]+)$"))) ? ($.item("parts", fn.tokenize(rdl.camelCase(fn.replace($.get("string"), n.string("#\\p{N}+$"), n.string(""))), n.string(":"))), $.test(n.eq(fn.count($.get("parts")), n.integer(1))) ? fn.concat(n.string("$.get(&quot;"), fn.replace($.get("parts"), n.string("^\\$"), n.string("")), n.string("&quot;)")) : $.test(fn.matches(n.filter($.get("parts"), function ($_0) {
            return n.geq(fn.position($_0), n.integer(1));
        }), fn.concat(n.string("^\\$?"), n.call($.get("frame"), n.string("$prefix"))))) ? fn.replace(n.filter($.get("parts"), function ($_0) {
            return n.geq(fn.position($_0), fn.last($_0));
        }), n.string("\\$"), n.string("")) : fn.concat(fn.replace(n.filter($.get("parts"), function ($_0) {
            return n.geq(fn.position($_0), n.integer(1));
        }), n.string("\\$"), n.string("")), n.string("."), n.filter($.get("parts"), function ($_0) {
            return n.geq(fn.position($_0), n.integer(2));
        }))) : $.test(fn.matches($.get("string"), n.string("^(&quot;[^&quot;]*&quot;)$"))) ?
            fn.concat(n.string("n.string("), fn.replace($.get("string"), n.string("\\\\"), n.string("\\\\\\\\")), n.string(")")) :
            $.test(map.contains(autoConverted, $.get("string"))) ?
            n.call(autoConverted, $.get("string")) :
            $.test(n.geq(fn.string(fn.number($.get("string"))), NaN)) ? fn.concat(n.string("n.string(&quot;"), fn.replace($.get("string"), n.string("\\\\"), n.string("\\\\\\\\")), n.string("&quot;)")) : $.test(fn.matches($.get("string"), n.string("\\."))) ? fn.concat(n.string("n.decimal("), $.get("string"), n.string(")")) : fn.concat(n.string("n.integer("), $.get("string"), n.string(")")));
    }
    return n.error(convert, $_l);
}

function serialize(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("args"));
        return n.item($.test(n.instanceOf($.get("args"), n.string())) ?
        fn.concat(n.string("serialize("), $.get("args"), n.string(")")) :
        (
            $.item("value", n.call($.get("args"), n.integer(1))), $.item("params", n.call($.get("args"), n.integer(2))), $.test(n.instanceOf($.get("value"), n.map())) ?
            fn.concat(n.call($.get("value"), n.string("name")), $.test(map.contains($.get("value"), n.string("args"))) ? serialize(n.array(n.seq(n.call($.get("value"), n.string("args")), $.get("params")))) :
                n.string("()"), $.test(map.contains($.get("value"), n.string("suffix"))) ? n.call($.get("value"), n.string("suffix")) :
                n.string("")
            ) :
            $.test(n.instanceOf($.get("value"), n.array(n.item()))) ? fn.concat(n.string("("), a.foldLeftAt($.get("value"), n.string(""), function (...$_a) {
                var $_l = $_a.length;
                $ = n.frame($, $_a);
                if ($_l == 3) {
                    $.init($.item("pre"), $.item("cur"), $.item("at"));
                    return $.item("isSeq", n.seq(n.and(n.instanceOf($.get("cur"), n.map()), n.eq(n.call($.get("cur"), n.string("name")), n.string(""))))), n.item(fn.concat($.get("pre"), $.test(n.and(n.ggt($.get("at"), n.integer(1)), n.geq($.get("isSeq"), fn.false()))) ? n.string(",") : n.string(""), serialize(n.array(n.seq($.get("cur"), $.get("params"))))));
                }
                return n.error($_l);
            }), n.string(")")) : convert($.get("value"), $.get("params"))
        ));
    }
    return n.error(serialize, $_l);
}

function resolveFunction(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("frame"), $.item("name"));
        return n.item(fn.concat(n.string("resolveFunction("), $.get("frame"), n.string(","), $.get("name"), n.string(")")));
    }

    if ($_l == 3) {
        $.init($.item("frame"), $.item("name"), $.item("self"));
        return n.item(fn.concat(n.string("resolveFunction("), $.get("frame"), n.string(","), $.get("name"), n.string(","), $.get("self"), n.string(")")));
    }
    return n.error(resolveFunction, $_l);
}

function _module(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 4) {
        $.init($.item("frame"), $.item("prefix"), $.item("ns"), $.item("desc"));
        return n.item(fn.concat(n.string("/*module namespace "), rdl.clip($.get("prefix")), n.string("="), $.get("ns"), n.string(";&#10;&#13;"), $.get("desc"), n.string("*/")));
    }
    return n.error(_module, $_l);
}

exports.module = _module;
function namespace(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 3) {
        $.init($.item("frame"), $.item("prefix"), $.item("ns"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("namespace("), $.get("frame"), n.string(","), $.get("prefix"), n.string(","), $.get("ns"), n.string(")")) : fn.concat(n.string("//declare namespace "), rdl.clip($.get("prefix")), n.string(" = "), $.get("ns")));
    }
    return n.error(namespace, $_l);
}

function ximport(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 3) {
        $.init($.item("frame"), $.item("prefix"), $.item("ns"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("ximport("), $.get("frame"), n.string(","), $.get("prefix"), n.string(","), $.get("ns"), n.string(")")) : fn.concat(n.string("import * as "), rdl.clip($.get("prefix")), n.string(" from "), $.get("ns")));
    }

    if ($_l == 4) {
        $.init($.item("frame"), $.item("prefix"), $.item("ns"), $.item("loc"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("ximport("), $.get("frame"), n.string(","), $.get("prefix"), n.string(","), $.get("ns"), n.string(","), $.get("loc"), n.string(")")) : fn.concat(n.string("import * as "), rdl.clip($.get("prefix")), n.string(" from "), fn.replace($.get("loc"), n.string("(\\.xql|\\.rdl)&quot;$"), n.string(".js&quot;")), n.string("")));
    }
    return n.error(ximport, $_l);
}

function anonName(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 4) {
        $.init($.item("frame"), $.item("name"), $.item("arity"), $.item("default-prefix"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("anonName("), $.get("frame"), n.string(","), $.get("name"), n.string(","), $.get("arity"), n.string(","), $.get("defaultPrefix"), n.string(")")) : ($.item("prefix", n.call($.get("frame"), n.string("$prefix"))), $.item("p", fn.tokenize($.get("name"), n.string(":"))), $.item("prefix", $.test(n.eq(n.filter($.get("p"), function ($_0) {
            return n.geq(fn.position($_0), n.subtract(fn.last($_0), n.integer(1)));
        }), $.get("prefix"))) ? n.seq() : $.test(n.filter($.get("p"), function ($_0) {
            return n.geq(fn.position($_0), n.subtract(fn.last($_0), n.integer(1)));
        })) ? n.filter($.get("p"), function ($_0) {
            return n.geq(fn.position($_0), n.subtract(fn.last($_0), n.integer(1)));
        }) : $.get("defaultPrefix")), fn.concat(n.string(""), rdl.camelCase($.get("prefix")), $.test($.get("prefix")) ? n.string(".") : n.string(""), rdl.camelCase(n.filter($.get("p"), function ($_0) {
            return n.geq(fn.position($_0), fn.last($_0));
        })))));
    }
    return n.error(anonName, $_l);
}

function xvar(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 4) {
        $.init($.item("frame"), $.item("name"), $.item("def"), $.item("body"));
        return n.item(fn.concat(n.string("export const "), $.get("name"), n.string(" = "), $.get("body"), n.string(";")));
    }
    return n.error(xvar, $_l);
}

function define(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 5) {
        $.init($.item("frame"), $.item("name"), $.item("def"), $.item("args"), $.item("type"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("define("), $.get("frame"), n.string(","), $.get("name"), n.string(","), $.get("def"), n.string(","), $.get("args"), n.string(","), $.get("type"), n.string(")")) : define($.get("frame"), $.get("name"), $.get("def"), $.get("args"), $.get("type"), n.string("")));
    }

    if ($_l == 6) {
        $.init($.item("frame"), $.item("name"), $.item("def"), $.item("args"), $.item("type"), $.item("body"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("define("), $.get("frame"), n.string(","), $.get("name"), n.string(","), $.get("def"), n.string(","), $.get("args"), n.string(","), $.get("type"), n.string(","), $.get("body"), n.string(")")) : define($.get("frame"), $.get("name"), $.get("def"), $.get("args"), $.get("type"), $.get("body"), fn.false()));
    }

    if ($_l == 7) {
        $.init($.item("frame"), $.item("name"), $.item("def"), $.item("args"), $.item("type"), $.item("body"), $.item("private"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("define("), $.get("frame"), n.string(","), $.get("name"), n.string(","), $.get("def"), n.string(","), $.get("args"), n.string(","), $.get("type"), n.string(","), $.get("body"), n.string(","), $.get("private"), n.string(")")) : ($.item("params", array.flatten(a.forEach($.get("args"), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("_"));
                return n.item($.test(n.instanceOf($.get("_"), n.map())) ? ($.item("args", n.call($.get("_"), n.string("args"))), $.item("param", n.call($.get("args"), n.integer(2))), fn.concat(fn.replace(n.call($.get("_"), n.string("name")), n.string("core:"), n.string("\\$.")), n.string("("), fn.stringJoin(fn.forEach($.get("param"), function (...$_a) {
                    var $_l = $_a.length;
                    $ = n.frame($, $_a);
                    if ($_l == 1) {
                        $.init($.item("_"));
                        return n.item(fn.concat(n.string("&quot;"), $.get("_"), n.string("&quot;")));
                    }
                    return n.error($_l);
                }), n.string(",")), n.string(")"))) : $.test(n.instanceOf($.get("_"), n.string())) ? fn.concat(n.string("$.item(&quot;"), fn.replace($.get("_"), n.string("^\\$"), n.string("")), n.string("&quot;)")) : n.seq());
            }
            return n.error($_l);
        }))), $.item("parts", fn.tokenize(rdl.clip($.get("name")), n.string(":"))), $.item("fname", rdl.camelCase(n.filter($.get("parts"), function ($_0) {
            return n.geq(fn.position($_0), fn.last($_0));
        }))), fn.concat(n.string("&#13;&#9;if($_l=="), fn.count($.get("params")), n.string("){&#13;&#9;&#9;"), n.string("$.init("), fn.stringJoin($.get("params"), n.string(",")), n.string(");&#13;&#9;&#9;"), n.string("return "), $.get("body"), n.string(";&#13;&#9;}"))));
    }
    return n.error(define, $_l);
}

function definePrivate(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 6) {
        $.init($.item("frame"), $.item("name"), $.item("def"), $.item("args"), $.item("type"), $.item("body"));
        return n.item($.test(n.instanceOf($.get("frame"), n.string())) ? fn.concat(n.string("definePrivate("), $.get("frame"), n.string(","), $.get("name"), n.string(","), $.get("def"), n.string(","), $.get("args"), n.string(","), $.get("type"), n.string(","), $.get("body"), n.string(")")) : define($.get("frame"), $.get("name"), $.get("def"), $.get("args"), $.get("type"), $.get("body"), fn.true()));
    }
    return n.error(definePrivate, $_l);
}

function describe(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 5) {
        $.init($.item("frame"), $.item("name"), $.item("def"), $.item("args"), $.item("type"));
        return n.item(n.string("n.map()"));
    }
    return n.error(describe, $_l);
}

function anon(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 3) {
        $.init($.item("args"), $.item("type"), $.item("body"));
        return n.item($.test(n.instanceOf($.get("args"), n.string())) ? fn.concat(n.string("anon("), $.get("args"), n.string(","), $.get("type"), n.string(","), $.get("body"), n.string(")")) : ($.item("params", array.flatten(a.forEach($.get("args"), function (...$_a) {
            var $_l = $_a.length;
            $ = n.frame($, $_a);
            if ($_l == 1) {
                $.init($.item("_"));
                return $.test(n.instanceOf($.get("_"), n.map())) ? fn.concat(fn.replace(n.call($.get("_"), n.string("name")), n.string("core:"), n.string("\\$.")), n.string("("), fn.stringJoin(fn.forEach(array.flatten(array.tail(n.call($.get("_"), n.string("args")))), function (...$_a) {
                    var $_l = $_a.length;
                    $ = n.frame($, $_a);
                    if ($_l == 1) {
                        $.init($.item("_"));
                        return n.item(fn.concat(n.string("&quot;"), $.get("_"), n.string("&quot;")));
                    }
                    return n.error($_l);
                }), n.string(",")), n.string(")")) : $.test(n.instanceOf($.get("_"), n.string())) ? fn.concat(n.string("$.item(&quot;"), fn.replace($.get("_"), n.string("^\\$"), n.string("")), n.string("&quot;)")) : n.seq();
            }
            return n.error($_l);
        }))), fn.concat(n.string("function(...$_a){&#13;&#9;"), n.string("var $_l = $_a.length;&#13;&#9;"), n.string("$ = n.frame($,$_a);&#13;"), n.string("if($_l=="), fn.count($.get("params")), n.string("){&#13;&#9;"), n.string("$.init("), fn.stringJoin($.get("params"), n.string(",")), n.string(");&#13;&#9;&#9;"), n.string("return "), $.get("body"), n.string(";&#13;    }&#13;&#9;"), n.string("return n.error($_l);&#13;}"))));
    }
    return n.error(anon, $_l);
}

function iff(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 3) {
        $.init($.item("a"), $.item("b"), $.item("c"));
        return n.item(fn.concat(n.string("$.test("), $.get("a"), n.string(") ?&#13; ("), $.get("b"), n.string(") :&#13; ("), $.get("c"), n.string(")")));
    }
    return n.error(iff, $_l);
}

function typegen1(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("type"), $.item("seq"));
        return n.item(fn.concat(n.string("n."), $.get("type"), n.string("("), $.get("seq"), n.string(")")));
    }

    if ($_l == 3) {
        $.init($.item("type"), $.item("name"), $.item("seq"));
        return n.item(fn.concat(n.string("n."), $.get("type"), n.string("("), $.get("name"), n.string(","), $.get("seq"), n.string(")")));
    }
    return n.error(typegen1, $_l);
}

function select(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("a"), $.item("b"));
        return n.item(fn.concat(n.string("n.select("), $.get("a"), n.string(","), $.get("b"), n.string(")")));
    }
    return n.error(select, $_l);
}

function selectAttribute(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 2) {
        $.init($.item("a"), $.item("b"));
        return n.item(fn.concat(n.string("n.selectAttribute("), $.get("a"), n.string(","), $.get("b"), n.string(")")));
    }
    return n.error(selectAttribute, $_l);
}

function typegen2(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("type"));
        return n.item($.get("type"));
    }

    if ($_l == 4) {
        $.init($.item("type"), $.item("keytype"), $.item("valtype"), $.item("body"));
        return n.item($.test(n.eq($.get("type"), n.string("map"))) ? fn.concat(n.string("n.map("), $.get("body"), n.string(")")) : anon($.get("keytype"), $.get("valtype"), $.get("body")));
    }

    if ($_l == 3) {
        $.init($.item("type"), $.item("keytype"), $.item("valtype"));
        return n.item(fn.concat(n.string("n."), $.get("type"), n.string("()")));
    }

    if ($_l == 2) {
        $.init($.item("type"), $.item("seq"));
        return n.item($.test(n.eq($.get("type"), n.string("map"))) ? fn.concat(n.string("n.map("), $.get("seq"), n.string(")")) : n.seq());
    }

    if ($_l == 4) {
        $.init($.item("type"), $.item("keytype"), $.item("valtype"), $.item("body"));
        return n.item($.test(n.eq($.get("type"), n.string("map"))) ? fn.concat(n.string("n.map("), $.get("body"), n.string(")")) : anon($.get("keytype"), $.get("valtype"), $.get("body")));
    }
    return n.error(typegen2, $_l);
}

function _typegen(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("args"));
        return n.item($.test(n.instanceOf($.get("args"), n.string())) ? n.string("n._typegen($args)") : ($.item("l", array.size($.get("args"))), $.test(n.eq($.get("l"), n.integer(2))) ? n.concat(n.concat(n.concat(n.concat(n.string("n."), n.call($.get("args"), n.integer(1))), n.string("(")), n.call($.get("args"), n.integer(2))), n.string(")")) : ($.item("param", fn.replace(rdl.camelCase(rdl.clip(n.call($.get("args"), n.integer(2)))), n.string("\\$"), n.string(""))), $.test(n.call($.get("args"), n.integer(3))) ? fn.concat(n.string("$."), n.call($.get("args"), n.integer(1)), n.string("(&quot;"), $.get("param"), n.string("&quot;,"), n.call($.get("args"), n.integer(3)), n.string(")")) : fn.concat(n.string("$"), fn.replace($.get("param"), n.string("^([^\\.]*)(\\.{3})$"), n.string("$2 $1"))))));
    }
    return n.error(_typegen, $_l);
}

function typegen(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($_a);

    if ($_l == 1) {
        $.init($.item("type"));
        return n.item(n._typegen($args));
    }

    if ($_l == 2) {
        $.init($.item("type"), $.item("val"));
        return n.item(n._typegen($args));
    }

    if ($_l == 3) {
        $.init($.item("type"), $.item("frame"), $.item("name"));
        return n.item(n._typegen($args));
    }

    if ($_l == 4) {
        $.init($.item("type"), $.item("frame"), $.item("name"), $.item("val"));
        return n.item(n._typegen($args));
    }

    if ($_l == 5) {
        $.init($.item("type"), $.item("frame"), $.item("name"), $.item("val"), $.item("suffix"));
        return n.item(n._typegen($args));
    }
    return n.error(typegen, $_l);
}

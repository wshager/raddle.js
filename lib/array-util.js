"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.put = put;
exports.foldLeft = foldLeft;
exports.foldLeftAt = foldLeftAt;
exports.foldRightAt = foldRightAt;
exports.forEach = forEach;
exports.forEachAt = forEachAt;

var _n = require("./n");

var n = _interopRequireWildcard(_n);

var _xvarray = require("xvarray");

var array = _interopRequireWildcard(_xvarray);

var _xvfn = require("xvfn");

var fn = _interopRequireWildcard(_xvfn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function put(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($,$_a);
    if ($_l == 3) {
        $.init($.array("array"), $.item("position"), $.item("member"));
        return n.item(array.insertBefore(array.remove($.get("array"), $.get("position")), $.get("position"), $.get("member")));
    }
    return n.error("err:XPST0017", "Function put called with " + $_l + " arguments doesn't match any of the known signatures.");
} /* xquery version "3.1" */

/*module namespace a="http://raddle.org/array-util";

n.seq()*/

function foldLeft(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($,$_a);
    if ($_l == 3) {
        $.init($.array("array"), $.item("zero"), $.item("function"));
        return $.test(n.eq(array.size($.get("array")), n.integer(0))) ? $.get("zero") : foldLeft(array.tail($.get("array")), n.call($.get("function"), $.get("zero"), array.head($.get("array"))), $.get("function"));
    }
    return n.error("err:XPST0017", "Function foldLeft called with " + $_l + " arguments doesn't match any of the known signatures.");
}

function foldLeftAt(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($,$_a);
    if ($_l == 3) {
        $.init($.array("array"), $.item("zero"), $.item("function"));
        return n.item(foldLeftAt($.get("array"), $.get("zero"), $.get("function"), n.integer(1)));
    }
    if ($_l == 4) {
        $.init($.array("array"), $.item("zero"), $.item("function"), $.item("at"));
        return $.test(n.eq(array.size($.get("array")), n.integer(0))) ? $.get("zero") : foldLeftAt(array.tail($.get("array")), n.call($.get("function"), $.get("zero"), array.head($.get("array")), $.get("at")), $.get("function"), n.add($.get("at"), n.integer(1)));
    }
    return n.error("err:XPST0017", "Function foldLeftAt called with " + $_l + " arguments doesn't match any of the known signatures.");
}

function foldRightAt(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($,$_a);
    if ($_l == 3) {
        $.init($.array("array"), $.item("zero"), $.item("function"));
        return n.item(foldRightAt($.get("array"), $.get("zero"), $.get("function"), n.integer(1)));
    }
    if ($_l == 4) {
        $.init($.array("array"), $.item("zero"), $.item("function"), $.item("at"));
        return $.test(n.eq(array.size($.get("array")), n.integer(0))) ? $.get("zero") : n.call($.get("function"), array.head($.get("array")), foldRightAt(array.tail($.get("array")), $.get("zero"), $.get("function"), n.add($.get("at"), n.integer(1))));
    }
    return n.error("err:XPST0017", "Function foldRightAt called with " + $_l + " arguments doesn't match any of the known signatures.");
}

function forEach(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($,$_a);
    if ($_l == 2) {
        $.init($.array("array"), $.item("function"));
        return n.item(forEach($.get("array"), $.get("function"), n.array(n.seq())));
    }
    if ($_l == 3) {
        $.init($.array("array"), $.item("function"), $.item("ret"));
        return $.test(n.eq(array.size($.get("array")), n.integer(0))) ? $.get("ret") : forEach(array.tail($.get("array")), $.get("function"), array.append($.get("ret"), n.call($.get("function"), array.head($.get("array")))));
    }
    return n.error("err:XPST0017", "Function forEach called with " + $_l + " arguments doesn't match any of the known signatures.");
}

function forEachAt(...$_a) {
    var $_l = $_a.length,
        $ = n.frame($,$_a);
    if ($_l == 2) {
        $.init($.array("array"), $.item("function"));
        return n.item(forEachAt($.get("array"), $.get("function"), n.array(n.seq()), n.integer(1)));
    }
    if ($_l == 4) {
        $.init($.array("array"), $.item("function"), $.item("ret"), $.item("at"));
        return $.test(n.eq(array.size($.get("array")), n.integer(0))) ? $.get("ret") : forEachAt(array.tail($.get("array")), $.get("function"), array.append($.get("ret"), n.call($.get("function"), array.head($.get("array")), $.get("at"))), n.add($.get("at"), n.integer(1)));
    }
    return n.error("err:XPST0017", "Function forEachAt called with " + $_l + " arguments doesn't match any of the known signatures.");
}

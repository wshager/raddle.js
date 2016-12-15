"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.put$3 = put$3;
exports.foldLeft$3 = foldLeft$3;
exports.foldLeftAt$3 = foldLeftAt$3;
exports.foldLeftAt$4 = foldLeftAt$4;
exports.foldRightAt$3 = foldRightAt$3;
exports.foldRightAt$4 = foldRightAt$4;
exports.forEach$2 = forEach$2;
exports.forEach$3 = forEach$3;
exports.forEachAt$2 = forEachAt$2;
exports.forEachAt$4 = forEachAt$4;
exports.forEachAt = forEachAt;
exports.foldLeftAt = foldLeftAt;
exports.put = put;
exports.foldRightAt = foldRightAt;
exports.foldLeft = foldLeft;
exports.forEach = forEach;

var _n = require("./n");

var n = _interopRequireWildcard(_n);

var _xvarray = require("xvarray");

var array = _interopRequireWildcard(_xvarray);

var _xvfn = require("xvfn");

var fn = _interopRequireWildcard(_xvfn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $ = n.frame(); /* xquery version "3.1" */

/*module namespace a="http://raddle.org/array-util";

n.seq()*/

function put$3(...$_a) {
    var $ = n.frame($_a).array("array").item("position").item("member");
    return array.insertBefore(array.remove($("array"), $("position")), $("position"), $("member"));
}

function foldLeft$3(...$_a) {
    var $ = n.frame($_a).array("array").item("zero").item("function");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("zero");
        } else {
            return foldLeft(array.tail($("array")), n.call($("function"), $("zero"), array.head($("array"))), $("function"));
        }
    })($.frame());
}

function foldLeftAt$3(...$_a) {
    var $ = n.frame($_a).array("array").item("zero").item("function");
    return foldLeftAt($("array"), $("zero"), $("function"), n.integer(1));
}

function foldLeftAt$4(...$_a) {
    var $ = n.frame($_a).array("array").item("zero").item("function").item("at");

    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("zero");
        } else {
            return foldLeftAt(array.tail($("array")), n.call($("function"), $("zero"), array.head($("array")), $("at")), $("function"), n.add($("at"), n.integer(1)));
        }
    })($.frame());
}

function foldRightAt$3(...$_a) {
    var $ = n.frame($_a).array("array").item("zero").item("function");
    return foldRightAt($("array"), $("zero"), $("function"), n.integer(1));
}

function foldRightAt$4(...$_a) {
    var $ = n.frame($_a).array("array").item("zero").item("function").item("at");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("zero");
        } else {
            return n.call($("function"), array.head($("array")), foldRightAt(array.tail($("array")), $("zero"), $("function"), n.add($("at"), n.integer(1))));
        }
    })($.frame());
}

function forEach$2(...$_a) {
    var $ = n.frame($_a).array("array").item("function");
    return forEach($("array"), $("function"), n.array(n.seq()));
}

function forEach$3(...$_a) {
    var $ = n.frame($_a).array("array").item("function").item("ret");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("ret");
        } else {
            return forEach(array.tail($("array")), $("function"), array.append($("ret"), n.call($("function"), array.head($("array")))));
        }
    })($.frame());
}

function forEachAt$2(...$_a) {
    var $ = n.frame($_a).array("array").item("function");
    return forEachAt($("array"), $("function"), n.array(n.seq()), n.integer(1));
}

function forEachAt$4(...$_a) {
    var $ = n.frame($_a).array("array").item("function").item("ret").item("at");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("ret");
        } else {
            return forEachAt(array.tail($("array")), $("function"), array.append($("ret"), n.call($("function"), array.head($("array")), $("at"))), n.add($("at"), n.integer(1)));
        }
    })($.frame());
}

function forEachAt(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return forEachAt$2.apply(this, $_a);
    }

    if ($_l === 4) {
        return forEachAt$4.apply(this, $_a);
    }

    return n.error(forEachAt, $_l);
}

function foldLeftAt(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return foldLeftAt$3.apply(this, $_a);
    }

    if ($_l === 4) {
        return foldLeftAt$4.apply(this, $_a);
    }

    return n.error(foldLeftAt, $_l);
}

function put(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return put$3.apply(this, $_a);
    }

    return n.error(put, $_l);
}

function foldRightAt(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return foldRightAt$3.apply(this, $_a);
    }

    if ($_l === 4) {
        return foldRightAt$4.apply(this, $_a);
    }

    return n.error(foldRightAt, $_l);
}

function foldLeft(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return foldLeft$3.apply(this, $_a);
    }

    return n.error(foldLeft, $_l);
}

function forEach(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return forEach$2.apply(this, $_a);
    }

    if ($_l === 3) {
        return forEach$3.apply(this, $_a);
    }

    return n.error(forEach, $_l);
}

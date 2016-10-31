/* xquery version "3.1" */

/*module namespace a="http://raddle.org/array-util";

n.seq()*/

import * as n from "./n";

import * as array from "xvarray";

import * as fn from "xvfn";

var $ = n.frame();

export function put$3(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("position")
        .item("member");
    return array.insertBefore(array.remove($("array"), $("position")), $("position"), $("member"));

}

export function foldLeft$3(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("zero")
        .item("function");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("zero");
        } else {
            return foldLeft(array.tail($("array")), n.call($("function"), $("zero"), array.head($("array"))), $("function"));
        }
    })($.frame());

}

export function foldLeftAt$3(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("zero")
        .item("function");
    return foldLeftAt($("array"), $("zero"), $("function"), n.integer(1));

}

export function foldLeftAt$4(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("zero")
        .item("function")
        .item("at");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("zero");
        } else {
            return foldLeftAt(array.tail($("array")), n.call($("function"), $("zero"), array.head($("array")), $("at")), $("function"), n.add($("at"), n.integer(1)));
        }
    })($.frame());

}

export function foldRightAt$3(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("zero")
        .item("function");
    return foldRightAt($("array"), $("zero"), $("function"), n.integer(1));

}

export function foldRightAt$4(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("zero")
        .item("function")
        .item("at");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("zero");
        } else {
            return n.call($("function"), array.head($("array")), foldRightAt(array.tail($("array")), $("zero"), $("function"), n.add($("at"), n.integer(1))));
        }
    })($.frame());

}

export function forEach$2(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("function");
    return forEach($("array"), $("function"), n.array(n.seq()));

}

export function forEach$3(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("function")
        .item("ret");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("ret");
        } else {
            return forEach(array.tail($("array")), $("function"), array.append($("ret"), n.call($("function"), array.head($("array")))));
        }
    })($.frame());

}

export function forEachAt$2(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("function");
    return forEachAt($("array"), $("function"), n.array(n.seq()), n.integer(1));

}

export function forEachAt$4(...$_a) {
    var $ = n.frame($_a)
        .array("array", $.item($.zeroOrOne()))
        .item("function")
        .item("ret")
        .item("at");
    return ($ => {
        if ($.test(n.eq(array.size($("array")), n.integer(0)))) {
            return $("ret");
        } else {
            return forEachAt(array.tail($("array")), $("function"), array.append($("ret"), n.call($("function"), array.head($("array")), $("at"))), n.add($("at"), n.integer(1)));
        }
    })($.frame());

}

export function forEachAt(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return forEachAt$2.apply(this, $_a);
    }

    if ($_l === 4) {
        return forEachAt$4.apply(this, $_a);
    }

    return n.error(forEachAt, $_l);
}

export function foldLeftAt(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return foldLeftAt$3.apply(this, $_a);
    }

    if ($_l === 4) {
        return foldLeftAt$4.apply(this, $_a);
    }

    return n.error(foldLeftAt, $_l);
}

export function put(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return put$3.apply(this, $_a);
    }

    return n.error(put, $_l);
}

export function foldRightAt(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return foldRightAt$3.apply(this, $_a);
    }

    if ($_l === 4) {
        return foldRightAt$4.apply(this, $_a);
    }

    return n.error(foldRightAt, $_l);
}

export function foldLeft(...$_a) {
    var $_l = $_a.length;
    if ($_l === 3) {
        return foldLeft$3.apply(this, $_a);
    }

    return n.error(foldLeft, $_l);
}

export function forEach(...$_a) {
    var $_l = $_a.length;
    if ($_l === 2) {
        return forEach$2.apply(this, $_a);
    }

    if ($_l === 3) {
        return forEach$3.apply(this, $_a);
    }

    return n.error(forEach, $_l);
}

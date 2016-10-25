"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.text = exports.attribute = exports.element = exports.concat = exports.error = exports.map = exports.array = exports.to = exports.data = exports.decimal = exports.float = exports.double = exports.integer = exports.boolean = exports.number = exports.string = exports.item = exports.foldRight = exports.foldLeft = exports.forEach = exports.filter = exports._isSeq = exports._first = exports.toSeq = exports.seq = exports.pair = undefined;
exports.frame = frame;
exports.call = call;
exports.and = and;
exports.or = or;

var _xverr = require("xverr");
var _xvop = require("xvop");

Object.keys(_xvop).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
            return _xvop[key];
        }
    });
});

var _xvpath = require("xvpath");

Object.keys(_xvpath).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
            return _xvpath[key];
        }
    });
});

var _xvtype = require("xvtype");

var _xvfn = require("xvfn");

var _xvarray = require("xvarray");

var _xvmap = require("xvmap");

var _xvnode = require("xvnode");

// mix in bools you shall!
const fn = _xvfn.booleans;

class Context {
    constructor(args) {
        this._args = args;
        this._params = {};
        this._init = 0;
        this._frame = {};
    }
    func(...a) {
        this._ref = typeof a[0] == "function" && a[0] !== this ? a.shift() : null;
        var l = a.length;
        this._arity = l - 1;
        if (this._arity !== this._args.length) {
            return (0, _xvfn.error)("err:XPST0017");
        }
        var i = 0;
        for (var k in this._params) {
            var type = this._params[k];
            this._frame[k] = type(this._args[i]); //.cacheResult();
            i++;
        }
        if (i < this._arity) {
            // what?
        }
        this._body = a[l - 1];
        var ret = this._body.call(this, this);
        while (typeof ret == "function") {
            ret = ret();
        }
        return ret;
    }
    init(...a) {
        var l = a.length;
        this._arity = l;

        if (this._arity !== this._args.length) {
            return (0, _xvfn.error)("err:XPST0017");
        }
        var i = 0;
        for (var k in this._params) {
            var type = this._params[k];
            this._frame[k] = type(this._args[i]); //.cacheResult();
            i++;
        }
        if (i < this._arity) {
            // what?
        }
    }
    let(k, v = null, type = _xvfn.item) {
        var i = this._init;
        if (v === null) {
            this._params[k] = type;
            this._init++;
        } else {
            this._frame[k] = v;
        }
        return this;
    }
    item(k, v = null) {
        return this.let(k, v, _xvfn.item);
    }
    string(k, v = null) {
        return this.let(k, v, _xvfn.string);
    }
    integer(k, v = null) {
        return this.let(k, v, _xvfn.integer);
    }
    decimal(k, v = null) {
        return this.let(k, v, _xvfn.decimal);
    }
    double(k, v = null) {
        return this.let(k, v, _xvfn.double);
    }
    number(k, v = null) {
        return this.let(k, v, _xvfn.number);
    }
    array(k, v = null){
        return this.let(k, v);
    }
    map(k, v = null){
        return this.let(k, v);
    }
    element(k, v = null){
        return this.let(k, v);
    }
    attribute(k, v = null){
        return this.let(k, v);
    }
    get(k) {
        if (k !== undefined) return this._frame[k];
        var ret = this._frame[0];
        this._frame[0] = null;
        return ret;
    }
    test($test) {
        return (0, _xvtype._boolean)($test);
    }
    if($test) {
        this._frame[0] = (0, _xvtype._boolean)($test);
        return this;
    }
    then(fn) {
        if (this._frame[0] === true) this._frame[0] = fn(this);
        return this;
    }
    else(fn) {
        if (this._frame[0] === false) this._frame[0] = fn(this);
        return this;
    }
    rec(ref, ...a) {
        // recursive call with optimization
        // re-insert all params from their initial config
        // call the function again
        if (typeof ref === "function") {
            //console.log(ref);
            return function () {
                return ref.apply(null, a);
            };
        }
        throw new Error("Function for recursion not provided");
    }
}

function frame(...a) {
    var args = a.pop();
    var f = function (selector, context) {
        //return n.query(selector,context);
    };
    f.__proto__ = new Context(args);
    if(a.length>0 && a[0] !== undefined) f._frame = a[0]._frame;
    return f;
}

function call($fn, ...args) {
    let fn = (0, _xvtype._first)($fn);
    //if(_xvmap._isMap(fn) && _xvtype._first(args[0])=="args") console.log("fn",fn.get("args"));
    if ((0, _xvmap._isMap)(fn) || (0, _xvarray._isArray)(fn)) {
        return (0, _xvtype.seq)(fn.get((0, _xvtype._first)(args[0])));
    }
    return (0, _xvtype.seq)(fn.apply(null, args));
}

// TODO mix logic from xvtype into xvop
function and($a, $b) {
    if($a === undefined || $b === undefined) {
        throw new Error("Either of and is undefined");
    }
    return (0, _xvtype._boolean)($a) && (0, _xvtype._boolean)($b);
}
function or($a, $b) {
    return (0, _xvtype._boolean)($a) || (0, _xvtype._boolean)($b);
}
function minus($a) {
    var a = _xvtype._first($a);
    if(typeof a.neg == "function") return _xvtype.seq(a.neg());
    return _xvtype.seq(-a);
}
function instanceOf($a,$b) {
    let a = _xvtype._first($a);
    let b = _xvtype._first($b);
    if(!a) console.trace();

    var t = a=== undefined || b === undefined ? false : a.constructor === b.constructor;
    //console.log(t);
    return _xvtype.seq(t);
}

function text(...a) {
    if(a.length===0) return _xverr.error("XPTY0004");
    if(a.length>1) return _xvnode.text.apply(null,a);
    return a[0].getTextNodes();
}

const pair = exports.pair = _xvmap.entry;

exports.seq = _xvtype.seq;
exports.toSeq = _xvtype.toSeq;
exports._first = _xvtype._first;
exports._isSeq = _xvtype._isSeq;
exports.filter = _xvfn.filter;
exports.forEach = _xvfn.forEach;
exports.foldLeft = _xvfn.foldLeft;
exports.foldRight = _xvfn.foldRight;
exports.item = _xvfn.item;
exports.string = _xvfn.string;
exports.number = _xvfn.number;
exports.boolean = _xvfn.boolean;
exports.integer = _xvfn.integer;
exports.double = _xvfn.double;
exports.float = _xvfn.float;
exports.decimal = _xvfn.decimal;
exports.data = _xvfn.data;
exports.to = _xvfn.to;
exports.array = _xvarray.array;
exports.map = _xvmap.map;
exports.error = _xvfn.error;
exports.concat = _xvfn.concat;
exports.element = _xvnode.element;
exports.attribute = _xvnode.attribute;
exports.text = text;
exports.minus = minus;
exports.instanceOf = instanceOf;

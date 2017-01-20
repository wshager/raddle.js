"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.module = exports.fromJS = exports.instanceOf = exports.minus = exports.text = exports.attribute = exports.element = exports.concat = exports.map = exports.array = exports.to = exports.data = exports.decimal = exports.float = exports.double = exports.integer = exports.boolean = exports.number = exports.string = exports.item = exports.foldRight = exports.foldLeft = exports.forEach = exports.filter = exports._isSeq = exports._first = exports.toSeq = exports.seq = exports.pair = exports.$module = exports.$uri = exports.$prefix = undefined;
exports.frame = frame;
exports.call = call;
exports.error = error;

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

var _xverr = require("xverr");

var xverr = _interopRequireWildcard(_xverr);

var _xvfn = require("xvfn");

var _xvarray = require("xvarray");

var _xvmap = require("xvmap");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// mix in bools you shall!
const fn = _xvfn.booleans;

/*
func(... a) {
    this._ref = typeof a[0] == "function" && a[0] !== this ? a.shift() : null;
    var l = a.length;
    this._arity = l - 1;
    if (this._arity !== this._args.length) {
        return xverr.error("err:XPST0017");
    }
    var i = 0;
    for (var k in this._params) {
        var type = this._params[k];
        this._frame[k] = type(this._args[i]);//.cacheResult();
        i++;
    }
    if (i < this._arity) {
        // what?
    }
    this._body = a[l - 1];
    var ret = this._body.call(this, this);
    while(typeof ret == "function") {
        ret = ret();
    }
    return ret;
}
init(...a){
    var l = a.length;
    this._arity = l;
    if (this._arity !== this._args.length) {
        return xverr.error("err:XPST0017");
    }
    var i = 0;
    for (var k in this._params) {
        var type = this._params[k];
        this._frame[k] = type(this._args[i]);//.cacheResult();
        i++;
    }
    if (i < this._arity) {
        // what?
    }
}
let(k,v=null,type=item){
    var i = this._init;
    if(v === null){
        this._params[k] = type;
        this._init++;
    } else {
        this._frame[k] = v;
    }
    return this;
}
 */

const $prefix = exports.$prefix = "n";
const $uri = exports.$uri = "http://raddle.org/native";
const $module = exports.$module = (0, _xvfn.module)(__filename);

function frame(args = [], cx = null) {
    var f = function (key, value) {
        if (value !== undefined) {
            f._frame[key] = value;
            return f;
        }
        if (key !== undefined) return f._frame[key];
        var ret = f._frame[0];
        f._frame[0] = null;
        return ret;
    };
    var closure = cx && cx._frame ? cx._frame : null;
    if (!cx) cx = new Context();
    f._args = args;
    f._params = [];
    // is this correct?
    f._arity = args.length;
    f._init = 0;
    // TODO have last result linger on frame
    f._frame = {};
    if (closure) {
        //if(f._init < f._arity) {
        for (var k in closure) {
            f._frame[k] = closure[k];
        }
        //}
    }
    f.__proto__ = cx;
    return f;
}

class Context {
    frame(args = []) {
        return frame(args, this);
    }
    check(value, type, card) {
        // TODO type test
        return value;
    }
    let(k, type, card = null) {
        //if(this._init >= this._arity) return this;
        this._frame[k] = this.check(this._args[this._init], type, card);
        this._params[this._init] = k;
        this._init++;
        return this;
    }
    item(k, card) {
        return this.let(k, _xvfn.item, card);
    }
    string(k, card) {
        return this.let(k, _xvfn.string, card);
    }
    integer(k, card) {
        return this.let(k, _xvfn.integer);
    }
    decimal(k, card) {
        return this.let(k, _xvfn.decimal, card);
    }
    double(k, card) {
        return this.let(k, _xvfn.double, card);
    }
    number(k, card) {
        return this.let(k, _xvfn.number, card);
    }
    array(k, valuetype = null, card = null) {
        return this.let(k, valuetype, card);
    }
    map(k, keytype = null, valuetype = null, card = null) {
        return this.let(k, keytype, valuetype, card);
    }
    element(k, card) {
        return this.let(k);
    }
    attribute(k, card) {
        return this.let(k);
    }
    func(k, params, ret = null, card = null) {
        return this.let(k);
    }
    atomic(k, card = null) {
        return this.let(k);
    }
    documentNode(k, card = null) {
        return this.let(k);
    }
    node(k, card = null) {
        return this.let(k);
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

function call($fn, ...args) {
    let fn = (0, _xvtype._first)($fn);
    if ((0, _xvmap._isMap)(fn)) {
        var k = (0, _xvtype._first)(args[0]).valueOf();
        if (!fn.has(k)) return (0, _xvtype.seq)();
        return (0, _xvtype.seq)(fn.get(k));
        //return v !== undefined ? seq(v) : seq();
    }
    if ((0, _xvarray._isArray)(fn)) {
        return fn.isEmpty() ? (0, _xvtype.seq)() : (0, _xvtype.seq)(fn.get((0, _xvtype._first)(args[0]) - 1));
    }
    try {
        return (0, _xvtype.seq)(fn.apply(null, args));
    } catch (e) {
        //console.log(e);
    }
}

const pair = exports.pair = _xvmap.entry;

function error(fn, l) {
    if (typeof fn == "function") {
        return xverr.error("err:XPST0017", "Function " + fn.name + " did not receive the correct number of arguments.");
    }
    return xverr.error("err:XPST0017", "Anonymous function did not receive the correct number of arguments.");
}

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
exports.concat = _xvfn.concat;
exports.element = _xvtype.element;
exports.attribute = _xvtype.attribute;
exports.text = _xvtype.text;
exports.minus = _xvtype.minus;
exports.instanceOf = _xvtype.instanceOf;
exports.fromJS = _xvtype.fromJS;
exports.module = _xvfn.module;

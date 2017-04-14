"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isArray = exports.isMap = exports.array = exports.map = exports.pair = exports.$module = exports.$uri = exports.$prefix = undefined;
exports.frame = frame;
exports.call = call;
exports.error = error;

var _frink = require("frink");

Object.keys(_frink).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
            return _frink[key];
        }
    });
});

var n = _interopRequireWildcard(_frink);

var _array = require("../node_modules/frink/lib/array");

var _array2 = _interopRequireDefault(_array);

var _map = require("../node_modules/frink/lib/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// mix in bools you shall!
const fn = {
    true: n.t,
    false: n.f
};
for (var k in n) fn[k] = n[k];

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
const $module = exports.$module = n.module(__filename);

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
    Object.setPrototypeOf(f, cx);
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
        //console.log("let",k,this._init,this._args)
        this._frame[k] = this.check(this._args[this._init], type, card);
        this._params[this._init] = k;
        this._init++;
        return this;
    }
    item(k, card) {
        return this.let(k, n.item, card);
    }
    string(k, card) {
        return this.let(k, n.string, card);
    }
    integer(k, card) {
        return this.let(k, n.integer);
    }
    decimal(k, card) {
        return this.let(k, n.decimal, card);
    }
    double(k, card) {
        return this.let(k, n.double, card);
    }
    number(k, card) {
        return this.let(k, n.number, card);
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
        return n.boolean($test);
    }
    if($test) {
        this._frame[0] = n.boolean($test);
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
    let fn = n.first($fn);
    if ((0, _map.isMap)(fn)) {
        return _map.get.call(null, fn, args[0]);
    }
    if ((0, _array.isArray)(fn)) {
        return _array.get.call(null, fn, args[0]);
    }
    try {
        return fn.apply(null, args);
    } catch (e) {
        //console.log(e);
    }
}

const pair = exports.pair = _map.entry;

function error(fn, l) {
    if (typeof fn == "function") {
        return n.error("err:XPST0017", "Function " + fn.name + " did not receive the correct number of arguments.");
    }
    return n.error("err:XPST0017", "Anonymous function did not receive the correct number of arguments.");
}

exports.map = _map2.default;
exports.array = _array2.default;
exports.isMap = _map.isMap;
exports.isArray = _array.isArray;

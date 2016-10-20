"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.concat = exports.error = exports.map = exports.array = exports.data = exports.decimal = exports.float = exports.double = exports.integer = exports.boolean = exports.number = exports.string = exports.item = exports.filter = exports._isSeq = exports._first = exports.toSeq = exports.seq = exports.pair = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.frame = frame;
exports.call = call;
exports.and = and;
exports.or = or;

var _xvop = require("xvop");

Object.keys(_xvop).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _xvop[key];
        }
    });
});

var _xvpath = require("xvpath");

Object.keys(_xvpath).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _xvpath[key];
        }
    });
});

var _xvtype = require("xvtype");

var _xvfn = require("xvfn");

var _xvarray = require("xvarray");

var _xvmap = require("xvmap");

var _xvnode = require("xvnode");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// mix in bools you shall!
var fn = _xvfn.booleans;

var Context = function () {
    function Context(args) {
        _classCallCheck(this, Context);

        this._args = args;
        this._params = {};
        this._init = 0;
        this._frame = {};
    }

    _createClass(Context, [{
        key: "func",
        value: function func() {
            for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
                a[_key] = arguments[_key];
            }

            this._ref = typeof a[0] == "function" && a[0] !== this ? a.shift() : null;
            var l = a.length;
            this._arity = l - 1;
            if (this._arity !== this._args.length) {
                return (0, _xvfn.error)("err:XPST0017");
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
    }, {
        key: "let",
        value: function _let(k) {
            var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _xvfn.item;

            var i = this._init;
            if (v === null) {
                this._params[k] = type;
                this._init++;
            } else {
                this._frame[k] = v;
            }
            return this;
        }
    }, {
        key: "item",
        value: function item(k) {
            var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.let(k, v, _xvfn.item);
        }
    }, {
        key: "string",
        value: function string(k) {
            var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.let(k, v, _xvfn.string);
        }
    }, {
        key: "integer",
        value: function integer(k) {
            var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.let(k, v, _xvfn.integer);
        }
    }, {
        key: "decimal",
        value: function decimal(k) {
            var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.let(k, v, _xvfn.decimal);
        }
    }, {
        key: "double",
        value: function double(k) {
            var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.let(k, v, _xvfn.double);
        }
    }, {
        key: "number",
        value: function number(k) {
            var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.let(k, v, _xvfn.number);
        }
    }, {
        key: "get",
        value: function get(k) {
            if (k !== undefined) return this._frame[k];
            //console.log("get",this._frame[0])
            var ret = this._frame[0];
            this._frame[0] = null;
            return ret;
        }
    }, {
        key: "test",
        value: function test($test) {
            return _xvtype._boolean($test);
        }
    }, {
        key: "if",
        value: function _if($test) {
            this._frame[0] = _xvtype._boolean($test);
            return this;
        }
    }, {
        key: "then",
        value: function then(fn) {
            if (this._frame[0] === true) this._frame[0] = fn(this);
            return this;
        }
    }, {
        key: "else",
        value: function _else(fn) {
            if (this._frame[0] === false) this._frame[0] = fn(this);
            return this;
        }
    }, {
        key: "rec",
        value: function rec(...a) {
            // recursive call with optimization
            // re-insert all params from their initial config
            // call the function again
            // TODO function could also just return a context until execution
            var ref = a.shift();
            if(typeof ref === "function") {
                //console.log(ref);
                return function(){
                    return ref.apply(null,a);
                };
            }
            throw new Error("Function for recursion not provided");
            /*return (function(args){
                var i = 0;
                //var name = this._ref && this._ref.name;
                //console.log("rec called "+name);
                for (var k in this._params) {
                    var type = this._params[k];
                    //console.log(k,a[i]);
                    this._frame[k] = args[i].cacheResult();//.toStrict();
                    i++;
                }
                return this._body.call(this, this);
            }).bind(this,a);*/
        }
    }, {
        key: "stop",
        value: function stop(val) {
            //var name = this._ref && this._ref.name;
            //console.log("stop called "+name,val);
            this._frame = {0:val};
            return val.cacheResult();
            // signify recursion is over
        }
    }]);

    return Context;
}();

function frame(args) {
    var f = function f(selector, context) {
        //return n.query(selector,context);
    };
    f.__proto__ = new Context(args);
    return f;
}

function call($fn) {
    var fn = (0, _xvtype._first)($fn);

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    if ((0, _xvmap._isMap)(fn) || (0, _xvarray._isArray)(fn)) {
        return (0, _xvtype.seq)(fn.get((0, _xvtype._first)(args[0])));
    }
    return (0, _xvtype.seq)(fn.apply(null, args));
}

// TODO mix logic from xvtype into xvop
function and($a, $b) {
    return (0, _xvfn._boolean)($a) && (0, _xvfn._boolean)($b);
}
function or($a, $b) {
    return (0, _xvfn._boolean)($a) || (0, _xvfn._boolean)($b);
}

var pair = exports.pair = _xvmap.entry;

exports.seq = _xvtype.seq;
exports.toSeq = _xvtype.toSeq;
exports._first = _xvtype._first;
exports._isSeq = _xvtype._isSeq;
exports.filter = _xvfn.filter;
exports.item = _xvfn.item;
exports.string = _xvfn.string;
exports.number = _xvfn.number;
exports.boolean = _xvfn.boolean;
exports.integer = _xvfn.integer;
exports.double = _xvfn.double;
exports.float = _xvfn.float;
exports.decimal = _xvfn.decimal;
exports.data = _xvfn.data;
exports.array = _xvarray.array;
exports.map = _xvmap.map;
exports.error = _xvfn.error;
exports.concat = _xvfn.concat;
exports.to = _xvtype.to;
exports.forEach = _xvfn.forEach;
exports.element = _xvnode.element;
exports.attribute = _xvnode.attribute;
exports.text = _xvnode.text;

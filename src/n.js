import { seq, toSeq, _isSeq, _first, _boolean } from "xvtype";

import {
    concat, forEach, filter, foldLeft, foldRight, error,
    item, string, number, boolean, integer, double, float, decimal, data, to,
    doc, collection, parse, name, position, last, not, apply, sort, round, booleans
} from "xvfn";

import { array, _isArray } from "xvarray";
import { map, entry, _isMap } from "xvmap";
import { element, attribute, text } from "xvnode";

// mix in bools you shall!
const fn = booleans;

class Context {
    constructor(args){
        this._args = args;
        this._params = {};
        this._init = 0;
        this._frame = {};
    }
    func(... a) {
        this._ref = typeof a[0] == "function" && a[0] !== this ? a.shift() : null;
        var l = a.length;
        this._arity = l - 1;
        if (this._arity !== this._args.length) {
            return error("err:XPST0017");
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
            return error("err:XPST0017");
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
    item(k,v=null){
        return this.let(k,v,item);
    }
    string(k,v=null){
        return this.let(k,v,string);
    }
    integer(k,v=null){
        return this.let(k,v,integer);
    }
    decimal(k,v=null){
        return this.let(k,v,decimal);
    }
    double(k,v=null){
        return this.let(k,v,double);
    }
    number(k,v=null){
        return this.let(k,v,number);
    }
    get(k){
        if(k !== undefined) return this._frame[k];
        var ret = this._frame[0];
        this._frame[0] = null;
        return ret;
    }
    test($test) {
        return _boolean($test);
    }
    if($test){
        this._frame[0] = _boolean($test);
        return this;
    }
    then(fn){
        if(this._frame[0]===true) this._frame[0] = fn(this);
        return this;
    }
    else(fn){
        if(this._frame[0]===false) this._frame[0] = fn(this);
        return this;
    }
    rec(ref,...a){
        // recursive call with optimization
        // re-insert all params from their initial config
        // call the function again
        if(typeof ref === "function") {
            //console.log(ref);
            return function(){
                return ref.apply(null,a);
            };
        }
        throw new Error("Function for recursion not provided");
    }
}

export function frame(args){
	var f = function(selector, context){
        //return n.query(selector,context);
    };
    f.__proto__ = new Context(args);
    return f;
}

export function call($fn,...args){
    let fn = _first($fn);
    if(_isMap(fn) || _isArray(fn)) {
        return seq(fn.get(_first(args[0])));
    }
    return seq(fn.apply(null,args));
}

// TODO mix logic from xvtype into xvop
export function and($a,$b){
    return _boolean($a) && _boolean($b);
}
export function or($a, $b){
    return _boolean($a) || _boolean($b);
}

export const pair = entry;

export {
    //stringJoin, concat, analyzeString, tokenize, substring, stringToCodepoints, codepointsToString, matches, replace, stringLength,
    //subsequence, remove, head, tail, count, reverse, insertBefore, forEach, filter, foldLeft, foldRight,
    seq, toSeq, _first, _isSeq, filter, forEach, foldLeft, foldRight, item, string, number, boolean, integer, double, float, decimal, data, to, array, map, error, concat,
    element, attribute, text
    //doc, collection, parse, name, position, last, not, apply, sort, round, booleans
};

export * from "xvop";
export * from "xvpath";

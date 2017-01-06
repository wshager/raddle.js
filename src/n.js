import { seq, toSeq, _isSeq, _first, _boolean, text, element, attribute, minus, instanceOf, fromJS } from "xvtype";

import * as xverr from "xverr";

import {
    concat, forEach, filter, foldLeft, foldRight,
    item, string, number, boolean, integer, double, float, decimal, data, to,
    doc, collection, parse, name, position, last, not, apply, sort, round, booleans,
    module
} from "xvfn";

import { array, _isArray } from "xvarray";
import { map, entry, _isMap } from "xvmap";

// mix in bools you shall!
const fn = booleans;

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

export const $prefix = "n";
export const $uri = "http://raddle.org/native";
export const $module = module(__filename);

export function frame(args=[],cx=null){
    var f = function (key,value) {
        if(value !== undefined) {
            f._frame[key] = value;
            return f;
        }
        if(key !== undefined) return f._frame[key];
        var ret = f._frame[0];
        f._frame[0] = null;
        return ret;
    };
    var closure = cx && cx._frame ? cx._frame : null;
    if(!cx) cx = new Context();
    f._args = args;
    f._params = [];
    // is this correct?
    f._arity = args.length;
    f._init = 0;
    // TODO have last result linger on frame
    f._frame = {};
    if(closure) {
        //if(f._init < f._arity) {
            for(var k in closure) {
                f._frame[k] =  closure[k];
            }
        //}
    }
    f.__proto__ = cx;
    return f;
}

class Context {
    frame(args=[]){
        return frame(args,this);
    }
    check(value,type,card) {
        // TODO type test
        return value;
    }
    let(k, type, card = null){
        //if(this._init >= this._arity) return this;
        this._frame[k] = this._args[this._init];//this.check(this._args[this._init], type, card);
        this._params[this._init] = k;
        this._init++;
        return this;
    }
    item(k,card){
        return this.let(k,item,card);
    }
    string(k,card){
        return this.let(k,string,card);
    }
    integer(k,card){
        return this.let(k,integer);
    }
    decimal(k,card){
        return this.let(k,decimal,card);
    }
    double(k,card){
        return this.let(k,double,card);
    }
    number(k,card){
        return this.let(k,number,card);
    }
    array(k, valuetype = null,card = null){
        return this.let(k, valuetype, card);
    }
    map(k, keytype = null, valuetype = null,card = null){
        return this.let(k, keytype, valuetype, card);
    }
    element(k,card){
        return this.let(k);
    }
    attribute(k,card){
        return this.let(k);
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

export function call($fn,...args){
    let fn = _first($fn);
    if (_isMap(fn)) {
        var k = _first(args[0]).valueOf();
        var v = fn.get(k);
        return !!v ? seq(v) : seq();
    }
    if(_isArray(fn)){
        return fn.isEmpty() ? seq() : seq(fn.get(_first(args[0])-1));
    }
    try {
        return seq(fn.apply(null, args));
    } catch(e) {
        //console.log(e);
    }
}

export const pair = entry;

export function error(fn,l){
    if(typeof fn == "function"){
        return xverr.error("err:XPST0017", "Function " + fn.name + " did not receive the correct number of arguments.");
    }
    return xverr.error("err:XPST0017", "Anonymous function did not receive the correct number of arguments.");
}

export {
    seq, toSeq, _first, _isSeq, filter, forEach, foldLeft, foldRight, item, string, number, boolean, integer, double, float, decimal, data, to, array, map, concat,
    element, attribute, text, minus, instanceOf, fromJS, module
};

export * from "xvop";
export * from "xvpath";

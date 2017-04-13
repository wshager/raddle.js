import * as n from "frink";

import { default as array, isArray, get as aGet } from "../node_modules/frink/lib/array";
import { default as map, entry, isMap, get as mGet } from "../node_modules/frink/lib/map";

// mix in bools you shall!
const fn = {
    true:n.t,
    false:n.f
};
for(var k in n) fn[k] = n[k];

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
export const $module = n.module(__filename);

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
    Object.setPrototypeOf(f,cx);
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
        this._frame[k] = this.check(this._args[this._init], type, card);
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
        return this.let(k,n.integer);
    }
    decimal(k,card){
        return this.let(k,n.decimal,card);
    }
    double(k,card){
        return this.let(k,n.double,card);
    }
    number(k,card){
        return this.let(k,n.number,card);
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
    func(k,params,ret = null,card = null) {
        return this.let(k);
    }
    atomic(k,card = null){
        return this.let(k);
    }
    documentNode(k, card = null){
        return this.let(k);
    }
    node(k, card = null){
        return this.let(k);
    }
    get(k){
        if(k !== undefined) return this._frame[k];
        var ret = this._frame[0];
        this._frame[0] = null;
        return ret;
    }
    test($test) {
        return n.boolean($test);
    }
    if($test){
        this._frame[0] = n.boolean($test);
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
    let fn = n.first($fn);
    if (isMap(fn)) {
        return mGet.call(null,fn,args[0]);
    }
    if(isArray(fn)){
        return aGet.call(null,fn,args[0]);
    }
    try {
        return fn.apply(null, args);
    } catch(e) {
        //console.log(e);
    }
}

export const pair = entry;

export function error(fn,l){
    if(typeof fn == "function"){
        return n.error("err:XPST0017", "Function " + fn.name + " did not receive the correct number of arguments.");
    }
    return n.error("err:XPST0017", "Anonymous function did not receive the correct number of arguments.");
}

export * from "frink";

export { map, array };

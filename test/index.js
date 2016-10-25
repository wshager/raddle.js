var xs = require("xvtype");

var fn = require("xvfn");

var n = require("../lib/n");

var xqc = require("../lib/xq-compat");

var au = require("../lib/array-util");

var rdl = require("../lib/raddle");


for(var k in fn.booleans) fn[k] = fn.booleans[k];

function x(...a){
    var l = a.length,
        $ = n.frame(a);
    if(l==2){
        return $.func(x,$.integer("x"),$.integer("y"),$ => {
			return $.let("a",$.get("x"))
				.let("b",$.get("y"))
				.if($.get("a")
				.op(">",1))
				.then($ => $.get("a").op("+",1))
				.else($ => $.get("b"))
				.get();
		});
    }
}

function x2(... a) {
    var l = a.length, $ = n.frame(a);
    if(l==1){ return $.func(x,$.item("a"),$ => $.stop(n.item($.get("a")))); }
    if(l==2){ return $.func(x,$.item("a"),$.item("b"),$ => $.stop(n.item(n.add($.get("a"),$.get("b"))))); }
    return fn.error("err:XPST0017","Function x called with "+l+" arguments doesn't match any of the known signatures.");
}


console.log(rdl.parse("[1,2,3]",n.map({
    "$compat":"xquery"
})).first());

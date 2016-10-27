var xs = require("xvtype");

var fn = require("xvfn");

var n = require("../lib/n");

var xqc = require("../lib/xq-compat");

var a = require("../lib/array-util");

var array =  require("xvarray");

var rdl = require("../lib/raddle");

var js = require("../lib/js");

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

var params = n.map({
    "$compat":"xquery"
});
var tree = rdl.parse(`declare function local:test($c){
    7 + 1
};`,params);
console.log(tree);
//console.log(js.transpile(tree,params));

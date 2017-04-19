var fn = require("../lib/fn");

var n = require("../lib/n");

var xqc = require("../lib/xq-compat");

var a = require("../lib/array-util");

var array = require("../node_modules/frink/lib/array");

var rdl = require("../lib/raddle");

var js = require("../lib/js");

//for (var k in fn.booleans) fn[k] = fn.booleans[k];

function x(...a) {
    var l = a.length,
        $ = n.frame(a);
    if (l == 2) {
        return $.func(x, $.integer("x"), $.integer("y"), $ => {
            return $.let("a", $.get("x"))
                .let("b", $.get("y"))
                .if($.get("a")
                    .op(">", 1))
                .then($ => $.get("a").op("+", 1))
                .else($ => $.get("b"))
                .get();
        });
    }
}

function x2(...a) {
    var l = a.length,
        $ = n.frame(a);
    if (l == 1) {
        return $.func(x, $.item("a"), $ => $.stop(n.item($.get("a"))));
    }
    if (l == 2) {
        return $.func(x, $.item("a"), $.item("b"), $ => $.stop(n.item(n.add($.get("a"), $.get("b")))));
    }
    return fn.error("err:XPST0017", "Function x called with " + l + " arguments doesn't match any of the known signatures.");
}

function test$0(...$_a) {
    var $ = n.frame($_a);
    $ = $("a", n.integer(10));
    $ = $("p", function(...$_a) {
        $ = $.frame($_a).item("b");
        $ = $("a", $("a"));
        return n.add($("a"), $("b"));
    });
    return n.call($("p"), n.integer(1));
}
function test(...$_a) {
    var $_l = $_a.length;
    if ($_l === 0) {
        return test$0.apply(this, $_a);
    }
    return n.error(test, $_l);
}
var params = n.map(n.pair("$compat", "xquery"));
var fs = require('fs');

fs.readFile("../raddle.xq/lib/xq-compat.xql",function(err,file){
    if(err) return console.error(err);
    var query = file.toString();
    //var query = "declare function local:x($x) { 1 + 1 };";
    var tree = rdl.parse(query, params);
    console.log("Tree Done");
    console.log(rdl.stringify(tree,params));
    var out = `
        var n = require("raddle");
        var fn = n;
        var $ = n.frame();
        exports.main = function(){
            return ${js.transpile(tree,params)};
        };`;
    console.log(out);
    //var exec = eval(out);
    //console.log(exec().toString());
    //fs.writeFile("d:/workspace/raddle.js/test/test.rdl",rdl.stringify(tree,params).first(),function(err){
    //    if(err) console.log(err);
    //});

/*fs.writeFile("d:/workspace/raddle.js/test/test.js", js.transpile(tree,params).first().replace(/&#9;/g,"\t").replace(/&#10;/g,"\r").replace(/&#13;/g,"\n").replace(/&quot;/g,"\""), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});*/
});

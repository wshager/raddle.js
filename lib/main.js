import fn from "fn.js";
import * as map from "map.js";

import * as n from "n.js";

import * as xqc from "xq-compat.js";

import * as console from "console.js";

//import query from '../test/test.xql!text';
//import * as rdl from "raddle.js"
function escapeForRegex() {
    var operators = xqc.operators,
    ncname = xqc.ncname;

    return n.initialize(arguments, [
        ["key", null, "item"]
    ], function($) {

        return $ = n.put($, "arg", n.item(n.call(operators, n.fetch($, "key")))),

            $ = n.put($, "pre", n.item(n.string("(^|[\\s,\\(\\);\\[\\]]+)"))),

            n.stop($, n.string(n.iff(fn.matches(n.fetch($, "arg"), n.string("\\p{L}+")),

                n.iff(n.eq(n.fetch($, "key"), n.decimal(21.06)),

                    n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("([\\s")), ncname), n.string(":]*\\s*\\(([\\$")), ncname), n.string(":\\(\\),\\?\\+\\*\\s])*\\)\\s*(as\\s+[")), ncname), n.string(":\\(\\)]+)?\\s*=#20#06=)")),

                    n.iff(n.eq(fn.round(n.fetch($, "key")), n.integer(21)),

                        n.concat(n.concat(n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("([\\s\\$")), ncname), n.string(",:]*=#20#06)")),

                        n.iff(n.or(n.eq(n.fetch($, "key"), n.decimal(2.04)), n.eq(fn.round(n.fetch($, "key")), n.integer(22))),

                            n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("(\\()")),

                            n.iff(n.eq(fn.round(n.fetch($, "key")), n.integer(24)),

                                n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("(\\s)")),

                                n.iff(n.geq(n.fetch($, "arg"), n.string("if")),

                                    n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("(\\s?)")),

                                    n.iff(n.geq(n.fetch($, "arg"), n.string("then")),

                                        n.concat(n.concat(n.string("\\)(\\s*)"), n.fetch($, "arg")), n.string("(\\s?)")),

                                        n.concat(n.concat(n.string("(^|\\s)"), n.fetch($, "arg")), n.string("(\\s|$)")))))))),

                ($ = n.put($, "arg", n.item(fn.replace(n.fetch($, "arg"), n.string("(\\.|\\[|\\]|\\\\|\\||\\-|\\^|\\$|\\?|\\*|\\+|\\{|\\}|\\(|\\))"), n.string("\\\\$1")))),

                n.iff(n.eq(n.fetch($, "key"), n.integer(26)),

                    n.concat(n.concat(n.string("(\\s?)"), n.fetch($, "arg")), n.string("(\\s*[^\\p{L}])")),

                    n.iff(n.eq(n.fetch($, "key"), n.decimal(2.10)),

                        n.string("(\\s?):\\s*=([^#])"),

                        n.iff(n.geq(n.fetch($, "key"), n.seq(n.decimal(8.02), n.decimal(17.02))),

                            n.concat(n.concat(n.fetch($, "pre"), n.fetch($, "arg")), n.string("([\\s\\p{N}])?")),

                            n.iff(n.geq(n.fetch($, "key"), n.seq(n.decimal(8.01), n.decimal(9.01), n.decimal(20.03))),

                                n.concat(n.concat(n.string("([^/])"), n.fetch($, "arg")), n.string("(\\s?[^,\\)])")),

                                n.concat(n.concat(n.string("(\\s?)"), n.fetch($, "arg")), n.string("(\\s?)"))))))))));
    });

}

export function block() {
    var operators = xqc.operators,
    ncname = xqc.ncname;

    return n.initialize(arguments, [
        ["parts", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.iff($, fn.empty(n.fetch($, "parts")),

            function($) {

                return n.stop($, n.item(n.fetch($, "ret")));

            },

            function($) {

                return n.put($, "val", n.item(n.select(fn.head(n.fetch($, "parts")), function($_0) {
                        return fn.string($_0);
                    }))),

                    n.put($, "rest", n.item(fn.tail(n.fetch($, "parts")))),

                    n.iff($, fn.matches(n.fetch($, "val"), xqc.operatorRegexp),

                        function($) {

                            //return n.cont($,n.fetch($, "rest"), n.concat(n.fetch($, "ret"), n.string(xqc.opNum(n.fetch($, "val")))));
                            return n.put($, "no", n.item(xqc.opNum(n.fetch($, "val")))),

                                n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.14)),

                                    function($) {

                                        return n.cont($,n.fetch($, "rest"), n.fetch($, "ret"));

                                    },

                                    function($) {

                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.16)),

                                            function($) {

                                                return n.cont($,n.fetch($, "rest"), n.fetch($, "ret"));

                                            },

                                            function($) {

                                                return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.17)),

                                                    function($) {

                                                        return n.cont($,n.fetch($, "rest"), xqc.annot(n.fetch($, "rest"), n.fetch($, "ret")));

                                                    },

                                                    function($) {

                                                        return n.iff($, n.eq(n.fetch($, "no"), n.decimal(2.19)),

                                                            function($) {

                                                                return n.cont($,n.fetch($, "rest"), n.fetch($, "ret"));

                                                            },

                                                            function($) {

                                                                return n.cont($,n.fetch($, "rest"), n.fetch($, "ret"));

                                                            });

                                                    });

                                            });

                                    });

                        },

                        function($) {
                            //return n.cont($,n.fetch($, "rest"), n.concat(n.fetch($, "ret"), n.string(n.fetch($,"val"))));
                            return n.iff($, fn.matches(n.fetch($, "val"), n.string(";")),

                                function($) {

                                    return n.iff($, fn.empty(n.fetch($, "rest")),

                                        function($) {

                                            return n.fetch($, "ret");

                                        },

                                        function($) {

                                            return n.cont($,n.fetch($, "rest"), n.concat(n.fetch($, "ret"), n.string(",")));

                                        });

                                },

                                function($) {

                                    return n.cont($,n.fetch($, "rest"), n.concat(n.fetch($, "ret"), n.string(n.fetch($,"val"))));
                                    //return body(n.fetch($, "parts"), n.fetch($, "ret"));

                                });

                        });

            });
    });

}


export function main() {

//console.log(map.keys(xqc.operators).toString())
/*console.log(n.selectAll(n.analyzeString(
    n.seq("core:define($,core:eval,(),(core:item($,value)),core:item(),(=#2#06=($value=#12=core:array(core:item()?),n:quote-seq($value),=#2#06=($value=#12=core:map(core:string(),core:item()?),(=#2#09=($,name,$value($%2)),=#2#09=($,args,$value($%4)),=#2#09=($,s,array:size($args)),=#2#06=(matches($name,$%6=#6=$raddle:ncname=#6=$%8),(=#2#09=($,local,replace($name,$%10,$%12)),=#2#09=($,is-type,$local=#5#07=map:keys($n:typemap)),=#2#09=($,is-op,map:contains($n:operator-map,$local)),=#2#09=($,args,=#2#06=($is-type=#3=$is-op,array:insert-before($args,1,$local),$args)),=#2#09=($,name,=#2#06=($is-type,(=#2#09=($,a,$n:typemap($local)),concat($%14,=#2#06=($a=#5#14=0,$a,$%16),$%18,$s=#8#01=1)),concat($name,$%20,$s))),n:quote($name,$args)),(=#2#09=($,name,=#2#06=($name=#5#01=$%22,concat($%24,$s),concat($name,$%26,$s))),n:quote($name,$args)))),n:quote($value)))))"),
    //n.seq("a(b,c)"),
    n.seq("(\\)[\\+\\*\\?]?)|(=#\\p{N}+#?\\p{N}*=|,)?([\\+\\*\\?\\p{L}\\p{N}\\-_\\.\\$:%/#@\\^]*)(\\(?)")
),"fn:match").toString())*/
var query = 'declare function xqc:seqtype($parts,$ret,$lastseen){  let $head := head($parts)/fn:group[@nr=1]/string()  let $maybe-seqtype := if(matches($head,$xqc:operator-regexp)) then xqc:op-num($head) else 0  return	  if($maybe-seqtype eq 20.06) then		  xqc:body($parts,concat($ret,","),($lastseen,21.06))	  else		  xqc:seqtype(tail($parts),$ret,$lastseen)};';
query = xqc.normalizeQuery(n.string(query));
console.log(query);
var ana = xqc.block(n.filter(n.select(fn.analyzeString(query, n.string("([^\\s\\(\\),\\.;]+)")), n.seq(n.string("*"))), function($_0) {
                return n.or(n.geq(fn.name($_0), n.string("fn:match")), n.geq(fn.matches(fn.string($_0), n.string("^\\s*$")), fn.false()));
            }),n.string(""));
console.log(ana);
  //console.log(n.geq(n.attribute("a","1"),1));
  //console.log(fn.replace(query,"(^|[\\s,\\(\\);\\[\\]]+)function([\\s\\p{L}\\p{N}\\-_\\.:]*\\s*\\(([\\$\\p{L}\\p{N}\\-_\\.:\\(\\),\\?\\+\\*\\s])*\\)\\s*(as\\s+[\\p{L}\\p{N}\\-_\\.:\\(\\)]+)?\\s*\\{)","$1 =#21#06= $2").toString())
}

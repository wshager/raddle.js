import * as fn from "fn.js"

import * as n from "n.js"

export function main() {
  var $x =n.forEach(n.array(n.seq(1,2,3)),function($x){
    return $x + 10
  })
  console.log(
        //n.serialize(
            n.analyzeString(
                n.seq("core:define($,core:eval,(),(core:item($,value)),core:item(),(=#2#06=($value=#12=core:array(core:item()?),n:quote-seq($value),=#2#06=($value=#12=core:map(core:string(),core:item()?),(=#2#09=($,name,$value($%2)),=#2#09=($,args,$value($%4)),=#2#09=($,s,array:size($args)),=#2#06=(matches($name,$%6=#6=$raddle:ncname=#6=$%8),(=#2#09=($,local,replace($name,$%10,$%12)),=#2#09=($,is-type,$local=#5#07=map:keys($n:typemap)),=#2#09=($,is-op,map:contains($n:operator-map,$local)),=#2#09=($,args,=#2#06=($is-type=#3=$is-op,array:insert-before($args,1,$local),$args)),=#2#09=($,name,=#2#06=($is-type,(=#2#09=($,a,$n:typemap($local)),concat($%14,=#2#06=($a=#5#14=0,$a,$%16),$%18,$s=#8#01=1)),concat($name,$%20,$s))),n:quote($name,$args)),(=#2#09=($,name,=#2#06=($name=#5#01=$%22,concat($%24,$s),concat($name,$%26,$s))),n:quote($name,$args)))),n:quote($value)))))"),
                //n.seq("a(b,c)"),
                n.seq("(\\)[\\+\\*\\?]?)|(=#\\p{N}+#?\\p{N}*=|,)?([\\+\\*\\?\\p{L}\\p{N}\\-_\\.\\$:%/#@\\^]*)(\\(?)")
            )
        //)
    );
}

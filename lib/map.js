import * as n from "n.js";

export function put($map,$k,$v) {
	var m = n.atomic($map);
	var k = n.atomic($k);
	var v = n.atomic($v);
	return n.seqOf(m.set(k,v));
}

export function keys($map) {
	return $map.first().keySeq();
}

export function contains($map,$k){
	return n.seqOf(n.atomic($map).has(n.atomic($k)));
}

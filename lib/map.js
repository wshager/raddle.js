import * as n from "n.js";

export function put($map,$k,$v) {
	return n.seq($map.first().set($k.first(),$v.first()));
}

export function keys($map) {
	return $map.first().keySeq();
}

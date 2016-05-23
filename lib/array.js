import * as n from "n.js";

// expect js arrays
export function head($a) {
	$a = ($a instanceof Array) ? n.array($a) : $a;
	return n.seq($a.first().slice(0,1));
}

export function tail($a) {
	$a = ($a instanceof Array) ? n.array($a) : $a;
	return n.seq($a.first().slice(1));
}

export function size($a) {
	if($a instanceof Array) return n.seq($a.length);
	return n.seq($a.first().count());
}

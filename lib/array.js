import * as n from "n.js";

export function head($a) {
	return n.seq($a.first().slice(0,1));
}

export function tail($a) {
	return n.seq($a.first().slice(1));
}

export function size($a) {
	return n.seq($a.first().count());
}

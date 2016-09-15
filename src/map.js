import * as n from "./n";

export function put($map,$k,$v) {
	var k = n.atomic($k);
	var v = n.atomic($v);
	return n.put($map,k,v);
}

export function keys($map) {
	return $map.first().keySeq();
}

export function contains($map,$k){
	return n.seq(n.atomic($map).has(n.atomic($k)));
}

export function forEachEntry($map,$fn){
	let fn = n.atomic($fn);
	return $map.map(function(map){
		return map.entries(n.wrap(fn));
	});
}

export function entry($key,$val){
	return n.array(n.seq($key,$val));
}

export function get($map,$key) {
	return n.fetch($map,$key);
}

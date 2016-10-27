/* xquery version "3.1" */

/*module namespace a="http://raddle.org/array-util";

n.seq()*/

import * as n from "./n";

import * as array from "xvarray";

import * as fn from "xvfn";


export function put(...$_a) {
	var $_l = $_a.length,
		$ = n.frame($_a);

	if($_l==3){
		$.init($.array("array"),$.item("position"),$.item("member"));
		return n.item(array.insertBefore(array.remove($.get("array"),$.get("position")),$.get("position"),$.get("member")));
	}
	return n.error(put,$_l);
}

export function foldLeft(...$_a) {
	var $_l = $_a.length,
		$ = n.frame($_a);

	if($_l==3){
		$.init($.array("array"),$.item("zero"),$.item("function"));
		return n.item($.test(n.eq(array.size($.get("array")),n.integer(0))) ?
 ($.get("zero")) :
 (foldLeft(array.tail($.get("array")),n.call($.get("function"),$.get("zero"),array.head($.get("array"))),$.get("function"))));
	}
	return n.error(foldLeft,$_l);
}

export function foldLeftAt(...$_a) {
	var $_l = $_a.length,
		$ = n.frame($_a);

	if($_l==3){
		$.init($.array("array"),$.item("zero"),$.item("function"));
		return n.item(foldLeftAt($.get("array"),$.get("zero"),$.get("function"),n.integer(1)));
	}

	if($_l==4){
		$.init($.array("array"),$.item("zero"),$.item("function"),$.item("at"));
		return n.item($.test(n.eq(array.size($.get("array")),n.integer(0))) ?
 ($.get("zero")) :
 (foldLeftAt(array.tail($.get("array")),n.call($.get("function"),$.get("zero"),array.head($.get("array")),$.get("at")),$.get("function"),n.add($.get("at"),n.integer(1)))));
	}
	return n.error(foldLeftAt,$_l);
}

export function foldRightAt(...$_a) {
	var $_l = $_a.length,
		$ = n.frame($_a);

	if($_l==3){
		$.init($.array("array"),$.item("zero"),$.item("function"));
		return n.item(foldRightAt($.get("array"),$.get("zero"),$.get("function"),n.integer(1)));
	}

	if($_l==4){
		$.init($.array("array"),$.item("zero"),$.item("function"),$.item("at"));
		return n.item($.test(n.eq(array.size($.get("array")),n.integer(0))) ?
 ($.get("zero")) :
 (n.call($.get("function"),array.head($.get("array")),foldRightAt(array.tail($.get("array")),$.get("zero"),$.get("function"),n.add($.get("at"),n.integer(1))))));
	}
	return n.error(foldRightAt,$_l);
}

export function forEach(...$_a) {
	var $_l = $_a.length,
		$ = n.frame($_a);

	if($_l==2){
		$.init($.array("array"),$.item("function"));
		return n.item(forEach($.get("array"),$.get("function"),n.array(n.seq())));
	}

	if($_l==3){
		$.init($.array("array"),$.item("function"),$.item("ret"));
		return n.item($.test(n.eq(array.size($.get("array")),n.integer(0))) ?
 ($.get("ret")) :
 (forEach(array.tail($.get("array")),$.get("function"),array.append($.get("ret"),n.call($.get("function"),array.head($.get("array")))))));
	}
	return n.error(forEach,$_l);
}

export function forEachAt(...$_a) {
	var $_l = $_a.length,
		$ = n.frame($_a);

	if($_l==2){
		$.init($.array("array"),$.item("function"));
		return n.item(forEachAt($.get("array"),$.get("function"),n.array(n.seq()),n.integer(1)));
	}

	if($_l==4){
		$.init($.array("array"),$.item("function"),$.item("ret"),$.item("at"));
		return n.item($.test(n.eq(array.size($.get("array")),n.integer(0))) ?
 ($.get("ret")) :
 (forEachAt(array.tail($.get("array")),$.get("function"),array.append($.get("ret"),n.call($.get("function"),array.head($.get("array")),$.get("at"))),n.add($.get("at"),n.integer(1)))));
	}
	return n.error(forEachAt,$_l);
}

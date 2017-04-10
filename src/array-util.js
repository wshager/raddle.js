/* xquery version "3.1" */

/*module namespace a="http://raddle.org/array-util";

n.seq()*/

import * as n from "./n";

import * as array from "xvarray";

import * as fn from "xvfn";

var $ = n.frame();

export function put$3(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("position")
		.item("member");
	return array.insertBefore(array.remove($("array"),$("position")),$("position"),$("member"));

}

export function foldLeft$3(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function");
	return foldLeft($("array"),$("zero"),$("function"),array.size($("array")));

}

export function foldLeft$4(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function")
		.item("s");
	return ($ => {
	if($.test(n.eq($("s"),n.integer(0)))) {
		return $("zero");
	} else {
		return foldLeft(array.tail($("array")),n.call($("function"),$("zero"),array.head($("array"))),$("function"),n.subtract($("s"),n.integer(1)));
	}
	})($.frame());

}

export function foldLeftAt$3(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function");
	return foldLeftAt($("array"),$("zero"),$("function"),n.integer(1));

}

export function foldLeftAt$4(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function")
		.item("at");
	return foldLeftAt($("array"),$("zero"),$("function"),$("at"),array.size($("array")));

}

export function foldLeftAt$5(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function")
		.item("at")
		.item("s");
	return ($ => {
	if($.test(n.eq($("s"),n.integer(0)))) {
		return $("zero");
	} else {
		return foldLeftAt(array.tail($("array")),n.call($("function"),$("zero"),array.head($("array")),$("at")),$("function"),n.add($("at"),n.integer(1)),n.subtract($("s"),n.integer(1)));
	}
	})($.frame());

}

export function foldRight$3(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function");
	return foldRight($("array"),$("zero"),$("function"),array.size($("array")));

}

export function foldRight$4(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function")
		.item("s");
	return ($ => {
	if($.test(n.eq($("s"),n.integer(0)))) {
		return $("zero");
	} else {
		return foldRight(array.remove($("array"),$("s")),n.call($("function"),array.get($("array"),$("s")),$("zero")),$("function"),n.subtract($("s"),n.integer(1)));
	}
	})($.frame());

}

export function foldRightAt$3(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function");
	return foldRightAt($("array"),$("zero"),$("function"),array.size($("array")));

}

export function foldRightAt$4(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("zero")
		.item("function")
		.item("at");
	return ($ => {
	if($.test(n.eq($("at"),n.integer(0)))) {
		return $("zero");
	} else {
		return foldRightAt(array.remove($("array"),$("at")),n.call($("function"),array.get($("array"),$("at")),$("zero"),$("at")),$("function"),n.subtract($("at"),n.integer(1)));
	}
	})($.frame());

}

export function forEach$2(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("function");
	return forEach($("array"),$("function"),n.array(n.seq()));

}

export function forEach$3(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("function")
		.item("ret");
	return ($ => {
	if($.test(n.eq(array.size($("array")),n.integer(0)))) {
		return $("ret");
	} else {
		return forEach(array.tail($("array")),$("function"),array.append($("ret"),n.call($("function"),array.head($("array")))));
	}
	})($.frame());

}

export function forEachAt$2(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("function");
	return forEachAt($("array"),$("function"),n.array(n.seq()),n.integer(1));

}

export function forEachAt$4(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("function")
		.item("ret")
		.item("at");
	return ($ => {
	if($.test(n.eq(array.size($("array")),n.integer(0)))) {
		return $("ret");
	} else {
		return forEachAt(array.tail($("array")),$("function"),array.append($("ret"),n.call($("function"),array.head($("array")),$("at"))),n.add($("at"),n.integer(1)));
	}
	})($.frame());

}

export function last$1(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne));
	return array.get($("array"),array.size($("array")));

}

export function pop$1(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne));
	return array.remove($("array"),array.size($("array")));

}

export function firstIndexOf$2(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("lookup",n.zeroOrOne);
	return foldLeftAt($("array"),n.seq(),function (...$_a) {
	$ = $.frame($_a)
		.item("pre")
		.item("cur")
		.item("at");
	return ($ => {
	if($.test($.test(fn.empty($("pre"))) || $.test(fn.deepEqual($("cur"),$("lookup"))))) {
		return $("at");
	} else {
		return $("pre");
	}
	})($.frame());

});

}

export function lastIndexOf$2(...$_a) {
	var $ = n.frame($_a)
		.array("array",$.item(n.zeroOrOne))
		.item("lookup",n.zeroOrOne);
	return foldRightAt($("array"),n.integer(0),function (...$_a) {
	$ = $.frame($_a)
		.item("cur")
		.item("pre")
		.item("at");
	return ($ => {
	if($.test($.test(n.eq($("pre"),n.integer(0))) && $.test(fn.deepEqual($("cur"),$("lookup"))))) {
		return $("at");
	} else {
		return $("pre");
	}
	})($.frame());

});

}

export function forEachAt(...$_a) {
	var $_l = $_a.length;
	if($_l===2){
		return forEachAt$2.apply(this,$_a);
	}
	if($_l===4){
		return forEachAt$4.apply(this,$_a);
	}

	return n.error(forEachAt,$_l);
}

export function foldLeftAt(...$_a) {
	var $_l = $_a.length;
	if($_l===3){
		return foldLeftAt$3.apply(this,$_a);
	}
	if($_l===4){
		return foldLeftAt$4.apply(this,$_a);
	}
	if($_l===5){
		return foldLeftAt$5.apply(this,$_a);
	}

	return n.error(foldLeftAt,$_l);
}

export function firstIndexOf(...$_a) {
	var $_l = $_a.length;
	if($_l===2){
		return firstIndexOf$2.apply(this,$_a);
	}

	return n.error(firstIndexOf,$_l);
}

export function foldRight(...$_a) {
	var $_l = $_a.length;
	if($_l===3){
		return foldRight$3.apply(this,$_a);
	}
	if($_l===4){
		return foldRight$4.apply(this,$_a);
	}

	return n.error(foldRight,$_l);
}

export function last(...$_a) {
	var $_l = $_a.length;
	if($_l===1){
		return last$1.apply(this,$_a);
	}

	return n.error(last,$_l);
}

export function lastIndexOf(...$_a) {
	var $_l = $_a.length;
	if($_l===2){
		return lastIndexOf$2.apply(this,$_a);
	}

	return n.error(lastIndexOf,$_l);
}

export function put(...$_a) {
	var $_l = $_a.length;
	if($_l===3){
		return put$3.apply(this,$_a);
	}

	return n.error(put,$_l);
}

export function foldRightAt(...$_a) {
	var $_l = $_a.length;
	if($_l===3){
		return foldRightAt$3.apply(this,$_a);
	}
	if($_l===4){
		return foldRightAt$4.apply(this,$_a);
	}

	return n.error(foldRightAt,$_l);
}

export function pop(...$_a) {
	var $_l = $_a.length;
	if($_l===1){
		return pop$1.apply(this,$_a);
	}

	return n.error(pop,$_l);
}

export function foldLeft(...$_a) {
	var $_l = $_a.length;
	if($_l===3){
		return foldLeft$3.apply(this,$_a);
	}
	if($_l===4){
		return foldLeft$4.apply(this,$_a);
	}

	return n.error(foldLeft,$_l);
}

export function forEach(...$_a) {
	var $_l = $_a.length;
	if($_l===2){
		return forEach$2.apply(this,$_a);
	}
	if($_l===3){
		return forEach$3.apply(this,$_a);
	}

	return n.error(forEach,$_l);
}

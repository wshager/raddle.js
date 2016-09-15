/* xquery version "3.1" */

/*module namespace a="http://raddle.org/array-util";

n.seq()*/

import * as n from "n.js";

import * as array from "array.js";

import * as fn from "fn.js";

export function put($array,$position,$member) /*n.item()*/ {

return array.insertBefore(array.remove($array,$position),$position,$member);

}

export function last($array) /*n.item()*/ {

var $s;

return (($s = n.item(array.size($array)),

(n.ggt($s,0) ? $array($s) : n.seq())));

}

export function initial($array) /*n.item()*/ {

var $s;

return (($s = n.item(array.size($array)),

(n.ggt($s,0) ? array.remove($array,$s) : $array)));

}

export function foldLeft($array,$zero,$function) /*n.item()*/ {

return (n.eq(array.size($array),0) ? $zero : foldLeft(array.tail($array),$function($zero,array.head($array)),$function));

}

function foldLeftAt_3($array,$zero,$function) /*n.item()*/ {

return foldLeftAt($array,$zero,$function,1);

}

function foldLeftAt_4($array,$zero,$function,$at) /*n.item()*/ {

return (n.eq(array.size($array),0) ? $zero : foldLeftAt(array.tail($array),$function($zero,array.head($array),$at),$function,n.add($at,1)));

}

export function foldLeftAt(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,3) ? fn.apply(foldLeftAt_3,$a) : (n.eq($s,4) ? fn.apply(foldLeftAt_4,$a) : n.seq()))));

}

function forEach_2($array,$function) /*n.item()*/ {

return forEach($array,$function,n.array(n.seq()));

}

function forEach_3($array,$function,$ret) /*n.item()*/ {

return (n.eq(array.size($array),0) ? $ret : forEach(array.tail($array),$function,array.append($ret,$function(array.head($array)))));

}

export function forEach(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ? fn.apply(forEach_2,$a) : (n.eq($s,3) ? fn.apply(forEach_3,$a) : n.seq()))));

}

function forEachAt_2($array,$function) /*n.item()*/ {

return forEachAt($array,$function,n.array(n.seq()),1);

}

function forEachAt_4($array,$function,$ret,$at) /*n.item()*/ {

return (n.eq(array.size($array),0) ? $ret : forEachAt(array.tail($array),$function,array.append($ret,$function(array.head($array),$at)),n.add($at,1)));

}

export function forEachAt(... $a) /*n.item()*/ {

var $s;

return (($s = n.integer(array.size($a)),

(n.eq($s,2) ? fn.apply(forEachAt_2,$a) : (n.eq($s,4) ? fn.apply(forEachAt_4,$a) : n.seq()))));

}

import * as fn from "xvfn";

export * from "xvfn";

export function count$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.count.apply(this,$_a);
}

export function avg$1(...$_a) {
	var $ = n.frame($_a)
		.atomic(1,n.zeroOrMore);
	return fn.avg.apply(this,$_a);
}

export function max$1(...$_a) {
	var $ = n.frame($_a)
		.atomic(1,n.zeroOrMore);
	return fn.max.apply(this,$_a);
}

export function min$1(...$_a) {
	var $ = n.frame($_a)
		.atomic(1,n.zeroOrMore);
	return fn.min.apply(this,$_a);
}

export function sum$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.sum.apply(this,$_a);
}

export function doc$1(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne);
	return fn.doc.apply(this,$_a);
}

export function collection$1(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne);
	return fn.collection.apply(this,$_a);
}

export function forEach$2(...$_a) {
	var $ = n.frame($_a)
		.item(1)
		.func(2,($.item()),$.item(n.zeroOrMore));
	return fn.forEach.apply(this,$_a);
}

export function filter$2(...$_a) {
	var $ = n.frame($_a)
		.item(1)
		.func(2,($.item()),$.item(n.zeroOrMore));
	return fn.filter.apply(this,$_a);
}

export function foldLeft$3(...$_a) {
	var $ = n.frame($_a)
		.item(1)
		.item(2)
		.func(3,($.item(n.zeroOrMore),$.item()),$.item(n.zeroOrMore));
	return fn.foldLeft.apply(this,$_a);
}

export function foldRight$3(...$_a) {
	var $ = n.frame($_a)
		.item(1)
		.item(2)
		.func(3,($.item(n.zeroOrMore),$.item()),$.item(n.zeroOrMore));
	return fn.foldRight.apply(this,$_a);
}

export function sort$2(...$_a) {
	var $ = n.frame($_a)
		.item(1)
		.func(2,($.item()),$.item(n.zeroOrMore));
	return fn.sort.apply(this,$_a);
}

export function apply$2(...$_a) {
	var $ = n.frame($_a)
		.func(1,n.zeroOrMore)
		.array(2,n.zeroOrMore);
	return fn.apply.apply(this,$_a);
}

export function abs$1(...$_a) {
	var $ = n.frame($_a)
		.numeric(1,n.zeroOrOne);
	return fn.abs.apply(this,$_a);
}

export function ceiling$1(...$_a) {
	var $ = n.frame($_a)
		.numeric(1,n.zeroOrOne);
	return fn.ceiling.apply(this,$_a);
}

export function floor$1(...$_a) {
	var $ = n.frame($_a)
		.numeric(1,n.zeroOrOne);
	return fn.floor.apply(this,$_a);
}

export function round$1(...$_a) {
	var $ = n.frame($_a)
		.numeric(1,n.zeroOrOne);
	return fn.round.apply(this,$_a);
}

export function roundHalfToEven$1(...$_a) {
	var $ = n.frame($_a)
		.numeric(1,n.zeroOrOne);
	return fn.roundHalfToEven.apply(this,$_a);
}

export function codepointsToString$1(...$_a) {
	var $ = n.frame($_a)
		.integer(1,n.zeroOrMore);
	return fn.codepointsToString.apply(this,$_a);
}

export function stringToCodepoints$1(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne);
	return fn.stringToCodepoints.apply(this,$_a);
}

export function tokenize$2(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne)
		.string(2);
	return fn.tokenize.apply(this,$_a);
}

export function replace$3(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne)
		.string(2)
		.string(3);
	return fn.replace.apply(this,$_a);
}

export function matches$2(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne)
		.string(2);
	return fn.matches.apply(this,$_a);
}

export function analyzeString$2(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne)
		.string(2);
	return fn.analyzeString.apply(this,$_a);
}

export function concat$(...$_a) {
	var $ = n.frame($_a)
		.atomic("...1",n.zeroOrOne);
	return fn.concat.apply(this,$_a);
}

export function stringJoin$1(...$_a) {
	var $ = n.frame($_a)
		.atomic(1,n.zeroOrMore);
	return fn.stringJoin.apply(this,$_a);
}

export function stringJoin$2(...$_a) {
	var $ = n.frame($_a)
		.atomic(1,n.zeroOrMore)
		.string(2);
	return fn.stringJoin.apply(this,$_a);
}

export function substring$2(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne)
		.double(2);
	return fn.substring.apply(this,$_a);
}

export function substring$3(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne)
		.double(2)
		.double(3);
	return fn.substring.apply(this,$_a);
}

export function stringLength$1(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne);
	return fn.stringLength.apply(this,$_a);
}

export function upperCase$1(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne);
	return fn.upperCase.apply(this,$_a);
}

export function lowerCase$1(...$_a) {
	var $ = n.frame($_a)
		.string(1,n.zeroOrOne);
	return fn.lowerCase.apply(this,$_a);
}

export function functionLookup$2(...$_a) {
	var $ = n.frame($_a)
		.QName(1,n.zeroOrOne)
		.integer(2);
	return fn.functionLookup.apply(this,$_a);
}

export function name$1(...$_a) {
	var $ = n.frame($_a)
		.node(1,n.zeroOrOne);
	return fn.name.apply(this,$_a);
}

export function empty$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.empty.apply(this,$_a);
}

export function exists$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.exists.apply(this,$_a);
}

export function head$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.head.apply(this,$_a);
}

export function tail$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.tail.apply(this,$_a);
}

export function insertBefore$3(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore)
		.integer(2)
		.item(3,n.zeroOrMore);
	return fn.insertBefore.apply(this,$_a);
}

export function remove$2(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore)
		.integer(2);
	return fn.remove.apply(this,$_a);
}

export function reverse$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.reverse.apply(this,$_a);
}

export function subsequence$2(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore)
		.double(2);
	return fn.subsequence.apply(this,$_a);
}

export function subsequence$3(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore)
		.double(2)
		.double(3);
	return fn.subsequence.apply(this,$_a);
}

export function indexOf$2(...$_a) {
	var $ = n.frame($_a)
		.atomic(1,n.zeroOrMore)
		.atomic(2);
	return fn.indexOf.apply(this,$_a);
}

export function zeroOrOne$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.zeroOrOne.apply(this,$_a);
}

export function oneOrMore$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.oneOrMore.apply(this,$_a);
}

export function exactlyOne$1(...$_a) {
	var $ = n.frame($_a)
		.item(1,n.zeroOrMore);
	return fn.exactlyOne.apply(this,$_a);
}

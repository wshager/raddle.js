"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _xvfn = require("xvfn");

Object.keys(_xvfn).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function () {
			return _xvfn[key];
		}
	});
});
exports.count$1 = count$1;
exports.avg$1 = avg$1;
exports.max$1 = max$1;
exports.min$1 = min$1;
exports.sum$1 = sum$1;
exports.doc$1 = doc$1;
exports.collection$1 = collection$1;
exports.forEach$2 = forEach$2;
exports.filter$2 = filter$2;
exports.foldLeft$3 = foldLeft$3;
exports.foldRight$3 = foldRight$3;
exports.sort$2 = sort$2;
exports.apply$2 = apply$2;
exports.abs$1 = abs$1;
exports.ceiling$1 = ceiling$1;
exports.floor$1 = floor$1;
exports.round$1 = round$1;
exports.roundHalfToEven$1 = roundHalfToEven$1;
exports.codepointsToString$1 = codepointsToString$1;
exports.stringToCodepoints$1 = stringToCodepoints$1;
exports.tokenize$2 = tokenize$2;
exports.replace$3 = replace$3;
exports.matches$2 = matches$2;
exports.analyzeString$2 = analyzeString$2;
exports.concat$ = concat$;
exports.stringJoin$1 = stringJoin$1;
exports.stringJoin$2 = stringJoin$2;
exports.substring$2 = substring$2;
exports.substring$3 = substring$3;
exports.stringLength$1 = stringLength$1;
exports.upperCase$1 = upperCase$1;
exports.lowerCase$1 = lowerCase$1;
exports.functionLookup$2 = functionLookup$2;
exports.name$1 = name$1;
exports.empty$1 = empty$1;
exports.exists$1 = exists$1;
exports.head$1 = head$1;
exports.tail$1 = tail$1;
exports.insertBefore$3 = insertBefore$3;
exports.remove$2 = remove$2;
exports.reverse$1 = reverse$1;
exports.subsequence$2 = subsequence$2;
exports.subsequence$3 = subsequence$3;
exports.indexOf$2 = indexOf$2;
exports.zeroOrOne$1 = zeroOrOne$1;
exports.oneOrMore$1 = oneOrMore$1;
exports.exactlyOne$1 = exactlyOne$1;

var fn = _interopRequireWildcard(_xvfn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function count$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.count.apply(this, $_a);
}

function avg$1(...$_a) {
	var $ = n.frame($_a).atomic(1, n.zeroOrMore);
	return fn.avg.apply(this, $_a);
}

function max$1(...$_a) {
	var $ = n.frame($_a).atomic(1, n.zeroOrMore);
	return fn.max.apply(this, $_a);
}

function min$1(...$_a) {
	var $ = n.frame($_a).atomic(1, n.zeroOrMore);
	return fn.min.apply(this, $_a);
}

function sum$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.sum.apply(this, $_a);
}

function doc$1(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne);
	return fn.doc.apply(this, $_a);
}

function collection$1(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne);
	return fn.collection.apply(this, $_a);
}

function forEach$2(...$_a) {
	var $ = n.frame($_a).item(1).func(2, $.item(), $.item(n.zeroOrMore));
	return fn.forEach.apply(this, $_a);
}

function filter$2(...$_a) {
	var $ = n.frame($_a).item(1).func(2, $.item(), $.item(n.zeroOrMore));
	return fn.filter.apply(this, $_a);
}

function foldLeft$3(...$_a) {
	var $ = n.frame($_a).item(1).item(2).func(3, ($.item(n.zeroOrMore), $.item()), $.item(n.zeroOrMore));
	return fn.foldLeft.apply(this, $_a);
}

function foldRight$3(...$_a) {
	var $ = n.frame($_a).item(1).item(2).func(3, ($.item(n.zeroOrMore), $.item()), $.item(n.zeroOrMore));
	return fn.foldRight.apply(this, $_a);
}

function sort$2(...$_a) {
	var $ = n.frame($_a).item(1).func(2, $.item(), $.item(n.zeroOrMore));
	return fn.sort.apply(this, $_a);
}

function apply$2(...$_a) {
	var $ = n.frame($_a).func(1, n.zeroOrMore).array(2, n.zeroOrMore);
	return fn.apply.apply(this, $_a);
}

function abs$1(...$_a) {
	var $ = n.frame($_a).numeric(1, n.zeroOrOne);
	return fn.abs.apply(this, $_a);
}

function ceiling$1(...$_a) {
	var $ = n.frame($_a).numeric(1, n.zeroOrOne);
	return fn.ceiling.apply(this, $_a);
}

function floor$1(...$_a) {
	var $ = n.frame($_a).numeric(1, n.zeroOrOne);
	return fn.floor.apply(this, $_a);
}

function round$1(...$_a) {
	var $ = n.frame($_a).numeric(1, n.zeroOrOne);
	return fn.round.apply(this, $_a);
}

function roundHalfToEven$1(...$_a) {
	var $ = n.frame($_a).numeric(1, n.zeroOrOne);
	return fn.roundHalfToEven.apply(this, $_a);
}

function codepointsToString$1(...$_a) {
	var $ = n.frame($_a).integer(1, n.zeroOrMore);
	return fn.codepointsToString.apply(this, $_a);
}

function stringToCodepoints$1(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne);
	return fn.stringToCodepoints.apply(this, $_a);
}

function tokenize$2(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne).string(2);
	return fn.tokenize.apply(this, $_a);
}

function replace$3(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne).string(2).string(3);
	return fn.replace.apply(this, $_a);
}

function matches$2(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne).string(2);
	return fn.matches.apply(this, $_a);
}

function analyzeString$2(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne).string(2);
	return fn.analyzeString.apply(this, $_a);
}

function concat$(...$_a) {
	var $ = n.frame($_a).atomic("...1", n.zeroOrOne);
	return fn.concat.apply(this, $_a);
}

function stringJoin$1(...$_a) {
	var $ = n.frame($_a).atomic(1, n.zeroOrMore);
	return fn.stringJoin.apply(this, $_a);
}

function stringJoin$2(...$_a) {
	var $ = n.frame($_a).atomic(1, n.zeroOrMore).string(2);
	return fn.stringJoin.apply(this, $_a);
}

function substring$2(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne).double(2);
	return fn.substring.apply(this, $_a);
}

function substring$3(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne).double(2).double(3);
	return fn.substring.apply(this, $_a);
}

function stringLength$1(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne);
	return fn.stringLength.apply(this, $_a);
}

function upperCase$1(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne);
	return fn.upperCase.apply(this, $_a);
}

function lowerCase$1(...$_a) {
	var $ = n.frame($_a).string(1, n.zeroOrOne);
	return fn.lowerCase.apply(this, $_a);
}

function functionLookup$2(...$_a) {
	var $ = n.frame($_a).QName(1, n.zeroOrOne).integer(2);
	return fn.functionLookup.apply(this, $_a);
}

function name$1(...$_a) {
	var $ = n.frame($_a).node(1, n.zeroOrOne);
	return fn.name.apply(this, $_a);
}

function empty$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.empty.apply(this, $_a);
}

function exists$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.exists.apply(this, $_a);
}

function head$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.head.apply(this, $_a);
}

function tail$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.tail.apply(this, $_a);
}

function insertBefore$3(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore).integer(2).item(3, n.zeroOrMore);
	return fn.insertBefore.apply(this, $_a);
}

function remove$2(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore).integer(2);
	return fn.remove.apply(this, $_a);
}

function reverse$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.reverse.apply(this, $_a);
}

function subsequence$2(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore).double(2);
	return fn.subsequence.apply(this, $_a);
}

function subsequence$3(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore).double(2).double(3);
	return fn.subsequence.apply(this, $_a);
}

function indexOf$2(...$_a) {
	var $ = n.frame($_a).atomic(1, n.zeroOrMore).atomic(2);
	return fn.indexOf.apply(this, $_a);
}

function zeroOrOne$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.zeroOrOne.apply(this, $_a);
}

function oneOrMore$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.oneOrMore.apply(this, $_a);
}

function exactlyOne$1(...$_a) {
	var $ = n.frame($_a).item(1, n.zeroOrMore);
	return fn.exactlyOne.apply(this, $_a);
}

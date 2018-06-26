"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.prefixAndName = prefixAndName;
exports.normalizeName = normalizeName;
function camelCase(str) {
	return str.split(/-/g).map(function (_, i) {
		return i > 0 ? _.charAt(0).toUpperCase() + _.substr(1) : _;
	}).join("");
}

function prefixAndName(str, defaultNS) {
	var hasPrefix = /:/.test(str);
	var prefix = hasPrefix ? str.replace(/^([^:]*):.*$/, "$1") : defaultNS;
	var name = !str ? "seq" : hasPrefix ? str.replace(/^[^:]*:(.*)$/, "$1") : str;
	return { prefix: prefix, name: name };
}

function normalizeName(str, defaultNS) {
	const { prefix, name } = prefixAndName(str, defaultNS);
	return { prefix: prefix, name: camelCase(name) };
}
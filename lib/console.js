"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.log = log;
function log() {
	for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
		a[_key] = arguments[_key];
	}

	console.log.apply(console, a.map(function (_) {
		return _.toString();
	}));
}

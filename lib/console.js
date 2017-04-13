"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.log = log;

var _n = require("./n");

var n = _interopRequireWildcard(_n);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function log(...a) {
	console.log.apply(console, a.map(function (_) {
		return _.toString();
	}));
	return n.seq();
}
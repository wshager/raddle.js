"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fromReadStream = exports.fromStream = undefined;

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _rxjs = require("rxjs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const fromStream = exports.fromStream = function (stream, dataEventName = "data", finishEventName = "end") {
	stream.pause();

	return _rxjs.Observable.create(function (observer) {
		function dataHandler(data) {
			observer.next(data);
		}

		function errorHandler(err) {
			observer.error(err);
		}

		function endHandler() {
			observer.complete();
		}

		stream.addListener(dataEventName, dataHandler);
		stream.addListener("error", errorHandler);
		stream.addListener(finishEventName, endHandler);

		stream.resume();

		return function () {
			stream.removeListener(dataEventName, dataHandler);
			stream.removeListener("error", errorHandler);
			stream.removeListener(finishEventName, endHandler);
		};
	});
};

const fromReadStream = exports.fromReadStream = path => fromStream(fs.createReadStream(path));
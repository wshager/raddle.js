"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromReadStream = exports.fromStream = void 0;

var fs = _interopRequireWildcard(require("fs"));

var _rxjs = require("rxjs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const fromStream = function (stream, dataEventName = "data", finishEventName = "end") {
  stream.pause();
  return _rxjs.Observable.create(function (observer) {
    function dataHandler(data) {
      observer.next(data);
    }

    function errorHandler(err) {
      observer.error(err);
    }

    function endHandler() {
      stream.removeListener(dataEventName, dataHandler);
      stream.removeListener("error", errorHandler);
      stream.removeListener(finishEventName, endHandler);
      observer.complete();
    }

    stream.addListener(dataEventName, dataHandler);
    stream.addListener("error", errorHandler);
    stream.addListener(finishEventName, endHandler);
    stream.resume();
  });
};

exports.fromStream = fromStream;

const fromReadStream = path => fromStream(fs.createReadStream(path));

exports.fromReadStream = fromReadStream;
//# sourceMappingURL=node-stream.js.map
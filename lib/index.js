"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseString = exports.parse = exports.run = exports.compile = undefined;

var _compiler = require("./compiler");

Object.defineProperty(exports, "compile", {
  enumerable: true,
  get: function () {
    return _compiler.compile;
  }
});
Object.defineProperty(exports, "run", {
  enumerable: true,
  get: function () {
    return _compiler.run;
  }
});

var _parser = require("./parser");

Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parser.parse;
  }
});
Object.defineProperty(exports, "parseString", {
  enumerable: true,
  get: function () {
    return _parser.parseString;
  }
});

require("array-last-item");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;
exports.reduceAround = reduceAround;

function reduce(arr, fn, seed, at = 0) {
  const l = arguments.length;
  at = l < 3 ? 1 : at;

  for (let item of arr) {
    seed = fn(seed, item, at++);
  }

  return seed;
}

function reduceAround(arr, fn, seed, lastSeed, nextSeed) {
  const l = arguments.length;
  seed = l < 3 ? arr.next().value : seed;
  let tmp = {
    out: seed,
    init: false,
    last: lastSeed,
    at: l < 3 ? 1 : 0
  }; // call one 'before' to set entry

  tmp = reduce(arr, function (tmp, next) {
    if (!tmp.init) {
      tmp.entry = next;
      tmp.init = true;
      return tmp;
    }

    tmp.out = fn.call(arr, tmp.out, tmp.entry, tmp.last, next, tmp.at);
    tmp.last = tmp.entry;
    tmp.entry = next;
    tmp.at = tmp.at + 1;
    return tmp;
  }, tmp);
  return !tmp.init ? tmp.out : fn.call(arr, tmp.out, tmp.entry, tmp.last, nextSeed, tmp.at);
}
//# sourceMappingURL=rich-reducers.js.map
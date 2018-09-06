"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;
exports.reduceAhead = reduceAhead;
exports.reduceAround = reduceAround;

function reduce(arr, fn, seed, at = 0) {
  const l = arguments.length;
  if (isIterable(arr)) arr = arr[Symbol.iterator]();
  let next = {};

  if (l < 3) {
    next = arr.next();
    seed = next.value;
    at = 1;
  }

  while (next = arr.next(), !next.done) {
    seed = fn(seed, next.value, at++);
  }

  return seed;
}

function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }

  return typeof obj[Symbol.iterator] === "function";
}

function reduceAhead(arr, fn, seed, nextSeed) {
  const l = arguments.length;
  if (isIterable(arr)) arr = arr[Symbol.iterator]();
  seed = l < 3 ? arr.next().value : seed;
  let tmp = {
    out: seed,
    init: false,
    at: l < 3 ? 1 : 0
  }; // call one 'before' to set entry

  tmp = reduce(arr, function (tmp, next) {
    if (!tmp.init) {
      tmp.entry = next;
      tmp.init = true;
      return tmp;
    }

    tmp.out = fn.call(arr, tmp.out, tmp.entry, next, tmp.at);
    tmp.entry = next;
    tmp.at = tmp.at + 1;
    return tmp;
  }, tmp);
  return !tmp.init ? tmp.out : fn.call(arr, tmp.out, tmp.entry, nextSeed, tmp.at);
}

function reduceAround(arr, fn, seed, lastSeed, nextSeed) {
  const l = arguments.length;
  if (isIterable(arr)) arr = arr[Symbol.iterator]();
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
//import * as Immutable from "../../immutable-js/dist/immutable.js";
import * as n from "n.js";

var exports = {};

for(var k in n) exports[k] = n[k];

exports.true = n.trueImpl;

exports.false = n.falseImpl;

exports.string = n.stringImpl;

exports.text = n.textImpl;

exports.concat = n.concatImpl;

export default exports;

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.module = exports.autoConverted = exports.nativeOps = exports.typemap = undefined;
exports.xqVersion$2 = xqVersion$2;
exports.and$2 = and$2;
exports.or$2 = or$2;
exports.isCaller$1 = isCaller$1;
exports.processArgs$3 = processArgs$3;
exports.native$2 = native$2;
exports.native$3 = native$3;
exports.pair$2 = pair$2;
exports.interop$2 = interop$2;
exports.transpile$2 = transpile$2;
exports.processTree$2 = processTree$2;
exports.processTree$3 = processTree$3;
exports.processTree$4 = processTree$4;
exports.processTree$5 = processTree$5;
exports.resolveModule$2 = resolveModule$2;
exports.call$2 = call$2;
exports.processValue$2 = processValue$2;
exports.processValue$3 = processValue$3;
exports.convert$2 = convert$2;
exports.serialize$2 = serialize$2;
exports.resolveFunction$2 = resolveFunction$2;
exports.resolveFunction$3 = resolveFunction$3;
exports.module$4 = module$4;
exports.namespace$3 = namespace$3;
exports.ximport$3 = ximport$3;
exports.ximport$4 = ximport$4;
exports.anonName$4 = anonName$4;
exports.xvar$4 = xvar$4;
exports.define$5 = define$5;
exports.definePrivate$6 = definePrivate$6;
exports.define$6 = define$6;
exports.cardinality$1 = cardinality$1;
exports.define$7 = define$7;
exports.describe$5 = describe$5;
exports.anon$4 = anon$4;
exports.letRet$2 = letRet$2;
exports.iff$3 = iff$3;
exports.typegen1$2 = typegen1$2;
exports.typegen1$3 = typegen1$3;
exports.select$2 = select$2;
exports.selectAttribute$2 = selectAttribute$2;
exports.typegen2$1 = typegen2$1;
exports.typegen2$4 = typegen2$4;
exports.typegen2$3 = typegen2$3;
exports.typegen2$2 = typegen2$2;
exports._typegen$1 = _typegen$1;
exports.typegen$1 = typegen$1;
exports.typegen$2 = typegen$2;
exports.typegen$3 = typegen$3;
exports.typegen$4 = typegen$4;
exports.typegen$5 = typegen$5;
exports.namespace = namespace;
exports.ximport = ximport;
exports.isFnSeq = isFnSeq;
exports.interop = interop;
exports.serialize = serialize;
exports.describe = describe;
exports.selectAttribute = selectAttribute;
exports.anon = anon;
exports.isCurrentModule = isCurrentModule;
exports.resolveModule = resolveModule;
exports.xvar = xvar;
exports.definePrivate = definePrivate;
exports.iff = iff;
exports.anonName = anonName;
exports.native = native;
exports._typegen = _typegen;
exports.cardinality = cardinality;
exports.isCaller = isCaller;
exports.letRet = letRet;
exports.resolveFunction = resolveFunction;
exports.pair = pair;
exports.processArgs = processArgs;
exports.define = define;
exports.typegen1 = typegen1;
exports.processTree = processTree;
exports.select = select;
exports.typegen2 = typegen2;
exports.convert = convert;
exports.processValue = processValue;
exports.call = call;
exports.typegen = typegen;
exports.and = and;
exports.or = or;
exports.xqVersion = xqVersion;
exports.transpile = transpile;

var _raddle = require("./raddle.js");

var rdl = _interopRequireWildcard(_raddle);

var _n = require("./n.js");

var n = _interopRequireWildcard(_n);

var _arrayUtil = require("./array-util.js");

var a = _interopRequireWildcard(_arrayUtil);

var _console = require("./console.js");

var console = _interopRequireWildcard(_console);

var _xvfn = require("xvfn");

var fn = _interopRequireWildcard(_xvfn);

var _xvmap = require("xvmap");

var map = _interopRequireWildcard(_xvmap);

var _xvarray = require("xvarray");

var array = _interopRequireWildcard(_xvarray);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

for (var k in fn.booleans) fn[k] = fn.booleans[k];

var $ = n.frame();
const typemap = exports.typemap = n.map(n.seq(n.pair(n.string("boolean"), n.integer(0)), n.pair(n.string("integer"), n.integer(0)), n.pair(n.string("decimal"), n.integer(0)), n.pair(n.string("string"), n.integer(0)), n.pair(n.string("item"), n.integer(0)), n.pair(n.string("anyURI"), n.integer(0)), n.pair(n.string("map"), n.integer(2)), n.pair(n.string("array"), n.integer(1)), n.pair(n.string("element"), n.integer(1)), n.pair(n.string("attribute"), n.integer(1))));

const nativeOps = exports.nativeOps = n.seq(n.string("eq"), n.string("ne"), n.string("lt"), n.string("le"), n.string("gt"), n.string("ge"), n.string("add"), n.string("subtract"), n.string("plus"), n.string("minus"), n.string("multiply"), n.string("div"), n.string("mod"), n.string("geq"), n.string("gne"), n.string("ggt"), n.string("glt"), n.string("gge"), n.string("gle"), n.string("concat"), n.string("filter"), n.string("filter-at"), n.string("for-each"), n.string("for-each-at"), n.string("to"), n.string("instance-of"));

const autoConverted = exports.autoConverted = n.map(n.seq(n.pair(n.string("true"), n.string("true()")), n.pair(n.string("false"), n.string("false()")), n.pair(n.string("null"), n.string("()")), n.pair(n.string("undefined"), n.string("()")), n.pair(n.string("Infinity"), n.string("1 div 0e0")), n.pair(n.string("-Infinity"), n.string("-1 div 0e0"))));

function xqVersion$2(...$_a) {
	var $ = n.frame($_a).item("frame").item("version");
	return n.concat(n.concat(n.string("/* xquery version "), $("version")), n.string(" */"));
}

function and$2(...$_a) {
	var $ = n.frame($_a).item("a").item("b");
	return fn.concat(n.string("$.test("), $("a"), n.string(") &amp;&amp; $.test("), $("b"), n.string(")"));
}

function or$2(...$_a) {
	var $ = n.frame($_a).item("a").item("b");
	return fn.concat(n.string("$.test("), $("a"), n.string(") || $.test("), $("b"), n.string(")"));
}

function isFnSeq$1(...$_a) {
	var $ = n.frame($_a).item("value");
	return ($ => {
		if ($.test(n.instanceOf($("value"), n.string()))) {
			return fn.concat(n.string("isFnSeq("), $("value"), n.string(")"));
		} else {
			return ($ => {
				if ($.test(n.eq(array.size($("value")), n.integer(0)))) {
					return n.seq();
				} else {
					var ret = a.forEachAt($("value"), function (...$_a) {
						$ = $.frame($_a).item("_").item("at");
						return ($ => {
							if ($.test(n.instanceOf($("_"), n.map()))) {
								return ($ => {
									if ($.test(n.geq(n.call($("_"), n.string("name")), n.seq(n.string("core:iff"), n.string("core:anon"))))) {
										return n.seq();
									} else {
										return isFnSeq(n.call($("_"), n.string("args")));
									}
								})($.frame());
							} else {
								return ($ => {
									if ($.test(n.instanceOf($("_"), n.string()))) {
										return ($ => {
											if ($.test(fn.matches($("_"), n.string("^\\.$")))) {
												return $("_");
											} else {
												return ($ => {
													if ($.test(fn.matches($("_"), n.string("^\\$$")))) {
														return n.call($("value"), n.add($("at"), n.integer(1)));
													} else {
														return n.seq();
													}
												})($.frame());
											}
										})($.frame());
									} else {
										return n.seq();
									}
								})($.frame());
							}
						})($.frame());
					});
					return array.flatten(ret);
				}
			})($.frame());
		}
	})($.frame());
}

function isCaller$1(...$_a) {
	var $ = n.frame($_a).item("args");
	return ($ => {
		if ($.test(n.instanceOf($("args"), n.string()))) {
			return fn.concat(n.string("isCaller("), $("args"), n.string(")"));
		} else {
			return a.foldLeft($("args"), fn.false(), function (...$_a) {
				$ = $.frame($_a).item("pre").item("arg");
				return $.test($("pre")) || $.test(n.seq($.test(n.instanceOf($("arg"), n.map())) && $.test(n.eq(n.call($("arg"), n.string("name")), n.string("")))));
			});
		}
	})($.frame());
}

function processArgs$3(...$_a) {
	var $ = n.frame($_a).item("frame").item("args").item("caller");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("processArgs("), $("frame"), n.string(","), $("args"), n.string(","), $("caller"), n.string(")"));
		} else {
			$ = $("isDefn", n.geq($("caller"), n.seq(n.string("core:define-private#6"), n.string("core:define#6"))));
			$ = $("isAnon", n.eq($("caller"), n.string("core:anon#4")));
			$ = $("isIff", n.eq($("caller"), n.string("core:iff#3")));
			$ = $("isInterop", n.eq($("caller"), n.string("core:interop#2")));
			$ = $("isTypegen", fn.matches($("caller"), n.concat(n.concat(n.string("^core:(typegen|"), fn.stringJoin(map.keys(typemap), n.string("|"))), n.string(")"))));
			console.log($("caller"));
			return a.foldLeftAt($("args"), n.array(n.seq()), function (...$_a) {
				$ = $.frame($_a).item("pre").item("arg").item("at");
				return ($ => {
					if ($.test(n.instanceOf($("arg"), n.array(n.item())))) {
						return ($ => {
							if ($.test($.test($.test(n.seq($.test($("isDefn")) && $.test(n.geq($("at"), n.integer(4))))) || $.test(n.seq($.test($("isAnon")) && $.test(n.geq($("at"), n.integer(2)))))) || $.test(n.seq($.test($("isInterop")) && $.test(n.geq($("at"), n.integer(2))))))) {
								return array.append($("pre"), $("arg"));
							} else {
								$ = $("isBody", $.test(n.seq($.test($("isDefn")) && $.test(n.geq($("at"), n.integer(6))))) || $.test(n.seq($.test($("isAnon")) && $.test(n.geq($("at"), n.integer(4))))));
								$ = $("isThenelse", $.test($("isIff")) && $.test(n.geq($("at"), n.seq(n.integer(2), n.integer(3)))));
								$ = $("arg", ($ => {
									if ($.test($.test($("isBody")) && $.test(n.eq(array.size($("arg")), n.integer(1))))) {
										$ = $("first", n.call($("arg"), n.integer(1)));
										return ($ => {
											if ($.test($.test(n.instanceOf($("first"), n.map())) && $.test(n.eq(n.call($("first"), n.string("name")), n.string(""))))) {
												return n.call($("first"), n.string("args"));
											} else {
												return $("arg");
											}
										})($.frame());
									} else {
										return $("arg");
									}
								})($.frame()));
								$ = $("fnSeq", isFnSeq($("arg")));
								$ = $("isLetRet", n.ggt(fn.count(n.filter($("fnSeq"), function ($_0) {
									return n.ne($_0, n.string("."));
								})), n.integer(0)));
								$ = $("isFnSeq", n.ggt(fn.count($("fnSeq")), n.integer(0)));


								return array.append($("pre"), ($ => {
									if ($.test($.test($.test($("isFnSeq")) || $.test($("isBody"))) || $.test($("isThenelse")))) {
										var isAnon = $.test($("isAnon"));
										$ = $("val", processArgs($("frame"), $("arg"), n.string("")));
										if(!isAnon) console.log("caller",$("caller"),$("isBody"),$("isDefn"),$("isTypegen"),"\n");
										if(!isAnon) console.log("val",$("val"),"\n");
										$ = $("s", array.size($("val")));
										$ = $("ret", ($ => {
											if ($.test(n.eq($("s"), n.integer(0)))) {
												return n.string("return n.seq();&#13;");
											} else {
												return ($ => {
													if ($.test(n.gt($("s"), n.integer(1)))) {
														return ($ => {
															if ($.test($("isLetRet"))) {
																return letRet($("val"), n.seq());
															} else {
																return fn.concat(n.string("return n.seq("), fn.stringJoin(array.flatten($("val")), n.string(",")), n.string(");&#13;"));
															}
														})($.frame());
													} else {
														return fn.concat(n.string("return "), n.call($("val"),1), n.string(";&#13;"));
													}
												})($.frame());
											}
										})($.frame()));
										return ($ => {
											if ($.test(n.geq($("fnSeq"), n.string(".")))) {
												return fn.concat(n.string("function($_0) {&#13;&#9;"), $("ret"), n.string("}"));
											} else {
												return $("ret");
											}
										})($.frame());
									} else {
										return a.forEachAt($("arg"), function (...$_a) {
											$ = $.frame($_a).item("_").item("at");
											return ($ => {
												if ($.test(n.instanceOf($("_"), n.array(n.item())))) {
													return processTree($("_"), $("frame"));
												} else {
													return processValue($("_"), $("frame"), $("at"));
												}
											})($.frame());
										});
									}
								})($.frame()));
							}
						})($.frame());
					} else {
						return ($ => {
							if ($.test(n.instanceOf($("arg"), n.map()))) {
								$ = $("s", array.size($("pre")));
								return ($ => {
									if ($.test($.test($.test(n.eq(fn.matches(n.call($("arg"), n.string("name")), n.string("^(core:call)?$")), fn.false())) && $.test(n.ggt(array.size($("args")), $("at")))) && $.test(isCaller(array.subarray($("args"), n.add($("at"), n.integer(1))))))) {
										return array.append($("pre"), n.map(n.seq(n.pair(n.string("name"), n.string("core:call")), n.pair(n.string("args"), n.array(n.seq(n.call($("arg"), n.string("name")), n.map(n.seq(n.pair(n.string("name"), n.string("")), n.pair(n.string("args"), n.call($("arg"), n.string("args")))))))))));
									} else {
										return ($ => {
											if ($.test($.test(n.eq(n.call($("arg"), n.string("name")), n.string(""))) && $.test(n.ggt($("s"), n.integer(1))))) {
												$ = $("last", n.call($("pre"), $("s")));
												return ($ => {
													if ($.test($.test(n.instanceOf($("last"), n.map())) && $.test(n.eq(n.call($("last"), n.string("name")), n.string("core:call"))))) {
														return a.put($("pre"), $("s"), n.map(n.seq(n.pair(n.string("name"), n.string("core:call")), n.pair(n.string("args"), n.array(n.seq($("last"), n.map(n.seq(n.pair(n.string("name"), n.string("")), n.pair(n.string("args"), n.call($("arg"), n.string("args")))))))))));
													} else {
														return array.append($("pre"), processValue($("arg"), $("frame")));
													}
												})($.frame());
											} else {
												var ret = processValue($("arg"), $("frame"));
												//console.log("proc", ret);
												return array.append($("pre"), ret);
											}
										})($.frame());
									}
								})($.frame());
							} else {
								return ($ => {
									if ($.test(n.eq($("arg"), n.string(".")))) {
										return array.append($("pre"), n.string("$_0"));
									} else {
										return ($ => {
											if ($.test(n.eq($("arg"), n.string("$")))) {
												return array.append($("pre"), $("frame"));
											} else {
												return ($ => {
													if ($.test(fn.matches($("arg"), n.concat(n.concat(n.string("^\\$["), rdl.ncname), n.string("]+$"))))) {
														return array.append($("pre"), ($ => {
															if ($.test(fn.matches($("arg"), n.string("^\\$\\p{N}")))) {
																return fn.replace($("arg"), n.string("^\\$"), n.string("\\$_"));
															} else {
																return serialize($("arg"), $("frame"));
															}
														})($.frame()));
													} else {
														return ($ => {
															if ($.test($.test(n.seq($.test(n.seq($.test($("isDefn")) || $.test($("isTypegen")))) && $.test(n.eq($("at"), n.integer(2))))) || $.test(n.seq($.test($("isInterop")) && $.test(n.eq($("at"), n.integer(1))))))) {
																return array.append($("pre"), $("arg"));
															} else {
																return ($ => {
																	if ($.test(fn.matches($("arg"), n.concat(n.concat(n.string("^_["), rdl.suffix), n.string("]?$"))))) {
																		return array.append($("pre"), fn.replace($("arg"), n.string("^_"), n.concat(n.string("_"), n.call($("frame"), n.string("$at")))));
																	} else {
																		return array.append($("pre"), serialize($("arg"), $("frame")));
																	}
																})($.frame());
															}
														})($.frame());
													}
												})($.frame());
											}
										})($.frame());
									}
								})($.frame());
							}
						})($.frame());
					}
				})($.frame());
			});
		}
	})($.frame());
}

function native$2(...$_a) {
	var $ = n.frame($_a).item("op").item("a");
	return fn.concat(n.string("n."), rdl.camelCase($("op")), n.string("("), $("a"), n.string(")"));
}

function native$3(...$_a) {
	var $ = n.frame($_a).item("op").item("a").item("b");
	return fn.concat(n.string("n."), rdl.camelCase($("op")), n.string("("), $("a"), n.string(","), $("b"), n.string(")"));
}

function pair$2(...$_a) {
	var $ = n.frame($_a).item("key").item("val");
	return fn.concat(n.string("n.pair("), $("key"), n.string(","), $("val"), n.string(")"));
}

function interop$2(...$_a) {
	var $ = n.frame($_a).item("name").item("arities");
	return ($ => {
		if ($.test(n.instanceOf($("arities"), n.string()))) {
			return fn.concat(n.string("interop("), $("name"), n.string(","), $("arities"), n.string(")"));
		} else {
			$ = $("parts", fn.tokenize(rdl.clip($("name")), n.string(":")));
			$ = $("fname", rdl.camelCase(n.filter($("parts"), function ($_0) {
				return n.geq(fn.position($_0), fn.last($_0));
			})));
			return fn.concat(n.string("export function "), $("fname"), n.string("(...$_a) {&#13;&#9;"), n.string("var $_l = $_a.length;&#13;&#9;"), fn.stringJoin(fn.forEach(array.flatten($("arities")), function (...$_a) {
				$ = $.frame($_a).item("a");
				return fn.concat(n.string("if($_l==="), $("a"), n.string("){&#13;&#9;&#9;"), n.string("return "), $("fname"), n.string("$"), $("a"), n.string(".apply(this,$_a);&#13;&#9;"), n.string("}&#13;&#9;"));
			}), n.string("&#13;")), n.string("&#13;&#9;"), n.string("return n.error("), $("fname"), n.string(",$_l);&#13;}"));
		}
	})($.frame());
}

function transpile$2(...$_a) {
	var $ = n.frame($_a).item("value").item("frame");
	$ = $("frame", map.put($("frame"), n.string("$tree"), $("value")));
	$ = $("distinct", array.foldLeft($("value"), n.map(n.seq()), function (...$_a) {
		$ = $.frame($_a).item("pre").item("cur");
		return ($ => {
			if ($.test(n.geq(n.call($("cur"), n.string("name")), n.seq(n.string("core:define"), n.string("core:define-private"))))) {
				$ = $("name", n.call(n.call($("cur"), n.seq(n.string("args"))), n.seq(n.integer(2))));
				$ = $("args", n.call(n.call($("cur"), n.seq(n.string("args"))), n.seq(n.integer(4))));
				return ($ => {
					if ($.test(map.contains($("pre"), $("name")))) {
						return map.put($("pre"), $("name"), array.append(n.call($("pre"), $("name")), array.size($("args"))));
					} else {
						return map.put($("pre"), $("name"), n.array(n.seq(array.size($("args")))));
					}
				})($.frame());
			} else {
				return $("pre");
			}
		})($.frame());
	}));
	var ret = n.array(n.seq(map.forEachEntry($("distinct"), function (...$_a) {
		$ = $.frame($_a).item("name").item("arities");
		return n.map(n.seq(n.pair(n.string("name"), n.string("core:interop")), n.pair(n.string("args"), n.array(n.seq($("name"), $("arities")))), n.pair(n.string("suffix"), n.string(""))));
	})));
	$ = $("value", array.join(n.seq($("value"), ret)));
	return processTree($("value"), $("frame"), fn.true());
}

function processTree$2(...$_a) {
	var $ = n.frame($_a).item("tree").item("frame");
	return ($ => {
		if ($.test(n.instanceOf($("tree"), n.string()))) {
			return fn.concat(n.string("processTree("), $("tree"), n.string(","), $("frame"), n.string(")"));
		} else {
			return processTree($("tree"), $("frame"), fn.false());
		}
	})($.frame());
}

function processTree$3(...$_a) {
	var $ = n.frame($_a).item("tree").item("frame").item("top");
	return ($ => {
		if ($.test(n.instanceOf($("tree"), n.string()))) {
			return fn.concat(n.string("processTree("), $("tree"), n.string(","), $("frame"), n.string(","), $("top"), n.string(")"));
		} else {
			return processTree($("tree"), $("frame"), $("top"), n.string(""));
		}
	})($.frame());
}

function processTree$4(...$_a) {
	var $ = n.frame($_a).item("tree").item("frame").item("top").item("ret");
	return ($ => {
		if ($.test(n.instanceOf($("tree"), n.string()))) {
			return fn.concat(n.string("processTree("), $("tree"), n.string(","), $("frame"), n.string(","), $("top"), n.string(","), $("ret"), n.string(")"));
		} else {
			return processTree($("tree"), $("frame"), $("top"), $("ret"), n.integer(1));
		}
	})($.frame());
}

function processTree$5(...$_a) {
	var $ = n.frame($_a).item("tree").item("frame").item("top").item("ret").item("at");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("processTree("), $("tree"), n.string(","), $("frame"), n.string(","), $("top"), n.string(","), $("ret"), n.string(","), $("at"), n.string(")"));
		} else {
			return ($ => {
				if ($.test(n.gt(array.size($("tree")), n.integer(0)))) {
					$ = $("head", array.head($("tree")));
					$ = $("frame", ($ => {
						if ($.test($.test(n.instanceOf($("head"), n.map())) && $.test(n.eq(n.call($("head"), n.string("name")), n.string("core:module"))))) {
							return map.put($("frame"), n.string("$prefix"), n.call(n.call($("head"), n.seq(n.string("args"))), n.seq(n.integer(2))));
						} else {
							return $("frame");
						}
					})($.frame()));
					$ = $("val", processValue($("head"), $("frame"), $("at")));
					$ = $("isSeq", n.instanceOf($("val"), n.array(n.item())));
					$ = $("val", ($ => {
						if ($.test($("isSeq"))) {
							return fn.concat(n.string("n.seq("), fn.stringJoin(array.flatten($("val")), n.string(",")), n.string(")"));
						} else {
							return $("val");
						}
					})($.frame()));
					$ = $("ret", fn.concat($("ret"), ($ => {
						if ($.test($.test(n.ne($("ret"), n.string(""))) && $.test(n.ggt($("at"), n.integer(1))))) {
							return ($ => {
								if ($.test($("top"))) {
									return n.string("&#10;&#13;");
								} else {
									return n.string(",&#13;");
								}
							})($.frame());
						} else {
							return n.string("");
						}
					})($.frame()), $("val")));
					return processTree(array.tail($("tree")), $("frame"), $("top"), $("ret"), n.add($("at"), n.integer(1)));
				} else {
					return ($ => {
						if ($.test(n.geq($("at"), n.integer(1)))) {
							return n.string("n.seq()");
						} else {
							return $("ret");
						}
					})($.frame());
				}
			})($.frame());
		}
	})($.frame());
}

function resolveModule$2(...$_a) {
	var $ = n.frame($_a).item("tree").item("name");
	return ($ => {
		if ($.test(n.instanceOf($("tree"), n.map()))) {
			return ($ => {
				if ($.test($.test(n.eq(n.call($("tree"), n.string("name")), n.string("core:define"))) && $.test(n.call($("tree"), n.string("args"))))) {
					return n.eq(n.seq(n.integer(2)), $("name"));
				} else {
					return $("tree");
				}
			})($.frame());
		} else {
			return ($ => {
				if ($.test(n.instanceOf($("tree"), n.array(n.item())))) {
					return array.flatten(array.forEach($("tree"), function (...$_a) {
						$ = $.frame($_a).item("arg");
						return;
					}));
				} else {
					return n.seq();
				}
			})($.frame());
		}
	})($.frame());
}

function call$2(...$_a) {
	var $ = n.frame($_a).item("a").item("b");
	return fn.concat(n.string("n.call("), $("a"), n.string(","), $("b"), n.string(")"));
}

function processValue$2(...$_a) {
	var $ = n.frame($_a).item("value").item("frame");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("processValue("), $("value"), n.string(","), $("frame"), n.string(")"));
		} else {
			return processValue($("value"), $("frame"), n.integer(0));
		}
	})($.frame());
}

function processValue$3(...$_a) {
	var $ = n.frame($_a).item("value").item("frame").item("at");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("processValue("), $("value"), n.string(","), $("frame"), n.string(","), $("at"), n.string(")"));
		} else {
			return ($ => {
				if ($.test(n.instanceOf($("value"), n.map()))) {
					$ = $("name", n.call($("value"), n.string("name")));
					$ = $("args", n.call($("value"), n.string("args")));
					$ = $("s", ($ => {
						if ($.test(map.contains($("value"), n.string("args")))) {
							return array.size($("args"));
						} else {
							return n.integer(0);
						}
					})($.frame()));
					return ($ => {
						if ($.test(map.contains($("value"), n.string("$tree")))) {
							return n.string("");
						} else {
							return ($ => {
								if ($.test(fn.matches($("name"), n.concat(n.concat(n.string("^core:["), rdl.ncname), n.string("]+$"))))) {
									$ = $("local", fn.replace($("name"), n.string("^core:"), n.string("")));
									$ = $("isType", n.geq($("local"), map.keys(typemap)));
									$ = $("isNative", n.geq(nativeOps, $("local")));
									$ = $("s", ($ => {
										if ($.test($.test($("isType")) || $.test($("isNative")))) {
											return n.add($("s"), n.integer(1));
										} else {
											return $("s");
										}
									})($.frame()));
									$ = $("isDefn", n.geq($("local"), n.seq(n.string("define"), n.string("define-private"), n.string("anon"))));
									$ = $("isFn", $.test($.test($.test(n.seq($.test($("isDefn")) && $.test(n.eq($("s"), n.integer(6))))) || $.test(n.seq($.test(n.eq($("local"), n.string("anon"))) && $.test(n.eq($("s"), n.integer(4)))))) || $.test(n.seq(n.eq($("local"), n.string("interop"))))) || $.test(n.seq(n.eq($("local"), n.string("iff")))));
									$ = $("args", processArgs($("frame"), $("args"), fn.concat($("name"), n.string("#"), $("s"))));
									$ = $("args", ($ => {
										if ($.test($.test($("isType")) || $.test($("isNative")))) {
											return array.insertBefore($("args"), n.integer(1), $("local"));
										} else {
											return $("args");
										}
									})($.frame()));
									$ = $("args", a.forEachAt($("args"), function (...$_a) {
										$ = $.frame($_a).item("_").item("i");
										return ($ => {
											if ($.test($.test(n.instanceOf($("_"), n.array(n.item()))) && $.test(fn.not($("isFn"))))) {
												return fn.concat(n.string("n.seq("), fn.stringJoin(array.flatten($("_")), n.string(",")), n.string(")"));
											} else {
												return ($ => {
													if ($.test($.test(n.instanceOf($("_"), n.map())) && $.test(n.eq(n.call($("_"), n.string("name")), n.string("core:call"))))) {
														return processValue($("_"), $("frame"));
													} else {
														return $("_");
													}
												})($.frame());
											}
										})($.frame());
									}));
									$ = $("s", array.size($("args")));
									$ = $("fn", ($ => {
										if ($.test($("isType"))) {
											$ = $("a", n.call(typemap, $("local")));
											$ = $("f", fn.concat(n.string("core:typegen"), ($ => {
												if ($.test(n.ggt($("a"), n.integer(0)))) {
													return $("a");
												} else {
													return n.string("");
												}
											})($.frame())));
											return exports[$("f").first().split(/:/)[1]];//fn.functionLookup(fn.QName(n.string("http://raddle.org/javascript"), $("f")), $("s"));
										} else {
											return ($ => {
												if ($.test($("isNative"))) {
													return native;//fn.functionLookup(fn.QName(n.string("http://raddle.org/javascript"), n.string("core:native")), $("s"));
												} else {
													return exports[$("name").first().split(/:/)[1]];//fn.functionLookup(fn.QName(n.string("http://raddle.org/javascript"), $("name")), $("s"));
												}
											})($.frame());
										}
									})($.frame()));
									$ = $("n", ($ => {
										if ($.test(fn.empty($("fn")))) {
											return console.log(n.seq($("name"), n.string("#"), array.size($("args")), n.string(","), $("args")));
										} else {
											return n.seq();
										}
									})($.frame()));
									var ret = fn.apply($("fn"), $("args"));
									//console.log($("fn").name, ret);
									return ret;
								} else {
									return ($ => {
										if ($.test(n.eq($("name"), n.string("")))) {
											$ = $("args", processArgs($("frame"), $("args"), n.string("")));
											return a.forEach($("args"), function (...$_a) {
												$ = $.frame($_a).item("_");
												return ($ => {
													if ($.test(n.instanceOf($("_"), n.array(n.item())))) {
														return fn.concat(n.string("n.seq("), fn.stringJoin(array.flatten($("_")), n.string(",")), n.string(")"));
													} else {
														return ($ => {
															if ($.test($.test(n.instanceOf($("_"), n.map())) && $.test(n.eq(n.call($("_"), n.string("name")), n.string("core:call"))))) {
																return processValue($("_"), $("frame"));
															} else {
																return $("_");
															}
														})($.frame());
													}
												})($.frame());
											});
										} else {
											$ = $("args", processArgs($("frame"), $("args"), fn.concat($("name"), n.string("#"), $("s"))));
											$ = $("ret", a.foldLeftAt($("args"), n.string(""), function (...$_a) {
												$ = $.frame($_a).item("pre").item("cur").item("at");
												return fn.concat($("pre"), ($ => {
													if ($.test(n.ggt($("at"), n.integer(1)))) {
														return n.string(",");
													} else {
														return n.string("");
													}
												})($.frame()), ($ => {
													if ($.test(n.instanceOf($("cur"), n.array(n.item())))) {
														return fn.concat(n.string("n.seq("), fn.stringJoin(array.flatten($("cur")), n.string(",")), n.string(")"));
													} else {
														return ($ => {
															if ($.test(n.instanceOf($("cur"), n.map()))) {
																return processValue($("cur"), $("frame"));
															} else {
																return $("cur");
															}
														})($.frame());
													}
												})($.frame()));
											}));
											return ($ => {
												if ($.test(fn.matches($("name"), n.string("^(\\$.*)$|^([^#]+#[0-9]+)$")))) {
													return fn.concat(n.string("n.call("), convert($("name"), $("frame")), n.string(","), $("ret"), n.string(")"));
												} else {
													return fn.concat(anonName($("frame"), $("name"), $("s"), n.string("fn")), n.string("("), $("ret"), n.string(")"));
												}
											})($.frame());
										}
									})($.frame());
								}
							})($.frame());
						}
					})($.frame());
				} else {
					return ($ => {
						if ($.test(n.instanceOf($("value"), n.array(n.item())))) {
							return fn.concat(n.string("n.seq("), processTree($("value"), $("frame")), n.string(")"));
						} else {
							return ($ => {
								if ($.test(fn.matches($("value"), n.concat(n.concat(n.string("^_["), rdl.suffix), n.string("]?$"))))) {
									return fn.replace($("value"), n.string("^_"), n.concat(n.string("\\$_"), $("at")));
								} else {
									return serialize($("value"), $("frame"));
								}
							})($.frame());
						}
					})($.frame());
				}
			})($.frame());
		}
	})($.frame());
}

function isCurrentModule$2(...$_a) {
	var $ = n.frame($_a).item("frame").item("name");
	return fn.concat(n.string("isCurrentModule("), $("frame"), n.string(","), $("name"), n.string(")"));
}

function convert$2(...$_a) {
	var $ = n.frame($_a).item("string").item("frame");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("convert("), $("string"), n.string(","), $("frame"), n.string(")"));
		} else {
			return ($ => {
				if ($.test(fn.matches($("string"), n.string("^n\\.call")))) {
					return $("string");
				} else {
					return ($ => {
						if ($.test(fn.matches($("string"), n.string("^(\\$.*)$|^([^#]+#[0-9]+)$")))) {
							$ = $("parts", fn.tokenize(rdl.camelCase(fn.replace($("string"), n.string("#\\p{N}+$"), n.string(""))), n.string(":")));
							return ($ => {
								if ($.test(n.eq(fn.count($("parts")), n.integer(1)))) {
									return fn.concat(n.string("$(&quot;"), fn.replace($("parts"), n.string("^\\$"), n.string("")), n.string("&quot;)"));
								} else {
									return ($ => {
										if ($.test(fn.matches(n.filter($("parts"), function ($_0) {
											return n.geq(fn.position($_0), n.integer(1));
										}), fn.concat(n.string("^\\$?"), n.call($("frame"), n.string("$prefix")))))) {
											return fn.replace(n.filter($("parts"), function ($_0) {
												return n.geq(fn.position($_0), fn.last($_0));
											}), n.string("\\$"), n.string(""));
										} else {
											return fn.concat(fn.replace(n.filter($("parts"), function ($_0) {
												return n.geq(fn.position($_0), n.integer(1));
											}), n.string("\\$"), n.string("")), n.string("."), n.filter($("parts"), function ($_0) {
												return n.geq(fn.position($_0), n.integer(2));
											}));
										}
									})($.frame());
								}
							})($.frame());
						} else {
							return ($ => {
								if ($.test(fn.matches($("string"), n.string("^(&quot;[^&quot;]*&quot;)$")))) {
									return fn.concat(n.string("n.string("), fn.replace($("string"), n.string("\\\\"), n.string("\\\\\\\\")), n.string(")"));
								} else {
									return ($ => {
										if ($.test(map.contains(autoConverted, $("string")))) {
											return n.call(autoConverted, $("string"));
										} else {
											return ($ => {
												if ($.test(n.geq(fn.string(fn.number($("string"))), n.string("NaN")))) {
													return fn.concat(n.string("n.string(&quot;"), fn.replace($("string"), n.string("\\\\"), n.string("\\\\\\\\")), n.string("&quot;)"));
												} else {
													return ($ => {
														if ($.test(fn.matches($("string"), n.string("\\.")))) {
															return fn.concat(n.string("n.decimal("), $("string"), n.string(")"));
														} else {
															return fn.concat(n.string("n.integer("), $("string"), n.string(")"));
														}
													})($.frame());
												}
											})($.frame());
										}
									})($.frame());
								}
							})($.frame());
						}
					})($.frame());
				}
			})($.frame());
		}
	})($.frame());
}

function serialize$2(...$_a) {
	var $ = n.frame($_a).item("value").item("params");
	return ($ => {
		if ($.test(n.instanceOf($("params"), n.string()))) {
			return fn.concat(n.string("serialize("), $("value"), n.string(","), $("params"), n.string(")"));
		} else {
			return ($ => {
				if ($.test(n.instanceOf($("value"), n.map()))) {
					return fn.concat(n.call($("value"), n.string("name")), ($ => {
						if ($.test(map.contains($("value"), n.string("args")))) {
							return serialize(n.call($("value"), n.string("args")), $("params"));
						} else {
							return n.string("()");
						}
					})($.frame()), ($ => {
						if ($.test(map.contains($("value"), n.string("suffix")))) {
							return n.call($("value"), n.string("suffix"));
						} else {
							return n.string("");
						}
					})($.frame()));
				} else {
					return ($ => {
						if ($.test(n.instanceOf($("value"), n.array(n.item())))) {
							return fn.concat(n.string("("), a.foldLeftAt($("value"), n.string(""), function (...$_a) {
								$ = $.frame($_a).item("pre").item("cur").item("at");
								$ = $("isSeq", n.seq($.test(n.instanceOf($("cur"), n.map())) && $.test(n.eq(n.call($("cur"), n.string("name")), n.string("")))));
								return fn.concat($("pre"), ($ => {
									if ($.test($.test(n.ggt($("at"), n.integer(1))) && $.test(n.geq($("isSeq"), fn.false())))) {
										return n.string(",");
									} else {
										return n.string("");
									}
								})($.frame()), serialize($("cur"), $("params")));
							}), n.string(")"));
						} else {
							return convert($("value"), $("params"));
						}
					})($.frame());
				}
			})($.frame());
		}
	})($.frame());
}

function resolveFunction$2(...$_a) {
	var $ = n.frame($_a).item("frame").item("name");
	return fn.concat(n.string("resolveFunction("), $("frame"), n.string(","), $("name"), n.string(")"));
}

function resolveFunction$3(...$_a) {
	var $ = n.frame($_a).item("frame").item("name").item("self");
	return fn.concat(n.string("resolveFunction("), $("frame"), n.string(","), $("name"), n.string(","), $("self"), n.string(")"));
}

function module$4(...$_a) {
	var $ = n.frame($_a).item("frame").item("prefix").item("ns").item("desc");
	return fn.concat(n.string("/*module namespace "), rdl.clip($("prefix")), n.string("="), $("ns"), n.string(";&#10;&#13;"), $("desc"), n.string("*/"));
}

function namespace$3(...$_a) {
	var $ = n.frame($_a).item("frame").item("prefix").item("ns");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("namespace("), $("frame"), n.string(","), $("prefix"), n.string(","), $("ns"), n.string(")"));
		} else {
			return fn.concat(n.string("//declare namespace "), rdl.clip($("prefix")), n.string(" = "), $("ns"));
		}
	})($.frame());
}

function ximport$3(...$_a) {
	var $ = n.frame($_a).item("frame").item("prefix").item("ns");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("ximport("), $("frame"), n.string(","), $("prefix"), n.string(","), $("ns"), n.string(")"));
		} else {
			return fn.concat(n.string("import * as "), rdl.clip($("prefix")), n.string(" from "), $("ns"));
		}
	})($.frame());
}

function ximport$4(...$_a) {
	var $ = n.frame($_a).item("frame").item("prefix").item("ns").item("loc");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("ximport("), $("frame"), n.string(","), $("prefix"), n.string(","), $("ns"), n.string(","), $("loc"), n.string(")"));
		} else {
			return fn.concat(n.string("import * as "), rdl.clip($("prefix")), n.string(" from "), fn.replace($("loc"), n.string("(\\.xql|\\.rdl)&quot;$"), n.string(".js&quot;")), n.string(""));
		}
	})($.frame());
}

function anonName$4(...$_a) {
	var $ = n.frame($_a).item("frame").item("name").item("arity").item("defaultPrefix");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("anonName("), $("frame"), n.string(","), $("name"), n.string(","), $("arity"), n.string(","), $("defaultPrefix"), n.string(")"));
		} else {
			$ = $("prefix", n.call($("frame"), n.string("$prefix")));
			$ = $("p", fn.tokenize($("name"), n.string(":")));
			$ = $("prefix", ($ => {
				if ($.test(n.eq(n.filter($("p"), function ($_0) {
					return n.geq(fn.position($_0), n.subtract(fn.last($_0), n.integer(1)));
				}), $("prefix")))) {
					return n.seq();
				} else {
					return ($ => {
						if ($.test(n.filter($("p"), function ($_0) {
							return n.geq(fn.position($_0), n.subtract(fn.last($_0), n.integer(1)));
						}))) {
							return n.filter($("p"), function ($_0) {
								return n.geq(fn.position($_0), n.subtract(fn.last($_0), n.integer(1)));
							});
						} else {
							return $("defaultPrefix");
						}
					})($.frame());
				}
			})($.frame()));
			return fn.concat(n.string(""), rdl.camelCase($("prefix")), ($ => {
				if ($.test($("prefix"))) {
					return n.string(".");
				} else {
					return n.string("");
				}
			})($.frame()), rdl.camelCase(n.filter($("p"), function ($_0) {
				return n.geq(fn.position($_0), fn.last($_0));
			})));
		}
	})($.frame());
}

function xvar$4(...$_a) {
	var $ = n.frame($_a).item("frame").item("name").item("def").item("body");
	return fn.concat(n.string("export const "), $("name"), n.string(" = "), $("body"), n.string(";"));
}

function define$5(...$_a) {
	var $ = n.frame($_a).item("frame").item("name").item("def").item("args").item("type");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("define("), $("frame"), n.string(","), $("name"), n.string(","), $("def"), n.string(","), $("args"), n.string(","), $("type"), n.string(")"));
		} else {
			return define($("frame"), $("name"), $("def"), $("args"), $("type"), n.string(""));
		}
	})($.frame());
}

function definePrivate$6(...$_a) {
	var $ = n.frame($_a).item("frame").item("name").item("def").item("args").item("type").item("body");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("definePrivate("), $("frame"), n.string(","), $("name"), n.string(","), $("def"), n.string(","), $("args"), n.string(","), $("type"), n.string(","), $("body"), n.string(")"));
		} else {
			return define($("frame"), $("name"), $("def"), $("args"), $("type"), $("body"), fn.true());
		}
	})($.frame());
}

function define$6(...$_a) {
	var $ = n.frame($_a).item("frame").item("name").item("def").item("args").item("type").item("body");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("define("), $("frame"), n.string(","), $("name"), n.string(","), $("def"), n.string(","), $("args"), n.string(","), $("type"), n.string(","), $("body"), n.string(")"));
		} else {
			return define($("frame"), $("name"), $("def"), $("args"), $("type"), $("body"), fn.false());
		}
	})($.frame());
}

function cardinality$1(...$_a) {
	var $ = n.frame($_a).item("a");
	return ($ => {
		if ($.test(n.instanceOf($("a"), n.string()))) {
			return fn.concat(n.string("cardinality("), $("a"), n.string(")"));
		} else {
			$ = $("s", array.size($("a")));
			$ = $("param", ($ => {
				if ($.test(n.gt($("s"), n.integer(1)))) {
					return n.call($("a"), 1);
				} else {
					return n.string("");
				}
			})($.frame()));
			$ = $("suffix", ($ => {
				if ($.test(n.gt($("s"), n.integer(1)))) {
					return n.call($("a"), 2);
				} else {
					return n.call($("a"), 1);
				}
			})($.frame()));
			$ = $("card", ($ => {
				if ($.test(n.eq($("suffix"), n.string("+")))) {
					return n.string("oneOrMore");
				} else {
					return ($ => {
						if ($.test(n.eq($("suffix"), n.string("*")))) {
							return n.string("zeroOrMore");
						} else {
							return ($ => {
								if ($.test(n.eq($("suffix"), n.string("?")))) {
									return n.string("zeroOrOne");
								} else {
									return n.string("");
								}
							})($.frame());
						}
					})($.frame());
				}
			})($.frame()));
			return ($ => {
				if ($.test(n.ne($("card"), n.string("")))) {
					return fn.concat(n.string("$."), $("card"), n.string("("), $("param"), n.string(")"));
				} else {
					return $("param");
				}
			})($.frame());
		}
	})($.frame());
}

function define$7(...$_a) {
	var $ = n.frame($_a).item("frame").item("name").item("def").item("args").item("type").item("body").item("private");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("define("), $("frame"), n.string(","), $("name"), n.string(","), $("def"), n.string(","), $("args"), n.string(","), $("type"), n.string(","), $("body"), n.string(","), $("private"), n.string(")"));
		} else {
			$ = $("init", array.flatten(a.forEach($("args"), function (...$_a) {
				$ = $.frame($_a).item("_");
				return ($ => {
					if ($.test(n.instanceOf($("_"), n.map()))) {
						$ = $("args", n.call($("_"), n.string("args")));
						$ = $("param", fn.concat(n.string("&quot;"), n.call($("args"), n.integer(2)), n.string("&quot;")));
						$ = $("composite", array.flatten(array.subarray($("args"), n.integer(3))));
						$ = $("suffix", n.call($("_"), n.string("suffix")));
						return fn.concat(fn.replace(n.call($("_"), n.string("name")), n.string("core:"), n.string("&#9;.")), n.string("("), cardinality(n.array(n.seq($("param"), $("suffix")))), fn.forEach($("composite"), function (...$_a) {
							$ = $.frame($_a).item("_");
							return fn.concat(n.string(","), fn.replace(n.call($("_"), n.string("name")), n.string("core:"), n.string("\\$.")), n.string("("), cardinality(n.array(n.seq(n.call($("_"), n.string("suffix"))))), n.string(")"));
						}), n.string(")"));
					} else {
						return ($ => {
							if ($.test(n.instanceOf($("_"), n.string()))) {
								return fn.concat(n.string("$.item("), $("_"), n.string(")"));
							} else {
								return $("_");
							}
						})($.frame());
					}
				})($.frame());
			})));
			$ = $("parts", fn.tokenize(rdl.clip($("name")), n.string(":")));
			$ = $("fname", fn.concat(rdl.camelCase(n.filter($("parts"), function ($_0) {
				return n.geq(fn.position($_0), fn.last($_0));
			})), n.string("$"), fn.count($("init"))));
			return fn.concat(($ => {
				if ($.test($("private"))) {
					return n.string("");
				} else {
					return n.string("export ");
				}
			})($.frame()), n.string("function "), $("fname"), n.string("(...$_a) {&#13;&#9;"), n.string("var $ = n.frame($_a)&#13;&#9;"), fn.stringJoin($("init"), n.string("&#13;&#9;")), n.string(";&#13;&#9;"), $("body"), n.string("&#13;}"));
		}
	})($.frame());
}

function describe$5(...$_a) {
	var $ = n.frame($_a).item("frame").item("name").item("def").item("args").item("type");
	return n.string("n.map()");
}

function anon$4(...$_a) {
	var $ = n.frame($_a).item("frame").item("args").item("type").item("body");
	return ($ => {
		if ($.test(n.instanceOf($("frame"), n.string()))) {
			return fn.concat(n.string("anon("), $("args"), n.string(","), $("type"), n.string(","), $("body"), n.string(")"));
		} else {
			$ = $("init", array.flatten(a.forEach($("args"), function (...$_a) {
				$ = $.frame($_a).item("_");
				return ($ => {
					if ($.test(n.instanceOf($("_"), n.map()))) {
						$ = $("args", n.call($("_"), n.string("args")));
						$ = $("param", fn.concat(n.string("&quot;"), n.call($("args"), n.integer(2)), n.string("&quot;")));
						$ = $("composite", array.flatten(array.subarray($("args"), n.integer(3))));
						$ = $("suffix", n.call($("_"), n.string("suffix")));
						return fn.concat(fn.replace(n.call($("_"), n.string("name")), n.string("core:"), n.string("&#9;.")), n.string("("), cardinality(n.array(n.seq($("param"), $("suffix")))), fn.forEach($("composite"), function (...$_a) {
							$ = $.frame($_a).item("_");
							return fn.concat(n.string(","), fn.replace(n.call($("_"), n.string("name")), n.string("core:"), n.string("\\$.")), n.string("("), cardinality(n.array(n.seq(n.call($("_"), n.string("suffix"))))), n.string(")"));
						}), n.string(")"));
					} else {
						return ($ => {
							if ($.test(n.instanceOf($("_"), n.string()))) {
								return fn.concat(n.string("$.item("), $("_"), n.string(")"));
							} else {
								return $("_");
							}
						})($.frame());
					}
				})($.frame());
			})));

			var ret= fn.concat(n.string("function (...$_a) {&#13;&#9;"), n.string("$ = $.frame($_a)&#13;&#9;"), fn.stringJoin($("init"), n.string("&#13;&#9;")), n.string(";&#13;&#9;"), $("body"), n.string("&#13;}"));
			console.log("anon:",ret.toString());
			return ret;
		}
	})($.frame());
}

function letRet$2(...$_a) {
	var $ = n.frame($_a).item("a").item("seqtype");
	return ($ => {
		if ($.test(n.instanceOf($("a"), n.string()))) {
			return fn.concat(n.string("letRet("), $("a"), n.string(","), $("seqtype"), n.string(")"));
		} else {
			$ = $("size", array.size($("a")));
			return fn.stringJoin(array.flatten(a.forEachAt($("a"), function (...$_a) {
				$ = $.frame($_a).item("_").item("at");
				$ = $("_", ($ => {
					if ($.test(n.instanceOf($("_"), n.array(n.item())))) {
						return fn.concat(n.string("n.seq("), fn.stringJoin(array.flatten($("_")), n.string(",")), n.string(")"));
					} else {
						return $("_");
					}
				})($.frame()));
				return ($ => {
					if ($.test(n.lt($("at"), $("size")))) {
						return fn.concat(n.string("$ = "), $("_"));
					} else {
						return fn.concat(n.string("return "), ($ => {
							if ($.test($("seqtype"))) {
								return fn.concat(fn.substring($("seqtype"), n.integer(1), n.subtract(fn.stringLength($("seqtype")), n.integer(1))), $("_"), n.string(")"));
							} else {
								return $("_");
							}
						})($.frame()), n.string(";&#13;&#9;"));
					}
				})($.frame());
			})), n.string(";&#13;&#9;"));
		}
	})($.frame());
}

function iff$3(...$_a) {
	var $ = n.frame($_a).item("a").item("b").item("c");
	$ = $("d", n.string("&#13;&#9;"));
	return fn.concat(n.string("($ => {"), $("d"), n.string("if($.test("), $("a"), n.string(")) {"), $("d"), ($ => {
		if ($.test(fn.matches($("b"), n.string("^return|^\\$ =")))) {
			return $("b");
		} else {
			return fn.concat(n.string("return "), $("b"), n.string(";&#13;"));
		}
	})($.frame()), n.string("} else {"), $("d"), ($ => {
		if ($.test(fn.matches($("c"), n.string("^return|^\\$ =")))) {
			return $("c");
		} else {
			return fn.concat(n.string("return "), $("c"), n.string(";&#13;"));
		}
	})($.frame()), n.string("}"), $("d"), n.string("})($.frame())"));
}

function typegen1$2(...$_a) {
	var $ = n.frame($_a).item("type").item("seq");
	return fn.concat(n.string("n."), $("type"), n.string("("), $("seq"), n.string(")"));
}

function typegen1$3(...$_a) {
	var $ = n.frame($_a).item("type").item("name").item("seq");
	return fn.concat(n.string("n."), $("type"), n.string("("), $("name"), n.string(","), $("seq"), n.string(")"));
}

function select$2(...$_a) {
	var $ = n.frame($_a).item("a").item("b");
	return fn.concat(n.string("n.select("), $("a"), n.string(","), $("b"), n.string(")"));
}

function selectAttribute$2(...$_a) {
	var $ = n.frame($_a).item("a").item("b");
	return fn.concat(n.string("n.selectAttribute("), $("a"), n.string(","), $("b"), n.string(")"));
}

function typegen2$1(...$_a) {
	var $ = n.frame($_a).item("type");
	return $("type");
}

function typegen2$4(...$_a) {
	var $ = n.frame($_a).item("type").item("keytype").item("valtype").item("body");
	return fn.concat(n.string("n.map("), $("body"), n.string(")"));
}

function typegen2$3(...$_a) {
	var $ = n.frame($_a).item("type").item("keytype").item("valtype");
	return fn.concat(n.string("n."), $("type"), n.string("()"));
}

function typegen2$2(...$_a) {
	var $ = n.frame($_a).item("type").item("seq");
	return ($ => {
		if ($.test(n.eq($("type"), n.string("map")))) {
			return fn.concat(n.string("n.map("), $("seq"), n.string(")"));
		} else {
			return n.seq();
		}
	})($.frame());
}

function _typegen$1(...$_a) {
	var $ = n.frame($_a).item("args");
	return ($ => {
		if ($.test(n.instanceOf($("args"), n.string()))) {
			return fn.concat(n.string("_typegen("), $("args"), n.string(")"));
		} else {
			$ = $("l", array.size($("args")));
			return ($ => {
				if ($.test(n.eq($("l"), n.integer(2)))) {
					return fn.concat(n.string("n."), n.call($("args"), n.integer(1)), n.string("("), n.call($("args"), n.integer(2)), n.string(")"));
				} else {
					$ = $("param", rdl.camelCase(rdl.clip(n.call($("args"), n.integer(2)))));
					return ($ => {
						if ($.test(n.call($("args"), n.integer(3)))) {
							var par = $("param").first();
							if(par && /^\$ =/.test(par)) {
								//console.trace();
							}
							return fn.concat(n.string("$(&quot;"), $("param"), n.string("&quot;,"), n.call($("args"), n.integer(3)), n.string(")"));
						} else {
							return fn.concat(n.string("$(&quot;"), fn.replace($("param"), n.string("^([^\\.]*)(\\.{3})$"), n.string("$2 $1")), n.string("&quot;)"));
						}
					})($.frame());
				}
			})($.frame());
		}
	})($.frame());
}

function typegen$1(...$_a) {
	var $ = n.frame($_a).item("type");
	return _typegen(n.array(n.seq($("type"), n.string(""))));
}

function typegen$2(...$_a) {
	var $ = n.frame($_a).item("type").item("val");
	return _typegen(n.array(n.seq($("type"), $("val"))));
}

function typegen$3(...$_a) {
	var $ = n.frame($_a).item("type").item("frame").item("name");
	return _typegen(n.array(n.seq($("type"), $("name"), n.seq(), n.string(""))));
}

function typegen$4(...$_a) {
	var $ = n.frame($_a).item("type").item("frame").item("name").item("val");
	return _typegen(n.array(n.seq($("type"), $("name"), $("val"), n.string(""))));
}

function typegen$5(...$_a) {
	var $ = n.frame($_a).item("type").item("frame").item("name").item("val").item("suffix");
	return _typegen(n.array(n.seq($("type"), $("name"), $("val"), $("suffix"))));
}

function namespace(...$_a) {
	var $_l = $_a.length;
	if ($_l === 3) {
		return namespace$3.apply(this, $_a);
	}

	return n.error(namespace, $_l);
}

function ximport(...$_a) {
	var $_l = $_a.length;
	if ($_l === 3) {
		return ximport$3.apply(this, $_a);
	}

	if ($_l === 4) {
		return ximport$4.apply(this, $_a);
	}

	return n.error(ximport, $_l);
}

function isFnSeq(...$_a) {
	var $_l = $_a.length;
	if ($_l === 1) {
		return isFnSeq$1.apply(this, $_a);
	}

	return n.error(isFnSeq, $_l);
}

function interop(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return interop$2.apply(this, $_a);
	}

	return n.error(interop, $_l);
}

function serialize(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return serialize$2.apply(this, $_a);
	}

	return n.error(serialize, $_l);
}

function describe(...$_a) {
	var $_l = $_a.length;
	if ($_l === 5) {
		return describe$5.apply(this, $_a);
	}

	return n.error(describe, $_l);
}

function selectAttribute(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return selectAttribute$2.apply(this, $_a);
	}

	return n.error(selectAttribute, $_l);
}

function anon(...$_a) {
	var $_l = $_a.length;
	if ($_l === 4) {
		return anon$4.apply(this, $_a);
	}

	return n.error(anon, $_l);
}

function _module(...$_a) {
	var $_l = $_a.length;
	if ($_l === 4) {
		return module$4.apply(this, $_a);
	}

	return n.error(_module, $_l);
}

exports.module = _module;
function isCurrentModule(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return isCurrentModule$2.apply(this, $_a);
	}

	return n.error(isCurrentModule, $_l);
}

function resolveModule(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return resolveModule$2.apply(this, $_a);
	}

	return n.error(resolveModule, $_l);
}

function xvar(...$_a) {
	var $_l = $_a.length;
	if ($_l === 4) {
		return xvar$4.apply(this, $_a);
	}

	return n.error(xvar, $_l);
}

function definePrivate(...$_a) {
	var $_l = $_a.length;
	if ($_l === 6) {
		return definePrivate$6.apply(this, $_a);
	}

	return n.error(definePrivate, $_l);
}

function iff(...$_a) {
	var $_l = $_a.length;
	if ($_l === 3) {
		return iff$3.apply(this, $_a);
	}

	return n.error(iff, $_l);
}

function anonName(...$_a) {
	var $_l = $_a.length;
	if ($_l === 4) {
		return anonName$4.apply(this, $_a);
	}

	return n.error(anonName, $_l);
}

function native(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return native$2.apply(this, $_a);
	}

	if ($_l === 3) {
		return native$3.apply(this, $_a);
	}

	return n.error(native, $_l);
}

function _typegen(...$_a) {
	var $_l = $_a.length;
	if ($_l === 1) {
		return _typegen$1.apply(this, $_a);
	}

	return n.error(_typegen, $_l);
}

function cardinality(...$_a) {
	var $_l = $_a.length;
	if ($_l === 1) {
		return cardinality$1.apply(this, $_a);
	}

	return n.error(cardinality, $_l);
}

function isCaller(...$_a) {
	var $_l = $_a.length;
	if ($_l === 1) {
		return isCaller$1.apply(this, $_a);
	}

	return n.error(isCaller, $_l);
}

function letRet(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return letRet$2.apply(this, $_a);
	}

	return n.error(letRet, $_l);
}

function resolveFunction(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return resolveFunction$2.apply(this, $_a);
	}

	if ($_l === 3) {
		return resolveFunction$3.apply(this, $_a);
	}

	return n.error(resolveFunction, $_l);
}

function pair(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return pair$2.apply(this, $_a);
	}

	return n.error(pair, $_l);
}

function processArgs(...$_a) {
	var $_l = $_a.length;
	if ($_l === 3) {
		return processArgs$3.apply(this, $_a);
	}

	return n.error(processArgs, $_l);
}

function define(...$_a) {
	var $_l = $_a.length;
	if ($_l === 5) {
		return define$5.apply(this, $_a);
	}

	if ($_l === 6) {
		return define$6.apply(this, $_a);
	}

	if ($_l === 7) {
		return define$7.apply(this, $_a);
	}

	return n.error(define, $_l);
}

function typegen1(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return typegen1$2.apply(this, $_a);
	}

	if ($_l === 3) {
		return typegen1$3.apply(this, $_a);
	}

	return n.error(typegen1, $_l);
}

function processTree(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return processTree$2.apply(this, $_a);
	}

	if ($_l === 3) {
		return processTree$3.apply(this, $_a);
	}

	if ($_l === 4) {
		return processTree$4.apply(this, $_a);
	}

	if ($_l === 5) {
		return processTree$5.apply(this, $_a);
	}

	return n.error(processTree, $_l);
}

function select(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return select$2.apply(this, $_a);
	}

	return n.error(select, $_l);
}

function typegen2(...$_a) {
	var $_l = $_a.length;
	if ($_l === 1) {
		return typegen2$1.apply(this, $_a);
	}

	if ($_l === 4) {
		return typegen2$4.apply(this, $_a);
	}

	if ($_l === 3) {
		return typegen2$3.apply(this, $_a);
	}

	if ($_l === 2) {
		return typegen2$2.apply(this, $_a);
	}

	return n.error(typegen2, $_l);
}

function convert(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return convert$2.apply(this, $_a);
	}

	return n.error(convert, $_l);
}

function processValue(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return processValue$2.apply(this, $_a);
	}

	if ($_l === 3) {
		return processValue$3.apply(this, $_a);
	}

	return n.error(processValue, $_l);
}

function call(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return call$2.apply(this, $_a);
	}

	return n.error(call, $_l);
}

function typegen(...$_a) {
	var $_l = $_a.length;
	if ($_l === 1) {
		return typegen$1.apply(this, $_a);
	}

	if ($_l === 2) {
		return typegen$2.apply(this, $_a);
	}

	if ($_l === 3) {
		return typegen$3.apply(this, $_a);
	}

	if ($_l === 4) {
		return typegen$4.apply(this, $_a);
	}

	if ($_l === 5) {
		return typegen$5.apply(this, $_a);
	}

	return n.error(typegen, $_l);
}

function and(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return and$2.apply(this, $_a);
	}

	return n.error(and, $_l);
}

function or(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return or$2.apply(this, $_a);
	}

	return n.error(or, $_l);
}

function xqVersion(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return xqVersion$2.apply(this, $_a);
	}

	return n.error(xqVersion, $_l);
}

function transpile(...$_a) {
	var $_l = $_a.length;
	if ($_l === 2) {
		return transpile$2.apply(this, $_a);
	}

	return n.error(transpile, $_l);
}

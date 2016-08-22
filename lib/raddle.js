import * as xqc from "./xq-compat.js";

import * as n from "./n.js";

import * as a from "./array-util.js";

import * as console from "./console.js";

export const suffix = n.string("\\+\\*\\-\\?");

export const ncname = xqc.ncname;

export const chars = n.concat(n.concat(suffix, ncname), n.string("\\$:%/#@\\^"));

export const filterRegexp = n.string("(\\])|(,)?([^\\[\\]]*)(\\[?)");

export const parenRegexp = fn.concat(n.string("(\\)["), suffix, n.string("]?)|("), xqc.operatorRegexp, n.string("|,)?(["), chars, n.string("]*)(\\(?)"));

export const protocolRegexp = n.string("^((http[s]?|ftp|xmldb|xmldb:exist|file):/)?/*(.*)$");

export function mapPut() {

    return n.initialize(arguments, [
        ["map", null, "item"],
        ["key", null, "item"],
        ["val", null, "item"]
    ], function($) {

        return n.stop($, n.item(map.new(n.seq(n.fetch($, "map"), n.map(n.seq(n.array(n.seq(n.fetch($, "key"), n.fetch($, "val")))))))));
    });

}

export function parseStrings() {

    return n.initialize(arguments, [
        ["strings", null, "element"],
        ["normalizer", null, "item"],
        ["params", null, "item"]
    ], function($) {

        return wrap(n.select(fn.analyzeString(n.call(n.fetch($, "normalizer"), fn.stringJoin(fn.forEach(n.to(n.integer(1), fn.count(n.fetch($, "strings"))), function() {

            return n.initialize(arguments, [
                ["i", null, "item"]
            ], function($) {

                return n.stop($, n.item(n.iff($, n.eq(fn.name(n.filter(n.fetch($, "strings"), function($_0) {
                        return n.geq(fn.position($_0), n.fetch($, "i"));
                    })), n.string("match")),

                    function($) {

                        return n.concat(n.string("$%"), n.fetch($, "i"));

                    },

                    function($) {

                        return n.select(n.filter(n.fetch($, "strings"), function($_0) {
                            return n.geq(fn.position($_0), n.fetch($, "i"));
                        }), function($_0) {
                            return fn.string($_0);
                        });

                    })));
            });

        })), n.fetch($, "params")), parenRegexp), n.seq(n.string("fn:match"))), n.fetch($, "strings"));
    });

}

export function normalizeQuery() {

    return n.initialize(arguments, [
        ["query", null, "string"],
        ["params", null, "item"]
    ], function($) {

        return n.stop($, n.item(fn.replace(n.fetch($, "query"), n.string("&#9;|&#10;|&#13;"), n.string(""))));
    });

}

function parse_1() {

    return n.initialize(arguments, [
        ["query", null, "string"]
    ], function($) {

        return n.stop($, n.item(parse(n.fetch($, "query"), n.map(n.seq()))));
    });

}

function parse_2() {

    return n.initialize(arguments, [
        ["query", null, "string"],
        ["params", null, "item"]
    ], function($) {

        return n.stop($, n.item(parseStrings(n.select(fn.analyzeString(n.fetch($, "query"), n.string("('[^']*')|(&quot;[^&quot;]*&quot;)")), n.seq(n.string("*"))), n.iff($, n.geq(n.call(n.fetch($, "params"), n.string("$compat")), n.string("xquery")),

            function($) {

                return xqc.normalizeQuery;

            },

            function($) {

                return normalizeQuery;

            }), n.fetch($, "params"))));
    });

}

export function parse() {

    return n.initialize(arguments, [
        ["a...", null, "item"]
    ], function($) {

        return ($ = n.put($, "s", n.integer(array.size(n.fetch($, "a")))),

            n.stop($, n.item(n.iff($, n.eq(n.fetch($, "s"), n.integer(1)),

                function($) {

                    return fn.apply(parse_1, n.fetch($, "a"));

                },

                function($) {

                    return n.iff($, n.eq(n.fetch($, "s"), n.integer(2)),

                        function($) {

                            return fn.apply(parse_2, n.fetch($, "a"));

                        },

                        function($) {

                            return n.seq();

                        });

                }))));
    });

}

export function getIndexFromTokens() {

    return n.initialize(arguments, [
        ["tok", null, "item"]
    ], function($) {

        return fn.forEach(n.to(n.integer(1), fn.count(fn.indexOf(n.fetch($, "tok"), n.integer(1)))), function() {

            return n.initialize(arguments, [
                ["i", null, "item"]
            ], function($) {

                return n.stop($, n.item(n.iff($, n.and(fn.exists(n.filter(fn.indexOf(n.fetch($, "tok"), n.minus(n.integer(1))), function($_0) {
                        return n.geq(fn.position($_0), n.fetch($, "i"));
                    })), n.filter(n.glt(n.filter(fn.indexOf(n.fetch($, "tok"), n.minus(n.integer(1))), function($_0) {
                        return n.geq(fn.position($_0), n.fetch($, "i"));
                    }), fn.indexOf(n.fetch($, "tok"), n.integer(1))), function($_0) {
                        return n.geq(fn.position($_0), n.fetch($, "i"));
                    })),

                    function($) {

                        return n.seq();

                    },

                    function($) {

                        return n.add(n.filter(fn.indexOf(n.fetch($, "tok"), n.integer(1)), function($_0) {
                            return n.geq(fn.position($_0), n.fetch($, "i"));
                        }), n.integer(1));

                    })));
            });

        });
    });

}

export function getIndex() {

    return n.initialize(arguments, [
        ["rest", null, "item"]
    ], function($) {

        return n.filter(getIndexFromTokens(fn.forEach(n.fetch($, "rest"), function() {

            return n.initialize(arguments, [
                ["_", null, "item"]
            ], function($) {

                return n.stop($, n.item(n.iff($, n.filter(n.select(n.fetch($, "_"), n.seq(n.string("fn:group"))), function($_0) {
                        return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(1));
                    }),

                    function($) {

                        return n.integer(1);

                    },

                    function($) {

                        return n.iff($, n.filter(n.select(n.fetch($, "_"), n.seq(n.string("fn:group"))), function($_0) {
                                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(4));
                            }),

                            function($) {

                                return n.minus(n.integer(1));

                            },

                            function($) {

                                return n.integer(0);

                            });

                    })));
            });

        })), function($_0) {
            return n.geq(fn.position($_0), n.integer(1));
        });
    });

}

export function clipString() {

    return n.initialize(arguments, [
        ["str", null, "string"]
    ], function($) {

        return n.stop($, n.item(fn.substring(n.fetch($, "str"), n.integer(2), n.subtract(fn.stringLength(n.fetch($, "str")), n.integer(2)))));
    });

}

export function valueFromStrings() {

    return n.initialize(arguments, [
        ["val", null, "string"],
        ["strings", null, "item"]
    ], function($) {

        return n.stop($, n.item(n.iff($, fn.matches(n.fetch($, "val"), n.string("\\$%[0-9]+")),

            function($) {

                return fn.concat(n.string("&quot;"), clipString(n.filter(n.fetch($, "strings"), n.seq(fn.number(fn.replace(n.fetch($, "val"), n.string("\\$%([0-9]+)"), n.string("$1")))))), n.string("&quot;"));

            },

            function($) {

                return n.fetch($, "val");

            })));
    });

}

export function appendOrNest() {

    return n.initialize(arguments, [
        ["next", null, "item"],
        ["strings", null, "item"],
        ["group", null, "item"],
        ["ret", null, "item"],
        ["suffix", null, "item"]
    ], function($) {

        return ($ = n.put($, "x", n.item(n.iff($, n.filter(n.fetch($, "group"), function($_0) {
                    return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
                }),

                function($) {

                    return n.map(n.seq(n.array(n.seq(n.string("name"), valueFromStrings(n.select(n.filter(n.fetch($, "group"), function($_0) {
                        return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
                    }), function($_0) {
                        return fn.string($_0);
                    }), n.fetch($, "strings")))), n.array(n.seq(n.string("args"), wrap(n.fetch($, "next"), n.fetch($, "strings")))), n.array(n.seq(n.string("suffix"), n.fetch($, "suffix")))));

                },

                function($) {

                    return wrap(n.fetch($, "next"), n.fetch($, "strings"));

                }))),

            n.stop($, n.item(n.iff($, fn.matches(n.select(n.filter(n.fetch($, "group"), function($_0) {
                    return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
                }), function($_0) {
                    return fn.string($_0);
                }), n.concat(n.concat(n.string("^"), xqc.operatorRegexp), n.string("$"))),

                function($) {

                    return $ = n.put($, "operator", n.item(n.select(n.filter(n.fetch($, "group"), function($_0) {
                            return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
                        }), function($_0) {
                            return fn.string($_0);
                        }))),

                        n.iff($, n.ggt(array.size(n.fetch($, "ret")), n.integer(0)),

                            function($) {

                                return $ = n.put($, "rev", n.item(array.reverse(n.fetch($, "ret")))),

                                    $ = n.put($, "last", n.item(array.head(n.fetch($, "rev")))),

                                    $ = n.put($, "ret", n.item(array.reverse(array.tail(n.fetch($, "rev"))))),

                                    $ = n.put($, "op", n.item(xqc.opInt(n.fetch($, "operator")))),

                                    n.iff($, fn.empty(n.fetch($, "last")),

                                        function($) {

                                            return array.append(n.fetch($, "ret"), n.map(n.seq(n.array(n.seq(n.string("name"), n.fetch($, "operator"))), n.array(n.seq(n.string("args"), n.fetch($, "x"))), n.array(n.seq(n.string("suffix"), n.string(""))))));

                                        },

                                        function($) {

                                            return $ = n.put($, "hasPrecedingOp", n.item(n.and(n.instanceOf(n.fetch($, "last"), Map), fn.matches(n.call(n.fetch($, "last"), n.string("name")), xqc.operatorRegexp)))),

                                                $ = n.put($, "prevOp", n.item(n.iff($, n.fetch($, "hasPrecedingOp"),

                                                    function($) {

                                                        return xqc.opInt(n.call(n.fetch($, "last"), n.string("name")));

                                                    },

                                                    function($) {

                                                        return n.seq();

                                                    }))),

                                                $ = n.put($, "preceeds", n.item(n.and(n.and(n.fetch($, "hasPrecedingOp"), n.ggt(n.fetch($, "op"), n.fetch($, "prevOp"))), fn.not(n.and(n.eq(n.fetch($, "op"), n.integer(20)), n.eq(n.fetch($, "prevOp"), n.integer(19))))))),

                                                n.iff($, n.fetch($, "preceeds"),

                                                    function($) {

                                                        return $ = n.put($, "y", n.item(n.map(n.seq(n.array(n.seq(n.string("name"), n.fetch($, "operator"))), n.array(n.seq(n.string("args"), n.array(n.seq(n.call(n.fetch($, "last"), n.seq(n.string("args"))), n.seq(n.integer(2)), n.fetch($, "x"))))), n.array(n.seq(n.string("suffix"), n.string(""))))))),

                                                            array.append(n.fetch($, "ret"), n.map(n.seq(n.array(n.seq(n.string("name"), n.call(n.fetch($, "last"), n.string("name")))), n.array(n.seq(n.string("args"), n.array(n.seq(n.call(n.fetch($, "last"), n.seq(n.string("args"))), n.seq(n.integer(1)), n.fetch($, "y"))))), n.array(n.seq(n.string("suffix"), n.string(""))))));

                                                    },

                                                    function($) {

                                                        return array.append(n.fetch($, "ret"), n.map(n.seq(n.array(n.seq(n.string("name"), n.fetch($, "operator"))), n.array(n.seq(n.string("args"), n.array(n.seq(n.fetch($, "last"), n.fetch($, "x"))))), n.array(n.seq(n.string("suffix"), n.string(""))))));

                                                    });

                                        });

                            },

                            function($) {

                                return array.append(n.fetch($, "ret"), n.map(n.seq(n.array(n.seq(n.string("name"), n.fetch($, "operator"))), n.array(n.seq(n.string("args"), n.fetch($, "x"))), n.array(n.seq(n.string("suffix"), n.string(""))))));

                            });

                },

                function($) {

                    return array.append(n.fetch($, "ret"), n.fetch($, "x"));

                }))));
    });

}

export function appendPropOrValue() {

    return n.initialize(arguments, [
        ["string", null, "item"],
        ["operator", null, "item"],
        ["strings", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.stop($, n.item(n.iff($, fn.matches(n.fetch($, "operator"), n.concat(xqc.operatorRegexp, n.string("+"))),

            function($) {

                return n.iff($, n.ggt(array.size(n.fetch($, "ret")), n.integer(0)),

                    function($) {

                        return xqc.operatorPrecedence(n.iff($, fn.exists(n.fetch($, "string")),

                            function($) {

                                return valueFromStrings(n.fetch($, "string"), n.fetch($, "strings"));

                            },

                            function($) {

                                return n.seq();

                            }), n.fetch($, "operator"), n.fetch($, "ret"));

                    },

                    function($) {

                        return array.append(n.fetch($, "ret"), n.map(n.seq(n.array(n.seq(n.string("name"), xqc.unaryOp(n.fetch($, "operator")))), n.array(n.seq(n.string("args"), n.array(n.seq(valueFromStrings(n.fetch($, "string"), n.fetch($, "strings")))))), n.array(n.seq(n.string("suffix"), n.string(""))))));

                    });

            },

            function($) {

                return array.append(n.fetch($, "ret"), valueFromStrings(n.fetch($, "string"), n.fetch($, "strings")));

            })));
    });

}

export function wrapOpenParen() {

    return n.initialize(arguments, [
        ["rest", null, "item"],
        ["strings", null, "item"],
        ["index", null, "item"],
        ["group", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.stop($, n.item(wrap(fn.subsequence(n.fetch($, "rest"), n.fetch($, "index")), n.fetch($, "strings"), appendOrNest(fn.subsequence(n.fetch($, "rest"), n.integer(1), n.fetch($, "index")), n.fetch($, "strings"), n.fetch($, "group"), n.fetch($, "ret"), fn.replace(n.filter(n.fetch($, "rest"), n.seq(n.subtract(n.fetch($, "index"), n.integer(1)))), n.string("\\)"), n.string(""))))));
    });

}

function wrap_4() {

    return n.initialize(arguments, [
        ["rest", null, "item"],
        ["strings", null, "item"],
        ["ret", null, "item"],
        ["group", null, "item"]
    ], function($) {

        return n.stop($, n.item(n.iff($, fn.exists(n.fetch($, "rest")),

            function($) {

                return n.iff($, n.filter(n.fetch($, "group"), function($_0) {
                        return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(4));
                    }),

                    function($) {

                        return wrapOpenParen(n.fetch($, "rest"), n.fetch($, "strings"), getIndex(n.fetch($, "rest")), n.fetch($, "group"), n.fetch($, "ret"));

                    },

                    function($) {

                        return n.iff($, n.or(n.filter(n.fetch($, "group"), function($_0) {
                                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
                            }), fn.matches(n.select(n.filter(n.fetch($, "group"), function($_0) {
                                return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
                            }), function($_0) {
                                return fn.string($_0);
                            }), n.concat(xqc.operatorRegexp, n.string("+|,")))),

                            function($) {

                                return wrap(n.fetch($, "rest"), n.fetch($, "strings"), appendPropOrValue(n.select(n.filter(n.fetch($, "group"), function($_0) {
                                    return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(3));
                                }), function($_0) {
                                    return fn.string($_0);
                                }), n.select(n.filter(n.fetch($, "group"), function($_0) {
                                    return n.geq(n.selectAttribute($_0, n.string("nr")), n.integer(2));
                                }), function($_0) {
                                    return fn.string($_0);
                                }), n.fetch($, "strings"), n.fetch($, "ret")));

                            },

                            function($) {

                                return wrap(n.fetch($, "rest"), n.fetch($, "strings"), n.fetch($, "ret"));

                            });

                    });

            },

            function($) {

                return n.fetch($, "ret");

            })));
    });

}

function wrap_3() {

    return n.initialize(arguments, [
        ["match", null, "item"],
        ["strings", null, "item"],
        ["ret", null, "item"]
    ], function($) {

        return n.stop($, n.item(wrap(fn.tail(n.fetch($, "match")), n.fetch($, "strings"), n.fetch($, "ret"), n.select(fn.head(n.fetch($, "match")), n.seq(n.string("fn:group"))))));
    });

}

function wrap_2() {

    return n.initialize(arguments, [
        ["match", null, "item"],
        ["strings", null, "item"]
    ], function($) {

        return xqc.rename(wrap(n.fetch($, "match"), n.fetch($, "strings"), n.array(n.seq())), function() {

            return n.initialize(arguments, [
                ["name", null, "item"]
            ], function($) {

                return n.stop($, n.item(n.iff($, fn.matches(n.fetch($, "name"), xqc.operatorRegexp),

                    function($) {

                        return xqc.toOp(xqc.opNum(n.fetch($, "name")));

                    },

                    function($) {

                        return n.fetch($, "name");

                    })));
            });

        });
    });

}

export function wrap() {

    return n.initialize(arguments, [
        ["a...", null, "item"]
    ], function($) {

        return ($ = n.put($, "s", n.integer(array.size(n.fetch($, "a")))),

            n.stop($, n.item(n.iff($, n.eq(n.fetch($, "s"), n.integer(4)),

                function($) {

                    return fn.apply(wrap_4, n.fetch($, "a"));

                },

                function($) {

                    return n.iff($, n.eq(n.fetch($, "s"), n.integer(3)),

                        function($) {

                            return fn.apply(wrap_3, n.fetch($, "a"));

                        },

                        function($) {

                            return n.iff($, n.eq(n.fetch($, "s"), n.integer(2)),

                                function($) {

                                    return fn.apply(wrap_2, n.fetch($, "a"));

                                },

                                function($) {

                                    return n.seq();

                                });

                        });

                }))));
    });

}

export function importModule() {

    return n.initialize(arguments, [
        ["name", null, "item"],
        ["params", null, "item"]
    ], function($) {

        return ($ = n.put($, "mappath", n.item(n.iff($, map.contains(n.fetch($, "params"), n.string("modules")),

                function($) {

                    return n.call(n.fetch($, "params"), n.string("modules"));

                },

                function($) {

                    return n.string("modules.xml");

                }))),

            $ = n.put($, "map", n.item(n.select(n.select(fn.doc(n.fetch($, "mappath")), n.seq(n.string("root"))), n.seq(n.string("module"))))),

            $ = n.put($, "location", n.item(n.anyURI(n.selectAttribute(n.filter(n.fetch($, "map"), function($_0) {
                return n.geq(n.selectAttribute($_0, n.string("name")), n.fetch($, "name"));
            }), n.string("location"))))),

            $ = n.put($, "uri", n.item(n.anyURI(n.selectAttribute(n.filter(n.fetch($, "map"), function($_0) {
                return n.geq(n.selectAttribute($_0, n.string("name")), n.fetch($, "name"));
            }), n.string("uri"))))),

            $ = n.put($, "module", n.item(n.iff($, n.fetch($, "location"),

                function($) {

                    return inspect.inspectModule(n.fetch($, "location"));

                },

                function($) {

                    return inspect.inspectModuleUri(n.fetch($, "uri"));

                }))),

            n.stop($, n.item(n.try(util.importModule(n.anyURI(n.selectAttribute(n.fetch($, "module"), n.string("uri"))), n.selectAttribute(n.fetch($, "module"), n.string("prefix")), n.anyURI(n.selectAttribute(n.fetch($, "module"), n.string("location")))), n.seq()))));
    });

}

function stringify_2() {

    return n.initialize(arguments, [
        ["a", null, "item"],
        ["params", null, "item"]
    ], function($) {

        return n.stop($, n.item(stringify(n.fetch($, "a"), n.fetch($, "params"), fn.true())));
    });

}

function stringify_3() {

    return n.initialize(arguments, [
        ["a", null, "item"],
        ["params", null, "item"],
        ["top", null, "item"]
    ], function($) {

        return ($ = n.put($, "s", n.item(array.size(n.fetch($, "a")))),

            n.stop($, n.item(a.foldLeftAt(n.fetch($, "a"), n.string(""), function() {

                return n.initialize(arguments, [
                    ["acc", null, "item"],
                    ["t", null, "item"],
                    ["i", null, "item"]
                ], function($) {

                    return ($ = n.put($, "type", n.item(n.iff($, n.instanceOf(n.fetch($, "t"), Map),

                            function($) {

                                return n.integer(1);

                            },

                            function($) {

                                return n.iff($, n.instanceOf(n.fetch($, "t"), n.array(n.item())),

                                    function($) {

                                        return n.integer(2);

                                    },

                                    function($) {

                                        return n.integer(0);

                                    });

                            }))),

                        $ = n.put($, "ret", n.item(n.iff($, n.eq(n.fetch($, "type"), n.integer(1)),

                            function($) {

                                return fn.concat(n.call(n.fetch($, "t"), n.string("name")), n.string("("), fn.stringJoin(array.flatten(stringify(n.call(n.fetch($, "t"), n.string("args")), n.fetch($, "params"), fn.false())), n.string(",")), n.string(")"), n.iff($, n.instanceOf(n.call(n.fetch($, "t"), n.string("suffix")), n.string()),

                                    function($) {

                                        return n.call(n.fetch($, "t"), n.string("suffix"));

                                    },

                                    function($) {

                                        return n.string("");

                                    }));

                            },

                            function($) {

                                return n.iff($, n.eq(n.fetch($, "type"), n.integer(2)),

                                    function($) {

                                        return fn.concat(n.string("("), stringify(n.fetch($, "t"), n.fetch($, "params"), fn.false()), n.string(")"));

                                    },

                                    function($) {

                                        return n.fetch($, "t");

                                    });

                            }))),

                        n.stop($, n.item(fn.concat(n.fetch($, "acc"), n.iff($, n.and(n.ggt(n.fetch($, "i"), n.integer(1)), fn.not(n.and(n.eq(n.fetch($, "type"), n.integer(1)), n.eq(n.call(n.fetch($, "t"), n.string("name")), n.string(""))))),

                            function($) {

                                return n.iff($, n.fetch($, "top"),

                                    function($) {

                                        return n.string(",&#10;&#13;");

                                    },

                                    function($) {

                                        return n.string(",");

                                    });

                            },

                            function($) {

                                return n.string("");

                            }), n.fetch($, "ret")))));
                });

            }))));
    });

}

export function stringify() {

    return n.initialize(arguments, [
        ["a...", null, "item"]
    ], function($) {

        return ($ = n.put($, "s", n.integer(array.size(n.fetch($, "a")))),

            n.stop($, n.item(n.iff($, n.eq(n.fetch($, "s"), n.integer(2)),

                function($) {

                    return fn.apply(stringify_2, n.fetch($, "a"));

                },

                function($) {

                    return n.iff($, n.eq(n.fetch($, "s"), n.integer(3)),

                        function($) {

                            return fn.apply(stringify_3, n.fetch($, "a"));

                        },

                        function($) {

                            return n.seq();

                        });

                }))));
    });

}

export function transpile() {

    return n.initialize(arguments, [
        ["tree", null, "item"],
        ["lang", null, "item"],
        ["params", null, "item"]
    ], function($) {

        return ($ = n.put($, "module", n.item(n.import(n.concat(n.concat(n.string("../lib/"), n.fetch($, "lang")), n.string(".xql"))))),

            $ = n.put($, "frame", n.item(map.put(n.fetch($, "params"), n.string("$imports"), n.map(n.seq(n.array(n.seq(n.string("core"), n.fetch($, "module")))))))),

            n.stop($, n.item(n.call(n.call(n.call(n.fetch($, "module"), n.seq(n.string("$exports"))), n.seq(n.string("core:transpile#2"))), n.seq(n.fetch($, "tree"), n.fetch($, "frame"))))));
    });

}

export function exec() {

    return n.initialize(arguments, [
        ["query", null, "item"],
        ["params", null, "item"]
    ], function($) {

        return ($ = n.put($, "core", n.item(n.import(n.string("../lib/core.xql")))),

            $ = n.put($, "n", n.item(n.import(n.string("../lib/n.xql")))),

            n.stop($, n.item(n.iff($, map.contains(n.fetch($, "params"), n.string("$transpile")),

                function($) {

                    return n.iff($, n.eq(n.call(n.fetch($, "params"), n.string("$transpile")), n.string("rdl")),

                        function($) {

                            return stringify(parse(n.fetch($, "query"), n.fetch($, "params")), n.fetch($, "params"));

                        },

                        function($) {

                            return transpile(parse(n.fetch($, "query"), n.fetch($, "params")), n.call(n.fetch($, "params"), n.string("$transpile")), n.fetch($, "params"));

                        });

                },

                function($) {

                    return $ = n.put($, "frame", n.item(map.put(n.fetch($, "params"), n.string("$imports"), n.map(n.seq(n.array(n.seq(n.string("core"), n.fetch($, "core"))), n.array(n.seq(n.string("n"), n.fetch($, "n")))))))),

                        n.eval(parse(n.fetch($, "query"), n.fetch($, "params"))),

                        (n.fetch($, "frame"));

                }))));
    });

}

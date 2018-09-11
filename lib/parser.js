"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseString = exports.parse = exports.initTokenState = exports.lex = exports.tokenize = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _trie = require("./trie");

var _richReducers = require("./rich-reducers");

var _nodeStream = require("./node-stream");

var _triply = _interopRequireDefault(require("triply"));

var _operatorTrie = require("./operator-trie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const opMap = {
  119: "rest-params",
  505: "ggt",
  507: "glt",
  509: "geq",
  801: "subtract",
  802: "add",
  600: "concat",
  903: "divide",
  904: "multiply",
  1701: "minus",
  1702: "plus",
  5005: "maybe",
  3904: "any",
  3802: "many",
  2005: "$_",
  1500: "cast-as"
};
const simpleTypes = ["item", "atomic", "string", "numeric", "integer", "number", "double", "decimal", "float"];
const complexTypes = ["function", "array", "map"];
const kinds = ["document-node", "element", "attribute", "processing-instruction", "comment", "text", "node"];
const andOrRe = /^(n:)?(and|or)$/;
const ncnameRe = new RegExp("[\\p{L}\\p{N}_-]", "u");
const EOF = String.fromCharCode(25);

const tpl = (t, v, o) => {
  return {
    t: t,
    v: v,
    o: o
  };
};

const openParen = () => tpl(1, 1, "(");

const comma = () => tpl(3, 100, ",");

const closeParen = () => tpl(2, 2, ")");

const openCurly = () => tpl(1, 3, "{");

const closeCurly = () => tpl(2, 4, "}");

const openTag = (qname, attrs) => {
  const n = tpl(11, qname);
  n.a = attrs;
  return n;
};

const closeTag = qname => tpl(12, qname);

const seq = () => tpl(6, "");
/*
const log = r => reduce(Triply.traverse(r._root),(a,x) => {
	const n = Triply.view(x.$0 == 3 ? x.$3 : x,1);
	n.is = x.$0 === 1 ? "LEAF" : x.$0 === 3 ? "CLOSE" : "BRANCH";
	console.log(n);
	return a;
});
*/

/*
const incr = a => a.map(x => {
	x.d++;
	return x;
});
           (x)
    $  --- /$ - , 2 - ) on close, nest:
   /                      \       mark call again
call                       /call - , 3 ) on close, nest
*/


function handleInfix(state, d) {
  const r = state.r;
  let lastv;

  for (let i = state.infix[d] - 1; i >= 0; i--) {
    // handle each mark
    // mark again so we can peek
    const bm = d + ":" + i;
    const cur = r.unmark(bm).mark(bm).peek(); // treat and/or

    if (andOrRe.test(cur.o)) {
      // wrap the first arg
      const close = r.movePreviousSibling().insertAfter(closeCurly()).peek();
      r.movePreviousSibling().openBefore(openCurly(), close);
      r.unmark(bm).mark(bm); // wrap the snd arg

      const close2 = r.moveNextSibling().insertAfter(closeCurly()).peek();
      r.movePreviousSibling().openBefore(openCurly(), close2);
      r.unmark(bm).mark(bm);
    } // normal case: last preceeds


    if (!lastv || lastv > cur.v) {
      // move to 2nd arg, insert closing paren, peek
      r.pop();

      if (cur.v > 900) {
        const close = r.moveNextSibling().push(closeParen()).peek();
        r.movePreviousSibling().insertBefore(openParen());
        r.openBefore(cur, close);
        r.unmark(bm);
      } else {
        r.push(comma());
        const close = r.moveNextSibling().push(closeParen()).peek();
        r.unmark(bm);
        r.movePreviousSibling().insertBefore(openParen());
        r.openBefore(cur, close);
      }
    } else {
      // remove the operator
      r.pop(); // move to the second arg

      r.moveNextSibling(); // remove the second argument of this operator

      const arg2 = r.pop(); // move to the previous operator that's already processed
      // go into the second argument and wrap it
      // move to before the closing paren
      //r.unmark("OP");

      if (cur.v > 900) {
        const close = r.moveNextSibling().push(closeParen()).peek();
        r.movePreviousSibling().insertBefore(openParen());
        r.openBefore(cur, close);
      } else {
        r.movePreviousSibling().moveLastChild().movePreviousSibling();
        const close = r.push(comma()).push(arg2).push(closeParen()).peek();
        r.movePreviousSibling().movePreviousSibling().movePreviousSibling();
        r.insertBefore(openParen()).openBefore(cur, close); //.moveLastChild();
        // insert open parent, open and add the operator
        // add comma, the second arg and closing paren
      }

      r.unmark(bm);
    }

    lastv = cur.v; //Object.assign(cur,comma());
  }
} // NOTE whitespace is ignored by the lexer, but it is in the state


function process(tpl, state) {
  const t = tpl.t,
        v = tpl.v,
        r = state.r;
  const d = state.depth; // reset WS every time

  const ws = state.ws;
  const hasTag = state.hasTag; //console.log(t,v,ws,hasTag);

  state.ws = false;
  state.hasTag = 0; //console.log(t,v,tpl.o);

  if (t == 1) {
    if (v == 1) {
      const last = r.lastChild();

      if (last && last.t === 2 && last.v == 2) {
        // 1. mark call
        state.call[d] = true; //console.log("opencall",d,_strip(r.peek()));
        // nest entire tree
        // 2. push comma
        // TODO add original position to comma

        r.mark("call" + d).push(comma());
      } else {
        const cur = r.peek();

        if (v == 1 && cur.t !== 6 && cur.t !== 10 && !(cur.t == 4 && (cur.v < 300 || cur.v > 2000))) {
          //console.log(cur.t,cur.v,cur.o);
          r.push(seq());
        }

        r.open(tpl);
      }
    } else if (v == 3 && state.xml) {
      r.open(tpl);
    } else {
      r.open(tpl);
    }
  } else if (t == 2) {
    // FIXME treat all infix-ops in same depth, not just on close
    state.r.push(tpl).close();
    const cd = d - 1;

    if (state.call[cd]) {
      // $(x)(2) => call($(x),2)
      state.call[cd] = false; //console.log("call",r.peek());

      r.unmark("call" + cd).insertBefore(openParen()).openBefore({
        t: 6,
        v: "call"
      }).close();
    }
    /*
    * 1 * 2 + 3
    * mult(1,2) + 3
    * 1 + 2 * 3
    * add(1,2) * 3 => pre, so nest in last
    * add(1,2 * 3))
    * add(1,mult(2,3)) => pre, so next in last (we're in subs, so openBefore )
     */


    if (state.infix[d]) {
      //console.log("peek-close",_strip(r.peek()));
      // mark close so we can return to it
      r.mark("close");
      handleInfix(state, d);
      r.unmark("close");
      state.infix[d] = null;
    }
  } else if (t == 4) {
    if (v == 802 || v == 904 || v == 2005) {
      const last = r.peek();
      const test = last && (last.o || last.v);

      const isEmpty = x => x && _triply.default.nextSibling(_triply.default.firstChild(x)) == _triply.default.lastChild(x);

      if (test && (simpleTypes.includes(test) && isEmpty(last) || complexTypes.includes(test) || kinds.includes(test))) {
        tpl.o = opMap[v + 3000];
        state.r.insertAfter(closeParen()).movePreviousSibling().insertBefore(openParen()).openBefore(tpl);
        return state;
      } else if (last.t == 1 && last.v == 1) {
        const prev = r.previous();
        const test = prev && prev.o;

        if (test && complexTypes.includes(test)) {
          if (test == "function") {
            // convert function(*) to function((...),item()*)
            state.r.push(seq()).open(openParen()).push({
              t: 4,
              o: "rest-params"
            }).open(openParen()).push(closeParen()).close().push(closeParen()).close().push(closeParen()).close().push({
              t: 4,
              o: "any"
            }).open(openParen()).push({
              t: 4,
              o: "item"
            }).open(openParen()).push(closeParen()).close().push(closeParen()).close();
          }

          return state;
        }
      }
    }

    if (v == 505 && hasTag) {
      // TODO replace with tag and flag XML at depth
      r.pop();
      const qname = state.qname;
      state.qname = null;

      if (hasTag == 1) {
        r.push(openTag(qname, state.attrs));
        state.xml++;
        state.attrs = [];
      } else if (hasTag == 3 || hasTag == 6) {
        r.push(closeTag(qname)); //.close();
      }

      state.infix[d]--;
      return state;
    } else if (v == 1901) {
      const last = r.peek();

      if (last.t == 4 && last.v == 507) {
        // close tag
        if (hasTag) {
          const qname = state.qname;
          r.pop();
          r.push(openTag(qname, state.attrs));
          r.push(tpl);
          state.attrs = [];
        }

        state.hasTag = hasTag + 2;
        return state;
      }
    } else if (v == 2600) {
      const prev = r.previousSibling();

      if (prev && prev.t == 1 && prev.v == 3) {
        prev.v += 2000;
      }

      const last = r.peek(1);
      r.pop();
      tpl.o = last.v;
    } else if (v == 509 && hasTag == 5) {
      // NOTE treat attrs as pairs
      state.hasTag = hasTag + 1;
      return state;
    }

    if (v == 119 || v == 2005) {
      if (opMap.hasOwnProperty(v)) tpl.o = opMap[v];
      r.push(tpl).open(openParen()).push(closeParen()).close();
    } else if (v >= 300 && v < 2000) {
      // NOTE always add prefix to distinguish between infix operators and equivalent functions
      const last = r.peek();
      const unaryOp = (v == 801 || v == 802) && (!last || !last.t || last.t == 1 || last.t == 4);
      const v1 = unaryOp ? v + 900 : v;
      tpl.v = v1;
      const mappedOp = opMap.hasOwnProperty(v1) ? opMap[v1] : "n:" + tpl.o;
      tpl.o = mappedOp;
      r.push(tpl);
      if (!state.infix[d]) state.infix[d] = 0;
      r.mark(d + ":" + state.infix[d]++);
    } else {
      r.push(tpl);
    }
  } else if (t == 6) {
    if (/^\$/.test(v)) {
      // var
      tpl.v = v.replace(/^\$/, "");
      if (/[0-9]/.test(tpl.v)) tpl.t = 8;
      r.push({
        t: 10,
        v: "$",
        o: "$"
      }).open(openParen()).push(tpl).push(closeParen()).close();
    } else {
      const last = r.peek();

      if (last.t == 4 && last.v == 507 && !ws) {
        state.qname = v;
        state.hasTag = hasTag + 1;
        return state;
      } else if (hasTag == 4) {
        state.hasTag = hasTag + 1;
        if (!state.attrs) state.attrs = [];
        state.attrs.push([v]);
      } else {
        r.push(tpl);
      }
    }
  } else if (t === 0) {
    r.push(tpl);

    if (state.infix[d]) {
      // mark close so we can return to it
      r.mark("EOS");
      handleInfix(state, d);
      r.unmark("EOS");
      state.infix[d] = null;
    }
  } else if (t === 17) {
    // mark WS
    state.ws = true;
    if (hasTag) state.hasTag = 4;
  } else {
    if (hasTag == 6) {
      state.attrs.lastItem.push(v);
      state.hasTag = 1;
    } else {
      r.push(tpl);
    }
  }

  state.depth = tpl.d;
  return state;
}

function charReducer(state, next) {
  const char = state.char;

  if (char === undefined) {
    state.emit = void 0;
    state.char = next;
    return state;
  }

  if (char == EOF) {
    state.emit = state.emit && state.tpl.t == 0 ? void 0 : {
      t: 0,
      v: 0,
      o: EOF
    };
    return state;
  }

  const oldType = state.type;
  const oldComment = state.comment;
  const buffer = state.buffer;
  const oldString = state.string; //const oldTpl = state.tpl;

  const zero = oldComment || state.qname || state.number ? false : oldString === 0;
  const b = buffer + char;
  const tmp = zero ? (0, _trie.find)(state.trie, char, b, state.path) : [[], []];
  const trie = tmp[0];
  const path = tmp[1];
  let match = 0;

  if (!trie) {
    match = 2;
  } else if (Array.isArray(trie)) {
    match = !trie.length ? 2 : trie[0]._k === b ? 3 : 0;
  } else if ("_k" in trie) {
    match = trie._k === b ? 1 : path.length > 0 && path[0]._k === b ? 5 : 0;
  }

  if (match !== 2) {
    const tmp = (0, _trie.find)(trie, next, b + next, [...path]);
    const trie2 = tmp[0];

    if (trie2 && (Array.isArray(trie2) && trie2.length > 0 || "_k" in trie2)) {
      // still a match, stop this one
      match = 0;
    } else if (match == 3) {
      // don't match if char and next ncname
      if (trie[0]._v > 4 && ncnameRe.test(char) && ncnameRe.test(next)) {
        match = 2;
      } //match = 0;

    } else if (match === 0) {
      // next won't match, so neither will this
      match = 2;
    }
  } // NOTE hack for qnames with dash


  if (next == "-" && match == 1 && ncnameRe.test(char)) {
    match = 0;
  }

  let type; // skip anything but closers

  if (match == 1) {
    type = trie._v;
  } else if (match == 3) {
    type = trie[0]._v;
  } else if (match == 5) {
    type = path[0]._v;
  } else if (/\s/.test(char)) {
    type = 10;
  } else if (/[0-9]/.test(char)) {
    type = 11;
  } else if (/[a-zA-Z]/.test(char)) {
    type = 12;
  } else {
    type = 0;
  }

  const isVar = type == 9 && next != "(";

  if (isVar) {
    match = type = 0;
  }

  let number = zero && (type == 11 || type == 8 && oldType != 8 && /[0-9]/.test(next)) || state.number && (type === 0 || type == 11);
  let qname = zero && !number && type != 10 && match == 2 || state.qname && type != 10 || isVar;
  let stop = qname && /[^a-zA-Z0-9\-_:]/.test(next) || number && /[^0-9.]/.test(next);
  let flag;

  if (number || qname) {
    flag = 0;
  } else if (zero) {
    if (type == 6 || type == 7) {
      flag = 1; // open string :)
    } else if (type == 2501) {
      flag = 3; // open comment :)
      //} else if(type == 3 && oldType != 3 && next != "{" && opencount[0] > 0) then
      //    11 (: open enc-expr, TODO add double curly to TRIE :)
      //else if($enc-expr and $type == 4 and $has-quot == 0 and $next ne "}") then
      //    12 (: close enc-expr, TODO add double curly to TRIE :)
    } else {
      flag = 0;
    }
  } else {
    // for the parser we need at least to escape a single quote char, but it should be handled by the trie :)
    if (oldString == 6 && char == "\"" && next !== "\"" || oldString == 7 && char == "'") {
      flag = 2; //(: close string :)
    } else if (oldComment && char == ":" && next == ")") {
      flag = 4; //(: close comment :)
      //else if($attrkey == false() and empty($type) and head($opencount) gt 0) then
      //    9
      //else if($attrkey and $type == 509 and head($opencount) gt 0) then
      //    10
    } else {
      flag = 0;
    }
  }

  let tpl;

  if (!flag) {
    if (stop && type != 9) {
      tpl = {
        t: number ? 8 : 6,
        v: b
      };
    } else if (number && type == 8) {// continue
    } else if (type == 10 && state.type !== 10) {
      tpl = {
        t: 17
      };
    } else if (match != 2 && match !== 0) {
      let t = type == 1 || type == 3 || type == 2001 ? 1 : type == 2 || type == 4 || type == 2002 ? 2 : type == 100 ? 3 : type == 5 ? 0 : type == 9 ? 10 : type == 8 ? 13 : 4;
      tpl = {
        t: t,
        v: type,
        o: b
      };
    }
  } else if (flag == 2 || flag == 4) {
    tpl = {
      t: flag == 2 ? 7 : 9,
      v: buffer
    };
  } // if the result is an array, it was expanded
  // in this case, emit will be overridden by process...
  // we should only just buffer 2 levels of depth:
  // one for the type and one for the occurrence indicator...


  if (zero && type == 10 && buffer == "" || tpl || flag) {
    state.buffer = "";
  } else {
    state.buffer = b;
  }

  if (qname) state.lastQname = tpl; // FIXME hack to skip a char

  state.char = flag == 4 ? void 0 : next;
  state.number = number && !stop;
  state.qname = qname && !stop;
  state.type = type;

  if (tpl) {
    tpl.line = state.line;
    tpl.column = state.column;
    state.tpl = tpl;
  }

  state.emit = tpl;
  let newline = false;
  if (char == "\n") newline = true;

  if (newline) {
    state.line++;
    state.column = 1;
  } else {
    state.column++;
  }

  state.trie = match > 0 ? _operatorTrie.trie : trie;
  state.path = match > 0 ? [] : path;

  if (flag == 1) {
    state.string = type;
  } else if (flag == 2) {
    state.string = 0;
  } else if (flag == 3) {
    state.comment = true;
  } else if (flag == 4) {
    state.comment = false;
  }

  return state;
}

function toRdl($o, entry) {
  const {
    t,
    v,
    o
  } = entry;

  if (t === 0) {
    $o.next(o === EOF ? "" : ";\n\n");
  } else if (t == 7) {
    $o.next(`"${v}"`);
  } else if (t == 6 || t == 8) {
    $o.next(v);
  } else if (t == 9) {
    $o.next("(:" + v + ":)");
  } else if (t == 11) {
    let s = "<" + v;

    for (let [k, v] of entry.a) {
      s += " " + k + "=\"" + v + "\"";
    }

    s += ">"; //s += next.t == 12 ? "/>" : ">";

    $o.next(s);
  } else if (t == 12) {
    $o.next("</" + v + ">");
  } else if (t == 4 && v == 2600) {
    $o.next("\"" + o + "\":");
  } else if (o) {
    $o.next(o);
  }

  return $o;
}

function toL3(ret, entry, next) {
  let $t = entry.t;
  let $v = entry.v;
  let r = [];

  if ($t == 1) {
    if ($v == 3) {
      r = [15];
    } else if ($v == 2001) {
      r = [5];
    } else if ($v == 2003) {
      r = [6];
    }
  } else if ($t == 2) {
    r = [17];
  } else if ($t == 7) {
    r = [3, $v];
  } else if ($t == 8) {
    if (/^\./.test($v)) $v = "0" + $v;
    r = [12, $v];
  } else if ($t == 6) {
    if (/#[0-9]$/.test($v)) {
      r = [4, $v + ""];
    } else {
      r = next && next.t == 1 && next.v == 1 ? [14, $v] : [3, $v];
    }
  } else if ($t == 4 || $t == 10) {
    if ($v == 2600) {
      r = [2, entry.o];
    } else {
      r = [14, entry.o];
    }
  } else if ($t == 5) {
    r = [3, $v];
  } else if ($t == 9) {
    r = [8, $v];
  } else if ($t == 11) {
    r = [1, $v];

    for (let [k, v] of entry.a) {
      r = r.concat([2, k, 3, v]);
    }
  } else if ($t == 12) {
    r = [17];
  } else if ($t == 13) {
    r = [14, "$.", 17];
  } //return r ? ret.concat(r) : ret;//Observable.from(r) : Observable.empty();


  for (let a of r) ret.next(a);

  return ret;
}

const tokenize = state => $chars => {
  return _rxjs.Observable.create($o => {
    $chars.subscribe({
      next(cur) {
        charReducer(state, cur);

        if (state.emit) {
          //console.log(state.emit);
          $o.next(state.emit);
        }
      },

      complete() {
        charReducer(state, EOF);
        if (state.emit) $o.next(state.emit);
        charReducer(state);
        if (state.emit) $o.next(state.emit);
        $o.complete();
      }

    });
  }); //return $chars.scan((state,cur) => charReducer(state,cur),state).filter(state => state.emit).map(state => state.emit);
};

exports.tokenize = tokenize;

const initLexerState = () => {
  return {
    emit: false,
    depth: 0,
    r: new _triply.default(),
    call: [],
    infix: [],
    xml: 0,
    attrs: [],
    ws: false,
    hasTag: 0,
    qname: null
  };
};

const lex = props => $tpls => {
  const rdl = props.rdl;
  const src = props.src;
  let state = initLexerState();
  return _rxjs.Observable.create($o => {
    $tpls.subscribe({
      next(tpl) {
        const r = state.r;
        let depth = state.depth;

        if (tpl.t == 2) {
          depth--;

          if (depth < 0) {
            throw new Error("Incorrect depth of close");
          }

          if (!state.tpl || state.tpl.t == 3) throw new Error("Incorrect position of close");
        } else if (tpl.t == 1) {
          //state.i[depth] = r.length;
          depth++;
        }

        tpl.d = depth; //console.log(depth,tpl);

        state = process(tpl, state);
        state.tpl = tpl; // never emit tpl, oldTpl can be overriden

        if (tpl.t === 0) {
          if (depth !== 0) {
            //console.log(tpl);
            throw new Error("Incorrect depth at EOF");
          } //log(r);


          r.moveRoot().pop();

          if (src) {
            return (0, _richReducers.reduce)(r.traverse(true), (a, x) => {
              a.next(x);
              return a;
            }, $o);
          } else if (rdl) {
            (0, _richReducers.reduceAhead)(r.traverse(), toRdl, $o);
          } else {
            (0, _richReducers.reduceAhead)(r.traverse(), toL3, $o);
          }

          state.r = new _triply.default();
        }
      },

      complete() {
        $o.complete();
      }

    });
  });
};

exports.lex = lex;

const initTokenState = () => {
  return {
    type: 0,
    buffer: "",
    string: 0,
    flag: 0,
    trie: _operatorTrie.trie,
    number: false,
    comment: false,
    qname: false,
    line: 1,
    column: 1,
    path: [],
    tpl: {},
    emit: void 0
  };
};

exports.initTokenState = initTokenState;

const parse = (path, props = {}) => (0, _nodeStream.fromReadStream)(path).pipe((0, _operators.mergeMap)(chunk => (0, _rxjs.from)(chunk.toString())), tokenize(initTokenState()), lex(props));

exports.parse = parse;

const parseString = (str, props = {}) => (0, _rxjs.from)(str).pipe(tokenize(initTokenState()), lex(props));

exports.parseString = parseString;
//# sourceMappingURL=parser.js.map
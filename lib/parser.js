"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lex = lex;
exports.parseString = exports.parse = exports.initTokenState = exports.tokenize = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _trie = require("./trie");

var _richReducers = require("./rich-reducers");

var _nodeStream = require("./node-stream");

var _triply = _interopRequireDefault(require("triply"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ops = require("../operator-trie.json");

const opMap = {
  801: "subtract",
  802: "add",
  903: "divide",
  904: "multiply",
  5003: "zero-or-one",
  3904: "zero-or-more",
  3802: "one-or-more",
  2003: "$_"
};
/*
const types = [
	"item",
	"atomic",
	"string",
	"numeric",
	"integer",
	"number",
	"double",
	"decimal",
	"float",
	"function",
	"array",
	"map"
];
*/

const EOF = String.fromCharCode(25);

const tpl = (t, v, o, d) => {
  return {
    t: t,
    v: v,
    o: o,
    d: d
  };
};

const openTpl = (d = 0) => tpl(1, 1, "(", d);

const commaTpl = (d = 0) => tpl(3, 100, ",", d);

const closeTpl = (d = 0) => tpl(2, 2, ")", d);
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


function handleBinOps(state) {
  const r = state.r;
  let lastv;

  for (let i = 0; i < state.bin; i++) {
    // handle each mark
    // mark again so we can peek
    const cur = r.unmark(i).mark(i).peek(); //console.log("bin",_strip(cur));
    // normal case: last preceeds

    if (!lastv || lastv > cur.v) {
      // move to 2nd arg, insert closing paren, peek
      const close = r.moveNextSibling().insertAfter(closeTpl()).peek(); // move back to op`, move to 1st arg, insert opening paren, nest until 2nd arg

      r.unmark(i).movePreviousSibling().insertBefore(openTpl()).openBefore(cur, close);
    } else {
      // we should move out at the end
      // remove cur
      r.pop();
      r.moveNextSibling(); // grab the next arg and remove it

      const arg2 = r.pop(); // move to the last operator and goto it's last child

      r.movePreviousSibling().moveLastChild() // insert the detached 2nd argument, followed by a comma and move to the 1st argument
      .insertBefore(arg2).insertBefore(commaTpl()).movePreviousSibling() // insert opening paren and open with all siblings (= open + 2nd argument + comma)
      .insertBefore(openTpl()).openBefore(cur);
    }

    lastv = cur.v;
    Object.assign(cur, commaTpl());
  }
}

function process(tpl, state) {
  const t = tpl.t,
        v = tpl.v,
        r = state.r;

  if (t == 1) {
    const last = r.lastChild();

    if (last && last.t === 2) {
      // 1. mark call
      //console.log("peek",r.peek());
      state.call = true; // nest entire tree
      // 2. push comma
      // TODO add original position to comma

      r.mark("call").push(commaTpl());
    } else {
      r.open(tpl);
    }
  } else if (t == 2) {
    state.r.push(tpl).close();

    if (state.call) {
      // $(x)(2) => call($(x),2)
      state.call = false;
      r.unmark("call").insertBefore(openTpl()).openBefore({
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
    //console.log("peek",_strip(r.peek()));


    if (state.bin) {
      // mark close so we can return to it
      r.mark("close");
      handleBinOps(state);
      r.unmark("close");
      state.bin = 0;
    }
  } else if (t == 4) {
    if (v == 119 || v == 2003) {
      if (opMap.hasOwnProperty(v)) tpl.o = opMap[v];
      state.r.push(tpl).open(openTpl()).push(closeTpl()).close();
    } else if (v > 3800) {
      //state.r = [{t:4,v:v,o:opMap[v]},{t:1,v:1},...state.r,{t:2,v:2}];
      state.r.insertAfter(closeTpl()).movePreviousSibling().insertBefore(openTpl()).openBefore({
        t: 4,
        v: v,
        o: opMap[v]
      });
    }

    state.r.push(tpl);

    if (v > 300 && v < 2100) {
      const mappedOp = opMap.hasOwnProperty(v) ? opMap[v] : tpl.o; // if original operator is not same, it was an infix operator
      // so mark it for precedence and closing
      //console.log(r.peek());

      if (tpl.o !== mappedOp) {
        r.peek().o = mappedOp;
        r.mark(state.bin++);
      }
    }
  } else if (t == 6 && /^\$/.test(v)) {
    // var
    tpl.v = v.replace(/^\$/, "");
    state.r.push({
      t: 10,
      v: "$",
      o: "$"
    }).open({
      t: 1,
      v: 1
    }).push(tpl).push({
      t: 2,
      v: 2
    }).close();
  } else if (t === 0) {
    state.r.push(tpl);

    if (state.bin) {
      // mark close so we can return to it
      r.mark("EOS");
      handleBinOps(state);
      r.unmark("EOS");
      state.bin = 0;
    }
  } else {
    state.r.push(tpl);
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
      //console.log(trie[0],next);
      if (trie[0]._v > 4 && /[a-z]/.test(next)) match = 2; //match = 0;
    } else if (match === 0) {
      // next won't match, so neither will this
      match = 2;
    }
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
  } //console.log("ct",char,type,zero,next);
  //if((type == 802 || type == 904 || type == 2003) && state.lastQname && types.includes(state.lastQname.v)) {
  //	type += 3000;
  //}
  //


  let number = zero && (type == 11 || type == 8 && oldType != 8 && /[0-9]/.test(next)) || state.number && (type === 0 || type == 11);
  let qname = zero && !number && type != 10 && match == 2 || state.qname && type != 10;
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

  state.trie = match > 0 ? ops : trie;
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
/*
function toRdl(ret,entry) {
	const t = entry.t, v = entry.v;
	if(t === 0) {
		ret += (";\n\n");
	} else if(t == 7) {
		ret += (`"${v}"`);
	} else if(t == 6 || t == 8) {
		ret += (v);
	} else if(t == 9) {
		ret += ("(:"+v+":)");
	} else {
		ret += (entry.o);
	}
	return ret;
}
*/


function toL3(ret, entry, last, next) {
  //console.log(ret,entry,last,next);
  let $t = entry.t;
  let $v = entry.v;
  let r = [];

  if ($t == 1) {
    if ($v == 3) {
      r = [15];
    } else if ($v == 1) {
      //(: TODO check for last operator :)
      if (!last || last.t == 1) {
        //console.log(last);
        r = [14, ""];
      }
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
    r = [14, entry.o];
  } else if ($t == 5) {
    r = [3, $v];
  } else if ($t == 9) {
    r = [8, $v];
  } else if ($t == 11) {
    r = [1, $v];
  } else if ($t == 12) {
    r = [2, $v];
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
}; //const dollarRE = /^\$/;
//const _strip = x => x && Object.entries(x).reduce((a,[k,v]) => dollarRE.test(k) ? a : (a[k] = v,a),{});


exports.tokenize = tokenize;

const initLexerState = () => {
  return {
    emit: false,
    depth: 0,
    r: new _triply.default(),
    call: false,
    bin: 0
  };
};

function lex($tpls) {
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
          }

          r.moveRoot().pop();
          (0, _richReducers.reduceAround)(r.traverse(), toL3, $o); //$o.next(expandBinOps(state.r).reduce(toRdl,""));

          state.r = new _triply.default();
        }
      },

      complete() {
        $o.complete();
      }

    });
  });
}

const initTokenState = () => {
  return {
    type: 0,
    buffer: "",
    string: 0,
    flag: 0,
    trie: ops,
    ws: false,
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

const parse = path => (0, _nodeStream.fromReadStream)(path).pipe((0, _operators.mergeMap)(chunk => (0, _rxjs.from)(chunk.toString())), tokenize(initTokenState()), lex);

exports.parse = parse;

const parseString = str => (0, _rxjs.from)(str).pipe(tokenize(initTokenState()), lex);

exports.parseString = parseString;
//# sourceMappingURL=parser.js.map
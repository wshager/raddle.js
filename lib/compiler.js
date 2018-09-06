"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runString = exports.run = exports.compile = exports.prepare = void 0;

var _l3n = require("l3n");

var _parser = require("./parser");

var _compilerUtil = require("./compiler-util");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _papply = require("./papply");

// TODO detect AND/OR and convert to quotation
//const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
//const ifRe = /^(n:)?if$/;
//const andRe = /^(n:)?and$/;
//const orRe = /^(n:)?or$/;
//const andOrRe = /^(n\.)?(and|or)$/;
const isCallNode = node => node.type == 14;

const isQuotNode = node => node.type == 15;

const isElementNode = node => node.type == 1;

const isListNode = node => node.type == 5;

const isMapNode = node => node.type == 6; //const isSeqNode = node => isCallNode(node) && node.name === "";


const isModuleNode = node => isCallNode(node) && node.name === "$*";

const isImportNode = node => isCallNode(node) && node.name === "$<";

const isExportNode = node => isCallNode(node) && node.name === "$>";

const isVarNode = node => isCallNode(node) && node.name === "$";

const isPartialNode = node => isCallNode(node) && node.name == "$_"; //const isRecursivePartialNode = node => isCallNode(node) && node.name == "$.";
//const isIfNode = node => isCallNode(node) && ifRe.test(node.name);
//const isAndNode = node => isCallNode(node) && andRe.test(node.name);
//const isOrNode = node => isCallNode(node) && orRe.test(node.name);


const isCall = x => x && x instanceof Call;

const isQuot = x => x && x instanceof Quot;

const isVar = x => x && x instanceof Var;

const isDatum = x => x && x instanceof Datum; //const isParam = x => x && x instanceof Var && x.isParam;


const makeAttrMap = (...a) => ({
  $attrs: a.reduce((o, [k, v]) => (o[k] = v, o), {})
});

class Datum {
  constructor(type, value, key) {
    this.type = type;
    this.value = value;
    this.key = key;
    this.length = 0;
  }

  apply() {
    return this.value;
  }

} // TODO module namespace


class Context {
  constructor(props = {}, key) {
    this.core = props.core;
    this.modules = props.modules || {};
    this.path = null;
    this.prefix = "local";
    this.namespace = null;
    this.stack = [];
    this.length = 0;
    this.scope = {};
    this.key = key;
  }

  addVar(count, key) {
    let v;

    if (count > 1) {
      // assigment
      v = new Var(this, 1, count);
    } else {
      const index = this.stack.lastItem;

      if (index.type == 12) {
        this.length++;
        v = new Var(this, 2, 1, key);
      } else {
        v = new Var(this, 3, 1, key);
      }
    }

    this.append(v);
  }

  addModule(length) {
    const ref = (prefix, ns) => {
      this.prefix = prefix;
      this.namespace = ns;
      this.moduleMap = {
        [prefix]: ns
      };
      this.modules[prefix] = {};
      return this;
    };

    this.append(new Call("module", length, ref));
  }

  addImport(length) {
    const ref = (prefix, loc, remap = false) => {
      // TODO merge properly
      const ret = run("../raddled/" + loc + ".rdl")(this);
      return remap ? ret.pipe((0, _operators.mergeMap)(cx => {
        Object.assign(cx.modules[this.prefix], cx.modules[prefix]);
        return cx;
      })) : ret;
    };

    this.append(new Call("import", length, ref));
  }

  addExport(length) {
    const ref = (qname, type, body) => {
      const {
        prefix,
        name
      } = (0, _compilerUtil.normalizeName)(qname);
      const module = this.modules[prefix];
      if (!module) throw new Error(`Module "${prefix}" has not been formally declared`);

      if (body === undefined) {
        // bind in core
        body = this.core[name];

        if (!body) {//throw new Error(`No entry found for function ${qname}`);
        } else {
          if (type.__length == -1) {
            module[name] = type(body);
          } else {
            if (!module[name]) {
              module[name] = {
                apply(self, args) {
                  const type = this[args.length];
                  if (!type) throw new Error(`No definition found for function ${qname}#${args.length}`);
                  return type(body)(...args);
                }

              };
            }

            module[name][type.__length] = type;
          }
        }
      } else if (isQuot(body)) {
        // add a function that serves as a proxy (i.e. can be applied)
        if (!module[name]) {
          module[name] = {
            apply(self, args) {
              const ref = this[args.length];
              if (!ref) throw new Error(`Incorrect number of parameters for ${qname}, received ${args.length}, have ${Object.keys(this)}`);
              return type(ref.call.bind(ref, self))(...args);
            }

          };
        }

        module[name][body.length] = body;
      } else {
        module[name] = type(body);
      } // perhaps we should just return the export / thing itself

    };

    this.append(new Call("export", length, ref));
  }

  getRef(qname) {
    const modules = this.modules;
    const core = this.core;
    const {
      prefix,
      name
    } = (0, _compilerUtil.normalizeName)(qname, "n");
    const has = modules.hasOwnProperty(prefix);

    if (has) {
      const ref = modules[prefix][name];
      if (ref) return ref;
    }

    if (prefix === "n" && core[name]) {
      return core[name];
    } else {
      throw new Error(`Could not resolve ${name} in module ${prefix}. ` + (has ? "" : "Module " + prefix + " not found."));
    }
  }

  isBoundQname(qname) {
    const {
      prefix
    } = (0, _compilerUtil.prefixAndName)(qname);
    return this.modules.hasOwnProperty(prefix);
  }

  getVarRef(qname) {
    // ignore NS to see if we have prefix
    if (this.isBoundQname(qname)) return this.getRef(qname);
    return this.scope[qname];
  }

  setVarRef(qname, type, value) {
    this.scope[qname] = value;
  }

  addCall(qname, length, isDef, key, args) {
    this.append(new Call(qname, length, undefined, isDef, key, args));
  }

  addDatum(type, value, key) {
    // don't append comments
    if (type != 8) this.append(new Datum(type, value, key));
  }

  append(item) {
    this.stack.push(item);
  }

  apply(self, args) {
    // TODO
    // - first arg is external?
    // - prevent recursion
    // - prevent type checks: just use method for stack/next on each type
    // evaluation stack
    var stack = [];
    const len = this.stack.length; //for(let i = 0, len = this.stack.length; i < len; i++) {

    const next = (i, $o) => {
      if (i === len) {
        const last = stack.pop();

        if ($o) {
          $o.next(last);
          $o.complete();
          return $o;
        }

        return last;
      }

      const last = this.stack[i]; //if(last.key) keys.push(last.key);

      const key = last.key;

      if (isQuot(last)) {
        stack.push(last.call.bind(last, this));
        return next(i + 1, $o);
      } else if (isCall(last)) {
        const qname = last.qname;
        const len = last.length;
        if (stack.length < len) throw new Error("Stack underflow");

        const _args = stack.splice(-len, len);

        const ret = last.apply(this, _args);

        if (qname == "import") {
          ret.subscribe({
            complete() {
              next(i + 1, $o);
            }

          });
        } else if (qname == "export") {
          return next(i + 1, $o);
        } else {
          stack.push(key ? [key, ret] : ret);
          return next(i + 1, $o);
        }
      } else if (isVar(last)) {
        if (last.isParam) {
          // pop the index, push the arg
          const index = stack.pop();
          stack.push(args[index - 1]);
          return next(i + 1, $o);
        } else {
          // treat vars as Calls
          const len = last.length;

          const _args = stack.splice(-len, len);

          const ref = last.apply(self, _args);

          if (!last.isAssig) {
            stack.push(key ? [key, ref] : ref);
          } else {
            stack.push(null);
          }

          return next(i + 1, $o);
        }
      } else if (isDatum(last)) {
        const ret = last.apply();
        stack.push(key ? [key, ret] : ret);
        return next(i + 1, $o);
      } else {
        stack.push(key ? [key, last] : last);
        return next(i + 1, $o);
      }
    };

    if (isQuot(this)) {
      return next(0);
    } else {
      return _rxjs.Observable.create($o => {
        next(0, $o);
      });
    }
  }

  call(self, ...args) {
    return this.apply(self, args);
  }

}

class Var {
  constructor(cx, type, length) {
    this.cx = cx; // 1. assignment
    // 2. param
    // 3. var

    this.isAssig = type == 1;
    this.isParam = type == 2;
    this.length = length;
  }

  apply(self, args) {
    if (this.isAssig) {
      const hasType = args.length > 2;
      return this.cx.setVarRef(args[0], hasType ? args[1] : null, hasType ? args[2] : args[1]);
    } else {
      return this.cx.getVarRef(args[0]);
    }
  }

}

class Quot extends Context {}

class Call {
  constructor(qname, length, ref, isDef, key, args) {
    this.qname = qname;
    this.length = length;
    this.ref = ref;
    this.isDef = isDef;
    this.key = key;
    this.args = args;
  }

  apply(cx, args) {
    const ref = this.ref || cx.getRef(this.qname, this.length); // TODO generalize...

    if (this.isDef) {
      args.unshift(this.isDef);
    }

    return ref.apply(this, this.args ? this.args.concat(args) : args);
  }

}

const prepare = (core, prefix = "n", path = "../raddled/") => {
  // pre-compile core
  const cx = new Context({
    core: core,
    modules: {
      null: {}
    }
  });
  return run(path + prefix + ".rdl")(cx); //.pipe(mergeMap(run(path+"fn.rdl")));
};

exports.prepare = prepare;

const compile = cx => o => {
  cx = new Context(cx);
  const quots = [cx]; // this is a reduction into a single result

  return o.pipe((0, _operators.reduce)((cx, node) => {
    const type = node.type;

    if ((0, _l3n.isClose)(type)) {
      const refNode = node.node;

      if (isQuotNode(refNode)) {
        const dest = quots.pop();
        quots.lastItem.append(dest);
      } else {
        const target = quots.lastItem;
        const key = refNode.key;

        if (isElementNode(refNode)) {
          target.addCall("e", refNode.count(), null, key, [refNode.name, makeAttrMap(refNode.entries())]);
        } else if (isListNode(refNode)) {
          target.addCall("l", refNode.count(), null, key);
        } else if (isMapNode(refNode)) {
          // 1 extra for keys on stack
          target.addCall("m", refNode.count(), null, key);
        } else if (isVarNode(refNode)) {
          // var or param
          const count = refNode.count(); // TODO add default prefix
          // NOTE we know the first child on the node, so we can read the name there
          // HOWEVER this goes against the pure stack-based implementation

          if (count > 1 && refNode.depth == 1 && target.isBoundQname(refNode.first())) {
            // private top-level declaration, simply add as export
            target.addExport(count);
          } else {
            target.addVar(count, key);
          }
        } else if (isModuleNode(refNode)) {
          // handle module insertion
          target.addModule(refNode.count());
        } else if (isImportNode(refNode)) {
          // handle import
          target.addImport(refNode.count());
        } else if (isExportNode(refNode)) {
          // handle export
          // expect type to be compiled to a single Call
          target.addExport(refNode.count());
        } else if (isPartialNode(refNode)) {
          // partial any
          target.append(_papply.$_);
        } else if (isCallNode(refNode)) {
          // handle call
          let name = refNode.name;
          let isDef; // TODO generalize
          // Use array and seq indifferently
          // and always apply interop higher-order functions.
          // Functions from implementation provide seqs
          // while inline stuff is just arrays

          if (name == "function") {
            name = "n:def";
            isDef = refNode.parent.first();
            if (typeof isDef !== "string") isDef = "_";
          } else if (name == "") {
            if (refNode.parent.name == "function") {
              name = "n:l";
            } else {
              name = "n:seq";
            }
          }

          target.addCall(name, refNode.count(), isDef, key);
        }
      }
    } else if ((0, _l3n.isLeaf)(type)) {
      quots.lastItem.addDatum(node.type, node.value, node.key);
    } else if ((0, _l3n.isBranch)(type) && isQuotNode(node)) {
      // add quot to scope stack
      quots.push(new Quot(cx, node.key));
    }

    return cx;
  }, cx));
};

exports.compile = compile;

const runnable = (cx, path) => (0, _rxjs.pipe)(_l3n.toVNodeStream, compile(cx), (0, _operators.switchMap)(cx => {
  cx.path = path;
  return cx.apply();
}), (0, _operators.mergeMap)(x => (0, _rxjs.isObservable)(x) ? x : [x]));

const run = path => cx => runnable(cx, path)((0, _parser.parse)(path));

exports.run = run;

const runString = str => cx => runnable(cx)((0, _parser.parseString)(str));

exports.runString = runString;
//# sourceMappingURL=compiler.js.map
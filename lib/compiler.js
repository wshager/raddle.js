"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.compile = void 0;

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
const isCallNode = node => node && node.type == 14;

const isQuotNode = node => node && node.type == 15; //const isSeqNode = node => isCallNode(node) && node.name === "";


const isModuleNode = node => isCallNode(node) && node.name === "$*";

const isImportNode = node => isCallNode(node) && node.name === "$<";

const isExportNode = node => isCallNode(node) && node.name === "$>";

const isVarNode = node => isCallNode(node) && node.name === "$";

const isPartialNode = node => isCallNode(node) && node.name == "$_"; //const isRecursivePartialNode = node => isCallNode(node) && node.name == "$.";
//const isIfNode = node => isCallNode(node) && ifRe.test(node.name);
//const isAndNode = node => isCallNode(node) && andRe.test(node.name);
//const isOrNode = node => isCallNode(node) && orRe.test(node.name);


const isCall = x => x && x instanceof Call;

const isQuot = x => x && x instanceof Context;

const isVar = x => x && x instanceof Var; //const isParam = x => x && x instanceof Var && x.isParam;


const NOOP = {
  __noop: true
}; // TODO module namespace

class Context {
  constructor(props = {}) {
    this.modules = props.modules || {};
    this.stack = [];
    this.length = 0;
    this.scope = {};
    this.refsToResolve = {};
  }

  addVar(count) {
    let v;

    if (count > 1) {
      // assigment
      v = new Var(this, 1, count);
    } else {
      const index = this.stack.lastItem;

      if (typeof index == "number") {
        this.length++;
        v = new Var(this, 2, 1);
      } else {
        v = new Var(this, 3, 1);
      }
    }

    this.append(v);
  }

  addModule(length) {
    const ref = prefix => {
      this.modules[prefix] = {};
      return NOOP;
    };

    this.append(new Call("module", length, ref));
  }

  addImport(length) {
    const ref = (prefix, ns, loc) => {
      if (length == 2) loc = ns;
      this.refsToResolve[prefix] = {}; // TODO merge properly

      const self = this;
      return (0, _parser.parse)("../raddled/" + loc + ".rdl").pipe(_l3n.toVNodeStream, x => compile(x, this), (0, _operators.mergeMap)(cx => {
        const ret = cx.apply(); //console.log(ret);

        return ret;
      }), (0, _operators.map)(() => {
        const module = self.modules[prefix];
        Object.entries(self.refsToResolve[prefix]).forEach(([k, v]) => {
          v.next(module[k]);
          v.complete();
        });
        return self;
      }));
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

      if (isQuot(body)) {
        // add an object that serves as a proxy (i.e. can be applied)
        if (!module[name]) module[name] = {
          apply(self, args) {
            const ref = this[args.length];
            if (!ref) throw new Error(`Incorrect number of parameters for ${qname}, received ${args.length}, have ${Object.keys(this)}`);
            return ref.apply(self, args);
          }

        }; // TODO add type

        module[name][body.length] = body;
      } else {
        module[name] = body;
      }

      return NOOP;
    };

    this.append(new Call("export", length, length == 2 ? (0, _papply.papplyAny)(ref, _papply.$_, () => {}, _papply.$_) : ref));
  }

  getRef(qname) {
    const modules = this.modules;
    const {
      prefix,
      name
    } = (0, _compilerUtil.normalizeName)(qname, "n");

    if (modules.hasOwnProperty(prefix)) {
      return modules[prefix][name];
    } else {
      //console.log("no module found",prefix);
      // deferring module entry as a ReplaySubject
      const rts = this.refsToResolve;
      if (!rts.hasOwnProperty(prefix)) throw new Error(`Import of prefix ${prefix} not yet encountered`);
      const def = new _rxjs.ReplaySubject();
      if (!rts[prefix].hasOwnProperty(name)) rts[prefix][name] = def;
      return def;
    }
  }

  isBoundQname(qname) {
    const {
      prefix
    } = (0, _compilerUtil.prefixAndName)(qname);
    return this.modules.hasOwnProperty(prefix) || this.refsToResolve.hasOwnProperty(prefix);
  }

  getVarRef(qname) {
    // ignore NS to see if we have prefix
    if (this.isBoundQname(qname)) return this.getRef(qname);
    return this.scope[qname];
  }

  setVarRef(qname, type, value) {
    this.scope[qname] = value;
    return NOOP;
  }

  addCall(qname, length) {
    //if(!qname) console.trace(qname,length);
    this.append(new Call(qname, length));
  }

  addDatum(type, value) {
    if (type !== 8) this.append(value);
  }

  append(item) {
    this.stack.push(item);
  }

  apply(self, args) {
    // TODO first arg is external?
    // evaluation stack
    var stack = [];
    var ret = new _rxjs.ReplaySubject();
    const len = this.stack.length; //for(let i = 0, len = this.stack.length; i < len; i++) {

    const next = i => {
      if (i == len) {
        const last = stack.pop();

        if (last instanceof _rxjs.ReplaySubject) {
          last.subscribe(ret);
        } else {
          ret.next(last);
          ret.complete();
        }

        return;
      }

      const last = this.stack[i];

      if (isQuot(last)) {
        stack.push(last);
        next(i + 1);
      } else if (isCall(last)) {
        const len = last.length;

        const _args = stack.splice(-len, len); // TODO original stack as Observable
        // if last.ref is Subject, evaluation must be deferred:
        // take next from the stack when ref is resolved


        last.apply(this, _args).subscribe(ret => {
          if ((0, _rxjs.isObservable)(ret)) {
            ret.subscribe({
              complete() {
                next(i + 1);
              }

            });
          } else {
            if (ret !== NOOP) stack.push(ret);
            next(i + 1);
          }
        });
      } else if (isVar(last)) {
        if (last.isParam) {
          // pop the index, push the arg
          const index = stack.pop();
          stack.push(args[index - 1]);
          next(i + 1);
        } else {
          // treat vars as Calls
          const len = last.length;

          const _args = stack.splice(-len, len);

          const ref = last.apply(self, _args);

          if (last.isAssig) {
            next(i + 1);
          } else {
            if (ref instanceof _rxjs.ReplaySubject) {
              ref.subscribe(x => {
                stack.push(x);
                next(i + 1);
              });
            } else {
              stack.push(ref);
              next(i + 1);
            }
          }
        }
      } else {
        stack.push(last);
        next(i + 1);
      }
    };

    next(0);
    return ret;
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

class Call {
  constructor(qname, length, ref) {
    this.qname = qname;
    this.length = length;
    this.ref = ref;
  }

  apply(cx, args) {
    const ref = this.ref || cx.getRef(this.qname, this.length);

    if (ref instanceof _rxjs.ReplaySubject) {
      return ref.pipe((0, _operators.map)(ref => ref.apply(this, args)));
    } else {
      const ret = ref.apply(this, args);
      let sub = new _rxjs.ReplaySubject();
      sub.next(ret);
      sub.complete();
      return sub;
    }
  }

}

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

        if (isVarNode(refNode)) {
          // var or param
          const count = refNode.count(); // TODO add default prefix
          // NOTE we know the first child on the node, so we can read the name there
          // HOWEVER this goes against the pure stack-based implementation

          if (count > 1 && refNode.depth == 1 && target.isBoundQname(refNode.first())) {
            // private top-level declaration, simply add as export
            target.addExport(count);
          } else {
            target.addVar(count);
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
          target.addCall(refNode.name, refNode.count());
        }
      }
    } else if ((0, _l3n.isLeaf)(type)) {
      quots.lastItem.addDatum(node.type, node.value);
    } else if ((0, _l3n.isBranch)(type) && isQuotNode(node)) {
      // add quot to scope stack
      quots.push(new Context(cx));
    }

    return cx;
  }, cx));
};

exports.compile = compile;

const run = (o, cx) => compile(o, cx).pipe((0, _operators.map)(cx => cx.apply()), (0, _operators.mergeAll)());

exports.run = run;
//# sourceMappingURL=compiler.js.map
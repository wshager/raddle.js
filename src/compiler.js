// TODO detect AND/OR and convert to quotation
import { isLeaf, isBranch, isClose, toVNodeStream } from "l3n";
import { parse, parseString } from "./parser";
import { prefixAndName, normalizeName } from "./compiler-util";
import { Observable, isObservable, pipe } from "rxjs";
import { reduce, map, switchMap, mergeMap } from "rxjs/operators";
import { $_ /*, papplyAny*/ } from "./papply";

//const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

//const ifRe = /^(n:)?if$/;
//const andRe = /^(n:)?and$/;
//const orRe = /^(n:)?or$/;
//const andOrRe = /^(n\.)?(and|or)$/;

const isCallNode = node => node && node.type == 14;
const isQuotNode = node => node && node.type == 15;
//const isSeqNode = node => isCallNode(node) && node.name === "";
const isModuleNode = node => isCallNode(node) && node.name === "$*";
const isImportNode = node => isCallNode(node) && node.name === "$<";
const isExportNode = node => isCallNode(node) && node.name === "$>";
const isVarNode = node => isCallNode(node) && node.name === "$";
const isPartialNode = node => isCallNode(node) && node.name == "$_";
//const isRecursivePartialNode = node => isCallNode(node) && node.name == "$.";
//const isIfNode = node => isCallNode(node) && ifRe.test(node.name);
//const isAndNode = node => isCallNode(node) && andRe.test(node.name);
//const isOrNode = node => isCallNode(node) && orRe.test(node.name);

const isCall = x => x && x instanceof Call;
const isQuot = x => x && x instanceof Quot;
const isVar = x => x && x instanceof Var;
//const isParam = x => x && x instanceof Var && x.isParam;
const NOOP = {__noop:true};

// TODO module namespace
class Context {
	constructor(props = {}) {
		this.core = props.core;
		this.modules = props.modules || {};
		this.stack = [];
		this.length = 0;
		this.scope = {};
		this.refsToResolve = {};
	}
	addVar(count){
		let v;
		if(count > 1) {
			// assigment
			v = new Var(this,1,count);
		} else {
			const index = this.stack.lastItem;
			if(typeof index == "number") {
				this.length++;
				v = new Var(this,2,1);
			} else {
				v = new Var(this,3,1);
			}
		}
		this.append(v);
	}
	addModule(length) {
		const ref = prefix => {
			this.modules[prefix] = {};
			return NOOP;
		};
		this.append(new Call("module",length,ref));
	}
	addImport(length) {
		const ref = (prefix,ns,loc) => {
			if(length == 2) loc = ns;
			this.refsToResolve[prefix] = {};
			// TODO merge properly
			const cx = this;
			return run("../raddled/"+loc+".rdl")(cx).pipe(map(() => {
				const module = cx.modules[prefix];
				Object.entries(cx.refsToResolve[prefix]).forEach(([k,v]) => {
					v.next(module[k]);
					v.complete();
				});
				return cx;
			}));
		};
		this.append(new Call("import",length,ref));
	}
	addExport(length){
		const ref = (qname,type,body) => {
			const { prefix, name } = normalizeName(qname);
			const module = this.modules[prefix];
			if(!module) throw new Error(`Module "${prefix}" has not been formally declared`);
			if(body === undefined) {
				// bind in core
				body = this.core[name];
				if(body) module[name] = type(body);
			} else if(isQuot(body)) {
				// add a function that serves as a proxy (i.e. can be applied)
				if(!module[name]) {
					module[name] = {
						apply(self,args) {
							const ref = this[args.length];
							if(!ref) throw new Error(`Incorrect number of parameters for ${qname}, received ${args.length}, have ${Object.keys(this)}`);
							return type(ref.call.bind(ref,self))(...args);
						}
					};
				}
				module[name][body.length] = body;
			} else {
				module[name] = type(body);
			}
			// perhaps we should just return the export / thing itself
			return NOOP;
		};
		this.append(new Call("export",length,ref));
	}
	getRef(qname) {
		const modules = this.modules;
		const core = this.core;
		const { prefix, name } = normalizeName(qname,"n");
		if(modules.hasOwnProperty(prefix)) {
			const ref = modules[prefix][name];
			if(ref) return ref;
			if(prefix === "n" && core[name]) return core[name];
			throw new Error(`Could not resolve ${name} in module ${prefix}`);
		} else {
			throw new Error("no module found: "+prefix);
		}
	}
	isBoundQname(qname) {
		const { prefix } = prefixAndName(qname);
		return this.modules.hasOwnProperty(prefix) || this.refsToResolve.hasOwnProperty(prefix);
	}
	getVarRef(qname) {
		// ignore NS to see if we have prefix
		if(this.isBoundQname(qname)) return this.getRef(qname);
		return this.scope[qname];
	}
	setVarRef(qname,type,value) {
		this.scope[qname] = value;
		return NOOP;
	}
	addCall(qname,length,isDef) {
		//if(!qname) console.trace(qname,length);
		this.append(new Call(qname,length,undefined,isDef));
	}
	addDatum(type,value) {
		if(type !== 8) this.append(value);
	}
	append(item){
		this.stack.push(item);
	}
	apply(self,args){
		// TODO
		// - first arg is external?
		// - prevent recursion
		// - prevent type checks: just use method for stack/next on each type
		// evaluation stack
		var stack = [];
		const len = this.stack.length;
		//for(let i = 0, len = this.stack.length; i < len; i++) {
		const next = (i,$o) => {
			if(i === len) {
				const last = stack.pop();
				if($o) {
					$o.next(last);
					$o.complete();
					return $o;
				}
				return last;
			}
			const last = this.stack[i];
			if(isQuot(last)) {
				stack.push(last.call.bind(last,this));
				return next(i+1,$o);
			} else if(isCall(last)) {
				const len = last.length;
				if(stack.length < len) throw new Error("Stack underflow");
				const _args = stack.splice(-len,len);
				const ret = last.apply(this,_args);
				if(last.qname == "import") {
					ret.subscribe({
						complete(){
							next(i+1,$o);
						}
					});
				} else {
					if(ret !== NOOP) stack.push(ret);
					return next(i+1,$o);
				}
			} else if(isVar(last)) {
				if(last.isParam) {
					// pop the index, push the arg
					const index = stack.pop();
					stack.push(args[index - 1]);
					return next(i+1,$o);
				} else {
					// treat vars as Calls
					const len = last.length;
					const _args = stack.splice(-len,len);
					const ref = last.apply(self,_args);
					if(!last.isAssig) {
						stack.push(ref);
					} else {
						stack.push(null);
					}
					return next(i+1,$o);
				}
			} else {
				stack.push(last);
				return next(i+1,$o);
			}
		};
		if(isQuot(this)) {
			return next(0);
		} else {
			return Observable.create($o => {
				next(0,$o);
			});
		}
	}
	call(self,...args) {
		return this.apply(self,args);
	}
}
class Var {
	constructor(cx,type,length) {
		this.cx = cx;
		// 1. assignment
		// 2. param
		// 3. var
		this.isAssig = type == 1;
		this.isParam = type == 2;
		this.length = length;
	}
	apply(self,args) {
		if(this.isAssig) {
			const hasType = args.length > 2;
			return this.cx.setVarRef(args[0], hasType ? args[1] : null, hasType ? args[2] : args[1]);
		} else {
			return this.cx.getVarRef(args[0]);
		}
	}
}

class Quot extends Context {
}

class Call {
	constructor(qname,length,ref,isDef) {
		this.qname = qname;
		this.length = length;
		this.ref = ref;
		this.isDef = isDef;
	}
	apply(cx,args) {
		const ref = this.ref || cx.getRef(this.qname,this.length);
		// TODO generalize...
		if(this.isDef) {
			args.unshift(this.isDef);
		}
		return ref.apply(this,args);
	}
}

export const prepare = (core,prefix="n",path="../raddled/") => {
	// pre-compile core
	core.jsArray = (...a) => a;
	const cx = new Context({core:core,modules:{local:{}}});
	return run(path+prefix+".rdl")(cx).pipe(map(() => cx));
};

export const compile = cx => o => {
	cx = new Context(cx);
	const quots = [cx];
	// this is a reduction into a single result
	return o.pipe(reduce((cx,node) => {
		const type = node.type;
		if(isClose(type)) {
			const refNode = node.node;
			if(isQuotNode(refNode)) {
				const dest = quots.pop();
				quots.lastItem.append(dest);
			} else {
				const target = quots.lastItem;
				if(isVarNode(refNode)) {
					// var or param
					const count = refNode.count();
					// TODO add default prefix
					// NOTE we know the first child on the node, so we can read the name there
					// HOWEVER this goes against the pure stack-based implementation
					if(count > 1 && refNode.depth == 1 && target.isBoundQname(refNode.first())) {
						// private top-level declaration, simply add as export
						target.addExport(count);
					} else {
						target.addVar(count);
					}
				} else if(isModuleNode(refNode)) {
					// handle module insertion
					target.addModule(refNode.count());
				} else if(isImportNode(refNode)) {
					// handle import
					target.addImport(refNode.count());
				} else if(isExportNode(refNode)) {
					// handle export
					// expect type to be compiled to a single Call
					target.addExport(refNode.count());
				} else if(isPartialNode(refNode)) {
					// partial any
					target.append($_);
				} else if(isCallNode(refNode)){
					// handle call
					let name = refNode.name;
					let isDef;
					// TODO generalize
					// Use array and seq indifferently
					// and always apply interop higher-order functions.
					// Functions from implementation provide seqs
					// while inline stuff is just arrays
					if(name == "function") {
						name = "def";
						isDef = refNode.parent.first();
						if(typeof isDef !== "string") isDef = "_";
					} else if(name == "") {
						if(refNode.parent.name == "function") {
							name = "jsArray";
						} else {
							name = "seq";
						}
					}
					target.addCall(name,refNode.count(),isDef);
				}
			}
		} else if(isLeaf(type)) {
			quots.lastItem.addDatum(node.type,node.value);
		} else if(isBranch(type) && isQuotNode(node)) {
			// add quot to scope stack
			quots.push(new Quot(cx));
		}
		return cx;
	},cx));
};

const runnable = cx => pipe(toVNodeStream,compile(cx),switchMap(cx => cx.apply()),mergeMap(x => isObservable(x) ? x : [x]));
export const run = str => cx => runnable(cx)(parse(str));
export const runString = str => cx => runnable(cx)(parseString(str));

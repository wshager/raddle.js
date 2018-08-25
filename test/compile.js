const rdl = require("../lib/index");
const l3n = require("l3n");
const n = require("frink");
const op = require("rxjs/operators");

//mergeMap(x => x.apply())(rdl.parseString("$<(n,\"../raddled/n.rdl\");3 - 4").pipe(l3n.toVNodeStream,x => rdl.compile(x,{n:n})))
//rdl.parse("../raddled/n.rdl")
// first, load all types and apply typing
/*rdl.parse("../raddled/n.rdl").pipe(l3n.toVNodeStream,rdl.compile({module:{n:n}}),op.mergeMap(cx => {
	const ret = cx.apply();
	console.log(ret);
	return ret;
}))*/
const q = "($(f,pipe(for-each({$1 + 1}),filter({$1 gt 2}),scan(3,{$(a,$1),$(b,$2), $a div $b}))),$(f)(subsequence(interval(15),1,10)))";
//const q = "($(f,for-each({$1 + 1})),$(f)(subsequence(interval(15),1,100)))";
//const q = "n:if(false() and true(),{1},{2})";
//const q = "$<(test,'./test');test:add(3,\"4\")";
//rdl.prepare(n).pipe(op.switchMap(rdl.runString()),op.mergeMap(x => n.seq(x)))
//rdl.prepare(n).pipe(op.switchMap(rdl.runString(q)),op.mergeMap(x => n.seq(x)))
op.switchMap(rdl.runString(q))(rdl.prepare(n))
//rdl.parseString(q,{rdl:1}).pipe(op.reduce((a,x) => a+x))//.pipe(l3n.toVNodeStream,rdl.compile({modules:{n:n}}),op.switchMap(cx => cx.apply()))
	.subscribe(x => console.log(x));

const rdl = require("../lib/index");
const l3n = require("l3n");
const n = require("frink");
const op = require("rxjs/operators");

//mergeMap(x => x.apply())(rdl.parseString("$<(n,\"../raddled/n.rdl\");3 - 4").pipe(l3n.toVNodeStream,x => rdl.compile(x,{n:n})))
//rdl.parse("../raddled/n.rdl")
// first, load all types and apply typing
rdl.parse("../raddled/n.rdl").pipe(l3n.toVNodeStream,rdl.compile({module:{n:n}}),op.mergeMap(cx => {
	const ret = cx.apply();
	console.log(ret);
	return ret;
}))
//rdl.parseString("3 - 4").pipe(l3n.toVNodeStream,rdl.compile({modules:{n:n}}),op.mergeMap(cx => {
//	return cx.apply();
//}))
	.subscribe(x => console.log(x));

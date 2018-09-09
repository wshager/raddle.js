const rdl = require("../lib/index");
const n = require("frink");
const op = require("rxjs/operators");
const l3 = require("l3n");

const time = hrtime => {
	const nanoseconds = (hrtime[0] * 1e9) + hrtime[1];
	const milliseconds = nanoseconds / 1e6;
	const seconds = nanoseconds / 1e9;

	return {
		seconds,
		milliseconds,
		nanoseconds
	};
};
const q = `l3:traverse(l3:e(root,for-each(subsequence(interval(1000),0,3),{l3:e(a,$1)})))
`;
const s = process.hrtime();
//l3.toVNodeStreamCurried({withAttrs:true})(rdl.parseString(q,{rdl:0}))
op.switchMap(rdl.runString(q))(rdl.prepare(n))
	.subscribe({
		next(x) {
			//if(x.type == 17) console.log(JSON.stringify(x.node.node));
			console.log(x+"");
		},
		complete() {
			//console.log(time(process.hrtime(s)));
		}
	});

const rdl = require("../lib/index");
const n = require("frink");
const op = require("rxjs/operators");

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
const q = "subsequence(for-each(interval(50),{$1 + 1}),1,10)";
const s = process.hrtime();
//rdl.parseString(q,{rdl:0})
op.switchMap(rdl.runString(q))(rdl.prepare(n))
	.subscribe({
		next(x) {
			console.log(x);
		},
		complete() {
			console.log(time(process.hrtime(s)));
		}
	});

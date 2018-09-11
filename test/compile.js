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
const q = `
l3:ensure-doc(<p>{for-each(subsequence(interval(500),2,5),{"x"})}</p>)
`;

const s = process.hrtime();
op.switchMap(rdl.runString(q))(rdl.prepare(n))
	.subscribe({
		next(x) {
			if(x.type == 17) return console.log("closes "+x.node);
			console.log(x+"");
		},
		complete() {
			console.log(time(process.hrtime(s)));
		}
	});

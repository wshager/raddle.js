const r = require("../lib/rich-reducers");
const a = [1,2,3];

const sum = r.reduce(a,(a,x) => {
	return a+x;
},0);

console.log(sum);

const rdl = require("../lib/parser");
const q = `
	(
		$(f,
			pipe(
				for-each({$1 + 1}),
				filter({$1 gt 2}),
				scan(3,{$(a,$1),$(b,$2), $a div $b})
			)
		),
		$(f)(subsequence(interval(15),1,10)))`;

rdl.parseString(q,{rdl:0})
	.subscribe(console.log);

const parser = require("../lib/parser");
const compiler = require("../lib/compiler");
const l3n = require("l3n");
const n = require("frink");

compiler.run(l3n.fromStream(parser.parseString("1 + 2")),{
	modules:{
		n:n
	}
}).subscribe(console.log);

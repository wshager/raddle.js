const parser = require("../lib/parser");
const compiler = require("../lib/compiler");
const l3n = require("l3n");
const n = require("frink");

parser.parseString("1 + 2").pipe(l3n.fromStream,$o => compiler.run($o,{
	modules:{
		n:n
	}
})).subscribe(console.log);

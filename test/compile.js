const rdl = require("../lib/index");
const l3n = require("l3n");
const n = require("frink");

rdl.parseString("1 + 2").pipe(l3n.toVNodeStream,$o => rdl.run($o,{
	modules:{
		n:n
	}
})).subscribe(console.log);

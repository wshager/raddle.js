const fs = require("fs");
const trie = require("./lib/trie");
const operators = require("./assets/operators.json");
fs.writeFile("./src/operator-trie.js","export const trie = "+JSON.stringify(trie.create(operators))+";\nexport default trie;",err => {
	if(err) return console.error("Error writing the operator trie to disk: "+err);
	console.log("Successfully created operator trie in \"./src/operator-trie.js\"");
});

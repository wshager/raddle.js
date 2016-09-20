var n = require("../dist/n");
var fs = require("fs");
var parser = new require("xml2js").Parser();
var benchmark = require("benchmark");
//var c = n.compress();
fs.open("e:/z.199.clean.l3n", 'r', function(err, fd) {
    if (err) {
        throw 'error opening file: ' + err;
    }

    /*fs.write(fd, c, 0, c.length, null, function(err) {
		if(err) return console.error(err);
		console.log("success");
	});*/
	fs.fstat(fd, function(err, stats) {
        var bufferSize=stats.size,
            chunkSize=512,
            buffer=new Buffer(bufferSize),
            bytesRead = 0;
			while (bytesRead < bufferSize) {
	            if ((bytesRead + chunkSize) > bufferSize) {
	                chunkSize = (bufferSize - bytesRead);
	            }
	            fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
	            bytesRead += chunkSize;
	        }
		var suite = new benchmark.Suite();
		var xmlstr = fs.readFileSync("e:/z.199.clean.xml",'utf-8',function(err,doc){
			if(err) throw new Error(err);
		});
		var xml = n.parse(xmlstr).first().toString().replace(/\s/g,"");
		var l3n = n.uncompress(buffer).first().toString().replace(/\s/g,"");
		parser.parseString(xmlstr,function(err,doc){
			console.log(doc);
		});
		var ms = suite.add("L3N.parse",function(){
	        return n.uncompress(buffer).first();//.toString();
		}).add("XML.parse",function(){
			return n.parse(xmlstr).first();
		}).on('cycle', function(event) {
	        console.log(String(event.target));
	    }).on('complete', function() {
	        console.log('Fastest is '+ this.filter('fastest').map("name"));
	    }).run({
			'async': false
	    });
        fs.close(fd);
    });
});
//console.log(c.byteLength/1024+"kb");
//console.log(n.uncompress(c).toString());
//console.log(n.parse('<root xmlns:json="http://json.org" json:type="map"><bla json:type="literal">true</bla></root>'))

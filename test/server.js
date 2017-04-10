const http = require('http');
const fs = require("fs");
const querystring = require('querystring');
const port = 8001;
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var fn = require("../lib/fn");

var n = require("../lib/n");

var xqc = require("../lib/xq-compat");

var a = require("../lib/array-util");

var array = require("xvarray");

var rdl = require("../lib/raddle");

var js = require("../lib/js");


app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/code', function (req, res, next) {
    var params = n.map({
        "$compat": "xquery"
    });
    var query = req.body.q;
    var tree = rdl.parse(query, params);
    console.log("Tree Done");
    //console.log(rdl.stringify(tree,params));
    var out = `
        var n = require("d:/workspace/raddle.js/lib/n");
        var fn = require("d:/workspace/raddle.js/lib/fn");
        var $ = n.frame();
        exports.main = function(){
            return ${js.transpile(tree,params).first()};
        };`;
    console.log(out);
    var exec = eval(out);
    var ret = exec();
    console.log(ret.toString());
    res.send(ret.toString());
});

app.post('/rdl', function (req, res, next) {
    var params = n.map({
        "$compat": "xquery"
    });
    var query = req.body.q;
    var tree = rdl.parse(query, params);
    console.log("Tree Done");
    //console.log(rdl.stringify(tree,params));
    var out = `
        var n = require("d:/workspace/raddle.js/lib/n");
        var fn = require("d:/workspace/raddle.js/lib/fn");
        var $ = n.frame();
        exports.main = function(){
            return ${js.transpile(tree,params).first()};
        };`;
    //console.log(out)
    //var exec = eval(out);
    res.send([rdl.stringify(tree,params).first()]);
});

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port 80');
});

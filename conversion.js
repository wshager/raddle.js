/**
 * Conversion Module
 */
({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){

function stringToValue(string, parameters){
	var converter = exports.converters['default'];
	if(string.charAt(0) === "$"){
		var param_index = parseInt(string.substring(1)) - 1;
		return param_index >= 0 && parameters ? parameters[param_index] : undefined;
	}
	/*if(string.indexOf(":") > -1){
		var parts = string.split(":");
		converter = exports.converters[parts[0]];
		if(!converter){
			throw new URIError("Unknown converter " + parts[0]);
		}
		string = parts.slice(1).join(':');
	}*/
	return converter(string);
};

// FIXME this should be taken care of by static typing
// however, type inference could be necessary
var autoConverted = exports.autoConverted = {
	"true": true,
	"false": false,
	"null": null,
	"undefined": undefined,
	"Infinity": Infinity,
	"-Infinity": -Infinity
};

exports.converters = {
	auto: function(string){
		if(autoConverted.hasOwnProperty(string)){
			return autoConverted[string];
		}
		var number = +string;
		if(isNaN(number) || number.toString() !== string){
          /*var isoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/.exec(x);
          if (isoDate) {
            date = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3], +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));
          }*/
			string = decodeURIComponent(string);
			if(exports.jsonQueryCompatible){
				if(string.charAt(0) == "'" && string.charAt(string.length-1) == "'"){
					return JSON.parse('"' + string.substring(1,string.length-1) + '"');
				}
			}
			return string;
		}
		return number;
	},
	number: function(x){
		var number = +x;
		if(isNaN(number)){
			throw new URIError("Invalid number " + number);
		}
		return number;
	},
	epoch: function(x){
		var date = new Date(+x);
		if (isNaN(date.getTime())) {
			throw new URIError("Invalid date " + x);
		}
		return date;
	},
	isodate: function(x){
		// four-digit year
		var date = '0000'.substr(0,4-x.length)+x;
		// pattern for partial dates
		date += '0000-01-01T00:00:00Z'.substring(date.length);
		return exports.converters.date(date);
	},
	date: function(x){
		var isoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/.exec(x);
		var date;
		if (isoDate) {
			date = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3], +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));
		}else{
			date = new Date(x);
		}
		if (isNaN(date.getTime())){
			throw new URIError("Invalid date " + x);
		}
		return date;
	},
	"boolean": function(x){
		return x === "true";
	},
	string: function(string){
		return decodeURIComponent(string);
	},
	re: function(x){
		return new RegExp(decodeURIComponent(x), 'i');
	},
	RE: function(x){
		return new RegExp(decodeURIComponent(x));
	},
	glob: function(x){
		var s = decodeURIComponent(x).replace(/([\\|\||\(|\)|\[|\{|\^|\$|\*|\+|\?|\.|\<|\>])/g, function(x){return '\\'+x;}).replace(/\\\*/g,'.*').replace(/\\\?/g,'.?');
		if (s.substring(0,2) !== '.*') s = '^'+s; else s = s.substring(2);
		if (s.substring(s.length-2) !== '.*') s = s+'$'; else s = s.substring(0, s.length-2);
		return new RegExp(s, 'i');
	}
};

// exports.converters["default"] can be changed to a different converter if you want
// a different default converter, for example:
// RP = require("rql/parser");
// RP.converters["default"] = RQ.converter.string;
exports.converters["default"] = exports.converters.auto;
return exports;
});
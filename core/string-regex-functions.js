({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	function tokenize(str,delim){
		return str.split(delim);
	}
	function replace(str,pattern,replacement){
		return str.replace(pattern,replacement);
	}
	exports["tokenize#2"] = tokenize;
	exports["replace#3"] = replace;
	return exports;
	
});

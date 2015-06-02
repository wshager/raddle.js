({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	function tokenize(str,delim){
		return str.split(delim);
	}
	exports["tokenize#1"] = tokenize;
	return exports;
	
});

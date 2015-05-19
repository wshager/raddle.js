({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	exports.tokenize = function(str,delim){
		return str.split(delim);
	};
	
	return exports;
	
});

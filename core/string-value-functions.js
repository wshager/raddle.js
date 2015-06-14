({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	function stringLength(str){
		return str.length;
	};
	exports["string-length#1"]= stringLength;
	
	return exports;
	
});

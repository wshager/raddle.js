({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	function gt(a,b){
		return a>b;
	}
	
	exports["greater-than#2"] = gt;
	
	return exports;
	
});

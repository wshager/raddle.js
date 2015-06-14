({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	function count(seq){
		return seq.length;
	}
	
	exports["count#1"] = count;
	
	return exports;
	
});

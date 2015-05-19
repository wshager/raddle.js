({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	exports.count = function(seq){
		return seq.length;
	};
	
	return exports;
	
});

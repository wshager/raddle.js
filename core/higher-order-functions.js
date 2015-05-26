({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	function reduce(array, iteratee, accumulator) {
		var index = -1,
			length = array.length;
		while (++index < length) {
			accumulator = iteratee(accumulator, array[index], index, array);
		}
		return accumulator;
	}
	
	exports["fold-left"] = reduce;
	
	return exports;
	
});

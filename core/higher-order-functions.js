({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	function reduce(array, accumulator, iteratee) {
		var index = -1,
			length = array.length;
		while (++index < length) {
			// parameters: previousValue, currentValue, index, array
			accumulator = iteratee(accumulator, array[index], index, array);
		}
		return accumulator;
	}
	
	exports["fold-left#3"] = reduce;
	
	return exports;
	
});

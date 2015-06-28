({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	function count(x){
		return x.length;
	}
	function head(x){
		return x[0];
	}
	function tail(x){
		return x.slice(1);
	}
	function empty(x) {
		return x.length===0;
	}
	function append(x,y) {
		x = x || [];
		x.push(y);
		return x;
	}
	function filter(array, predicate) {
		var index = -1,
			length = array.length,
			resIndex = -1,
			result = [];

		while (++index < length) {
			var value = array[index];
			if (predicate(value, index, array)) {
				result[++resIndex] = value;
			}
		}
		return result;
	}
	function map(array, iteratee) {
		var index = -1,
			length = array.length,
			result = Array(length);

		while (++index < length) {
			result[index] = iteratee(array[index], index, array);
		}
		return result;
	}
	function unzip(array) {
		if (!(array && array.length)) {
			return [];
		}
		var index = -1,
			length = 0;

		array = filter(array, function(group) {
			length = Math.max(group.length, length);
			return true;
		});
		var result = Array(length);
		while (++index < length) {
			result[index] = map(array, function(arr) {
				return arr[index];
			});
		}
		return result;
	}
	function zip(array) {
		var index = -1,
			length = array.length,
			rest = Array(length);
		while (++index < length) {
			rest[index] = array[index];
		}
		return unzip(rest);
	};
	
	exports["count#1"] = count;
	exports["head#1"] = head;
	exports["tail#1"] = tail;
	exports["empty#1"] = empty;
	exports["append#2"] = append;
	exports["filter#2"] = filter;
	exports["map#2"] = map;
	exports["zip#1"] = zip;
	exports["unzip#1"] = unzip;
	
	return exports;
	
});

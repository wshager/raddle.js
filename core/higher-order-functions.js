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
	
	function unfold(init, fn, cond, r) {
		var t;
		if(!r) r = [];
		if(cond(init)) {
			return r;
		} else {
			t = fn(init);
		}
		r.push(init);
		return unfold(t, fn, cond, r);
	}
	
	function groupBy(init, fn, r) {
		var t = init.length ? [init.slice(1),init[0],fn(init[0])] : false;
		if(!r) r = {};
		if(t===false){
			return r;
		} else {
			var l = r[t[2]];
			x = l ? l : [];
			x.push(t[1]);
			r[t[2]] = x;
			return groupBy(t[0], fn, r);
		}
	}

	/*
	TODO implement unfold#3 with [init, fn, cond, handler]
	seed = ["am","a","bg"];
	var len = function(a){
	  return a.length;
	}
	groupBy(seed,len);
	
	groupby alternative:
	- first triple, which in unfold example would be id()/self() and in groupBy tail()  (represents the next seed)
	- second triple, which in groupBy would be head() (represents the actual value to add)
	- third triple, which in groupBy would be (head(),length()) (represents the next index)
	
	function listifyEntry(map,key){
		if(map[key]){
			return map[key];
		} else {
			return array();
		}
	}
	
	function unfoldTriple(init, fn, r) {
		vat t = fn(init);
		if(t===false){
			return r;
		} else {
			x = listifyEntry(r,t[2]);
			x.push(t[1]);
			r[t[2]] = x;
			return unfoldTriple(t[0], fn, r);
		}
	}
	seed = ["am","a","bg"];
	fn = function(n){
		if(count(n))
			return [array_slice(n,1),n[0],strlen(n[0])];
		else
			return false;
	};
	map = unfoldTriple(seed,fn,array());
	*/ 

	exports["fold-left"] = reduce;
	exports["unfold"] = unfold;
	
	return exports;
	
});

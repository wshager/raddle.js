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
	function mapTransform(x,i,fn) {
		// value is curried into fn
		x[i] = fn(x[i]);
		return x;
	}
	
	exports["count"] = count;
	exports["head"] = head;
	exports["tail"] = tail;
	exports["empty"] = empty;
	exports["append"] = append;
	exports["map-transform"] = mapTransform;
	
	return exports;
	
});

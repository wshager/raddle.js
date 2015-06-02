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
	
	exports["count#0"] = count;
	exports["head#0"] = head;
	exports["tail#0"] = tail;
	exports["empty#0"] = empty;
	exports["append#1"] = append;
	
	return exports;
	
});

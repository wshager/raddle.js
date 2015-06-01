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
	
	function unfold(init, unspool, cond, r) {
		r = r || [];
		if(cond(init)) {
			return r;
		}
		r.push(init);
		return unfold(unspool(init), unspool, cond, r);
	}
	
	function groupBy(init, index, r) {
		if(!r) r = {};
		if(init.length===0){
			return r;
		}
		var i = index(init[0]);
		// TODO in unfold handler, index should be checked:
		// if no index, value is empty array, otherwise add it
		// rewrite function below to retrieve value in single call (handler)
		/*
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
				x = listifyEntry(r,t[2]); // t[1] = head, t[2] = index
				x.push(t[1]);
				r[t[2]] = x;
			}
		}
		 */
		var v = r[i] ? r[i] : [];
		v.push(init[0]);
		r[i] = v;
		// unspool = tail()
		return groupBy(init.slice(1), index, r);
	}
	
	function unfold2(init, unspool, cond, handler, r) {
		// unspool prepares the next seed value
		// cond is tested for a stop condition
		// handler transforms the value to add
		r = r || [];
		if(cond(init)) {
			return r;
		}
		r.push(handler(init));
		return unfold2(unspool(init), unspool, cond, handler, r);
	}
	
	/*
	function head(x){
	 return x[0];
	}
	function tail(x){
	 return x.slice(1);
	}
	function empty(x) {
	 return x.length===0;
	}
	function head_strlen(x){
	 return (head(x)+"").length;
	}
	function cons(x,y) {
	  x = x || [];
	  x.push(y);
	  return x;
	}
	function map_transform(x,i,fn) {
	  // value is curried into fn
	  x[i] = fn(x[i]);
	  return x;
	}
	function map_transform_cons(x,y,z) {
	  return map_transform(x,y,function(a) { return cons(a,z); } );
	}
	
	unfold4(["sdf","d","we","eq","w"],tail,empty,head,head_strlen,map_transform_cons,{});
	- unspool (next seed):
		- example 1: (add(1))
		- groupBy: tail()
	- cond (stop condition):
		- example 1: (gt(1000))
		- groupBy: (eq(length(),0))
	- handler (value to add): 
		- example 1: (self())
		- groupBy: (head())
	- index:
		- example 1: (null())
		- groupBy: (head(),length())
	- appender:
		- example 1: (cons())
		- groupBy: map-insert-cons#2 =>
		map-transform(index,cons) => 
		map transforms take index and value, because each step separately would require a stack
		the current value for the index is transformed by a function
		where the current value is the input:
		map-transform(index,(add(2)))
		however, the index is now unavailable as well, 
		making it impossible to provide without stack shuffling or pairing
		appender should execute against result and init, but it could be defined:
		map-transform(?,cons(?))
	*/
	
	function unfold3(init, unspool, cond, handler, index, r) {
		// unspool prepares the next seed value
		// cond is tested for a stop condition
		// handler transforms the value to add
		// index retrieves the index of the value to add
		r = r || [];
		if(cond(init)) {
			return r;
		}
		var i = index(init);
		r[i]=handler(init);
		return unfold3(unspool(init), unspool, cond, handler, index, r);
	}
	
	function unfold4(init, unspool, cond, handler, index, appender, r) {
		// unspool prepares the next seed value
		// cond is tested for a stop condition
		// handler transforms the value to add
		// index retrieves the index of the value to add
		// appender specifies how the index is inserted into the result
		r = r || {};
		if(cond(init)) {
			return r;
		}
		return unfold4(unspool(init), unspool, cond, handler, index, appender, appender(r,index(init),handler(init)));
	}
	
	exports["fold-left"] = reduce;
	exports["unfold"] = unfold;
	exports["unfold4"] = unfold4;
	
	return exports;
	
});

({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
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
		var v = r[i] ? r[i] : [];
		v.push(init[0]);
		r[i] = v;
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
	
	function unfold3(init, unspool, cond, handler, appender, r) {
		// unspool prepares the next seed value
		// cond is tested for a stop condition
		// handler transforms the value to add
		// appender specifies how the index is inserted into the result
		r = r || [];
		if(cond(init)) {
			return r;
		}
		return unfold3(unspool(init), unspool, cond, handler, appender, appender(r,handler(init)));
	}
	
	function unfold4(init, unspool, cond, handler, appender, index, r) {
		// unspool prepares the next seed value
		// cond is tested for a stop condition
		// handler transforms the value to add
		// index retrieves the index of the value to add
		// appender specifies how the index is inserted into the result
		r = r || {};
		if(cond(init)) {
			return r;
		}
		return unfold4(unspool(init), unspool, cond, handler, appender, index, appender(r,index(init),handler(init)));
	}
	
	exports["unfold#3"] = unfold;
	exports["unfold#4"] = unfold2;
	exports["unfold#5"] = unfold3;
	exports["unfold#6"] = unfold4;
	exports["unfold#7"] = unfold4;
	exports["group-by#2"] = groupBy;
	
	return exports;
	
});

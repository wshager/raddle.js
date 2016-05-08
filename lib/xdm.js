function select_2($node,$path) /*n.item()*/ {
	return select(n.filterAt($node,function($_0) {
		return n.seq(n.geq($_0,1))
	}),n.seq(3),$path,n.seq());
}
function select_3($nn,$path,$acc) /*n.item()*/ {
	var $h;
	return n.seq(($h = n.item(fn.head($nn)),
	$acc = n.item((n.and(n.eq($h(1),1),n.eq($h(2),$path)) ? n.seq($acc,$h) : $acc)), (
		n.ggt(fn.count($nn),1) ? select(fn.tail($nn),$path,$acc) : $acc)));
}
export function select(... $a) /*n.item()*/ {
	var $s;
	return n.seq(($s = n.integer(array.size($a)), (n.eq($s,2) ? fn.apply(select_2,$a) : (n.eq($s,3) ? fn.apply(select_3,$a) : n.seq()))));
}

//function selectAll_2($node,$path) /*n.item()*/ { return selectAll(n.filterAt($node,function($_0) { return n.seq(n.geq($_0,1))}),n.seq(3),$path,n.seq()); } function selectAll_3($nn,$path,$acc) /*n.item()*/ { var $h; return n.seq(($h = n.item(fn.head($nn)), $acc = n.item((n.and(n.eq($h(1),1),n.eq($h(2),$path)) ? n.seq($acc,$h) : $acc)), (n.ggt(fn.count($nn),1) ? selectAll(fn.tail($nn),$path,$acc) : (n.eq($h(1),1) ? selectAll($h(3),$path,$acc) : $acc)))); } export function selectAll(... $a) /*n.item()*/ { var $s; return n.seq(($s = n.integer(array.size($a)), (n.eq($s,2) ? fn.apply(selectAll_2,$a) : (n.eq($s,3) ? fn.apply(selectAll_3,$a) : n.seq())))); }

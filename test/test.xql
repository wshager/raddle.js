declare function xqc:seqtype($parts,$ret,$lastseen){
  let $head := head($parts)/fn:group[@nr=1]/string()
  let $maybe-seqtype := if(matches($head,$xqc:operator-regexp)) then xqc:op-num($head) else 0
  return
	  if($maybe-seqtype eq 20.06) then
		  xqc:body($parts,concat($ret,","),($lastseen,21.06))
	  else
		  xqc:seqtype(tail($parts),$ret,$lastseen)
};

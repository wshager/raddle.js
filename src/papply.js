// partial sentinel
export const $_ = {__isPartial:true};

// case 1.
// [_,1,_] =>
// _: partial, perhaps all are partials, so we can return self
// 1: not partial, can't return self
// case 2.
// [1,_] =>
// 1: bindable, perhaps f is bindable
// _: partial, have bindable, so canBind = 1
// no more items, so canBind = 1
// case 3.
// [1,_,2]
// 1: bindable, perhaps f is bindable
// _: partial, have bindable, so canBind = 1
// 2: not partial, so can't bind
export function papplyAny(fn,...orig) {
	// Convert arguments object to an array, removing the first argument.
	let i = 0, len = orig.length, lastNonPartial, canBind = 0, isSelf = false;
	for (;i < len; i++) {
		if(orig[i] === $_) {
			if(lastNonPartial === undefined) {
				isSelf = true;
			} else {
				canBind = i;
			}
		} else {
			if(canBind) {
				canBind = 0;
				break;
			} else if(isSelf) {
				isSelf = false;
				break;
			}
			lastNonPartial = i;
		}
	}
	if(isSelf) return fn;
	if(canBind) return fn.bind(this,...orig.slice(0,canBind));
	return function(...partial) {
		var args = [];
		for (var i = 0; i < orig.length; i++) {
			args[i] = orig[i] === $_ ? partial.shift() : orig[i];
		}
		// concat partial, because it can be papply-right only
		return fn.apply(this, args.concat(partial));
	};
}

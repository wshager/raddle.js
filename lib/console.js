export function log(... a) {
	console.log.apply(console,a.map(function(_){
		return _.toString();
	}));
}

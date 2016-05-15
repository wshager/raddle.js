export function log(... a) {
	a.forEach(function(_){
		console.log(_.toString())
	})
}

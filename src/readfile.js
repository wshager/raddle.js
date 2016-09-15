import { readFileSync, readdirSync } from 'fs';

export function readFile(file){
	return readFileSync(file,'utf-8',function(err,doc){
		if(err) throw new Error(err);
		return doc;
	});
}

export function readDir(uri){
	return readdirSync(uri,'utf-8',function(err,data){
		if(err) console.error(err);
	});
}

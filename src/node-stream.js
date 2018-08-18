import * as fs from "fs";

import { Observable } from "rxjs";

export const fromStream = function (stream, dataEventName = "data", finishEventName = "end") {
	stream.pause();

	return Observable.create(function (observer) {
		function dataHandler (data) {
			observer.next(data);
		}

		function errorHandler (err) {
			observer.error(err);
		}

		function endHandler () {
			stream.removeListener(dataEventName, dataHandler);
			stream.removeListener("error", errorHandler);
			stream.removeListener(finishEventName, endHandler);
			observer.complete();
		}

		stream.addListener(dataEventName, dataHandler);
		stream.addListener("error", errorHandler);
		stream.addListener(finishEventName, endHandler);

		stream.resume();


	});
};

export const fromReadStream = path => fromStream(fs.createReadStream(path));

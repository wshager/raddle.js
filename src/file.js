export function read(file) {
	var reader = new FileReader();
	reader.onerror = errorHandler;
	reader.onprogress = updateProgress;
	reader.onabort = function(e) {
	  alert('File read cancelled');
	};
	reader.onloadstart = function(e) {
	  document.getElementById('progress_bar').className = 'loading';
	};
	reader.onload = function(e) {
	  // Ensure that the progress bar displays 100% at the end.
	}

	// Read in the image file as a binary string.
	reader.readAsBinaryString(evt.target.files[0]);
}

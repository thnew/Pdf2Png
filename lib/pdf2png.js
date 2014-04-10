var exec = require('child_process').exec;
var fs = require('fs');
var http = require('http');
var tmp = require('tmp');

/* Initialization */ {
	// Add Ghostscript executables path
	var gsPath = __dirname + "\\executables\\ghostScript";
	//var gsPath = __dirname + "\\node_modules\\pdf2png";
	process.env.Path += ";" + gsPath;
}

exports.convert = function(filepathOrData, callback) {
	var execute = function() {
		// get temporary filepath
		tmp.file(function _tempFileCreated(err, imageFilepath, fd) {
			if(err)
			{
				callback({ success: false, error: "Error getting second temporary filepath: " + err });
				return;
			}
			
			exec("gs -dQUIET -dPARANOIDSAFER -dBATCH -dNOPAUSE -dNOPROMPT -sDEVICE=png16m -dTextAlphaBits=4 -dGraphicsAlphaBits=4 -r600 -dFirstPage=1 -dLastPage=1 -sOutputFile=" + imageFilepath + " " + filepathOrData, function (error, stdout, stderr) {
				// Remove temp file
				fs.unlink(filepathOrData);
				
				if(error !== null)
				{
					callback({ success: false, error: "Error converting pdf to png: " + error });
					return;
				}
				
				var img = fs.readFileSync(imageFilepath);
				
				// Remove temp file
				fs.unlink(imageFilepath);
				
				callback({ success: true, data: img });
			});
		});
	};
	
	if(typeof(filepathOrData) == "object")
	{
		var fileData = filepathOrData;
		
		// get temporary filepath
		tmp.file(function _tempFileCreated(err, path, fd) {
			if(err)
			{
				callback({ success: false, error: "Error getting first temporary filepath: " + err });
				return;
			}
			
			fs.writeFile(path, fileData, function(err) {
				if(err)
				{
					callback({ success: false, error: "Error saving given binary filedata to file: " + err });
					return;
				}
				
				// set filepath
				filepathOrData = path;
				
				// Execute
				execute();
			});
		});
	}
	else if(filepathOrData.substr(0, 7) == "http://" || filepathOrData.substr(0, 8) == "https://")
	{
		// get temporary filepath
		tmp.file(function _tempFileCreated(err, path, fd) {
			if(err)
			{
				callback({ success: false, error: "Error getting first temporary filepath: " + err });
				return;
			}
			
			var file = fs.createWriteStream(path);
			var request = http.get(filepathOrData, function(response) {
				response.pipe(file);
				
				response.on('end', function () {
					// set filepath
					filepathOrData = path;
					
					// Execute
					execute();
				});
			});
		});
	}
	else execute();
};
pdf2png.js
============

Install:
npm install pdf2png

This project uses ghostscript, but there's no need to install it (if you use windows).
If you want the module to use a local installation of ghostscript, set the option useLocalGhostscript true.

Tested on Windows/Tested on AZURE

Not tested on linux!
If you want to use it with linux, you may replace the ghostscript-executable with something that works with linux.
Or you install ghostscript for linux.
http://www.ghostscript.com/

Easy example that converts a simple pdf to a png and saves it

```javascript
// Create
var sem = require('semaphore')(capacity);

// Take
sem.take(fn[, n=1])
sem.take(n, fn)

// Leave
sem.leave([n])
```

Options:
	ghostscriptPath: bool
	
	useLocalGhostscript: bool
		if true, 
	
	returnFilePath: bool
		If you set this true, the module won't return you file-data, it will return you a path to a temporary file instead, containing the image.
		Don't forget to remove this temporary file.
		
	quality
		default: 100
		can be higher and lower, play with it
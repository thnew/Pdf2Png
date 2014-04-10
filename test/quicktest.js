var pdf2png = require("../lib/pdf2png.js");
var fs = require("fs");

var projectPath = __dirname.split("\\");
projectPath.pop();
projectPath = projectPath.join("\\");

var gsPath = projectPath + "\\executables\\ghostScript";

// Rewrite the ghostscript path
pdf2png.ghostscriptPath = gsPath;

// Most simple example
pdf2png.convert(__dirname + "/example.pdf", function(resp){
	if(!resp.success)
	{
		console.log("Something went wrong: " + resp.error);
		
		return;
	}
	
	console.log("Yayy the pdf got converted, now I'm gonna save it!");
	
	fs.writeFile("test/example_simple.png", resp.data, function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("The file was saved!");
		}
	});
});

// Example that returns a path
pdf2png.convert(__dirname + "/example.pdf", { returnFilePath: true }, function(resp){
	if(!resp.success)
	{
		console.log("Something went wrong: " + resp.error);
		
		return;
	}
	
	console.log("Yayy the pdf got converted, now I'm gonna save it!");
	
	var img = fs.readFileSync(resp.data);
	
	fs.writeFile("test/example_that_returns_a_path.png", img, function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("The file was saved!");
		}
	}); 
});

// Example with lower quality
pdf2png.convert(__dirname + "/example.pdf", { quality: 50 }, function(resp){
	if(!resp.success)
	{
		console.log("Something went wrong: " + resp.error);
		
		return;
	}
	
	console.log("Yayy the pdf got converted, now I'm gonna save it!");
	
	fs.writeFile("test/example_with_lower_quality.png", resp.data, function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("The file was saved!");
		}
	}); 
});

// Example with higher quality
pdf2png.convert(__dirname + "/example.pdf", { quality: 200 }, function(resp){
	if(!resp.success)
	{
		console.log("Something went wrong: " + resp.error);
		
		return;
	}
	
	console.log("Yayy the pdf got converted, now I'm gonna save it!");
	
	fs.writeFile("test/example_with_higher_quality.png", resp.data, function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("The file was saved!");
		}
	}); 
});

// Example using a local ghostscript installation
pdf2png.convert(__dirname + "/example.pdf", { useLocalGhostscript: true }, function(resp){
	if(!resp.success)
	{
		console.log("Something went wrong: " + resp.error);
		
		return;
	}
	
	console.log("Yayy the pdf got converted, now I'm gonna save it!");
	
	fs.writeFile("test/example_simple.png", resp.data, function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("The file was saved!");
		}
	}); 
});
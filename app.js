var addScript = function(filename) {
	var script = document.createElement("script");
	script.src = chrome.extension.getURL(filename);
	(document.head || document.documentElement).appendChild(script);
}

var scripts = ["ics.deps.min.js", "ics.min.js", 'makeSchedule.js'];
for (var i = 0; i < scripts.length; i++) addScript(scripts[i]);
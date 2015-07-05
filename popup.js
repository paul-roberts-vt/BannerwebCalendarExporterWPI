function click(e) {

  chrome.tabs.executeScript(null,
      {file:"app.js"});
      
      
  	/*
	var scripts = [
	  'background.js',
	  'app.js',
	];
	scripts.forEach(function(script) {
	  chrome.tabs.executeScript(null, { file: script }, function(resp) {
	    if (script!=='last.js') return;
	    // Your callback code here
	  });
	});*/

  window.close();
}



document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('.makeCal');
  
    divs[0].addEventListener('click', click);
});
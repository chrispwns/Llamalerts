document.addEventListener('DOMContentLoaded', function() {

	if(window.name === "true"){

		runThroughReload();
	} else{

	  	var startButton = document.getElementById("Start");
		var stopButton = document.getElementById("Stop");
		Start(startButton);
		Stop(stopButton);
	}

	

  	
}, false);

/**
	Listens for the start button and sends a message to the active script
	once it has been clicked.
*/
function Start(startButton) {
	startButton.addEventListener('click', function() {

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

				chrome.tabs.sendMessage(tabs[0].id, {
					from: 'background',
					subject: 'startScript',
				})
			})		
		}, false);
};

/**
	Listens for stop button and sends message to active script once it's been
	clicked signaling the end of the contant reload/injection.
*/
function Stop(stopButton){
	
	stopButton.addEventListener('click', function() {
		
		chrome.tabs.query( { active: true, currentWindow: true}, function(tabs) {

			chrome.tabs.sendMessage(tabs[0].id, {

				from: 'background',
				subject: 'stopScript',
			})
		});
	}, false);
};
reloadPersist();

/**
	Listen for a start message sent from background.js
	Sets window.name = true so script will continue injection on reload as per
	reloadPersist. 
*/
chrome.runtime.onMessage.addListener( function (msg, sender) {

	if( ( msg.from === "background" ) && ( msg.subject === "startScript" ) ) {

		console.log("start message recieved");

			document.getElementById("badgedisplay").innerHTML = '<h1><b>Reloading in 10 seconds</h1></b>';
			badgeListener();
			window.name = "true";

			setInterval( function(){

				location.reload();
				
			},10000);

			
	} // start listener
	
	else if( ( msg.from === "background" ) && (msg.subject === "stopScript" ) ) {

		console.log("stopping");
		document.getElementById("badgedisplay").innerHTML = '<h1><b>Stopping</b></h1>';
		stopListener();
	} // stop listener
});

/**
	Listens to the document and looks for any new action elements that contain Llama.
	If the Documents do contain Llama it plays a sound, otherwise it does nothing
*/
function badgeListener() {
	
	var  badgeQuery = document.getElementsByClassName('action');
	
	for( var i = 0; i < badgeQuery.length; i++ ) {
	
		if( badgeQuery[i].innerHTML.indexOf('Llama') != -1 ) {
		
			var audio = new Audio('http://opengameart.org/sites/default/files/alert-beep_0.mp3');
			audio.play();
		}
		else {
			//console.log('No badges yet'); // added for debugging purposes.
		}
	}
};

/**
	Stops script injection and reloading.
*/
function stopListener() {
	
	window.name = "false";

	chrome.runtime.sendMessage({
		from: 'scripts',
		subject: 'endExecution'
	}) // message
};

/**
	When window.name is true allow the script to auto inject after each reload.
*/
function reloadPersist() {
	if( window.name === "true" ) {
		badgeListener();
		setInterval( function(){

				location.reload();
				
			},10000);
	}
};
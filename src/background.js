document.addEventListener('DOMContentLoaded', function() {

  	var toggle = document.getElementById("toggle-button");
	startOrStop(toggle);
	
}, false);



function startOrStop(toggle) {

		// intial css if already running.
		initialCss(toggle);

		// listen for button click.
	toggle.addEventListener('click', function() {

		// if the extension is not currently running.
		if( localStorage.getItem("running") === null || localStorage.getItem("running") == "false" ){

			var refreshTime = getRefreshTime(); // user input time.
			//console.log("starting extension.") // debug
			// change the css.
			sliderCssOn(toggle);
			// change extension icon
			chrome.browserAction.setIcon( {path: "active_logo.png"} );
			// start extension on current tab.
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

				chrome.tabs.sendMessage(tabs[0].id, {

					from: 'background',
					subject: 'startScript',
					interval: refreshTime,
				})
			})		
			// set running to true.
			localStorage.setItem("running", "true");
		}
		else if ( localStorage.getItem("running") === "true" ) {

			console.log("stoping extension") // debug
			// change the css
			slideCssOff(toggle);
			//change extension icon
			chrome.browserAction.setIcon( {path: "logo.png"} );
			// stop the extension on current tab
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

				chrome.tabs.sendMessage(tabs[0].id, {

					from: 'background',
					subject: 'stopScript',
				})
			})		
			// set running to false
			localStorage.setItem("running", false);

		}
	})
}

function sliderCssOn(toggle) {

	slider = document.getElementById('slider');
	slider.style.left = "23px";
	slider.style.backgroundColor = "#526167"
	toggle.style.backgroundColor = "#05CC47";
}

function slideCssOff(toggle){

	slider = document.getElementById('slider');
	slider.style.left = "2px";
	slider.style.backgroundColor = "#475C4D"
	toggle.style.backgroundColor = "#7E9180";
}

function initialCss(toggle) {

	if ( localStorage.getItem("running") === "true" ){
		sliderCssOn(toggle);
	} 
	else if (localStorage.getItem("running") === "false") {
		slideCssOff(toggle);
	}
}

function getRefreshTime() {

	inputTime = document.getElementById("time").value;

	if( inputTime <= 5 || inputTime === null || inputTime === "" ) { // default values

		localStorage.setItem('refreshTime', 5000)
	} else {
		localStorage.setItem('refreshTime', inputTime);
	}

	formToInt = parseInt( localStorage.getItem('refreshTime') ); // localStorage saves as string. get a usable value.

	formToInt *= 1000; // second to millisecond conversion.

	return formToInt;

}
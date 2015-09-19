chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	$('#pref_btn').click(function(event) {
		$(this).append('Some text');
	});
	$('#git_btn').click(function(event) {
		console.log(event);
	});
	}
	}, 10);
});

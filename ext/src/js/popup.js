
	$('#git_btn').click(function(){
	console.log('git');
	chrome.tabs.getSelected(null, function(tabs) {
	chrome.tabs.update(tabs.id, {
        url: "https://github.com/dart-lang/html"
    });
});
});
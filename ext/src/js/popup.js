function getRandomIndex(max) {
	return Math.floor(Math.random() * (max));
}

$('#git_btn').click(function() {

	chrome.storage.sync.get('languages', function(data) {
		var langs = "";

		if(chrome.runtime.lastError)
			langs = "C,C++,Java,Javascript,Ruby";
		else  {
			if (typeof data === 'string' || data instanceof String)
				langs = data;
			else
				langs = "C,C++,Java,Javascript,Ruby";
		}



			chrome.tabs.getSelected(null, function(tabs) {
				$.ajax('http://localhost:8080/api/stumble/v1/google?languages=' + langs).success(function(data) {
					var url = data[getRandomIndex(data.length)]['url'];
					chrome.tabs.update(tabs.id, {
						url: url
					});
				});
			});


	});

	
});

$('#pref_icon').click(function() {
	$('.spinner').attr('display','inline');
	chrome.tabs.getSelected(null, function(tabs) {
		chrome.tabs.update(tabs.id, {
			url: 'src/page_action/settings.html'
		});
	});
});


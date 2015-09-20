$('.spinner').hide();

function getRandomIndex(max) {
	return Math.floor(Math.random() * (max));
}

$('#git_btn').click(function() {
	$('.spinner').show();
	chrome.storage.sync.get('languages', function(data) {
		var langs = "";

		if(chrome.runtime.lastError)
			langs = "C,C++,Java,Javascript,Ruby";
		else  {
			if (typeof data['languages'] === 'string' || datadata['languages'] instanceof String)
				langs = data['languages'];
			else
				langs = "C,C++,Java,Javascript,Ruby";
		}



			chrome.tabs.getSelected(null, function(tabs) {
				$.ajax('http://localhost:8080/api/stumble/v1/google?languages=' + langs).success(function(data) {
					var url = data[getRandomIndex(data.length)]['url'];
					chrome.tabs.update(tabs.id, {
						url: url
					});
					$('.spinner').hide();
				});
			});


	});


});

$('#pref_icon').click(function() {
	$('.spinner').show();
	chrome.windows.create({ url: 'src/page_action/settings.html', width: 420, height: 300, type: "popup" });
});

$('#pay_icon').click(function() {
	$('.spinner').show();
	chrome.windows.create({ url: 'src/page_action/donate.html', width: 420, height: 300, type: "popup" });
	$('.spinner').hide();
});


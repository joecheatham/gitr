function getRandomIndex(max) {
  return Math.floor(Math.random() * (max));
}

$('#git_btn').click(function(){
	console.log('git');
	chrome.tabs.getSelected(null, function(tabs) {
		$.ajax('http://localhost:8080/api/stumble/v1/google').success(function(data) {
			var url = data[getRandomIndex(data.length)]['url'];
			chrome.tabs.update(tabs.id, {
				url: url
			});
		});

	});
});
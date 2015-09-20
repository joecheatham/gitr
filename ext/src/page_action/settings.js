

function onReady(callback) {
	var intervalID = window.setInterval(checkReady, 1000);
	function checkReady() {
		if (document.getElementsByTagName('body')[0] !== undefined) {
			window.clearInterval(intervalID);
			callback.call(this);
		}
	}
}

function show(id, value) {
	document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
	show('page', true);
	show('loading', false);
});



$(document).ready(function() {

	function savePrefs() {
		chrome.storage.sync.set({'languages': $('#mySingleField').val()}, function() {
          message('Settings saved');
        });
	}

	var langs = Object.keys(allLangs);
	$('#singleFieldTags').tagit({
        availableTags: langs,
        showAutocompleteOnFocus: true,
        singleField: true,
        singleFieldNode: $('#mySingleField'),
        beforeTagAdded: function(event, ui) {
        	for (var i = 0; i < langs.length; i++) {
				if (ui.tagLabel == langs[i]) {
					return true;
				} 
			};
			return false;
    	},
    	afterTagAdded: function() {
    		savePrefs();
    	},
    	afterTagRemoved: function() {
    		savePrefs();
    	}
    });
});

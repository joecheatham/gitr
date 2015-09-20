

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

	function loadPrefs() {
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

		//add to tagit here

		});
	}

	function savePrefs() {
		chrome.storage.sync.set({'languages': $('#mySingleField').val()}, function() {
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

    $('#close').click(function() {
    	chrome.windows.getCurrent(function(data) {
    		chrome.windows.remove(data.id);
    	});
    });
});



// function onReady(callback) {
// 	var intervalID = window.setInterval(checkReady, 1000);
// 	function checkReady() {
// 		if (document.getElementsByTagName('body')[0] !== undefined) {
// 			window.clearInterval(intervalID);
// 			callback.call(this);
// 		}
// 	}
// }

// function show(id, value) {
// 	document.getElementById(id).style.display = value ? 'block' : 'none';
// }

// onReady(function () {
// 	show('page', true);
// 	show('loading', false);
// });



$(document).ready(function() {
	var languagess = Object.keys(allLangs);
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

		$('#mySingleField').val(langs);
		$('#singleFieldTags').tagit({
        availableTags: languagess,
        showAutocompleteOnFocus: true,
        singleField: true,
        singleFieldNode: $('#mySingleField'),
        beforeTagAdded: function(event, ui) {
        	for (var i = 0; i < languagess.length; i++) {
				if (ui.tagLabel == languagess[i]) {
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
	}

	loadPrefs();

	function savePrefs() {
		chrome.storage.sync.set({'languages': $('#mySingleField').val()}, function() {
        });
	}


	

    $('#close').click(function() {
    	chrome.windows.getCurrent(function(data) {
    		chrome.windows.remove(data.id);
    	});
    });
});

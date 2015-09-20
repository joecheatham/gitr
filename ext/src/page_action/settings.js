
$(document).ready(function() {
	var langs = Object.keys(allLangs);
	console.log(langs);
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
    	}
    });
});
var bestLangArr = [
		"JavaScript",
		"Java",
		"Ruby",
		"CSS",
		"Python",
		"PHP",
		"C",
		"C++",
		"C#",
		"Shell",
		"Objective-C",
		"Go",
		"Perl",
		"R",
		"Swift",
		"Lua",
		"ActionScript",
		"Dogescript",
		"Matlab",
		"Assembly",
		"Dart",
		"Rust",
		"Julia",
		"Haskell",
		"Arduino"
	];
var cbFill = '<input type="checkbox" id="">';
$(function() {
	var allFill = [];
	for(var k in allLangs) {
		allFill.push(k);
	}
	$("#langs").autocomplete({
		source: allFill
	});
});

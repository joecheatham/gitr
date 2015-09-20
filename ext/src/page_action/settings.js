

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
	$('#singleFieldTags').tagit({
        availableTags: Object.keys(allLangs),
        showAutocompleteOnFocus: true,
        singleField: true,
        singleFieldNode: $('#mySingleField')
    });
    console.log();
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

# gitr.

## What's a gitr?
gitr. is a chrome extension that helps you discover unique and interesting projects hosted on GitHub.

## How do I install it?
Download the extension from the [Chrome Web Store](https://chrome.google.com/webstore). Or, if you're really adventurous, run it on your local machine! Here's how to do that.

You'll first need to download the `dart` language sdk. It can be found [here](https://www.dartlang.org/downloads/).

Next, open up the file located in `ext/src/js/popup/` named `popup.js`.

Change the following block:
```
chrome.tabs.getSelected(null, function(tabs) {
	$.ajax('http://localhost:8080/api/stumble/v1/github?languages=' + langs).success(function(data) {
	  var url = data[getRandomIndex(data.length)]['url'];
		chrome.tabs.update(tabs.id, {
			url: url
		});
		$('.spinner').hide();
	});
});
```
to this:
```
chrome.tabs.getSelected(null, function(tabs) {
	$.ajax('http://localhost:8080/api/stumble/v1/github?languages=' + langs).success(function(data) {
	  var url = data[getRandomIndex(data.length)]['url'];
		chrome.tabs.update(tabs.id, {
			url: url
		});
		$('.spinner').hide();
	});
});
```

Now navigate to the directory `api` in your terminal.

Execute the command `pub get` to gather all of the dependencies for the project.
Now execute the command `dart stumble.dart` to start the webserver on port `8080`.

Now you can install the extension through the Chrome extensions page. You do this by enabling developer mode within the [Chrome extensions](chrome://extensions) page, loading an unpacked extension, and selecting the `ext/` directory.

## How do I use it?
It's easy! Just navigate to any page on [GitHub](https://github.com) (even this one) and look up in your address bar. You should see a purple circle. Click that, and then the settings cog. After you set your language preferences, close the settings popup, and click `Git!`!. It will do some behind the scenes magic and take you to a random repository matching your interests! Pretty neat!

## This extension sucks, make it better!
Great! It could be better! Click that fork button in the top corner and submit a pull request!

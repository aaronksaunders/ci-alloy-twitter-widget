//
// Borrowed most of this code from the Alloy team from the creation of 
// the search for books widget
//
var HANDLERS = ['success', 'error'];

var handlers = {};

////////////////////////////////////
///////// public functions /////////
////////////////////////////////////
exports.setHandlers = function(args) {
	_.each(HANDLERS, function(h) {
		if (args[h]) {
			handlers[h] = args[h];
		}
	});
}

exports.loadTwitter = function(_options) {

	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			if (handlers.success) {
				processTwitterFeed(this.responseText);
			}
		},
		onerror : function(e) {
			if (handlers.error) {
				handlers.error(e);
			} else {
				alert('There was an error processing your search. Make sure you have a network connection and try again.');
				Ti.API.error('[ERROR] ' + (e.error || JSON.stringify(e)));
			}
		},
		timeout : 5000
	});

	if (_options.queryString) {
		xhr.open("GET", "http://search.twitter.com/search.json?q=" + escape(_options.queryString));
	} else if (_options.screenName) {
		xhr.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + escape(_options.screenName));
	}

	xhr.send();
}
///////////////////////////////////////
////////// private functions //////////
///////////////////////////////////////
function processTwitterFeed(data) {
	var tweets, tweets_model = [];

	// make sure the returned data is valid
	try {
		tweets = JSON.parse(data);
	} catch (e) {
		alert('Invalid response from server. Try again.');
		return;
	}

	// process each book, turning it into a table row
	for (var i = 0; i < tweets.length; i++) {

		var tweet = tweets[i].text;
		var user = (tweets[i].from_user_name || tweets[i].user.name);
		var avatar = (tweets[i].profile_image_url || tweets[i].user.profile_image_url);
		var created_at = ""; //moment(tweets[c].created_at).fromNow();
		tweets_model.push({
			tweet : tweet || '',
			user : user,
			avatar : avatar,
			created_at : created_at
		});
	}

	// fire success handler with list of tweets
	handlers.success(tweets_model);
}

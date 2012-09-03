//
// get the twitter widget by the id and set the callback handlers for
// the widget.
//
// when the widget successfully gets the tweets, we want to load them into
// the view we created
//
$.twitter_widget.setHandlers({
	success: function(tweets) {
		var data = [];
		
		
		//
		// loop thru each of the tweets that were returned
		// and create a row object.
		//
		// calling the row controller in this manner will execute
		// the code that exists in the js file thereby creating 
		// a row object for inserting into the table... 
		//
		// not sure i like this approach but we will go with it for now
		// 
		_.each(tweets, function(_tweet) {
			var row = Alloy.getController('row', {
				text: _tweet.tweet,
				user: _tweet.user,
				image: _tweet.avatar
			}).getView();
			data.push(row);
		});
		
		// 
		// update the table object with the rows we have created
		//
		$.table.setData(data);
	}
	// You can override error handling with the 'error' property
	// error: function(e) {
	// 	alert('ERROR: ' + e.error);
	// }
});

//
// here we load the twitter widget and call the exported method
// to load the latest tweets from ME!!
//
$.twitter_widget.loadTwitter({
	"screenName" : "aaronksaunders"
});

//
// open the window so we can see the magic happen
//
$.win.open();

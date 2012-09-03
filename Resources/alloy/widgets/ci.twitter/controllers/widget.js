function Controller() {
    function processTwitterFeed(data) {
        var tweets, tweets_model = [];
        try {
            tweets = JSON.parse(data);
        } catch (e) {
            alert("Invalid response from server. Try again.");
            return;
        }
        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i].text, user = tweets[i].from_user_name || tweets[i].user.name, avatar = tweets[i].profile_image_url || tweets[i].user.profile_image_url, created_at = "";
            tweets_model.push({
                tweet: tweet || "",
                user: user,
                avatar: avatar,
                created_at: created_at
            });
        }
        handlers.success(tweets_model);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    exports.setHandlers = function(args) {
        _.each(HANDLERS, function(h) {
            args[h] && (handlers[h] = args[h]);
        });
    }, exports.loadTwitter = function(_options) {
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                handlers.success && processTwitterFeed(this.responseText);
            },
            onerror: function(e) {
                handlers.error ? handlers.error(e) : (alert("There was an error processing your search. Make sure you have a network connection and try again."), Ti.API.error("[ERROR] " + (e.error || JSON.stringify(e))));
            },
            timeout: 5e3
        });
        _options.queryString ? xhr.open("GET", "http://search.twitter.com/search.json?q=" + escape(_options.queryString)) : _options.screenName && xhr.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + escape(_options.screenName)), xhr.send();
    }, $.__views.widget = A$(Ti.UI.createView({
        backgroundColor: "white",
        id: "widget"
    }), "View", null), $.addTopLevelView($.__views.widget), _.extend($, $.__views);
    var HANDLERS = [ "success", "error" ], handlers = {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;
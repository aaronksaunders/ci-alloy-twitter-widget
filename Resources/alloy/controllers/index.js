function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.win = A$(Ti.UI.createWindow({
        id: "win"
    }), "Window", null), $.addTopLevelView($.__views.win), $.__views.twitter_widget = Alloy.getWidget("ci.twitter", "widget", {
        id: "twitter_widget"
    }), $.__views.twitter_widget.setParent($.__views.win), $.__views.table = A$(Ti.UI.createTableView({
        id: "table"
    }), "TableView", $.__views.win), $.__views.win.add($.__views.table), _.extend($, $.__views), $.twitter_widget.setHandlers({
        success: function(tweets) {
            var data = [];
            _.each(tweets, function(_tweet) {
                var row = Alloy.getController("row", {
                    text: _tweet.tweet,
                    user: _tweet.user,
                    image: _tweet.avatar
                }).getView();
                data.push(row);
            }), $.table.setData(data);
        }
    }), $.twitter_widget.loadTwitter({
        screenName: "aaronksaunders"
    }), $.win.open(), _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;
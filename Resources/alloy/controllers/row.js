function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        className: "tweet_row",
        id: "row"
    }), "TableViewRow", null), $.addTopLevelView($.__views.row), $.__views.thumbnail = A$(Ti.UI.createImageView({
        width: "55dp",
        left: "5dp",
        top: "2dp",
        id: "thumbnail"
    }), "ImageView", $.__views.row), $.__views.row.add($.__views.thumbnail), $.__views.__alloyId0 = A$(Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId0"
    }), "View", $.__views.row), $.__views.row.add($.__views.__alloyId0), $.__views.user = A$(Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: "14dp"
        },
        top: "2dp",
        height: Ti.UI.SIZE,
        left: "65dp",
        right: "5dp",
        id: "user"
    }), "Label", $.__views.__alloyId0), $.__views.__alloyId0.add($.__views.user), $.__views.tweet = A$(Ti.UI.createLabel({
        color: "#333",
        font: {
            fontSize: "14dp"
        },
        top: "3dp",
        bottom: "2dp",
        height: Ti.UI.SIZE,
        left: "65dp",
        right: "5dp",
        id: "tweet"
    }), "Label", $.__views.__alloyId0), $.__views.__alloyId0.add($.__views.tweet), _.extend($, $.__views);
    var args = arguments[0] || {};
    $.thumbnail.image = args.image, $.user.text = args.user || "", $.tweet.text = args.text || "", _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;
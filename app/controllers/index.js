function done(e) {
	Alloy.createController('info').getView().open({
		transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
}

var push = require("push");

Ti.App.Properties.setInt('Int', 0);

if (Ti.App.Properties.getInt('Int') == 0) {

	push.pushSubscribe(function(callback) {
		if (callback == "Subscribed") {
			Ti.App.Properties.setInt('Int', 1);
		}
	});
}

$.index.open();

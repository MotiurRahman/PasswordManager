function done(e) {
	var db = require('loginDB');
	var pass = db.getinfo();
	if (pass.length >= 1) {

		var i = 0;
		for (; ; ) {
			if ($.pin.getValue() == pass[i].pass) {
				Alloy.createController('info').getView().open({
					transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
				});
				break;
			} else {
				alert('Pleaes provide a correct password!');
				break;
			}
			i++;
		}
	} else {
		alert('Please create a password');
	}

}

function onCreate(e) {
	var db = require('loginDB');
	var pass = db.getinfo().length;
	Ti.API.info("passwordLength:"+pass);
	if (pass > 1) {
		alert('You already have a password!');

	} else {
		Alloy.createController('login/login').getView().open({
			modal : true
		});
	}
}

function forgot() {
	Alloy.createController('login/forgot').getView().open({
		transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
}

// var push = require("push");
// 
// Ti.App.Properties.setInt('Int', 0);
// 
// if (Ti.App.Properties.getInt('Int') == 0) {
// 
	// push.pushSubscribe(function(callback) {
		// if (callback == "Subscribed") {
			// Ti.App.Properties.setInt('Int', 1);
			// Ti.API.info(Ti.App.Properties.getInt('Int'));
		// }
	// });
// }

$.index.open();

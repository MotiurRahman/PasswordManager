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
	Ti.API.info("passwordLength:" + pass);
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

if (Ti.Platform.osname == "android") {
	var push = require("push");
} else {
	var push = require("push_iOS");
}

if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
	Titanium.API.info(' no connection ');
} else {
	push.pushSubscribe();
}

$.index.open();

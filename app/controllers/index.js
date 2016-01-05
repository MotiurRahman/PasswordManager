function done(e) {
	var db = require('loginDB');
	var pass = db.getinfo();
	if (pass.length >= 1) {
		var i = 0;
		for (; ; ) {
			if ($.pin.getValue() == pass[i].pass) {

				if (OS_ANDROID) {

					Alloy.createController('info').getView().open();
				} else {
					Alloy.createController('info').getView().open({
						transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
					});
				}

				break;
			} else {

				if (OS_ANDROID) {
					var toast = Ti.UI.createNotification({
						message : 'Pleaes provide a correct password!',
						duration : Ti.UI.NOTIFICATION_DURATION_LONG
					});
					toast.show();
				} else {
					alert('Pleaes provide a correct password!');
				}

				break;
			}
			i++;
		}
	} else {

		if (OS_ANDROID) {
			var toast = Ti.UI.createNotification({
				message : 'Please create a password',
				duration : Ti.UI.NOTIFICATION_DURATION_LONG
			});
			toast.show();
		} else {
			alert('Please create a password!');
		}

	}
}

function onCreate(e) {
	var db = require('loginDB');
	var pass = db.getinfo().length;
	Ti.API.info("passwordLength:" + pass);
	if (pass > 1) {

		if (OS_ANDROID) {
			var toast = Ti.UI.createNotification({
				message : 'You already have a password!',
				duration : Ti.UI.NOTIFICATION_DURATION_LONG
			});
			toast.show();
		} else {
			alert('You already have a password!');
		}
	} else {
		Alloy.createController('login/login').getView().open({
			//modal : true
		});
	}
}

function forgot() {
	if (OS_ANDROID) {
		var forgot = Alloy.createController("login/forgot").getView().open({
			modal : true
		});

	} else {
		Alloy.createController('login/forgot').getView().open({
			transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	}

}

if (OS_ANDROID) {
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

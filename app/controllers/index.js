//Apple Login

if (OS_IOS) {

	var AppleSignIn = require('ti.applesignin');

	AppleSignIn.addEventListener('login', function(event) {
		if (!event.success) {
			alert(event.error);
			return;
		}

		Ti.API.warn(event);
	});

	var btn = AppleSignIn.createLoginButton({
		width : 280,
		height : 38
	});

	btn.addEventListener('click', function() {
		AppleSignIn.authorize();
	});
}

///Apple login end

function done(e) {
	var db = require('loginDB');
	var pass = db.getinfo();
	if (pass.length > 0) {
		if ($.pin.getValue() == pass[0].pass) {

			if (OS_ANDROID) {

				Alloy.createController('info').getView().open();
			} else {
				Alloy.createController('info').getView().open({
					transition : Ti.UI.iOS.AnimationStyle.FLIP_FROM_LEFT
				});
			}

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
	if (pass > 0) {

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
			transition : Ti.UI.iOS.AnimationStyle.FLIP_FROM_LEFT
		});
	}

}

if (OS_ANDROID) {
	var push = require("push_android");
} else {
	var push = require("push_iOS");
}
if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
	Titanium.API.info(' no connection ');
} else {
	push.pushSubscribe();
}
$.index.open();

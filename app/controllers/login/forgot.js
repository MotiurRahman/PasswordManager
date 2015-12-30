var args = arguments[0] || {};

var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview);

function emailSend(email, pass) {
	var Cloud = require('ti.cloud');
	Cloud.Emails.send({
		template : 'Welcome',
		recipients : email,
		password : pass
	}, function(e) {
		if (e.success) {

			var toast = Ti.UI.createNotification({
				message : 'Please check your mail for password',
				duration : Ti.UI.NOTIFICATION_DURATION_LONG
			});
			if (OS_ANDROID) {
				toast.show();
			} else {
				alert('Please check your mail for password');
			}
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			alert('Your forgot password:' + pass);
		}
	});
}

function send() {
	var db = require('loginDB');
	var pass = db.getinfo();

	if (pass.length == 0) {
		var toast = Ti.UI.createNotification({
			message : "You have no Account!",
			duration : Ti.UI.NOTIFICATION_DURATION_LONG
		});
		if (OS_ANDROID) {
			toast.show();
		} else {
			alert("You have no Account!");
		}
	} else {

		var i = 0;
		for (; ; ) {
			if ($.txt_email.getValue() == pass[i].email) {
				if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
					var toast = Ti.UI.createNotification({
						message : "Please connect to the internet!",
						duration : Ti.UI.NOTIFICATION_DURATION_LONG
					});
					if (OS_ANDROID) {
						toast.show();
					} else {
						alert("Please connect to the internet!");
					}

				} else {
					emailSend(pass[i].email, pass[i].pass);
				}

				break;
			} else {
				alert('Email Does not found!');
				break;
			}
			i++;
		}
	}

}

function back() {
	$.settingWin.close();
}


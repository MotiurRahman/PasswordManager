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

			if (OS_ANDROID) {
				var toast = Ti.UI.createNotification({
					message : 'Please check your mail for password',
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				});
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

	//alert(pass[0].email + '\n' + pass[1].pass);

	if (pass.length == 0) {

		if (OS_ANDROID) {
			var toast = Ti.UI.createNotification({
				message : "You have no Account!",
				duration : Ti.UI.NOTIFICATION_DURATION_LONG
			});
			toast.show();
		} else {
			alert("You have no Account!");
		}
	} else {
		if ($.txt_email.getValue() == "") {
			if (OS_ANDROID) {
				var toast = Ti.UI.createNotification({
					message : "Please write your mail!",
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				});
				toast.show();
			} else {
				alert("Please write your mail!");
			}
		} else {

			switch($.txt_email.getValue()) {
			case pass[0].email:
				if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {

					if (OS_ANDROID) {
						var toast = Ti.UI.createNotification({
							message : "Please connect to the internet!",
							duration : Ti.UI.NOTIFICATION_DURATION_LONG
						});
						toast.show();
					} else {
						alert("Please connect to the internet!");
					}

				} else {
					emailSend(pass[0].email, pass[0].pass);
				}
				break;
			case pass[1].email:
				if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {

					if (OS_ANDROID) {
						var toast = Ti.UI.createNotification({
							message : "Please connect to the internet!",
							duration : Ti.UI.NOTIFICATION_DURATION_LONG
						});
						toast.show();
					} else {
						alert("Please connect to the internet!");
					}

				} else {
					emailSend(pass[1].email, pass[1].pass);
				}
				break;
			default:
				if (OS_ANDROID) {
					var toast = Ti.UI.createNotification({
						message : "Email Does not Match!",
						duration : Ti.UI.NOTIFICATION_DURATION_LONG
					});
					toast.show();
				} else {
					alert("Email Does not Match!");
				}

			}
		}
	}

}

function back() {
	$.settingWin.close();
}


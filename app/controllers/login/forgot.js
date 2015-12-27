var args = arguments[0] || {};

var ad = require('admob');

var addview;
if (Ti.Platform.osname === "android") {
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
			alert('Please check your mail for password');
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			alert('Your forgot password:' + pass);
		}
	});
}

function send() {
	var db = require('loginDB');
	var pass = db.getinfo();

	var i = 0;
	for (; ; ) {
		if ($.txt_email.getValue() == pass[i].email) {
			if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
				alert(' No internet connection ');
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

function back() {
	$.settingWin.close();
}


var args = arguments[0] || {};

var ad = require('admob');

var addview;
if (Ti.Platform.osname == 'android') {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview);

function submit() {
	var db = require('loginDB');

	var pass = db.getinfo();
	if (pass.length >= 1) {

		var i = 0;
		for (; ; ) {
			if ($.cur_pass.getValue() == pass[i].pass) {

				if ($.new_pass.getValue() == $.re_pass.getValue()) {

					db.updatePass($.new_pass.getValue(), pass[i].id);
					$.cur_pass.setValue("");
					$.new_pass.setValue("");
					$.re_pass.setValue("");
					$.settingWin.close();

				} else {
					alert('password does not match');
				}
				break;
			} else {
				alert('Pleaes provide a correct password!');
				break;
			}
			i++;
		}
	}

}

function back() {
	$.settingWin.close();
}

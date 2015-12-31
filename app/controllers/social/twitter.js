var args = arguments[0] || {};

var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview);

function send() {
	var twite = $.txt_twitt.getValue();
	var contentLink = "https://play.google.com/store/apps/details?id=com.bd.PasswordManager";
	var twiter = require('socialShare');
	twiter.twiterShare(contentLink, twite, function(callback) {
		alert(callback);
		$.txt_twitt.setValue("");
		$.settingWin.close();
	});

}

function back() {
	$.settingWin.close();
}


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
	var title = $.txt_comment.getValue();

	if (title == "") {
		alert("please write something.");
	} else {

		//var contentLink = "https://play.google.com/store/apps/details?id=com.bd.PasswordManager";
		var facebookDialog = require('socialShare');
		facebookDialog.facebookShare(title, function(callback) {
			alert(callback);
			$.txt_comment.setValue("");
			$.facebookWin.close();
		});

	}
}

function back() {
	$.facebookWin.close();
}


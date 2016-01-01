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
	var linkdin = $.txt_comment.getValue();
	if (linkdin == '') {
		alert("Please write something.");

	} else {

		//var contentLink = "https://play.google.com/store/apps/details?id=com.bd.PasswordManager";
		var link = require('socialShare');
		link.linkdinShare(linkdin, function(callback) {
			alert(callback);
			$.txt_comment.setValue("");
			$.linkdinWin.close();
		});
	}

}

function back() {
	$.linkdinWin.close();
}


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
	if (twite == "") {
		alert('Please write something.');
	} else {

		var twiter = require('socialShare');
		twiter.twiterShare(twite, function(callback) {
			alert(callback);
			$.txt_twitt.setValue("");
			$.twitterWin.close();
		});
	}

}

function back() {
	$.twitterWin.close();
}


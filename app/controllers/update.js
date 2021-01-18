var args = arguments[0] || {};
//alert(args.title);


/*
var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview);
*/ 


$.txt_title.value = args.title;
$.txt_email.value = args.email;
$.txt_pass.value = args.pass;
$.txt_url.value = args.url;
$.txt_account.value = args.account;
$.txt_pin.value = args.pin;

function back() {

	if (OS_ANDROID) {
		$.updateWin.close();
	} else {
		$.updateWin.close({
			transition : Ti.UI.iOS.AnimationStyle.FLIP_FROM_RIGHT
		});
	}

	$.off();
	$.destroy();

}

function update() {
	var db = require('db');

	db.updateinfo($.txt_title.value, $.txt_email.value, $.txt_pass.value, $.txt_account.value, $.txt_pin.value, $.txt_url.value, args.id);
	Alloy.Events.trigger('updateMainUI');
	$.updateWin.close();
	$.updateWin = null;
}

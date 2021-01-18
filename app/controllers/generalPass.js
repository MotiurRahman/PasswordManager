var args = arguments[0] || {};

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


function save() {
	var db = require('db');
	if ($.txt_title.value == '' || $.txt_pass.value == '') {

		alert('Pleae fill up minimum requirement');
	} else {

		db.add($.txt_title.value, $.txt_email.value, $.txt_pass.value, $.txt_account.value, $.txt_pin.value, $.txt_url.value, function(_callBacl) {
			if (_callBacl == 'success') {
				//alert(_callBacl);
				$.txt_title.value = '';
				$.txt_email.value = '';
				$.txt_pass.value = '';
				$.txt_url.value = '';
				$.txt_account.value = '';
				$.txt_pin.value = '';
				//Ti.App.fireEvent('update');
				Alloy.Events.trigger('updateMainUI');
				// $.genWin.close({
				// transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
				// });
				$.genWin.close();
				$.genWin == null;

			}

		});

	}

}

//
function back() {
	// $.genWin.close({
	// transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
	// });
	$.genWin.close();
	$.off();
	$.destroy();
}

//

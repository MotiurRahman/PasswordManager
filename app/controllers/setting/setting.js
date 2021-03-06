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
function submit() {
	var db = require('loginDB');
	var pass = db.getinfo();
	if (pass.length >= 1) {
		var i = 0;
		for (; ; ) {
			if ($.cur_pass.value == pass[i].pass) {
				if ($.new_pass.value == $.re_pass.value) {
					db.updatePass($.new_pass.getValue(), pass[i].id);
					$.cur_pass.value = "";
					$.new_pass.value = "";
					$.re_pass.value = "";
					$.settingWin.close();
					if (OS_ANDROID) {
						var toast = Ti.UI.createNotification({
							message : 'Password has been changed successfully',
							duration : Ti.UI.NOTIFICATION_DURATION_LONG
						});
						toast.show();
						setTimeout(function() {
							Ti.App._restart();
						}, 100);
					} else {
						var dialog = Ti.UI.createAlertDialog({
							message : 'Your Password has been changed successfully',
							ok : 'OK',
							cancel : 0,
						});
						dialog.addEventListener('click', function(e) {
							setTimeout(function() {
								Ti.App._restart();
							}, 100);
						});
						dialog.show();
					}
				} else {
					if (OS_ANDROID) {
						var toast = Ti.UI.createNotification({
							message : 'password does not match',
							duration : Ti.UI.NOTIFICATION_DURATION_LONG
						});
						toast.show();
					} else {
						alert('password does not match');
					}
				}
				break;
			} else {
				if (OS_ANDROID) {
					var toast = Ti.UI.createNotification({
						message : 'Pleaes provide a correct password!',
						duration : Ti.UI.NOTIFICATION_DURATION_LONG
					});
					toast.show();
				} else {
					alert('Pleaes provide a correct password!');
				}
				break;
			}
			i++;
		}
	}
}

function back() {
	$.settingWin.close();
	$.off();
	$.destroy();
}

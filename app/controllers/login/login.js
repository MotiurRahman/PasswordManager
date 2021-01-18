var args = arguments[0] || {};

function save() {
	var db = require('loginDB');
	function checkEmail() {

		var email = $.txt_email.value;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!filter.test(email)) {

			if (OS_ANDROID) {
				var toast = Ti.UI.createNotification({
					message : 'Please provide a valid email address',
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				});
				toast.show();
			} else {
				alert('Please provide a valid email address');
			}

			return false;
		} else {
			return true;
		}
	}

	if ($.txt_newPass.value == '' || $.txt_email.value == '' || $.re_pass.value == '') {

		if (OS_ANDROID) {
			var toast = Ti.UI.createNotification({
				message : 'Pleae fill up minimum requirement',
				duration : Ti.UI.NOTIFICATION_DURATION_LONG
			});
			toast.show();
		} else {
			alert('Pleae fill up minimum requirement');
		}

	} else {

		if ($.txt_newPass.value== $.re_pass.value) {

			if (checkEmail() == true) {

				db.add($.txt_newPass.value, $.txt_email.value, function(e) {
					if (e == 'success') {
						$.txt_newPass.valu = "";
						$.re_pass.value = "";
						$.txt_email.value = "";

						if (OS_ANDROID) {
							var toast = Ti.UI.createNotification({
								message : 'Password create Successfully',
								duration : Ti.UI.NOTIFICATION_DURATION_LONG
							});
							toast.show();
						} else {
							alert('Password create Successfully');
						}
					}

					$.loginWin.close();
					$.loginWin == null;

				});
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

	}
}

function back() {
	$.loginWin.close();
	$.off();
	$.destroy();
}

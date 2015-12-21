var args = arguments[0] || {};

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

			emailSend(pass[i].email, pass[i].pass);
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


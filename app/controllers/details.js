var args = arguments[0] || {};

//alert("Title:"+args.title);

$.title.setText('Title: ' + args.title);
$.email.setText('Email: ' + args.email);
$.pass.setText('Password: ' + args.pass);
$.site.setText('URL: ' + args.url);
$.account.setText('Account: ' + args.account);
$.pin.setText('Pin: ' + args.pin);

function close() {
	$.detailWin.close();
	$.detailWin = null;
}

function update() {
	$.detailWin.close();
	$.detailWin = null;
}

function deleteBtn() {
	var db = require('db');

	db.deletinfo(args.id);
	Ti.App.fireEvent('refresh');
	$.detailWin.close();
	$.detailWin = null;
}


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

//alert("Title:"+args.title);

$.title.text = "Title: " + args.title;
$.email.text = "Email: " + args.email;
$.pass.text = "Password: " + args.pass;
$.site.text = "URL:" + "https://" + args.url;
$.account.text = "Account: " + args.account;
$.pin.text = "Pin: " + args.pin;

var mailURL = "https://" + args.url;

function openURL() {
  Ti.Platform.openURL(mailURL);
}

function close() {
  $.detailWin.close();
  $.off();
  $.destroy();
}

function update() {
  $.detailWin.close();
  $.off();
  $.destroy();
 
  Alloy.createController("update", args).getView().open();

}

function deleteBtn() {
  var db = require("db");
  var dialog = Ti.UI.createAlertDialog({
    buttonNames: [
      "Confirm", "Cancel"
    ],
    message: "Would you like to delete the file?",
    title: "Delete"
  });
  dialog.addEventListener("click", function (e) {
    if (e.index === 0) {
      db.deletinfo(args.id);
      Alloy.Events.trigger("updateMainUI");
      $.detailWin.close();
      $.detailWin = null;
    }
  });
  dialog.show();
}

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

$.title.text = args.title || "Details";
$.desc.text = args.desc || "-";
$.email.text = args.email || "-";
$.pass.text = args.pass || "-";
$.account.text = args.account || "-";
$.pin.text = args.pin || "-";
$.site.text = "https://" + (args.url || "");

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
    buttonNames: ["Confirm", "Cancel"],
    message: "Would you like to delete the file?",
    title: "Delete",
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

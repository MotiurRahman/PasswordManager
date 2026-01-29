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

$.title_name.attributedString = Ti.UI.createAttributedString({
  text: "Title Name *",
  attributes: [
    {
      type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
      value: "#ffffff",
      range: [0, 10], // "Title Name"
    },
    {
      type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
      value: "red",
      range: [11, 1], // "*"
    },
  ],
});

$.desc.attributedString = Ti.UI.createAttributedString({
  text: "Description *",
  attributes: [
    {
      type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
      value: "#ffffff",
      range: [0, 11], // "Title Name"
    },
    {
      type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
      value: "red",
      range: [12, 1], // "*"
    },
  ],
});

$.txt_title.value = args.title;
$.txt_desc.value = args.desc;
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
      transition: Ti.UI.iOS.AnimationStyle.FLIP_FROM_RIGHT,
    });
  }

  $.off();
  $.destroy();
}

function update() {
  var db = require("db");

  db.updateinfo(
    $.txt_title.value,
    $.txt_desc.value,
    $.txt_email.value,
    $.txt_pass.value,
    $.txt_account.value,
    $.txt_pin.value,
    $.txt_url.value,
    args.id,
  );
  Alloy.Events.trigger("updateMainUI");
  $.updateWin.close();
  $.updateWin = null;
}

function hideKeyboard(e) {
  // Don't hide if user taps inside inputs or button
  var name = e && e.source && e.source.apiName ? e.source.apiName : "";

  if (
    name === "Ti.UI.TextField" ||
    name === "Ti.UI.TextArea" ||
    name === "Ti.UI.Button"
  ) {
    return;
  }

  // Blur all fields
  $.txt_title.blur();
  $.txt_desc.blur();
  $.txt_email.blur();
  $.txt_pass.blur();
  $.txt_account.blur();
  $.txt_pin.blur();
  $.txt_url.blur();
}

// Tap anywhere in window to hide keyboard
$.updateWin.addEventListener("click", hideKeyboard);

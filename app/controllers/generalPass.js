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

function save() {
  var db = require("db");
  if ($.txt_title.value == "" || $.txt_desc.value == "") {
    alert("Please fill up minimum requirement");
  } else {
    db.add(
      $.txt_title.value,
      $.txt_desc.value,
      $.txt_email.value,
      $.txt_pass.value,
      $.txt_account.value,
      $.txt_pin.value,
      $.txt_url.value,
      function (_callBacl) {
        if (_callBacl == "success") {
          //alert(_callBacl);
          $.txt_title.value = "";
          $.txt_desc.value = "";
          $.txt_email.value = "";
          $.txt_pass.value = "";
          $.txt_url.value = "";
          $.txt_account.value = "";
          $.txt_pin.value = "";
          //Ti.App.fireEvent('update');
          Alloy.Events.trigger("updateMainUI");
          // $.genWin.close({
          // transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
          // });
          $.genWin.close();
          $.genWin == null;
        }
      },
    );
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
$.genWin.addEventListener("click", hideKeyboard);

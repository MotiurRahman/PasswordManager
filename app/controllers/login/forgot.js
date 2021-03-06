var args = arguments[0] || {};

// Create a Label.
var sending = Ti.UI.createLabel({
  text: "Mail Sending ........",
  color: "green",
  font: {
    fontSize: 20
  },
  top: 20,
  height: Ti.UI.SIZE,
  width: Ti.UI.SIZE
});

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

function emailSend(email, pass) {
  var Cloud = require("ti.cloud");
  Cloud.Emails.send({
    template: "Welcome",
    recipients: email,
    password: pass
  }, function (e) {
    if (e.success) {
      $.overlayIndicator.hide();
      $.vwOverlayCont.visible = false;
      if (OS_ANDROID) {
        $.txt_email.setValue("");
        $.txt_email.blur();
        var toast = Ti.UI.createNotification({message: "Please check your mail for password", duration: Ti.UI.NOTIFICATION_DURATION_LONG});
        //toast.show();
        sending.text = "Please check your mail for password";
      } else {
        $.txt_email.setValue("");
        $.txt_email.blur();
        sending.text = "Please check your mail for password";
        //alert('Please check your mail for password');
      }
    } else {
      $.overlayIndicator.hide();
      $.vwOverlayCont.visible = false;
      $.txt_email.setValue("");
      $.txt_email.blur();
      sending.text = "Your forgot password:" + pass;
      //alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
      //alert('Your forgot password:' + pass);
    }
  });
}

function send() {
  $.txt_email.blur();
  $.overlayIndicator.show();
  $.vwOverlayCont.visible = true;

  var db = require("loginDB");
  var pass = db.getinfo();

  //alert(pass[0].email + '\n' + pass[1].pass);

  if (pass.length == 0) {
    $.overlayIndicator.hide();
    $.vwOverlayCont.visible = false;
    if (OS_ANDROID) {
      var toast = Ti.UI.createNotification({message: "You have no Account!", duration: Ti.UI.NOTIFICATION_DURATION_LONG});
      toast.show();
    } else {
      alert("You have no Account!");
    }
  } else {
    if ($.txt_email.value == "") {
      $.overlayIndicator.hide();
      $.vwOverlayCont.visible = false;
      if (OS_ANDROID) {
        var toast = Ti.UI.createNotification({message: "Please enter your mail address!", duration: Ti.UI.NOTIFICATION_DURATION_LONG});
        toast.show();
      } else {
        alert("Please enter your mail address!");
      }
    } else {
      switch ($.txt_email.value) {
        case pass[0].email:
          if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            if (OS_ANDROID) {
              var toast = Ti.UI.createNotification({message: "Please connect to the internet!", duration: Ti.UI.NOTIFICATION_DURATION_LONG});
              toast.show();
            } else {
              $.txt_email.blur();
              alert("Please connect to the internet!");
            }
          } else {
            // Add to the parent view.
            $.txt_email.blur();
            $.mainView.add(sending);
            emailSend(pass[0].email, pass[0].pass);
          }
          break;

        default:
          $.overlayIndicator.hide();
          $.vwOverlayCont.visible = false;
          if (OS_ANDROID) {
            var toast = Ti.UI.createNotification({message: "Email Does not Match!", duration: Ti.UI.NOTIFICATION_DURATION_LONG});
            toast.show();
          } else {
            $.txt_email.blur();
            alert("Email Does not Match!");
          }
      }
    }
  }
}

function back() {
  $.settingWin.close();
  $.off();
  $.destroy();
}

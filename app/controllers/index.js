function done(e) {
  var db = require("loginDB");
  var pass = db.getinfo();

  if (pass.length > 0) {
    if ($.pin.value == pass[0].pass) {
      // ✅ remember login
      Ti.App.Properties.setBool("isLoggedIn", true);

      openInfo();
    } else {
      showMsg("Please provide a correct password!");
    }
  } else {
    showMsg("Please create a password!");
  }
}

function openInfo() {
  if (OS_ANDROID) {
    Alloy.createController("info").getView().open();
  } else {
    Alloy.createController("info").getView().open({
      transition: Ti.UI.iOS.AnimationStyle.FLIP_FROM_LEFT,
    });
  }
}

function showMsg(msg) {
  if (OS_ANDROID) {
    Ti.UI.createNotification({
      message: msg,
      duration: Ti.UI.NOTIFICATION_DURATION_LONG,
    }).show();
  } else {
    alert(msg);
  }
}

function onCreate(e) {
  var db = require("loginDB");
  var pass = db.getinfo().length;
  Ti.API.info("passwordLength:" + pass);
  if (pass > 0) {
    if (OS_ANDROID) {
      var toast = Ti.UI.createNotification({
        message: "You already have a password!",
        duration: Ti.UI.NOTIFICATION_DURATION_LONG,
      });
      toast.show();
    } else {
      alert("You already have a password!");
    }
  } else {
    Alloy.createController("login/login").getView().open({
      //modal : true
    });
  }
}

// function forgot() {
//   if (OS_ANDROID) {
//     var forgot = Alloy.createController("login/forgot").getView().open({modal: true});
//   } else {
//     Alloy.createController("login/forgot").getView().open({transition: Ti.UI.iOS.AnimationStyle.FLIP_FROM_LEFT});
//   }
// }

if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
  Titanium.API.info(" no connection ");
} else {
  if (OS_ANDROID) {
    //  var FirebaseCore = require("firebase.core");
    var FirebaseCloudMessaging = require("firebase.cloudmessaging");
    // FirebaseCore.configure();
    FirebaseCloudMessaging.registerForPushNotifications();
    //   Subscribe to topic
    //   FirebaseCloudMessaging.subcribeToTopic("titanium");
  }
}
var alreadyLoggedIn = Ti.App.Properties.getBool("isLoggedIn", false);

if (alreadyLoggedIn) {
  openInfo();
} else {
  $.index.open();
}

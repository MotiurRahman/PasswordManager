// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//com.bd.PasswordManager

Alloy.Events = _.clone(Backbone.Events);

if (!OS_IOS) {
  const inappUpdate = require("ti.inappupdate");

  inappUpdate.addEventListener("update", function (e) {
    console.log("Has update", e.update);
    if (e.update) {
      inappUpdate.startUpdate();
    }
  });
  inappUpdate.checkForUpdate();

  inappUpdate.addEventListener("resume", function (e) {
    console.log("resuming update");
  });
  inappUpdate.addEventListener("error", function (e) {
    console.log(e);
  });

  inappUpdate.addEventListener("done", function (e) {
    console.log("done");
  });
} else {
  require("/checkAppUpdate").checkAppUpdate();
}

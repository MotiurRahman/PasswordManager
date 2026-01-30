exports.checkAppUpdate = function () {
  function isNewerVersion(latest, current) {
    // Normalize (e.g., "2.2" -> "2.2.0"); compare piece-by-piece as numbers
    var l = (latest || "")
      .trim()
      .split(".")
      .map(function (x) {
        return parseInt(x, 10) || 0;
      });
    var c = (current || "")
      .trim()
      .split(".")
      .map(function (x) {
        return parseInt(x, 10) || 0;
      });

    var len = Math.max(l.length, c.length);
    for (var i = 0; i < len; i++) {
      var li = l[i] || 0;
      var ci = c[i] || 0;
      if (li > ci) return true;
      if (li < ci) return false;
    }
    return false; // equal or current is newer
  }

  var client = Ti.Network.createHTTPClient({
    onload: function () {
      try {
        var response = JSON.parse(this.responseText);
        if (
          !response ||
          !response.resultCount ||
          !response.results ||
          !response.results.length
        ) {
          Ti.API.warn(
            "App Store lookup returned no results for bundleId=" + Ti.App.id,
          );
          return;
        }

        var app = response.results[0];
        var latestVersion = app.version; // e.g., "2.2.26"
        var trackViewUrl = app.trackViewUrl; // App Store page

        var currentVersion = Ti.App.version; // e.g., "2.2.25"
        // logger.log("latestVersion", latestVersion);
        // logger.log("trackViewUrl", trackViewUrl);
        // logger.log("currentVersion", currentVersion);

        if (latestVersion && isNewerVersion(latestVersion, currentVersion)) {
          var dialog = Ti.UI.createAlertDialog({
            title: "Update Available",
            message:
              "A new version (" +
              latestVersion +
              ") is available. Please update to continue.",
            buttonNames: ["Update", "Later"],
            cancel: 1,
          });
          dialog.addEventListener("click", function (e) {
            if (e.index === 0 && trackViewUrl) {
              Ti.Platform.openURL(trackViewUrl);
            }
          });
          dialog.show();
        }
      } catch (err) {
        Ti.API.error("Error parsing update info: " + err);
      }
    },
    onerror: function (e) {
      Ti.API.error("Update check failed: " + e.error);
    },
    timeout: 5000,
  });

  // Use encodeURIComponent for safety
  var url =
    "https://itunes.apple.com/lookup?bundleId=" + encodeURIComponent(Ti.App.id);
  client.open("GET", url);
  client.send();
};

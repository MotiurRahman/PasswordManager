// Require the module
exports.pushSubscribe = function(_callback) {
	var Cloud = require("ti.cloud");
	var deviceToken = null;

	if (Ti.Platform.osname === "android") {
		var CloudPush = require('ti.cloudpush');

		// Initialize the module
		CloudPush.retrieveDeviceToken({
			success : deviceTokenSuccess,
			error : deviceTokenError
		});
		// Enable push notifications for this device
		// Save the device token for subsequent API calls
		function deviceTokenSuccess(e) {
			deviceToken = e.deviceToken;
		}

		function deviceTokenError(e) {
			alert('Failed to register for push notifications! ' + e.error);
		}

		// Process incoming push notifications
		CloudPush.addEventListener('callback', function(evt) {
			alert("Notification received: " + evt.payload);
		});

	} else {
		if (Ti.Platform.name == "iphone" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
			alert('test');
			// Wait for user settings to be registered before registering for push notifications
			Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {

				// Remove event listener once registered for push notifications
				Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);

				Ti.Network.registerForPushNotifications({
					success : deviceTokenSuccess,
					error : deviceTokenError,
					callback : receivePush
				});
			});

			// Register notification types to use
			Ti.App.iOS.registerUserNotificationSettings({
				types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
			});
		}

		// For iOS 7 and earlier
		else {
			Ti.Network.registerForPushNotifications({
				// Specifies which notifications to receive
				types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
				success : deviceTokenSuccess,
				error : deviceTokenError,
				callback : receivePush
			});
		}
	}

	// Check if the device is running iOS 8 or later

	// Process incoming push notifications
	function receivePush(e) {
		alert('Received push: ' + JSON.stringify(e));
	}

	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
		deviceToken = e.deviceToken;
		alert(deviceToken);
	}

	function deviceTokenError(e) {
		alert('Failed to register for push notifications! ' + e.error);
	}

	function subscribeToChannel() {
		// Subscribes the device to the 'news_alerts' channel
		// Specify the push type as either 'android' for Android or 'ios' for iOS
		Cloud.PushNotifications.subscribeToken({
			device_token : deviceToken,
			channel : 'update_alart',
			type : Ti.Platform.name == 'android' ? 'android' : 'ios'
		}, function(e) {
			if (e.success) {
				alert('Subscribed');
				callback("Subscribed");
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}


	Cloud.Users.login({
		login : 'motiur.mbstu@gmail.com',
		password : '1234'
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			alert('Success:\n' + 'id: ' + user.id + '\n' + 'sessionId: ' + Cloud.sessionId + '\n' + 'first name: ' + user.first_name + '\n' + 'last name: ' + user.last_name);
			subscribeToChannel();
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

};

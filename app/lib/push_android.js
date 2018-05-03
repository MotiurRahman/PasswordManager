// Require the module
exports.pushSubscribe = function() {
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
			Ti.API.info('Failed to register for push notifications! ' + e.error);
		}

		// Process incoming push notifications
		CloudPush.addEventListener('callback', function(evt) {
			Ti.API.info("Notification received: " + evt.payload);
		});

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
				Ti.API.info('Subscribed');

			} else {
				Ti.API.info('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}


	Cloud.Users.login({
		login : 'motiur.mbstu@gmail.com',
		password : '1234'
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			('Success:\n' + 'id: ' + user.id + '\n' + 'sessionId: ' + Cloud.sessionId + '\n' + 'first name: ' + user.first_name + '\n' + 'last name: ' + user.last_name);
			subscribeToChannel();
		} else {
			Ti.API.info('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

};

exports.twiterShare = function(contentLink,tweet,callback) {
	

	var social = require('alloy/social');

	var twitt = social.create({
		consumerSecret : 'R1nZWFNWH1fH6BibTQYtzQQClaT0zqYGReIIchcIpPO6rE3ycY',
		consumerKey : 'vWJ43JxWN070GnvkdJWMrUpaw'
	});

	// If not authorized, get authorization from the user

	if (!twitt.isAuthorized()) {
		twitt.authorize();
	}

	twitt.share({
		message : tweet+'\n'+"PasswordManager:"+contentLink,
		success : function(e) {
			callback('tweeted!');
		},
		error : function(e) {
			callback('Error!');
		}
	});

	// Deauthorize the application
	//twitt.deauthorize();

};

exports.facebookShrare = function() {

};

exports.linkdinShare = function() {
	var social = require('social');
	var linkedin = social.create({
		consumerSecret : "zE9vCtP6FxTlhqGt",
		consumerKey : "755nw0qgrlyvrx",
		site : 'linkedin'
	});
	linkedin.authorize();
	messageContent = {
		"comment" : "Android Mobile Application",
		"content" : {
			"title" : "Password Manager",
			"submitted_url" : "https://play.google.com/store/apps/details?id=com.bd.PasswordManager",
			"description" : "This App can save and show general and bank account information easily."
		},
		"visibility" : {
			"code" : "anyone"
		}
	};
	linkedin.shareToLinkedin({
		message : messageContent,
		success : function() {
			alert("Linkedin Posted Successfully");
		},
		error : function() {
			alert("Error while posting");
		}
	});
};

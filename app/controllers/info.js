var controls = require('controls');

// get main and menu view as objects
var menuView = controls.getMenuView();
var mainView = controls.getMainView();

// attach event listener to menu button
mainView.menuButtonLeft.add(controls.getMenuButtonLeft({
	h : '80',
	w : '80'
}));

mainView.menuButtonRight.add(controls.getMenuButtonRight({
	h : '80',
	w : '80'
}));

//Minor changes to click event. Update the menuOpen status;
mainView.menuButtonLeft.addEventListener('click', function() {
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen = !$.drawermenu.menuOpen;
});
// method is exposed by widget

mainView.menuButtonRight.addEventListener('click', function() {
	// Alloy.createController('option').getView().open();
	//$.options.show();
	//alert(data);
	if (OS_ANDROID) {
		Alloy.createController('generalPass').getView().open();
	} else {
		Alloy.createController('generalPass').getView().open({
			transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	}

});
// method is exposed by widget

// get config view as objects
var configView = controls.getConfigView();

//add menu view to ConfigView exposed by widget
configView.menuButton.add(controls.getMenuButtonLeft({
	h : '60',
	w : '60'
}));

//Minor changes to click event. Update the menuOpen status;
configView.menuButton.addEventListener('click', function() {
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen = !$.drawermenu.menuOpen;
});
// method is exposed by widget

$.drawermenu.init({
	menuview : menuView.getView(),
	mainview : mainView.getView(),
	duration : 200,
	parent : $.win
});

//variable to controler de open/close slide
var activeView = 1;

// add event listener in this context
menuView.menuTable.addEventListener('click', function(e) {
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen = false;
	//update menuOpen status to prevent inconsistency.
	switch(e.rowData.id) {
	case "about":
		Alloy.createController('about/about').getView().open({
			modal : true
		});
		if (activeView != 1) {
			//$.drawermenu.drawermainview.remove(configView.getView());

			activeView = 1;
		} else {
			activeView = 1;
		}
		break;
	case "settings":
		Alloy.createController('setting/setting').getView().open({
			modal : true
		});
		if (activeView != 2) {
			//$.drawermenu.drawermainview.add(configView.getView());
			activeView = 2;
		} else {
			activeView = 2;
		}
		break;
	case "fb":

		if (activeView != 2) {
			//$.drawermenu.drawermainview.add(configView.getView());
			activeView = 2;
		} else {
			activeView = 2;
		}
		break;
	case "twitter":
		Alloy.createController('/social/twitter').getView().open();
	
		if (activeView != 2) {
			//$.drawermenu.drawermainview.add(configView.getView());
			activeView = 2;
		} else {
			activeView = 2;
		}
		break;
	case "linkdin":

		var linkDin = require('socialShare');
		linkDin.linkdinShare();

		if (activeView != 2) {
			//$.drawermenu.drawermainview.add(configView.getView());
			activeView = 2;
		} else {
			activeView = 2;
		}
		break;
	case "rate":
		if (OS_ANDROID) {
			Ti.Platform.openURL("market://details?id=com.bd.PasswordManager");
		}

		if (activeView != 2) {
			//$.drawermenu.drawermainview.add(configView.getView());
			activeView = 2;
		} else {
			activeView = 2;
		}
		break;
	}

	// on Android the event is received by the label, so watch out!
	Ti.API.info(e.rowData.id);
});

$.win.addEventListener('androidback', function() {
	var dialog = Ti.UI.createAlertDialog({
		buttonNames : ['Confirm', 'Cancel'],
		message : 'Would you like to exit this App',
		title : 'Exit'
	});
	dialog.addEventListener('click', function(e) {
		if (e.index === 0) {
			Alloy.Events.off('updateMainUI');
			$.win.close();

		}

	});
	dialog.show();
});


function refresh() {

	var db = require('db');

	var items = [];

	var data = db.getinfo();

	for (var i = 0; i < data.length; i++) {
		Ti.API.info(data[i].title);
		items.push({
			properties : {
				id : data[i].id,
				title : data[i].title,
				pass : data[i].email,
				email : data[i].pass,
				account : data[i].account,
				pin : data[i].pin,
				url : data[i].url,
				searchableText : data[i].title,
				font : {
					fontSize : 25

				},
				color : (OS_ANDROID) ? "#fff" : "#000"

			}
		});

	}

	$.elementsList.sections[0].setItems(items);
}

refresh();

//Ti.App.addEventListener('update', refresh);
Alloy.Events.on('updateMainUI', refresh);

var ad = require('admob');

var addview;
if (OS_ANDROID) {
	addview = ad.addMob_android();
} else {
	addview = ad.addMob_iOS();
}

$.adView.add(addview);

$.elementsList.addEventListener('itemclick', function(e) {
	var section = $.elementsList.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	var data = {
		id : item.properties.id,
		title : item.properties.title,
		pass : item.properties.pass,
		email : item.properties.email,
		account : item.properties.account,
		pin : item.properties.pin,
		url : item.properties.url,

	};
	Alloy.createController('details', data).getView().open({
		modal : true
	});

});



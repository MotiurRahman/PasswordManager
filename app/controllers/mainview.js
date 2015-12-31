function refresh() {

	var db = require('db');

	var items = [];

	var data = db.getinfo();

	function heightValue() {
		var osname = Ti.Platform.osname,
		    version = Ti.Platform.version,
		    height = Ti.Platform.displayCaps.platformHeight,
		    width = Ti.Platform.displayCaps.platformWidth;

		//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
		//yourself what you consider a tablet form factor for android
		var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

		var rowHeight;

		if (isTablet) {
			rowHeight = 80;
		} else {
			rowHeight = 50;
		}

		return rowHeight;
	}

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
				//height : heightValue(),
				color : (OS_ANDROID) ? "#fff" : "#000",

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


var args = arguments[0] || {};

function back() {
	$.win3.close({
		transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
	});
}
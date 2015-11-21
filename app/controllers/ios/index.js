function done(e) {
     Alloy.createController('info').getView().open({
        transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    });
}

$.index.open();
 
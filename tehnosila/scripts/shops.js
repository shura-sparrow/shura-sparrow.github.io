// for demo
var stores = [{"coord":[55.870447,37.661559],"data":{"balloonContentHeader":"\u0411\u0430\u0431\u0443\u0448\u043a\u0438\u043d\u0441\u043a\u0430\u044f","balloonContent":"<div class=\"cloud\">\n    <a class=\"close cross\" href=\"#\"><\/a>\n    <div class=\"address\">\n        <strong>129281, \u041c\u043e\u0441\u043a\u0432\u0430, \u041c\u0435\u043d\u0436\u0438\u043d\u0441\u043a\u043e\u0433\u043e \u0443\u043b., \u0434.38<\/strong>\n                <span class=\"station\"><em class=\"metro m6\"><\/em>\u0411\u0430\u0431\u0443\u0448\u043a\u0438\u043d\u0441\u043a\u0430\u044f<\/span>\n            <\/div>\n        <div class=\"route\">\n        \u043c.\u0411\u0430\u0431\u0443\u0448\u043a\u0438\u043d\u0441\u043a\u0430\u044f, \u043f\u0435\u0440\u0432\u044b\u0439 \u0432\u0430\u0433\u043e\u043d \u0438\u0437 \u0446\u0435\u043d\u0442\u0440\u0430, \u043f\u043e\u0441\u043b\u0435 \u0441\u0442\u0435\u043a\u043b\u044f\u043d\u043d\u044b\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u043f\u043e\u0432\u043e\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u043c \u043d\u0430\u043b\u0435\u0432\u043e \u0438 \u043f\u043e \u0441\u0442\u0443\u043f\u0435\u043d\u044c\u043a\u0430\u043c \u0432\u0432\u0435\u0440\u0445,  \u043f\u0440\u0438 \u0432\u044b\u0445\u043e\u0434\u0435 \u0438\u0437 \u043f\u0435\u0440\u0435\u0445\u043e\u0434\u0430 \u043f\u043e\u0432\u043e\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u043c \u043d\u0430\u043f\u0440\u0430\u0432\u043e \u0432\u0434\u043e\u043b\u044c \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u043e\u0432 \u043f\u043e \u043f\u0440\u044f\u043c\u043e\u0439 \u0438\u0434\u0442\u0438 \u043f\u0440\u0438\u043c\u0435\u0440\u043d\u043e 300-400 \u043c\u0435\u0442\u0440\u043e\u0432    <\/div>\n          \n    <div class=\"worktime\">\n        \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a \u2013 \u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435 \u0441 10:00 \u0434\u043e 22:00    <\/div>\n    <\/div>\n"},"hasLuxuryAppliances":false,"isTshok":false},{"coord":[55.881377,37.602164],"data":{"balloonContentHeader":"\u0411\u0438\u0431\u0438\u0440\u0435\u0432\u043e","balloonContent":"<div class=\"cloud\">\n    <a class=\"close cross\" href=\"#\"><\/a>\n    <div class=\"address\">\n        <strong>127549, \u041c\u043e\u0441\u043a\u0432\u0430, \u0411\u0438\u0431\u0438\u0440\u0435\u0432\u0441\u043a\u0430\u044f \u0443\u043b., \u0434.10<\/strong>\n                <span class=\"station\"><em class=\"metro m9\"><\/em>\u0411\u0438\u0431\u0438\u0440\u0435\u0432\u043e<\/span>\n            <\/div>\n        <div class=\"route\">\n        \u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0439 \u0432\u0430\u0433\u043e\u043d \u0438\u0437  \u0446\u0435\u043d\u0442\u0440\u0430, \u043f\u043e\u0441\u043b\u0435 \u0441\u0442\u0435\u043a\u043b\u044f\u043d\u043d\u044b\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u043d\u0430\u043b\u0435\u0432\u043e, \u0434\u0430\u043b\u0435\u0435 \u043f\u0435\u0440\u0432\u044b\u0439 \u0432\u044b\u0445\u043e\u0434 \u043d\u0430\u043b\u0435\u0432\u043e,  \u043f\u0440\u043e\u0439\u0442\u0438 200 \u043c \u043f\u0440\u044f\u043c\u043e (\u043c\u0438\u043c\u043e \u0430\u0432\u0442\u043e\u0437\u0430\u043f\u0440\u0430\u0432\u043a\u0438 BP) \u0422\u0426 &quot;\u041d\u0410\u0428&quot;    <\/div>\n          \n    <div class=\"worktime\">\n        \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a \u2013 \u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435 \u0441 10:00 \u0434\u043e 22:00    <\/div>\n    <\/div>\n"},"hasLuxuryAppliances":false,"isTshok":false}];

var shopMap, collections = {};
if ($('#shopsMap').length) {
    ymaps.ready(shopMapsInit);
}

//shops map init
function shopMapsInit() {
    shopMap = new ymaps.Map('shopsMap', {
        center: [55.760000, 37.640000],
        zoom: 9
    });
    shopMap.controls.add('mapTools').add('typeSelector').add('zoomControl').add('scaleLine');
    collections.geoCollection = new ymaps.GeoObjectCollection({}, {
        iconImageHref: 'http://www.tehnosila.ru/res/base/img/map/map_placemark.png',
        iconImageSize: [35, 15],
        iconImageOffset: [0, -10]
    });
    collections.luxuryGeoCollection = new ymaps.GeoObjectCollection({}, {
        iconImageHref: 'http://www.tehnosila.ru/res/base/img/map/map_crown2.png',
        iconImageSize: [51, 15]
    });
    collections.tshokGeoCollection = new ymaps.GeoObjectCollection({}, {
        iconImageHref: 'http://www.tehnosila.ru/res/base/img/map/map_tshok.png',
        iconImageSize: [51, 17]
    });
    for (var i = 0; i < stores.length; i++) {
        var placeMark = new ymaps.Placemark(stores[i].coord, {id: 'store_' + i}, {
            balloonShadow: false,
            balloonLayout: ymaps.templateLayoutFactory.createClass(
                stores[i].data.balloonContent, {
                    build: function () {
                        var parent,
                            cloud,
                            geoObject = this.getData().geoObject,
                            map = geoObject.getMap();
                        this.constructor.superclass.build.call(this);
                        parent = $(this.getParentElement());
                        cloud = parent.find('.cloud');
                        cloud.css('margin-top', '-' + (cloud.outerHeight() / 2 + 4) + 'px');
                        cloud.find('.close').on('click', function (e) {
                            map.balloon.close();
                            return false;
                        });
                    },

                    clear: function () {
                        this.constructor.superclass.clear.call(this);
                    }
                })
        });
        if (stores[i].hasLuxuryAppliances) {
            collections.luxuryGeoCollection.add(placeMark);
        } else if (stores[i].isTshok) {
            collections.tshokGeoCollection.add(placeMark);
        } else {
            collections.geoCollection.add(placeMark);
        }

    }

    shopMap.geoObjects.add(collections.geoCollection);
    shopMap.geoObjects.add(collections.luxuryGeoCollection);
    shopMap.geoObjects.add(collections.tshokGeoCollection);

}
// show on map click
$('.shop-list__map').on('click', function(){
    $('#shopsTab').tab('show');
    var me = $(this);
    for (var i in collections) {
        collections[i].each(function(geoObject){
            if (geoObject.balloon.isOpen()) {
                geoObject.balloon.close();
            }
            if(geoObject.properties.get('id') == 'store_' + me.data('num')) {
                geoObject.balloon.open();
            }
        })
    }
    return false;
});







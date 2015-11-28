var map;
var placemark;

// init map
function initOneShop() {
    if (yaMapPoints.length != 0) {
        map = new ymaps.Map('oneShopPoint', {center: [region['lat'], region['lng']], zoom: region['zoom']});
        map.controls.add('zoomControl')
            .add('mapTools')
            .add('scaleLine')
            .add('typeSelector');

        var collection = new ymaps.GeoObjectCollection();
        var point = null;
        for (var i = 0; i < yaMapPoints.length; i++) {
            point = yaMapPoints[i];
            collection.add(makePlacemark(point, i));
        }
        map.geoObjects.add(collection);
    }
}

// add placemark

function makePlacemark(point, i) {
    newPlacemark = new ymaps.Placemark([point['lat'], point['lng']], {
        storeData: {
            iconContent: i + 1,
            name: point['name'],
            address: point['address'],
            metro: point['metro'],
            metroLine: point['metroLine'],
            phoneNumber: point['phone'],
            workingMode: point['workingMode'],
            image: point['image']
        }
    }, {
        preset: 'twirl#yellowDotIcon',
        balloonLayout: ymaps.templateLayoutFactory.createClass(
            '<div class="cloud">'+
                '<a class="close cross" href="#"></a>'+
                //'[if properties.storeData.image]' +
                '<div class="cloud-image">' +
                    '$[properties.storeData.image]' +
                '</div>' +
                //'[endif]' +
                '<div class="cloud-content">' +
                    '<div class="address">' +
                        '[if properties.storeData.name]' +
                        '<strong>$[properties.storeData.name]</strong><br>'+
                        '[endif]' +
                        '<strong>$[properties.storeData.address]</strong>' +
                        '[if properties.storeData.metro]' +
                        '<span class="station"><em class="metro $[properties.storeData.metroLine]"></em>$[properties.storeData.metro]</span>'+
                        '[endif]' +
                    '</div>' +
                    '[if properties.storeData.workingMode]' +
                    '<div class="worktime">$[properties.storeData.workingMode]</div>' +
                    '[endif]' +
                    '[if properties.storeData.phoneNumber]' +
                    '<div class="phone">$[properties.storeData.phoneNumber]</div>' +
                    '[endif]' +
                    '<div class="button-holder"><div class="button yellow">Забрать здесь</div></div>' +
                '</div>' +
                '<div class="clear"></div>' +
            '</div>',
            {
                build: function () {
                    var parent,
                        cloud,
                        button,
                        geoObject = this.getData().geoObject,
                        map = geoObject.getMap()
                    this.constructor.superclass.build.call(this);
                    parent = $(this.getParentElement());
                    cloud = parent.find('.cloud');
                    button = cloud.find('.button');
                    if (typeof showGetButton != 'undefined') {
                        button.on('click', function() {
                            $('#tag_' + point['val']).attr('checked', 'checked').trigger('change');
                            map.balloon.close();
                            return false;
                        });
                    } else {
                        button.remove();
                    }

                    cloud.css('margin-top', '-' + (cloud.outerHeight() / 2 + 4) + 'px');
                    cloud.find('.close').on('click', function (e) {
                        map.balloon.close();
                        return false;
                    });
                },

                clear: function () {
                    this.constructor.superclass.clear.call(this);
                }
            }
        ),
        iconShadow: true,
        balloonShadow: false,
        iconContentLayout: ymaps.templateLayoutFactory.createClass(
            '<div class="store-pin" data-id="$[properties.storeId]">$[properties.storeData.iconContent]</div>',
            {
                build: function () {
                    this.constructor.superclass.build.call(this);
                },

                clear: function () {
                    this.constructor.superclass.clear.call(this);
                }
            }
        )
    });

    newPlacemark.events.add('click', function (e) {
        if ($('#tag_' + point['val']).length) {
            map.zoomRange.get(
                    [
                        parseFloat($('#tag_' + point['val']).data('latitude')),
                        parseFloat($('#tag_' + point['val']).data('longitude'))
                    ]
                ).then(
                function (range) {
                    map.setCenter(
                        [
                            parseFloat($('#tag_' + point['val']).data('latitude')),
                            parseFloat($('#tag_' + point['val']).data('longitude'))
                        ],
                        range[1] - 2
                    );
                }
            );
        }
    });

    newPlacemark.events.add('mouseenter', function (e) {
        var options = e.get('target').options;
        options.set('iconImageHref', options.get('iconImageHref').replace(/_n\.png/, '_h.png'));
    });

    newPlacemark.events.add('mouseleave', function (e) {
        var options = e.get('target').options;
        options.set('iconImageHref', options.get('iconImageHref').replace(/_n\.png/, '_h.png'));
    });

    return newPlacemark;
}
//show map click
$('#showOnePoint').on('click', function(){
    $('#oneShopPoint').slideDown(300, function(){
        ymaps.ready(initOneShop);
    })
});

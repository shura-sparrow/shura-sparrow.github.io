jQuery(document).ready(function(){
    jQuery('.form-show__trigger').on('click', function(){
        jQuery(this).closest('.form-show__outer').find('.form-show__block').slideToggle(300);
        return false;
    });

    /* payment switcher */
    jQuery('.way__item').on('click', function(){
        jQuery('.ways-block').find('.way__item-sel').removeClass('way__item-sel');
        jQuery(this).addClass('way__item-sel');
    });
    jQuery('.way__mode').on('click', function(){
        var currentSelect = jQuery(this).closest('.ways-block').find('.way__mode-sel');
        currentSelect.removeClass('way__mode-sel');
        currentSelect.find('input').prop('checked', false);
        jQuery(this).addClass('way__mode-sel');
        jQuery(this).find('input').prop('checked', true);
        return false;
    });
    /* delivery switcher */
    jQuery('.cart-delivery').on('click', function(){
        jQuery(this).closest('.cart-delivery--outer').find('.active').removeClass('active');
        jQuery(this).addClass('active');
        jQuery(this).find('input').prop('checked', true)
    });
    /* print un cart */
    jQuery('.print-button').on('click', function(){
        window.print();
    });
    /* shop map in cart */
    jQuery('.nav-points a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if (jQuery('#map_container').is(':visible')) {
            ymaps.ready(mapInit);
        }
    });
    if (window.showOnLoad) {
        ymaps.ready(mapInit);
    }
    jQuery(".cart-item_quantity:not(.inactive) .cart-item__plus").on("click", function() {
        var field = jQuery(this).closest(".cart-item_quantity").find("input[type=hidden]");
        var newValue = 1 + (parseInt(field.val()) || 0);
        var max = parseInt(jQuery(this).parents(".cart-item_quantity").attr("data-max"));
        if (newValue > max) {
            newValue = max;
        }
        field.val(newValue).trigger("change");
        jQuery(this).closest(".cart-item_quantity").find("input[type=text]").val(newValue);
        return false;
    });
    jQuery(".cart-item_quantity:not(.inactive) .cart-item__minus").on("click", function() {
        var field = jQuery(this).closest(".cart-item_quantity").find("input[type=hidden]");
        var newValue = -1 + (parseInt(field.val()) || 0);
        if (newValue < 1) {
            newValue = 1;
        }
        field.val(newValue).trigger("change");
        jQuery(this).closest(".cart-item_quantity").find("input[type=text]").val(newValue);
        return false;
    });
    jQuery(".cart-item_quantity:not(.inactive) input[type=text]").on("blur", function() {
        var value = parseInt(jQuery(this).val());
        if (!isNaN(value)) {
            if (value < 1) {
                value = 1;
            } else {
                var max = parseInt(jQuery(this).closest(".cart-item_quantity").attr("data-max"));
                if (value > max) {
                    value = max;
                }
            }
        } else {
            var value = parseInt(jQuery(this).closest(".cart-item_quantity").find("input[type=hidden]").val());
        }
        jQuery(this).parents(".cart-item_quantity").find("input[type=hidden]").val(value).trigger("change");
        jQuery(this).parents(".cart-item_quantity").find("input[type=text]").val(value);
    });
});
/* special textarea in cart */
var textAreas = document.getElementsByTagName('textarea');

Array.prototype.forEach.call(textAreas, function(elem) {
    elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
});
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
            'jQuery[properties.storeData.image]' +
            '</div>' +
                //'[endif]' +
            '<div class="cloud-content">' +
            '<div class="address">' +
            '[if properties.storeData.name]' +
            '<strong>jQuery[properties.storeData.name]</strong><br>'+
            '[endif]' +
            '<strong>jQuery[properties.storeData.address]</strong>' +
            '[if properties.storeData.metro]' +
            '<span class="station"><em class="metro jQuery[properties.storeData.metroLine]"></em>jQuery[properties.storeData.metro]</span>'+
            '[endif]' +
            '</div>' +
            '[if properties.storeData.workingMode]' +
            '<div class="worktime">jQuery[properties.storeData.workingMode]</div>' +
            '[endif]' +
            '[if properties.storeData.phoneNumber]' +
            '<div class="phone">jQuery[properties.storeData.phoneNumber]</div>' +
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
                    parent = jQuery(this.getParentElement());
                    cloud = parent.find('.cloud');
                    button = cloud.find('.button');
                    if (typeof showGetButton != 'undefined') {
                        button.on('click', function() {
                            jQuery('#tag_' + point['val']).attr('checked', 'checked').trigger('change');
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
            '<div class="store-pin" data-id="jQuery[properties.storeId]">jQuery[properties.storeData.iconContent]</div>',
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
        if (jQuery('#tag_' + point['val']).length) {
            map.zoomRange.get(
                [
                    parseFloat(jQuery('#tag_' + point['val']).data('latitude')),
                    parseFloat(jQuery('#tag_' + point['val']).data('longitude'))
                ]
            ).then(
                function (range) {
                    map.setCenter(
                        [
                            parseFloat(jQuery('#tag_' + point['val']).data('latitude')),
                            parseFloat(jQuery('#tag_' + point['val']).data('longitude'))
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
function mapInit() {
    if (yaMapPoints.length != 0) {
        map = new ymaps.Map('map_container', {center: [region['lat'], region['lng']], zoom: region['zoom']});
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
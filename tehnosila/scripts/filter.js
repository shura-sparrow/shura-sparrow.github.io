var filter = {
    init: function() {
        var me = this;
        $('#filterForm').on('submit', function() {
            $('#filter').closePopup();
            var url = $(this).attr('action');

            var reg = /\?p\s*=\s*\d+\&/g;
            url = url.replace(reg, "?");
            var reg = /\?p\s*=\s*\d+/g;
            url = url.replace(reg, "");
            var reg = /p\s*=\s*\d+\&/g;
            url = url.replace(reg, "");
            reg = /\&p\s*=\s*\d+/g;
            url = url.replace(reg, "");
            url = url.replace('?&', '?');

            filter.loadItems(url);
            return false;
        });
        $('.form-slider-range').each(function(){
            me.createSlider($(this), {min: $(this).data('min'), max: $(this).data('max'), values: [$(this).data('min'), $(this).data('max')] });
        })

        /* code from tehnosila.ru, number inputs validate */
        $(".number-input").on('keypress', function (event) {
            var key, keyChar;
            if (!event) var event = window.event;

            if (event.keyCode) {
                key = event.keyCode;
            } else {
                if (event.which) {
                    key = event.which;
                }
            }

            if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) {
                return true;
            }
            keyChar = String.fromCharCode(key);

            if (!/\d/.test(keyChar)) {
                return false;
            }
        });
        /* range inputs change */
        $('.form-slider-inputs input[type=text]').on('keyup change', function(){
            var sliderBlock = $(this).closest('.form-slider-inputs').next('.form-slider-range');
            var parent = $(this).closest('.form-slider-inputs');
            var minInput = parent.find('.min-val'),
                maxInput = parent.find('.max-val');

            if (minInput.val() > maxInput.val()) {
                minInput.val(sliderBlock.data('min'));
                maxInput.val(sliderBlock.data('max'));
            }
            sliderBlock.slider('values', [
                parseInt(minInput.val()),
                parseInt(maxInput.val())
            ]);
        });
        $('#reset-button').on('click', function(){
            setTimeout(function(){$('.form-slider-inputs input[type=text]').trigger('change')}, 200);
        })
    },
    initInlineReviewBlocksDynamically: function() {
        if (typeof Shoppilot == 'undefined') {
            return false;
        }
        var MultiWidget = Shoppilot.require('multi_widget');
        var ProductWidget = Shoppilot.require('product_widget');

        var scoreBlocks = element.find('.reviews-score');

        var widgets = [];
        var uniqueItems = {};
        var currentId;
        scoreBlocks.each(function() {
            var itemId = $(this).data('id');
            var type = $(this).data('type');
            currentId = $(this).attr('id');
            if (uniqueItems[itemId]) {
                uniqueItems[itemId] = uniqueItems[itemId] + 1;
                currentId = $(this).attr('id') + '-' + uniqueItems[itemId];
                $(this).attr('id', currentId);
            } else {
                uniqueItems[itemId] = 1;
            }
            var widget = new ProductWidget({
                name: type == 'short' ? 'inline-rating-short' : 'inline-rating',
                container: '#' + currentId,
                product_id: itemId
            });

            widgets.push(widget);
        });
        MultiWidget.render(widgets);
    },
    loadItems: function (url, form) {
        var me = this;
        $('#filterResults').show();
        this.ajaxLoading('start');
        form = typeof (form) === "undefined" ? "" : form + '&';
        form += "update=1&";
        if (jQuery('#filterForm').length) {
            form += jQuery('#filterForm').serialize();
        }

        jQuery.post(url, form, function (data) {
            me.ajaxLoading('stop');
            if(typeof(data.html) !== "undefined" ) {
                jQuery('#catalog_items').html(data.html);
                this.initInlineReviewBlocksDynamically(jQuery('#catalog_items'));
            }
            if (typeof(data.filters) !== "undefined") {
                me.load_filters(data.filters);
            }
            googleTagManager.products = [];
            googleTagManager.registerAsynchItemList(jQuery('#items'), 'Catalog');
        }, "json");
    },
    rebuildSlider: function (newSlider) {
        var newSliderInputs = newSlider.find('input.text');
        var values = [];
        var paramName = newSlider.data('name');
        var oldSlider = jQuery('#slider-' + paramName);

        newSliderInputs.each(function() {
            var id = jQuery(this).attr('id');
            var input = oldSlider.find('#' + id);
            if (input.data('previousbound') == input.val()) {
                values.push(jQuery(this).data('startvalue'));
                input.val(jQuery(this).data('startvalue'));
            } else {
                values.push(jQuery(this).val());
                input.val(jQuery(this).val());
            }
            input.data('previousbound', jQuery(this).data('startvalue'));
        });


        oldSlider.find('#' + paramName + '_minBound').val(newSliderInputs.eq(0).data('previousbound'));
        oldSlider.find('#' + paramName + '_maxBound').val(newSliderInputs.eq(1).data('previousbound'));

        var sliderParams = {
            min: newSliderInputs.eq(0).data('startvalue'),
            max: newSliderInputs.eq(1).data('startvalue'),
            values: values
        }

        this.createSlider(paramName, sliderParams);
    },
    createSlider: function(elem, params) {
        /* range sliders */
        elem.slider({
            range: true,
            min: params.min,
            max: params.max,
            values: params.values,
            animate: true,
            slide: function( event, ui ) {
                var inputs = $(this).prev('.form-slider-inputs').find('input');
                inputs.eq(0).val(ui.values[0]);
                inputs.eq(1).val(ui.values[1]);
            }
        });
    },
    ajaxLoading: function(status) {
        if(status === 'start'){
            $('#loading_layer').fadeIn(300);
        }
        if(status === 'stop'){
            $('#loading_layer').fadeOut(200);
        }
    },
    load_filters: function(){
        var newSliders = jQuery(html).find('.form-slider-range');
        var me = this;
        newSliders.each(function() {
            me.rebuildSlider(jQuery(this));
        });

        var filter = null;
        var oldFilter = null;
        var label = null;
        var filterRow = null;

        var filters = jQuery(html).find('.filter__item');
        filters.each(function(){
            var id = $(this).attr('id');
            if (id) {
                var oldElement = jQuery('#' + id).find('.filter_body');
                oldElement.html($(this).find('.filter_body').html());
            }
        });
    }
}


$(document).ready(function(){
    /* sort */
    $('#sort_trigger').on('click', function(){
        $('.layer').fadeIn(300);
        $(this).parent().find('.sort-block__popup').fadeIn(300);
    });
    $('.layer, #sort_trigger-close').on('click', function(){
        $('.layer').fadeOut(300);
        $('.sort-block__popup').fadeOut(300);
    });
    $('#sort_params a').on('click', function(){
        $('.layer').fadeOut(300);
        $('.sort-block__popup').fadeOut(300);
        $('#sort_params .dropdown__item-active').removeClass('dropdown__item-active');
        $(this).parent().addClass('dropdown__item-active');
        return false;
    });

    /* filter form submit */
    filter.init();

});

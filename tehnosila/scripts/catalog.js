var Catalog = {
    init: function () {
        var self = this;
        $('#filterForm').on('submit', function () {
            $('#filter').closePopup();
            var url = $(this).attr('action');
            var data = $(this).serialize();
            self.loadItems(url, data);
            return false;
        });

        $('#sort_params .ajax').on('click', function (e) {
            e.preventDefault();
            self.processAjaxLinks($(this));
        });

        $('#catalog-items-wrapper').on('click', '.ajax', function (e) {
            e.preventDefault();
            self.processAjaxLinks($(this));
        });

        $('.form-slider-range').each(function () {
            self.createSlider($(this), {
                min: $(this).data('min'),
                max: $(this).data('max'),
                values: [
                    $(this).data('current-min'),
                    $(this).data('current-max')
                ]
            });
        });

        var numberInputs = $('.number-input');
        numberInputs.on('change', function () {
            self.processInput($(this));
        });

        $('#reset-button').on('click', function () {
            self.resetFilters(numberInputs);
        });

        $('#sort_trigger').on('click', function () {
            self.openSortPanel();
        });

        $('.layer, #sort_trigger-close').on('click', function () {
            self.closeSortPanel();
        });

        $('#sort_params a').on('click', function () {
            self.selectSort($(this));
        });

        $('#filter-results-wrapper').on('click', '.filter__results-close', function () {
            self.removeFilter($(this));
        });
    },

    processAjaxLinks: function (link) {
        var url = link.attr('href');
        var data = $('#filterForm').serialize();
        Catalog.loadItems(url, data);
        return false;
    },

    processInput: function (currentInput) {
        var parent = currentInput.closest('.form-slider-inputs'),
            minInput = parent.find('.min-val'),
            maxInput = parent.find('.max-val'),
            sliderBlock = parent.next('.form-slider-range'),
            sliderMinValue = sliderBlock.data('min'),
            sliderMaxValue = sliderBlock.data('max');

        var regexp = /\d/;
        if (!regexp.test(minInput.val())) {
            minInput.val(sliderMinValue);
        }
        if (!regexp.test(maxInput.val())) {
            maxInput.val(sliderMaxValue);
        }

        var minInputValue = parseInt(minInput.val());
        var maxInputValue = parseInt(maxInput.val());
        if (minInputValue > maxInputValue) {
            minInput.val(sliderMinValue);
            maxInput.val(sliderMaxValue);
        }
        if (minInputValue < sliderMinValue) {
            minInput.val(sliderMinValue);
        }
        if (maxInputValue > sliderMaxValue) {
            maxInput.val(sliderMaxValue);
        }

        sliderBlock.slider('values', [
            parseInt(minInput.val()),
            parseInt(maxInput.val())
        ]);
    },

    resetFilters: function (inputs) {
        inputs.val('');
        inputs.trigger('change');
    },

    loadItems: function (url, data) {
        Common.ajaxLoading('start');
        jQuery.post(url, data, function (data) {
            Common.ajaxLoading('stop');
            if (typeof(data.html) != 'undefined') {
                $('#catalog-items-wrapper').html(data.html);
            }
            if (typeof(data.filterResults) != 'undefined') {
                $('#filter-results-wrapper').html(data.filterResults);
            }
        }, "json");
    },

    createSlider: function (elem, params) {
        elem.slider({
            range: true,
            min: params.min,
            max: params.max,
            values: params.values,
            animate: true,
            slide: function (event, ui) {
                var inputs = $(this).prev('.form-slider-inputs').find('input');
                inputs.eq(0).val(ui.values[0]);
                inputs.eq(1).val(ui.values[1]);
            }
        });
    },

    openSortPanel: function () {
        $('.layer').fadeIn(300);
        $('.sort-block__popup').fadeIn(300);
    },

    closeSortPanel: function () {
        $('.layer').fadeOut(300);
        $('.sort-block__popup').fadeOut(300);
    },

    selectSort: function (link) {
        this.closeSortPanel();
        $('#sort_params .dropdown__item-active').removeClass('dropdown__item-active');
        link.parent().addClass('dropdown__item-active');
        return false;
    },

    removeFilter: function (button) {
        var form = $('#filterForm');
        var property = button.data('property');
        var id = button.data('id');
        var input = form.find('#' + property + '-' + id);
        if (input.length) {
            if (input.prop('type') == 'checkbox') {
                input.prop('checked', false);
                form.submit();
            } else {
                input.val('');
                input.trigger('change');
                form.submit();
            }
        }
    }
};


$(document).ready(function () {
    Catalog.init();
});

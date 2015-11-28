var catalog = {
    init: function() {
        var root = $('#filter');
        var me = this;
        if ($('#filter').length) {
            $('#filter').find('.filter-choice').each(function(){
                me.checkItemSel($(this));
            })

            if (jQuery.browser.mobile) {
                $('#filter').find('.filter__cats').hide();
                $('#filter .filter__title').find('span').removeClass('filter__arrow-bottom').addClass('filter__arrow-top');
                $('#filter').find('.filter__cats').eq(0).show();
                $('#filter .filter__title').find('span').eq(0).removeClass('filter__arrow-top').addClass('filter__arrow-bottom');
            }
            root.find('.filter-choice .filter__item').on('click', function(){
                if ($(this).find('.filter__item-inner').hasClass('filter__item-dis')) return false;
                me.selectFilterItem($(this));
                me.loadData();
                return false;
            });
            $('.filter__title').on('click', function(){
                var cat = $(this).closest('.filter__section').find('.filter__cats');
                if (cat.is(':visible')) {
                    $(this).find('span').removeClass('filter__arrow-bottom').addClass('filter__arrow-top')
                } else {
                    $(this).find('span').removeClass('filter__arrow-top').addClass('filter__arrow-bottom')
                }
                cat.slideToggle(300);
            });
            /* clear all filters */
            root.find('.filter__section-hide').on('click', function(){
                /* disabled parametr */

                me.clearGroupFilter($(this));
                me.loadData();
            })
        }
        $('.sort__trigger').on('click', function(){
            $(this).toggleClass('sort__parametr-sel');
            $(this).find('.sort__popup').slideToggle(300);
            $('.sort__trigger').css({zIndex: 1});
            $(this).css({zIndex: 1000});
            if ($(this).hasClass('sort__parametr-sel')) {
                $(this).find('.filter__arrow-top').addClass('filter__arrow-bottom')
            } else {
                $(this).find('.filter__arrow-top').removeClass('filter__arrow-bottom');
            }
        });
        $('.sort__popup a').on('click', function(){
            $(this).closest('.sort__parametr').find('.sort__parametr-text').text($(this).text());
            $(this).closest('.sort__parametr').find('.sort__popup-sel').removeClass('sort__popup-sel');
            $(this).parent().addClass('sort__popup-sel');
            $(this).closest('.sort__parametr').find('.sort__popup').slideUp(300);
            $(this).closest('.sort__parametr').find('.filter__arrow-top').removeClass('filter__arrow-bottom');
            me.loadData();
            return false;
        });
        /* price slider */
        if ($("#price-slider").length) {
            var slider = $("#price-slider");
            slider.slider({
                range: true,
                min: slider.data('min'),
                max: slider.data('max'),
                values: [slider.data('min'), slider.data('max')],
                slide: function( event, ui ) {
                    $( "#price-from" ).val(ui.values[0])
                    $( "#price-to" ).val(ui.values[1]);
                    if ($('#price-slider .ui-slider-handle').eq('0')[0] == ui.handle) {
                        $( "#price-from").addClass('colored-input')
                    } else {
                        $( "#price-to").addClass('colored-input')
                    }
                    $('.price-outer').find('.filter__section-hide').show();
                },
                stop: function(){
                    $("#price-from, #price-to").removeClass('colored-input');
                    me.loadData();
                }
            });
            $('#price-from').on('keyup',function(){
                $('#price-slider').slider("option", "values", [$(this).val(), $("#price-to").val()]);
            })
            $('#price-to').on('keyup',function(){
                $('#price-slider').slider("option", "values", [$('#price-from').val(), $(this).val()]);
            });
            $('.price-outer .filter__section-hide').on('click', function(){
                $('#price-slider').slider("option", "values", [slider.data('min'), slider.data('max')]);
                $( "#price-from" ).val(slider.data('min'))
                $( "#price-to" ).val(slider.data('max'));
            })
        }

    },
    selectFilterItem: function(elem){
        var innerBlock = elem.find('.filter__item-inner');

        //elem.addClass('filter__item-load');
        innerBlock.toggleClass('filter__item-sel');
        innerBlock.find('input').prop('checked', function(){
            return !innerBlock.find('input').prop('checked')
        }).trigger('change');
        this.checkItemSel(elem.closest('.filter-choice'));
    },
    checkItemSel: function(group) {
        var close = group.find('.filter__section-hide');
        if (group.find('input:checked').length) {
            close.show()
        } else {
            close.hide()
        }
    },
    clearGroupFilter: function(elem){
        var parent = elem.closest('.filter-choice');
        parent.find('.filter__item-sel').removeClass('filter__item-sel');
        parent.find('input:checked').prop('checked', false).trigger('change');
        elem.hide();
    },
    loadData: function() {
        var catalog = $('#catalog-block ul');
        var me = this;
        $('#blocking').fadeIn(100);
        $('#catalog-block ul').addClass('block-scroll')
        $.ajax(
        {
            type: "GET",
            url: 'http://4rome.obninsk.ru/u/udesigner/ajax.php',
            success: function (result) {
                catalog.empty().append(result);
                setTimeout(function(){
                    $('#blocking').hide();
                    $('#catalog-block .catalog').removeClass('block-scroll');
                    catalog.find('.catalog__loading').removeClass('catalog__loading');
                    //me.root.find('.filter__item-load').toggleClass('filter__item-sel');
                }, 300);
            }
        });
    }
}
$(document).ready(function(){
    catalog.init()
})
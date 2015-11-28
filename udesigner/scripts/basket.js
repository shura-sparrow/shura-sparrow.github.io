var basket = {
    init: function(){
        var timer;
        this.goodiesCol = parseInt($('#basketCol').text());
        this.goodieSize = 0;
        this.favSize = 0;
        var me = this;
        $('body').on({click:  function(){
            //if ($(this).hasClass('added-to-basket')) return false;
            if (me.goodieSize == 0) {
                if ($('#popupArea').hasClass('inline-popup')) {
                    return false;
                } else {
                    var params = $('#parametrs');
                    var popup = $('#popupArea');
                    var pos = {
                        left: popup.offset().left ,
                        top: popup.offset().top
                    }
                    $('.params-outer-right').height(popup.height());
                    popup.remove().appendTo('body');

                    $('#popupArea').addClass('inline-popup').css({
                        left: pos.left,
                        top: pos.top
                    });
                    $('.overall').addClass('blurry');
                }
                return false;
            } else {
                if ($('#popupArea').hasClass('inline-popup')) {
                    closeSmallPopupProps();
                }
            }

            $('#addToFavPopup').hide();
            clearTimeout(timer);

            $('#addToBasketPopup').fadeIn(300);
            $(this).addClass('added-to-basket');
            timer = setTimeout(function(){
                $('#addToBasketPopup').fadeOut(300);
            }, 5000);
            me.goodiesCol++;
            $('#basketCol').text(me.goodiesCol);
            me.goodieSize = 0;
            var selGoodie = $('.goodie__sizes').find('.goodie__sizes-sel');
            if (selGoodie.find('a').data('last')) {
                selGoodie.remove();
            }
            $('#goodieLast').hide();
            $('.goodie__sizes').find('.goodie__sizes-sel').removeClass('goodie__sizes-sel');
            return false;
        }
        }, '#addToBasket');
        /* onload choose of size */
        if ($('.goodie__sizes').find('.goodie__sizes-sel').length) {
            me.goodieSize = $(this).closest('.select-outer').find('.goodie__sizes-item').index($(this).closest('.select-outer').find('.goodie__sizes-sel')) + 1;
        } else {
            me.goodieSize = 0;
        }
        /* goodie sizes change */
        $('.goodie__sizes').closest('.select-outer').find('.hidden-select option').eq(me.goodieSize).prop('selected', true);

        $('body').on({
            click: function(){
                $(this).closest('.goodie__sizes').find('.goodie__sizes-sel').removeClass('goodie__sizes-sel');
                $(this).parent().addClass('goodie__sizes-sel');
                if (Boolean($(this).data('last'))) {
                    $('#goodieLast').slideDown(300)
                } else {
                    $('#goodieLast').slideUp(300)
                }
                me.goodieSize = $(this).closest('.select-outer').find('.goodie__sizes-item').index($(this).closest('.select-outer').find('.goodie__sizes-sel')) + 1;
                return false;
            }
        }, '.goodie__sizes a');

        $('body').on({
           click: function(){
            $('#addToFavPopup').fadeIn(300);
            me.favSize++;
            $('#favCol').text(me.favSize);
            $('#addToBasketPopup').hide();
            clearTimeout(timer);
            timer = setTimeout(function(){
                $('#addToFavPopup').fadeOut(300);
            }, 5000);
            return false;
            }
        }, '#addToFav');
        function closeSmallPopupProps() {
            $('#popupArea').removeClass('inline-popup');
            $('#popupArea').remove().appendTo('.params-outer-right');
            $('.overall').removeClass('blurry');
        }
        $('body').on({click: function(){
            closeSmallPopupProps();
            }
        }, '#popupArea .small-popup-close');


        $('.small-popup .small-popup-close').on('click', function(){
            $(this).closest('.small-popup').fadeOut(300);
        })
        $('#addToBasketPopup .small-popup-close').on('click', function(){
            clearTimeout(timer);
        });


        $('body').on({click: function() {
            $('.overall').addClass('blurry');
            $('#sizesPopup').remove().appendTo('body').show().css({
                height: $(window).height()*0.8,
                width: $('.goodie').width(),
                marginLeft: -$('.goodie').width()/2,
                top: $(window).scrollTop() + $(window).height()/2,
                marginTop: -$(window).height()*0.8/2
            });
            return false;
        } }, "#sizesPopupTrigger" );

        $('body').on({click: function() {
            $('#sizesPopup').hide();
            $('.overall').removeClass('blurry');
        }},'.small-popup-close');

        $('.goodie__colors a').on('click', function(){
            $(this).closest('.goodie__colors').find('.goodie__colors-sel').removeClass('goodie__colors-sel');
            $(this).parent().addClass('goodie__colors-sel');
        });
        /* hidden selects */
        $('body').on({
            click: function(){
                $(this).find('.select-list .select-item').on('click', function(){
                    var index = $(this).closest('.select-list').find('.select-item').index($(this)) + 1;
                    me.goodieSize = index;
                    $(this).closest('.select-outer').find('.hidden-select option').eq(index).prop('selected', true);
                    return false;
                });
            }
        }, '.select-outer');
        $('.fake-select').each(function() {
                var parent = $(this).closest('.select-outer');
                var popup = parent.find('.fake-select-popup .select-list-inner');
                parent.find('.hidden-select option').each(function(){
                    popup.append('<div class="select-item">' + $(this).text() + '</div>');
                });
                parent.find('.fake-select .fake-select-text').text(parent.find('.hidden-select option').eq(0).text());
                $(this).on('click', function(){
                    $('.fake-select').css({zIndex: 1});
                    $(this).find('.fake-select-popup').slideToggle(300);
                    $(this).css({zIndex: 10});
                    return false;
                });
         });
        $('body').on('click', function(){
            $('.fake-select-popup').slideUp(300);
        })
        /* fake selects */
        $('#promocodeButton').on('click', function(){
            if ($.trim($('#promocode').val()) != '') {
                $('#promocodeOuter').hide();
                $('#promocodePrice').show();

            }
            return false;
        });
        function switcher() {
            $('#switch').toggleClass('plain-switcher-slide');
            $('.plain-switcher-option').toggleClass('plain-switcher-option-sel');
            $('.plain-switcher-option input').prop('checked', false).trigger('change');
            $('.plain-switcher-option-sel input').prop('checked', true).trigger('change');
        }
        $('#switch').on('click', function(){
            switcher();
        });
        $('.plain-switcher-option').on('click', function(){
            switcher();
            return false;
        });
        $('#bymyself').on('change', function(){
            if ($(this).prop('checked')) {
                $('#addressOuter').slideUp(300)
            } else {
                $('#addressOuter').slideDown(300)
            }
        });
        $('.points-list-cl li').on('click', function(){
            $(this).closest('.points-list-cl').find('.points-list-item-sel').removeClass('points-list-item-sel');
            $(this).addClass('points-list-item-sel');
            $(this).find('input[type=radio]').prop('checked', true).trigger('change');
        });
        if ($('.stickem').length) {
            $('.basket-container').stickem({
                endStickClass: 'stickit-end'
            });
        }


    }
}
$(document).ready(function(){
    basket.init()
})
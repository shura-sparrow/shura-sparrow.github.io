$(document).ready(function(){
    $('.scrollme').inviewport({
        threshold: 1,
        className: 'visible'
    });
    $('#gallery-on-main').slick({
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000
    });
    $('.gallery--mod, .content-gallery .gallery').slick({
        arrows: true,
        dots: true,
        autoplay: false
    });
    $('#mainSlider').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: false,
        draggable:false,
        speed: 500
    });
    $('.slogan').fitText(1.5, { minFontSize: '25px', maxFontSize: '48px' });
    $('.contacts__phones').fitText(0.8, { minFontSize: '15px', maxFontSize: '25px' });
    $('.big-title').fitText(1.1, { minFontSize: '20px', maxFontSize: '30px' });
    /* scrolling gallery */
    var slideFlag = false;
    var flag = false;
    $(window).on({
        'mousewheel': function(e) {
            if (slideFlag) return;
            console.log('1');
            if (($('#sliderCont').offset().top + $('#sliderCont').height() <= $(window).scrollTop() + $(window).height())  && event.deltaY > 0)  {
                e.preventDefault();
                e.stopPropagation();
                var slider = $('#mainSlider');
                slider.slick('slickNext');
                if (slider.slick('slickCurrentSlide') == slider.find('.main-gallery-item').length - 1) {
                    slideFlag = true;
                }
            }
            else {
                return;
            }
        }
    });
    function resizePicture() {
        if ($(window).width() < 500) {
            $('#mainSlider .main-gallery-item').css({width: $(window).width()});
        } else {
            $('#mainSlider .main-gallery-item').each(function(){
                $(this).css({width: $(this).find('img').eq(0).width() + 25});
            })
        }
    }
    resizePicture();
    $(window).on('resize', function(){
        resizePicture();
        pictureBlockResize();
    });
    function bgMapSet() {
        var leftPos = ($(window).width() - $('.layout').width())/2;
        if ($(window).width() > 1300) {
            $('.layout-bg').css({left: leftPos + 'px'})
        } else {
            $('.layout-bg').css({left: -leftPos - 50 + 'px'})
        }
    }
    /* category trigger */
    $('.roll-list__trigger').on('click', function(){
        if ($(window).width() > 500 ) {
            $(this).closest('.roll-list__item').find('.roll-list__pic').addClass('roll-list__pic-hide');
            $(this).hide();
        }

        var counter = 0;
        var list = $(this).parent().find('.category-photos');
        list.slideDown(200, function(){
            $(this).closest('.roll-list__descr').css({overflow: 'visible'});
            var widthValue = $(window).width() - $(this).closest('.roll-list__item').offset().left - 50;

            $(this).closest('.roll-list__item').css({width: widthValue});
            list.width(widthValue);
            loadImage(list);
        });

        function loadImage(elem) {
            elem.find('.category-photos-inner').eq(counter).addClass('category-loading-img');
            setTimeout(function(){
                counter++;
                if (elem.find('.category-photos-inner').eq(counter).length) {
                    loadImage(elem);
                }
            }, 200)

        }
        return false;
    });
    $('.hidden-block-trigger').on('click', function(){
        $(this).closest('.outer-hidden-block').find('.hidden-block').slideDown(300);
        $(this).hide();
        return false;
    });
    function pictureBlockResize(){
        $('#rollList .category-photos').each(function(){
            var widthValue = $(window).width() - $(this).closest('.roll-list__item').offset().left - 50;
            $(this).closest('.roll-list__item').css({width: widthValue});
            $(this).width(widthValue).show();
        });
    }
    pictureBlockResize();
    /* docs trigger */
    $('.tech-main-subitem .tech-main__trigger>a').on('click', function() {
        var parent = $(this).closest('.tech-main-subitem');
        parent.children('.tech-main-opened').slideToggle(300);
        parent.toggleClass('tech-main-subitem-opened');
        return false;
    });
    $('.form-trigger, #requestTrigger').on('click', function(){
        posCenter($('#contactForm'));
        return false;
    });
    $('.popup .popup__close').on('click', function(){
        $(this).closest('.popup').hide();
        $('.layer').hide();
        return false;
    });
    $('.layer').on('click', function(){
        $('.popup').hide();
        $(this).hide();
    });

    $('.print-link').on('click', function(){
        window.print();
        return false;
    })
    $('.select-outer').each(function(){
        var me = $(this);
        $(this).find('.select-text').text($(this).find('.plain-select option').eq(0).text());
        $(this).find('.plain-select option').each(function(){
            me.find('.select-popup ul').append('<li>' + $(this).text() + '</li>');
        });
        $(this).find('.select-text').on('click', function(){
            $(this).parent().find('.select-popup').slideToggle(300);
            $(this).parent().toggleClass('select-fake-sel');
            $(this).parent().find('.select-arrow').toggleClass('select-arrow-top');
        });
        $(this).find('.select-popup li').on('click', function(){
            var index = me.find('.select-popup li').index($(this));
            $(this).closest('.select-outer').find('.plain-select option').eq(index).prop('selected', true);
            me.find('.select-popup').slideToggle(300);
            me.find('.select-text').text($(this).text());
            me.find('.select-fake').removeClass('select-fake-sel');
            me.find('.select-arrow').removeClass('select-arrow-top');
        });
    });
    if ($('.plain-form').length) {
        $('.plain-form').validate();
    }

    if ($('#file_upload').length) {
        $('body').on({
            change: function() {
                var val = $(this).val();
                var par = $(this).parent();
                var v = val.search(/^.*\.(?:doc|docx|pdf|xls|xlsx|ppt|pptx|rar|zip|jpg|tif|png|gif|rtf|bmp|txt)\s*$/ig);
                var v1 = val.search(/^.*\.(?:exe|bat|com|pif)\s*$/ig);
                if ((v != 0) || (v1 == 0)) {
                    $(this).next().show();
                    $('#file_upload').remove();
                    par.find('.error').before('<input type="file" id="file_upload" name="file_upload">');
                }
                else {
                    par.find('.error').hide();
                }
            }
        }, '#file_upload');

    }
    (function(){
        $('textarea').each(function(){
            var txt = $(this),
                hiddenDiv = $(document.createElement('div')),
                content = null;
            hiddenDiv.addClass('hiddendiv');
            $(this).after(hiddenDiv);
            txt.on('keyup', function () {
                content = $(this).val();
                content = content.replace(/\n/g, '<br>');
                hiddenDiv.html(content + '<br class="lbr">');
                $(this).css('height', hiddenDiv.outerHeight());
            });
        })

    })(jQuery);
    $('.icons-set img').on('mouseover', function(){
        var tip = $(this).parent().find('.icons-tip');
        $(this).data('title', $(this).attr('title'));
        $(this).parent().find('.icons-tip').text($(this).attr('title'));
        $(this).removeAttr('title');
        tip.css({opacity: 0,display: 'block', left: $(this).offset().left - $(this).parent().offset().left - tip.outerWidth()/2 + $(this).width()/2});
        tip.css({opacity: 1});
    }).on('mouseout', function(){
        var tip = $(this).parent().find('.icons-tip');
        $(this).attr('title', $(this).data('title'));
        tip.hide();
    });
    if ( $(".breadcrumbs").length) {
         $(".breadcrumbs .bcr__item").hoverIntent({
            over: function(){
                $(".breadcrumbs .bcr__item").css({zIndex: 20});
                $(this).css({zIndex: 30});
                $(this).find('.bcr__popup').show()
            },
            out: function(){
                $(this).css({zIndex: 20});
                $(this).find('.bcr__popup').hide()
            },
            timeout: 300
        });
    }
    $('.menu-trigger').on('click', function(){
        $('.top-nav__list').slideToggle(300);
    });
    $('.nav-allsite').on('click', function(){
        if ($('.allsite-popup').is(':visible')) {
            $('.allsite-popup').slideUp(300, function(){
                $('.breadcrumbs-outer').removeClass('breadcrumbs-outer-colored');
                $('.breadcrumbs').css({visibility: 'visible'});
                $('.layer-2').fadeOut(300);
            });
        } else {
            $('.allsite-popup').slideDown(300);
            $('.breadcrumbs-outer').addClass('breadcrumbs-outer-colored');
            $('.breadcrumbs').css({visibility: 'hidden'});
            $('.layer-2').fadeIn(300).css({top: $(this).offset().top, height: $(document).outerHeight() - $(this).offset().top});
        }
        return false;
    });
    $('.layer-2').on('click', function(){
        $('.allsite-popup').slideUp(300, function(){
            $('.breadcrumbs-outer').removeClass('breadcrumbs-outer-colored');
            $('.breadcrumbs').css({visibility: 'visible'});
            $('.layer-2').fadeOut(300);
        });
    })
    /*$('.breadcrumbs').menuAim({
        activate: function(row) {
            console.log(row);
            $(row).find('.bcr__popup').show();
        },
        deactivate: function(row) {
            $(row).find('.bcr__popup').hide();
        },
        exitMenu: function(row) {
            return true;
        },
        submenuDirection: "below"
    });*/
});
function posCenter(popup) {
    popup.css({display: 'block', visibility:'hidden'});
    var topPos = $(window).scrollTop() + $(window).height()/2 - popup.outerHeight()/2;
    if (topPos < 0) topPos = 20;
    popup.css({top: topPos, visibility:'visible'});
    $('.layer').show();
}
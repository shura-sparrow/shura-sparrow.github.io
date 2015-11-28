
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
(function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else{if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}})(jQuery);
/*jslint browser: true, indent: 2 */
$(document).ready(function(){
    FastClick.attach(document.body);

    jQuery.validator.addMethod("phone", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^\+[0-9]{11}$/);
    }, "Пожалуйста, введите правильный номер телефона");





    $('.top-adv__close').on('click', function(){
        $(this).closest('.top-adv').slideUp(300);
    });
    $('#menu-trigger').on('click', function(){
        $('#mainMenu').slideToggle(300);
        $('.hamburger, .close-icon').toggleClass('shown');
        $('#authpopup').fadeOut(200);
        $('.layer').hide();
        return false;
    });


    function testMobile() {
        if ($(window).width() < 985) {
            $('body').addClass('mobile')
        } else {
            $('body').removeClass('mobile')
        }
    }
    testMobile();
    function hoverMenu() {
        $("#mainMenu .menu__item").hoverIntent({
            over: function(){
                $(this).find('.submenu-popup').show()
            },
            out: function(){
                $(this).find('.submenu-popup').hide()
            },
            timeout: 300
        });
        /* lavalamp menu */
        if (!jQuery.browser.mobile) {
            if (!$('#mainMenu').find('.menu-lavalamp').length) {
                $('#mainMenu').append('<span class="menu-lavalamp"></span>');
            }
            $('.menu-lavalamp').css({left: $('#mainMenu').offset().left });
            $('#mainMenu li').on('mouseover', function(){
                $('.menu-lavalamp').css({
                    left: $(this).offset().left,
                    width: $(this).width()
                });
            });
        }
    }
    function checkMenuClick() {
        if ($('body').hasClass('mobile')) {
            $('#mainMenu .menu__item a').off('click').on('click', function(){
                var parent = $(this).parent();
                var popup = parent.find('.submenu-popup');
                parent.find('.submenu-popup').slideToggle(300);
                parent.toggleClass('menu__item-shown');
                if (parent.find('.submenu-popup').is(':visible')) {
                    $('#mainMenu .submenu-popup').not(popup).slideUp(300);
                    $('#mainMenu .menu__item').not(parent).removeClass('menu__item-shown');
                }

                return false;
            });
            $('#mainMenu .menu__item').off();
        } else {
            $('#mainMenu .menu__item a').off('click');
            hoverMenu();
        }
    }
    checkMenuClick();
    var top = $('.top-navigation').offset().top;
    var lastScrollTop = 0;
    $(window).on('scroll resize', function(e){
        var st = $(this).scrollTop();
        if (($(window).scrollTop() > top) && (st < lastScrollTop)) {
            $('.top-navigation').addClass('top-navigation-float')
        } else {
            $('.top-navigation').removeClass('top-navigation-float')
        }
        lastScrollTop = st;
    })


    $('.authpopup .auth-show-form').on('click', function(){
        if ($('body').hasClass('mobile')) {
            var auth = $(this).parent().find('.auth-outer');
            auth.slideToggle(300);
            $(this).closest('.auth-forms').find('.auth-outer').not(auth).slideUp(300);
        } else {
            $(this).parent().find('.auth-outer').show();
        }
        return false;
    });

    /* form validation */
    if ($('.validate-form').length) {
        $('.validate-form').each(function(){
            $(this).validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    pass_conf: {
                        equalTo: "#password"
                    },
                    password: {
                        minlength: 6,
                        maxlength: 12
                    }
                },
                messages: {
                    pass_conf: {
                        equalTo: "Пароли не совпадают"
                    },
                    password: {
                        required: "Пожалуйста, введите корректный<br> пароль"
                    }
                },
                submitHandler: function(form){
                    $(form).prev('.plain-form-message').show();
                }
            })
        })
    }
    /* auth popup show */
    $('.entrance-link a').on('click', function() {
        $('#authpopup').fadeIn(200);
        $('.layer').css({height: $('body').outerHeight()}).show();
        return false;
    });
    $('.popup-close').on('click', function(){
        $('#authpopup').fadeOut(200);
        $('.layer').hide();
        return false;
    });
    /* slick slider */
    $('.slider').slick({
        arrows: true,
        dots: true
    });

    /* filter */


    /* catalog infinite scroll */
    if ($('#catalog-block').length) {
        var noMoreData = 0;
        $(window).on('scroll', function() {
            var catalog = $('#catalog-block .catalog');
            if (catalog.hasClass('block-scroll')) return false;
            var bottomPos = $(window).scrollTop() + $(window).height();
            var contentGap = catalog.offset().top + catalog.height();

            if((contentGap - bottomPos < 50) && (noMoreData < 5) ) {
                $.ajax(
                    {
                        type: "GET",
                        url: 'http://4rome.obninsk.ru/u/udesigner/ajax.php',
                        success: function(result) {
                            noMoreData++;

                            catalog.append(result);
                            setTimeout(function(){
                                catalog.find('.catalog__loading').removeClass('catalog__loading');
                                bottomPos = $(window).scrollTop() + $(window).height();
                                contentGap = catalog.offset().top + catalog.height();
                            }, 500)
                        }
                    })
            }
        });
    }
    /* goodie details */
    $('#details .goodie__details--title').on('click', function(){
        var parent = $(this).parent();
        parent.find('.goodie__details-inner').slideToggle(300);
        var arrow = parent.find('.goodie__details--title span');
        if (arrow.hasClass('filter__arrow-top')) {
            arrow.removeClass('filter__arrow-top').addClass('filter__arrow-bottom');
        } else {
            arrow.removeClass('filter__arrow-bottom').addClass('filter__arrow-top');
        }
    });

    /* catalog items pictures */

    $('#goodiePreview a').on('click', function(){
        if ($(this).parent().hasClass('previews__sel')) return false;
        $('#goodiePreview').find('.previews__sel').removeClass('previews__sel');
        $(this).parent().addClass('previews__sel');
        var currentSlide =  $('#goodiePreview a').index($(this));
        $('#bigPicture img').attr('src', $(this).attr('href')).data('slide', currentSlide);
        return false;
    });
    function generateItems() {
        $('#goodiePreview .previews__item').each(function(){
            $('#goodieList').append('<li class="goodie-popup-item"><img src="' + $(this).find('a').data('bigpicture') + '" alt=""></li>');
        });

    }
    generateItems();
    $('#fakeList').slick({
        arrows: true,
        dots: true
    })
    $('#fakeList li').on('click', function(){
        $('#picturePopup').show();
        $('#goodieList').css({opacity: 0}).css({height: $('#picturePopup').height()});
        $('body').addClass('body-hidden');
        $('#goodieList .goodie-popup-item').css({height: $('#picturePopup').height(), width: $(window).width()});
        $(window).scrollTop(0);
        console.log($('#fakeList li').index($(this)));
        if ($('#goodieList').hasClass('slick-initialized')) {

            $('#goodieList').slick('unslick');
        }

        $('#goodieList').slick({
            arrows: true,
            initialSlide: $('#fakeList li').index($(this)) - 1
        });


        initPopup()
    });

    function initPopup() {
        var actualSizes = [];
        $('#goodieList').find('img').each(function(){
            actualSizes.push({height: $(this).height(), width: $(this).width()})
        })

        $('#goodieList').css({opacity: 1});
        resizePhotos();



        $('#picturePopup li').on('click', function(){
            closePicturePopup();
        });
        function reactionOnMouseMove(e) {
            var img = $('#goodieList').find('.slick-active').find('img');
            var nextSlide = $('#goodieList').slick('slickCurrentSlide');
            var wholeWidth = actualSizes[nextSlide].width;
            var wholeHeight = actualSizes[nextSlide].height;

            img.css({left: $(window).width()/2 - img.width() /2, height: 'auto'});

            var h = $(window).width()/wholeWidth *  wholeHeight;
            var vptHeight = $(window).height();
            if (h > vptHeight) {
                var y = -((h - vptHeight)/vptHeight) * e.pageY;
                img.css('top', y + "px");
            }
        }
        $('#picturePopup').off('mousemove').on('mousemove', function(e){
            reactionOnMouseMove(e);
        })
    }
    function resizePhotos() {
        var img = $('#goodieList').find('img');
        img.css({left: $(window).width()/2 - img.width() /2, top: 0});
    }
    $('#bigPicture').on('click', function(){
        $('#picturePopup').show();
        $('#goodieList').css({opacity: 0});
        $('body').addClass('body-hidden');
        $('#goodieList .goodie-popup-item').css({height: $('#picturePopup').height(), width: $(window).width()});
        if ($('#goodieList').hasClass('slick-initialized')) {

            $('#goodieList').slick('unslick');
        }
        $('#goodieList').slick({
            arrows: true,
            initialSlide: $('#bigPicture').data('slide')
        });

        $(window).scrollTop(0);

        initPopup();

    });
    $(window).on('resize', function(){
        $(window).scrollTop(0);
        $('#goodieList .goodie-popup-item').height($('#picturePopup').height()).width($('#picturePopup').width());
        /*if ($('body').hasClass('mobile')) {
            $('#picturePopup').show();
        } */
        resizePhotos();
    });
    $('#picturePopup .popup-close').on('click', function(){
        closePicturePopup();
    });
    function closePicturePopup() {
        $('#picturePopup').hide();
        //$('#goodieList').slick('unslick');
        $('body').removeClass('body-hidden');
        $('#picturePopup').off('mousemove');
    }
    $(window).on('resize', function(){
        testMobile();

        if ($('body').hasClass('mobile')) {

        } else {
            $(' #authpopup .auth-outer').show();
            $('.submenu-popup').removeAttr('style');
            $('#mainMenu').show();
        }
        checkMenuClick();
    });

});
jQuery.fn.extend({
    showPopup: function(){
        var popup = $(this).prop('id');
        $(this).addClass('shown');
        $('body').addClass('body-hidden');
    },
    closePopup: function(){
        var popup = $(this).closest('.popup');
        popup.removeClass('shown');
        $('body').removeClass('body-hidden');
    }
});
$(document).ready(function(){
    //$('#popup-region').modal('show');
    $('#menu_trigger').on('click', function(){
        $('.popup').closePopup();
        $('#menu_popup').showPopup();
        return false;
    });
    $('#city_trigger').on('click', function(){
        $('.popup').closePopup();
        $('#city_popup').showPopup();
        return false;
    });
    $('.popupClose').on('click', function(){
        $(this).closePopup();
        return false;
    });
    $('#city_popup .popupClose').on('click', function(){
        $(this).closePopup();
        $('#menu_popup').showPopup();
        return false;
    });
    $('#filter_trigger').on('click', function(){
        $('#filter').showPopup();
        return false;
    });
    /* buy popup */
    $('#buy_popup-close').on('click', function(){
        $('#buy_popup').modal('hide');
        return false;
    });
    $('#buy_popup').on('shown.bs.modal', function (e) {
        if ($('#accessorySlider').length) {
            jQuery('#accessorySlider').slick({
                dots: true,
                arrows: false,
                adaptiveHeight: true
            });
        }
    })
});
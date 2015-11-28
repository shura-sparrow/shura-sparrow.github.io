$(document).ready(function(){
    $('.search__input').on('focus blur', function(){
        jQuery.placeholder.shim();
    });
    $('.entrance-link a').on('click', function() {
        setTimeout(function(){
            jQuery.placeholder.shim();
        }, 300)

    })
})
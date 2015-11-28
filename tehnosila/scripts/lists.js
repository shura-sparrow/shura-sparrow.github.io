$(document).ready(function(){
    $('.cart-item_move').on('click', function(){
        $(this).closest('.card-item').find('.list_move-popup')
            .css({left: $(this).offset().left - $(this).closest('.card-descr').offset().left - 5})
            .slideToggle(300);
        return false;
    })
});
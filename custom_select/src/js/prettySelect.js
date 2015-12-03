(function ($) {
    'use strict';

    $.fn.extend({
        prettySelect: function (options) {
            // IE6 filter
            if (typeof document.body.style.minHeight === 'undefined') {
                return this;
            }
            var defaults = {
                    multiple: false,
                    defaultClass: 'pretty_select',
                    slideSpeed: 300
                },
                options = $.extend(defaults, options);
            function changeSelect($select, $newSelectText, $dropDownInner) {
                var selectedItem = $select.find(':selected') || $select.children(':first'),
                    html = selectedItem.html() || '&nbsp;',
                    selectedIndex = $select.children('option').index(selectedItem);
                $newSelectText.html(html);
                $dropDownInner.find('.' + options.defaultClass + '__popup-item-sel').removeClass(options.defaultClass + '__popup-item-sel');
                $dropDownInner.children().eq(selectedIndex).addClass(options.defaultClass + '__popup-item-sel');
            }
            return this.each(function () {
                var $select = $(this),
                    $outerWrapper = $('<div>').addClass(options.defaultClass + '_wrapper'),
                    $dropDown = $('<div>').addClass(options.defaultClass + '__popup'),
                    $newSelect = $('<div>').addClass(options.defaultClass + '__magic'),
                    $dropDownInner = $('<div>').addClass(options.defaultClass + '__popup-inner'),
                    $newSelectText = $('<span>'),
                    $arrow = $('<span>').addClass(options.defaultClass + '__arrow');

                $select.on('create.prettySelect', function () {
                    // create a wrapper
                    $select.after($outerWrapper);

                    // create new dropdown and magic select
                    $outerWrapper.append($newSelect, $dropDown);

                    // append dropdown inner
                    $dropDown.append($dropDownInner);

                    $select.children('option').each(function(i){
                        var $item = $('<div>').addClass(options.defaultClass + '__popup-item');
                        $item.html($(this).html());
                        $dropDownInner.append($item);

                        $item.data('val', $(this).attr('value'));
                    });
                    $newSelect.append($newSelectText,$arrow);

                    $select.addClass('pretty_select__hidden');

                    changeSelect($select, $newSelectText, $dropDownInner);

                    // select some options
                    $dropDownInner.children().on('mouseup.prettySelectItem', function(){
                        var item = $(this);
                        $select.val(item.data('val'));
                        changeSelect($select,$newSelectText, $dropDownInner);
                        $newSelect.trigger('blur.customSelect');
                    });

                }).on('change.prettySelect', function () {

                    changeSelect($select,$newSelectText, $dropDownInner);

                });
                // new select events
                $newSelect.on('mouseup.prettySelect', function () {

                    $newSelect.toggleClass(options.defaultClass + '__opened');
                    $dropDown.slideToggle(options.slideSpeed);

                }).on('blur.customSelect', function(){

                    $newSelect.removeClass(options.defaultClass + '__opened');
                    $dropDown.slideUp(options.slideSpeed);

                });


                $(document).on('mouseup.prettySelect', function (e) {
                    if( e.target != $outerWrapper.get(0)  && $.inArray(e.target, $outerWrapper.find('*').get()) < 0 ){
                        $newSelect.trigger('blur.customSelect');
                    }
                });
                $select.trigger('create.prettySelect');

            });
        }
    });
})(jQuery);


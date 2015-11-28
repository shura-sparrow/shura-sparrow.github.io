/*jslint browser: true, indent: 2 */
(function ($) {
    'use strict';
    $.fn.inviewport = function (options) {
        var settings = $.extend({
            'minPercentageInView' : 100,
            'standardClassName': 'in-view'
        }, options);
        this.each(function () {
            var $this = $(this),
                $win = $(window),
                changed = false,
                changeOnscroll = true,
                isVisible = function () {
                    var c = settings.className || settings.standardClassName,
                        min = (settings.threshold || settings.minPercentageInView) / 100,
                        xMin = $this.width() * min,
                        yMin = $this.height() * min,
                        winPosX = $win.scrollLeft() + $win.width(),
                        winPosY = $win.scrollTop() + $win.height(),
                        elPosX = $this.offset().left + xMin,
                        elPosY = $this.offset().top + yMin;
                    if ($(this).hasClass('catalog-block')) {
                        console.log($(this).attr('class') + winPosY + '|' + yMin)
                    }
                    if (winPosX > elPosX && winPosY > elPosY) {
                        $this.addClass(c);

                    } else {
                        if (changeOnscroll) {
                            $this.addClass('scrollmeOn');
                        }
                    }
                };
            $win.on('ready', isVisible())
                .on('resize scroll', function () {
                    changed = true;
                    changeOnscroll = false;
                })
            $win.trigger('scroll');
            setInterval(function () {
                if (changed) {
                    changed = false;
                    isVisible();
                }
            }, 250);
        });
    };
}(jQuery));
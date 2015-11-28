$(function(){
    var $projectIframe = $('#projectIframe'),
        $preloader = $('#preloader'),
        transitionend = 'transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd otransitionend',
        activeLinkClass = 'project__link_state_active',
        loadPreloaderClass = 'preloader_state_load',
        loadedPreloaderClass = 'preloader_state_loaded',
        loadIframeClass = 'project-iframe_state_load',
        $links = $('.project__pages-item').find('a'),
        $sel_class = 'project__pages-sel';

    var $firstLink = $links.first().addClass($sel_class);

    var src = $firstLink.attr('href');

    $projectIframe.attr('src', src);

    $projectIframe.on('load', function () {
        $preloader.removeClass(loadPreloaderClass);
        $projectIframe.removeClass(loadIframeClass);
    });
    $links.on('click', function (e) {
        var $this = $(this),
            src = $this.attr('href');

        if (!$this.parent().hasClass($sel_class)) {
            $projectIframe.attr('src', src);
            $links.parent().filter('.' + $sel_class).removeClass($sel_class);
            $this.parent().addClass($sel_class);

            $projectIframe.addClass(loadIframeClass);
            $preloader
                .removeClass(loadedPreloaderClass)
                .addClass(loadPreloaderClass);
        }

        e.preventDefault();
    });

});
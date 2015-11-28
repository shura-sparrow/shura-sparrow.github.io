$(function(){
    var $projectIframe = $('#projectIframe'),
        $preloader = $('#preloader'),
        transitionend = 'transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd otransitionend',
        activeLinkClass = 'project__link_state_active',
        loadPreloaderClass = 'preloader_state_shown',
        loadedPreloaderClass = 'preloader_state_hidden',
        loadIframeClass = 'project-iframe_state_load',
        $links = $('.project__pages-item').find('a'),
        $sel_class = 'project__pages-sel';

    $preloader.on(transitionend, function (e) {
        if ($preloader.is(e.target)) {
            $preloader.addClass(loadedPreloaderClass);
        }
    });

    $projectIframe.on('load', function () {
        $preloader.removeClass(loadPreloaderClass);
        $projectIframe.removeClass(loadIframeClass);
    });

    var $firstLink = $links.first().addClass($sel_class);

    var src = $firstLink.attr('href');

    $projectIframe.attr('src', src);

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
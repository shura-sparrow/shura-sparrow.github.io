var asyncPartsIsLoaded = false;
var asyncItemBlocksIsLoaded = false;
var asyncRecommendationBlocksIsLoaded = false;


var loadAsyncParts = function () {
    var handlers = {};
    var fragments = '';

    if (jQuery(".news .news-content").size() > 0) {
        fragments += "&news=1";
        handlers.news = function (data) {
            var newsBlock = '';
            jQuery.each(data, function (index, news) {
                newsBlock += createNewsBlock(news, true);
            });
            newsBlock += '<div class="clear"></div>';
            jQuery('.news-content').html(newsBlock);
            jQuery('.news-content .news-item:nth-child(4n)').each(function () {
                jQuery('.news-content .news-item:nth-child(4n)').addClass('last');
                jQuery('<div class="clear"></div>').insertAfter(this);
            });
        };
    }

    if (jQuery(".news .new-items-content").size() > 0) {
        fragments += "&newItems=1";
        handlers.newItems = function (data) {
            var newsBlock = '';
            jQuery.each(data, function (index, news) {
                newsBlock += createNewsBlock(news, true);
            });
            newsBlock += '<div class="clear"></div>';
            jQuery('.new-items-content').html(newsBlock);
            jQuery('.new-items-content .news-item:nth-child(4n)').each(function () {
                jQuery('.new-items-content .news-item:nth-child(4n)').addClass('last');
                jQuery('<div class="clear"></div>').insertAfter(this);
            });
        };
    }

    function createNewsBlock(news, withImage) {
        var newsBlock = '<div class="news-item">';
        if (withImage) {
            newsBlock += '<div class="image' + (!!news['image'] ? ' has-image' : '') + '"><a href="' + news['url'].toString() + '">'
                + news['image'].toString() + '</a></div>';
        }
        newsBlock += '<div class="date">' + news['date'].toString() + '</div><div class="title"><a href="' + news['url'].toString() + '">'
            + news['title'].toString() + '</a></div>'
            + '<div class="description">' + news['introtext'].toString() + '</div>'
            + '</div>';

        return newsBlock;
    }

    if (!!fragments.length) {
        jQuery.getJSON("/site/asyncLoad?" + fragments, function (data) {
            for (var k in data) {
                if (data.hasOwnProperty(k) && "undefined" !== typeof handlers[k]) {
                    handlers[k](data[k]);
                }
            }
        });
    }
};

var loadAsyncItemLists = function () {
    var lists = jQuery('.item-list-ajax');
    var data = {};
    lists.each(function () {
        if (jQuery(this).data('preload')) {
            var params = jQuery(this).data('params');
            data[params['type']] = params;
        }
    });

    jQuery.ajax({
        url: "/site/asyncItemLists",
        method: 'POST',
        data: {
            params: data
        },
        success: function (data) {
            for (var listName in data) {
                var oldBlock = jQuery('#item-list-' + listName);
                var newBlock = jQuery(data[listName]);
                oldBlock.replaceWith(newBlock);
                if (listName == 'search') {
                    var hiddenBlock = oldBlock.parent('.hidden-important');
                    hiddenBlock.removeClass('hidden-important');
                }
            }
        }
    });
};


jQuery(document).ready(function() {
    loadAsyncParts();
    loadAsyncItemLists();
});
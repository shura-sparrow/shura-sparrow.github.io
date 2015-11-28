var Common = {
    init: function () {
        var self = Common;
        $(document).on('click', '.add-to-cart-button', function() {
            if (!$(this).hasClass('disabled')) {
                self.clickAddToCart($(this));
                return false;
            }
        });

        $(document).on('click', '.compare-btn-holder .compare', function () {
            if (!$(this).hasClass('active')) {
                self.addToCompare($(this).attr('data-id'));
                return false;
            }
        });

        $('#citySearchForm').on('submit', function(){
            return false;
        });

        $('#city_search').on('keyup change', function () {
            self.citySearch($(this));
        });

        $('#searchBlock input[type=text]').catcomplete(self.getSearchQuery());
    },
    
    clickAddToCart: function (button) {
        var self = Common;
        if (!$('.action-class-cart-index').length) {
            self.ajaxLoading('start');
        }
        self.addToCart(button.attr('data-id'));

        return false;
    },
    
    addToCart: function (item_id, params) {
        var self = Common;
        //получаем услуги
        var data = $('#item-services-list').serializeArray();
        if (params) {
            for (var key in params) {
                data.push({name: key, value: params[key]});
            }
        }
        data.push({name: 'disablePopup', value: true});

        $.getJSON(
            '/product/' + item_id + '/cart/add',
            data,
            function (data) {
                self.ajaxLoading('stop');
                if (data.status === 'added') {
                    $(document).trigger('add_to_cart', [data.item_id, data.category_id, 1]);
                    if ($('#item-datails').length) {
                        //если на странице товара, позже допишу
                    } else {
                        //если в каталоге
                        $('#item-info-' + item_id + ' .cart-block, .cart-block[data-id=' + item_id + ']')
                            .addClass('disabled')
                            .removeClass('cart order preorder')
                            .attr('href', '/cart');
                    }
                }
                self.fillCartInfo(data);
            }
        );
        $('body').trigger('addToCart', item_id);
    },

    fillCartInfo: function (data) {
        //пока так, позже всего скорее макеты поправят
        if (typeof data.cartInfo != 'undefined') {
            $('#basketCol').html(data.cartInfo.quantity);
        }
    },

    addToCompare: function (itemId) {
        jQuery.getJSON('/item/addItemCompare/' + itemId, function (data) {
            $('.compare-btn-holder[data-id=' + itemId + ']').addClass('has-in-compare');
        });
    },

    citySearch: function (searchInput) {
        var searchRequest = searchInput.val().toLowerCase();
        var cityList = $('#cityList');
        var cityItem = cityList.find('li');
        var searchRequestCount = searchRequest.length;
        if (searchRequestCount >= 0) {
            var item = null;
            var itemName = null;
            var countShow = 0;
            cityItem.each(function () {
                item = $(this);
                itemName = item.attr('data-name').toLowerCase();
                if (itemName.indexOf(searchRequest) !== -1) {
                    item.show();
                    countShow++;
                } else {
                    item.hide();
                }
            });
        } else {
            cityItem.show();
        }
    },

    getSearchQuery: function () {
        return {
            source: function (request, response) {
                jQuery.ajax({
                    url: "/index.php?r=search/ajaxSuggestProduct",
                    dataType: "jsonp",
                    data: {
                        limit: 10,
                        q: request.term
                    },
                    success: function (data) {
                        response(data);
                    }
                });
            },
            delay: 300,
            minLength: 3,
            select: function (event, ui) {
                location.href = ui.item.data.url;
            }
        };
    },

    ajaxLoading: function (status) {
        if (status === 'start') {
            $('#loading_layer').fadeIn(300);
        }
        if (status === 'stop') {
            $('#loading_layer').fadeOut(200);
        }
    }
};



$(document).ready(function(){
//    $(function() {
//        FastClick.attach(document.body);
//    });
    // main slider
    if ($('#mainSlider').length) {
        $('#mainSlider').slick({
            dots: true,
            arrows: false,
            adaptiveHeight: true
        });
    }

    /* search */
    $('#search_trigger').on('click', function(){
        $('#searchBlock').slideToggle(300);
        return false;
    });
    $('#searchBlock .plain-input').on('keyup', function(){
        $('#searchBlock .search__reset').toggleClass('shown', ($.trim($(this).val()) != ''));
    }).on('blur', function(){
        if ($.trim($(this).val()) == '') {
            $('#searchBlock .search__reset').removeClass('shown');
        }
    });
    $('#searchBlock .search__reset').on('click', function(){
        $('#searchBlock .plain-input').val('');
        $(this).removeClass('shown');
    });

    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = "";
            $.each(items, function (index, item) {
                var li;
                if (item.category != currentCategory) {
                    ul.append(
                        "<li class='ui-autocomplete-category'>" + item.category + "</li>"
                    );
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.label);
                }
            });
        }
    });

    /* hidden block show */
    $('.hidden-block__trigger').on('click', function(){
        $(this).parent().find('.hidden-block').slideDown(300);
        $(this).hide();
    });

    Common.init();
});

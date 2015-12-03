(function( $ ) {

    var events = [ "create", "start", "stop", "slide", "change" ];

    $.widget( "app.slider", $.ui.slider, {
        _getCreateEventData: function() {
            return { values: this.values() };
        },
        _init: function() {
            var steps = this.options.steps;
            if ( $.isArray( steps ) ) {
                this.option( "min", 0 );
                this.option( "max", steps.length - 1 );
            }
        },
        _trigger: function( name, e, ui ) {
            var steps = this.options.steps;
            if ( !$.isArray( steps ) ) {
                return this._superApply( arguments );
            }

            if ( $.inArray( name, events ) >= 0 ) {
                return this._superApply([
                    name,
                    e,
                    $.extend( ui, {
                        stepValue: [steps[ui.values[0]], steps[ui.values[1]]]
                    })
                ]);
            }
            return this._superApply(arguments);
        }
    });

})(jQuery);
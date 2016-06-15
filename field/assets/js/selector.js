
Selector = (function($, $field) {

    var self = this;

    this.$field     = $field;
    this.$storage   = $field.find('.js-selector-storage');
    this.$items     = $field.find('.js-selector-item');
    this.mode       = $field.data('mode');
    this.autoselect = $field.data('autoselect');
    this.size       = $field.data('size');

    /**
     * Initialize fileselect field
     *
     * @since 1.0.0
     */
    this.init = function() {

        /**
         * Initialize field size.
         *
         * @since 1.4.0
         */
        if(self.size != 'auto') {
            self.initSize();
        }


        /**
         * Initialize preselected items
         *
         * @since 1.0.0
         */
        self.initItems();

        /**
         * Bind handler to checkbox clicks
         *
         * @since 1.0.0
         */
        self.$field.find('.js-selector-checkbox').click(self.handleClickEvent);

        /**
         * Maybe autoselect an item
         *
         * @since 1.2.0
         */
        if(self.autoselect != 'none') {
            self.doAutoSelect();
        }
    };

    this.initSize = function() {
        // Calculate box height:
        // (<visible items> * <item height>) + <visible item borders> + box borders
        var height = self.size * self.$items.first().height() + (self.size - 1) + 4;

        // Apply height and overflow styles to box
        if (self.$items.length > 0) {
            self.$field.find('.input-with-items').css({
                maxHeight: height,
                overflowY: 'scroll'
            });
        }
    };

    /**
     * Initialize items and set selected state for preselected items
     *
     * @since 1.0.0
     */
    this.initItems = function() {
        var $item;

        // Apply the selected state to all preselected items
        self.$items.each(function() {
            $item = $(this);
            if($item.data('checked') === true)
                self.setSelectedState($item);
        });

        // Initialize storage element value
        self.updateStorage();
    };

    /**
     * Maybe auto select an item
     *
     * @since 1.2.0
     */
    this.doAutoSelect = function() {
        var selected = false;

        // Abort if any file is selected
        self.$items.each(function() {
            if(self.hasSelectedState($(this))) {
                selected = true;
            }
        });
        if(selected) {
            return;
        }

        // Select item according to setting and update storage
        switch(self.autoselect) {

            case 'first':
                self.setSelectedState(self.$items.first());
                break;

            case 'last':
                self.setSelectedState(self.$items.last());
                break;

            case 'all':
                if(self.mode == 'multiple') {
                    self.$items.each(function() {
                        self.setSelectedState($(this));
                    });
                } else {
                    self.setSelectedState(self.$items.first());
                }
                break;

        }
        self.updateStorage();
    };

    /**
     * Handle the click event for the items checkboxes
     *
     * @since 1.0.0
     *
     * @param event
     */
    this.handleClickEvent = function(event) {
        event.preventDefault();

        // Find parent item element
        var $target = $(this).closest('.js-selector-item');

        /*
            SINGLE MODE
            Unselect all items and reselect only the curent one.
         */
        if(self.mode == 'single') {
            if($target.data('checked') == 'true') {
                self.setUnselectedStates();
            } else {
                self.setUnselectedStates();
                self.setSelectedState($target);
            }
        }

        /*
            MULTIPLE MODE
            Toggle selection state on current item.
         */
        if(self.mode == 'multiple') {
            self.toggleSelectedState($target);
        }

        // Update storage element
        self.updateStorage();
    };

    /**
     * Set all items into the unselected state
     *
     * @since 1.0.0
     */
    this.setUnselectedStates = function() {
        self.$items.each(function() {
            self.setUnselectedState($(this));
        });
    };

    /**
     * Apply the unselected state to a single item
     *
     * @since 1.0.0
     *
     * @param $target
     */
    this.setUnselectedState = function($target) {
        $target.data('checked', 'false')
               .removeClass('selector-item-selected')
               .find('.fa-check-circle')
                   .removeClass('fa-check-circle')
                   .addClass('fa-circle-o');
    };

    /**
     * Apply the selected state to a single item
     *
     * @since 1.0.0
     *
     * @param $target
     */
    this.setSelectedState = function($target) {
        $target.data('checked', 'true')
               .addClass('selector-item-selected')
               .find('.fa-circle-o')
                   .removeClass('fa-circle-o')
                   .addClass('fa-check-circle');
    };

    /**
     * Apply the state of a single item
     *
     * @since 1.0.0
     *
     * @param $target
     */
    this.toggleSelectedState = function($target) {
        if(self.hasSelectedState($target)) {
            self.setUnselectedState($target);
        } else {
            self.setSelectedState($target);
        }
    };

    /**
     * Check if an item is selected
     *
     * @since 1.2.0
     *
     * @param $target
     */
    this.hasSelectedState = function($target) {
        return ($target.data('checked') == 'true');
    };

    /**
     * Update storage input element with current state
     *
     * @since 1.0.0
     */
    this.updateStorage = function() {
        var files = [],
            item,
            state;

        // Iterate over all items
        self.$items.each(function() {

            item = $(this);
            state = item.data('checked');

            // Push selected items to result
            if(state == 'true')
                files.push(item.data('file'));

        });

        // Set string representation of the result as storage value
        self.$storage.val(files.join());
    };

    return this.init();

});

(function($) {

    /**
     * Tell the Panel to run our initialization.
     *
     * This callback will fire for every Fileselect
     * Field on the current panel page.
     *
     * @see https://github.com/getkirby/panel/issues/228#issuecomment-58379016
     * @since 1.0.0
     */
    $.fn.selector = function() {
            return new Selector($, this);
    };

})(jQuery);

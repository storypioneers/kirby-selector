
Selector = (function($, $field) {

    var self = this;

    this.$field        = $field;
    this.$storage      = $field.find('.js-selector-storage');
    this.$items        = $field.find('.js-selector-item');
    this.mode          = $field.data('mode');
    this.autoselect    = $field.data('autoselect');
    this.autoselectadd = $field.data('autoselectadd');
    this.size          = $field.data('size');
    this.form          = $field.parents('.form');

    // Ascii conversion table. Taken from Kirby
    // URL: https://github.com/getkirby/toolkit/blob/0ceeb44186ec0e34e45e283ddf0f99a00c192ba9/lib/f.php#L17-L121
    this.ascii = {
        '/Ä/g': 'Ae',
        '/æ|ǽ|ä/g': 'ae',
        '/À|Á|Â|Ã|Å|Ǻ|Ā|Ă|Ą|Ǎ|А/g': 'A',
        '/à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª|а/g': 'a',
        '/Б/g': 'B',
        '/б/g': 'b',
        '/Ç|Ć|Ĉ|Ċ|Č|Ц/g': 'C',
        '/ç|ć|ĉ|ċ|č|ц/g': 'c',
        '/Ð|Ď|Đ/g': 'Dj',
        '/ð|ď|đ/g': 'dj',
        '/Д/g': 'D',
        '/д/g': 'd',
        '/È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě|Е|Ё|Э/g': 'E',
        '/è|é|ê|ë|ē|ĕ|ė|ę|ě|е|ё|э/g': 'e',
        '/Ф/g': 'F',
        '/ƒ|ф/g': 'f',
        '/Ĝ|Ğ|Ġ|Ģ|Г/g': 'G',
        '/ĝ|ğ|ġ|ģ|г/g': 'g',
        '/Ĥ|Ħ|Х/g': 'H',
        '/ĥ|ħ|х/g': 'h',
        '/Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ|И/g': 'I',
        '/ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı|и/g': 'i',
        '/Ĵ|Й/g': 'J',
        '/ĵ|й/g': 'j',
        '/Ķ|К/g': 'K',
        '/ķ|к/g': 'k',
        '/Ĺ|Ļ|Ľ|Ŀ|Ł|Л/g': 'L',
        '/ĺ|ļ|ľ|ŀ|ł|л/g': 'l',
        '/М/g': 'M',
        '/м/g': 'm',
        '/Ñ|Ń|Ņ|Ň|Н/g': 'N',
        '/ñ|ń|ņ|ň|ŉ|н/g': 'n',
        '/Ö/g': 'Oe',
        '/œ|ö/g': 'oe',
        '/Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ|О/g': 'O',
        '/ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º|о/g': 'o',
        '/П/g': 'P',
        '/п/g': 'p',
        '/Ŕ|Ŗ|Ř|Р/g': 'R',
        '/ŕ|ŗ|ř|р/g': 'r',
        '/Ś|Ŝ|Ş|Ș|Š|С/g': 'S',
        '/ś|ŝ|ş|ș|š|ſ|с/g': 's',
        '/Ţ|Ț|Ť|Ŧ|Т/g': 'T',
        '/ţ|ț|ť|ŧ|т/g': 't',
        '/Ü/g': 'Ue',
        '/ü/g': 'ue',
        '/Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ|У/g': 'U',
        '/ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ|у/g': 'u',
        '/В/g': 'V',
        '/в/g': 'v',
        '/Ý|Ÿ|Ŷ|Ы/g': 'Y',
        '/ý|ÿ|ŷ|ы/g': 'y',
        '/Ŵ/g': 'W',
        '/ŵ/g': 'w',
        '/Ź|Ż|Ž|З/g': 'Z',
        '/ź|ż|ž|з/g': 'z',
        '/Æ|Ǽ/g': 'AE',
        '/ß/g': 'ss',
        '/Ĳ/g': 'IJ',
        '/ĳ/g': 'ij',
        '/Œ/g': 'OE',
        '/Ч/g': 'Ch',
        '/ч/g': 'ch',
        '/Ю/g': 'Ju',
        '/ю/g': 'ju',
        '/Я/g': 'Ja',
        '/я/g': 'ja',
        '/Ш/g': 'Sh',
        '/ш/g': 'sh',
        '/Щ/g': 'Shch',
        '/щ/g': 'shch',
        '/Ж/g': 'Zh',
        '/ж/g': 'zh'
    };

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

        /**
         * Auto select an item after upload
         *
         * @since 1.6.0
         */
        if(this.autoselectadd != 'none') {
            $field
                .siblings()
                .children()
                .first()
                .on('click', this.handleClickEventAdd.bind(this));
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
     * Handle the click event for the field-related _Add_ button
     *
     * @since 1.6.0
     */
    this.handleClickEventAdd = function() {
        // Listen to the change event once and hook into the upload loop
        $('input[type=file]').one('change', function() {
            // Update hidden field
            if (self.single) {
                self.$storage.val(self.sanitize(this.files[0].name));
            } else {
                var files = self.updateStorage();

                for (var i = 0; i < this.files.length; i++) {
                    files.push(self.sanitize(this.files[i].name));
                }

                self.$storage.val(files.join());
            }

            // Force form saving
            self.form.submit();
        });
        return false;
    }


    /**
     * Sanitize file names just like Kirby does
     *
     * @description https://github.com/getkirby/toolkit/blob/0ceeb44186ec0e34e45e283ddf0f99a00c192ba9/lib/f.php#L804-L809
     *
     * @since 1.6.0
     *
     * @param str
     */
    this.sanitize = function(str) {
        var separator = '-';
        var allowed = 'a-z0-9@._-';

        // Trim and lower string
        str = str.trim().toLowerCase();

        // Convert into ascii representation
        var asciiKeys = Object.keys(self.ascii);
        for (var i = 0; i < asciiKeys.length; i++) {
            str = str.replace(asciiKeys[i], self.ascii[asciiKeys[i]]);
        }

        // replace spaces with simple dashes
        str = str.replace(new RegExp('[^' + allowed + ']', 'g'), separator);

        // remove double separators
        str = str.replace(new RegExp('[' + separator + ']{2,}', 'g'), separator);

        // trim trailing and leading dashes
        var regLeading = new RegExp('^' + separator + '+');
        var regTrailing = new RegExp(separator + '+$');
        str = str.replace(regLeading, '').replace(regTrailing, '');

        // replace slashes with dashes
        str = str.replace('/', separator);

        return str;
    }

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

        return files;
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

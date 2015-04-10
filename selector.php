<?php

class SelectorField extends BaseField {

    const LANG_DIR = 'languages';

    /**
     * Define frontend assets
     *
     * @var array
     * @since 1.0.0
     */
    public static $assets = array(
        'css' => array(
            'selector.css',
        ),
        'js' => array(
            'selector.js',
        ),
    );

    /**
     * Select mode (single/multiple)
     *
     * @var string
     * @since 1.0.0
     */
    public $mode;

    /**
     * Sort mode
     *
     * @var string
     * @since 1.1.0
     */
    public $sort = 'filename';

    /**
     * Flip sort order
     *
     * @var string
     * @since 1.1.0
     */
    public $flip = false;

    /**
     * Covered file types
     *
     * @var array
     * @since 1.0.0
     */
    public $types;

    /**
     * Autoselect a file
     *
     * @var string
     * @since 1.2.0
     */
    public $autoselect = 'none';

    /**
     * Option default values
     *
     * @var array
     * @since 1.0.0
     */
    protected $defaultValues = array(
        'mode'    => 'single',
        'options' => 'all',
    );

    /**
     * Valid option values
     *
     * @var array
     * @since 1.0.0
     */
    protected $validValues = array(
        'mode'  => array(
            'single',
            'multiple',
        ),
        'types' => array(
            'all',
            'image',
            'video',
            'audio',
            'document',
            'archive',
            'code',
            'unknown',
        ),
        'autoselect' => array(
            'none',
            'first',
            'last',
            'all'
        ),
    );

    /**
     * Field setup
     *
     * (1) Load language files
     *
     * @since 1.2.0
     *
     * @return \SelectorField
     */
    public function __construct()
    {
        /*
            (1) Load language files
         */
        $baseDir = __DIR__ . DS . self::LANG_DIR . DS;
        $lang    = panel()->language();
        if(file_exists($baseDir . $lang . '.php'))
        {
            require $baseDir . $lang . '.php';
        }
        else
        {
            require $baseDir . 'en.php';
        }
    }

    /**
     * Magic setter
     *
     * Set a fields property and apply default value if required.
     *
     * @since 1.0.0
     *
     * @param string $option
     * @param mixed  $value
     */
    public function __set($option, $value)
    {
        /* Set given value */
        $this->$option = $value;

        /* Check if value is valid */
        switch($option)
        {
            case 'mode':
                if(!in_array($value, $this->validValues['mode']))
                    $this->mode = $this->defaultValues['mode'];
                break;

            case 'types':
                if(!is_array($value) or empty($value))
                    $this->types = array('all');
                break;

            case 'sort':
                if(!is_string($value) or empty($value))
                    $this->sort = 'filename';
                break;

            case 'flip':
                if(!is_bool($value))
                    $this->flip = false;
                break;

            case 'autoselect':
                if(!in_array($value, $this->validValues['autoselect']))
                    $this->autoselect = 'none';
                break;
        }
    }

    /**
     * Generate label markup
     *
     * @since 1.0.0
     *
     * @return string
     */
    public function label()
    {
        /* Action button */
        $action = new Brick('a');
        $action->addClass('file-add-button label-option');
        $action->html('<i class="icon icon-left fa fa-plus-circle"></i>' . l('pages.show.files.add'));
        $action->attr('href', purl($this->page(), 'upload'));

        /* Label */
        $label = parent::label();
        $label->addClass('figure-label');
        $label->append($action);

        return $label;
    }

    /**
     * Generate field content markup
     *
     * @since 1.0.0
     *
     * @return string
     */
    public function content()
    {
        $wrapper = new Brick('div');
        $wrapper->addClass('selector');
        $wrapper->data(array(
            'field' => 'selector',
            'name'  => $this->name(),
            'page'  => $this->page(),
            'mode'  => $this->mode,
            'autoselect' => $this->autoselect(),
        ));
        $wrapper->html(tpl::load(__DIR__ . DS . 'template.php', array('field' => $this)));
        return $wrapper;
    }

    /**
     * Return the current value
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function value()
    {
        if(is_string($this->value))
            $this->value = str::split($this->value, ',', 1);

        return $this->value;
    }

    /**
     * Get files based on types option
     *
     * @since 1.0.0
     *
     * @return \Files
     */
    public function files()
    {
        /**
         * FIX: Create a new reference to $this to overcome the unavailability
         * of $this within closures in PHP < 5.4.0 by passing this new reference
         * with the "use" language construct.
         *
         * @since 1.0.1
         */
        $field = &$this;

        return $this->page()->files()
            ->sortBy($this->sort, ($this->flip) ? 'desc' : 'asc')
            ->filter(function($file) use ($field) {
                return $field->includeAllFiles() or in_array($file->type(), $field->types);
        });
    }

    /**
     * Generate file slug
     *
     * @since 1.0.0
     *
     * @param  \File $file
     * @return string
     */
    public function itemId($file)
    {
        return $this->name() . '-' . str::slug($file->filename());
    }

    /**
     * Check if a file is present in the current value
     *
     * @since 1.0.0
     *
     * @param  \File $file
     * @return bool
     */
    public function isInValue($file)
    {
        return in_array($file->filename(), $this->value());
    }

    /**
     * Check if the types array includes "all"
     *
     * @since 1.0.0
     *
     * @return bool
     */
    public function includeAllFiles()
    {
        return in_array('all', $this->types);
    }

}

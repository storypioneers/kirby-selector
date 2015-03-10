<?php

class SelectorField extends BaseField {

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
     * Covered file types
     *
     * @var array
     * @since 1.0.0
     */
    public $types;

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
    );

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
        ));
        $wrapper->html(tpl::load(__DIR__ . DS . 'template.php', array('field' => $this)));
        return $wrapper;
    }

    /**
     * Decode the result data and return as imploded string
     *
     * @since 1.0.0
     *
     * @return string
     */
    public function result()
    {
        $json = parent::result();
        $data = json_decode($json, true);

        /* Check for empty and invalid results */
        if(empty($json) or !is_array($data))
            return '';

        /* Implode result */
        return implode(',', $data);
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
        return $this->page()->files()->filter(function($file) {
            return in_array($file->type(), $this->types);
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

}

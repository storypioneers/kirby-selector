<?php
/**
 * Kirby Selector
 *
 * Fileselect Field for Kirby 2
 *
 * @version   1.5.2
 * @author    digital storytelling pioneers <digital@storypioneers.com>
 * @author    feat. Jonas Döbertin <hello@jd-powered.net> and others (see AUTHORS)
 * @copyright digital storytelling pioneers <digital@storypioneers.com>
 * @link      https://github.com/storypioneers/kirby-selector
 * @license   GNU GPL v3.0 <http://opensource.org/licenses/GPL-3.0>
 */

// register the builder field
$kirby->set('field', 'selector', __DIR__ . DS . 'field');


field::$methods['toFiles'] = function ($field) {
    // Transform the comma-separated list of filenames into a file collection
    $fileNames = $field->split(',');
    // find method has special handling for finding a single file, pad file names with empty string to force it
    // to return a Files collection
    $fileNames = array_pad($fileNames, 2, '');
    return $field->page()->files()->find($fileNames);
};

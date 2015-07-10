<?php

$finder = Symfony\CS\Finder\DefaultFinder::create()
    ->files()
    ->name('*.php')
    ->in(__DIR__)
;

return Symfony\CS\Config\Config::create()
    ->level(Symfony\CS\FixerInterface::PSR2_LEVEL)
    ->fixers(array(
        'psr0',
        'psr1',
        'psr2',
        'duplicate_semicolon',
        'empty_return',
        'multiline_array_trailing_comma',
        'namespace_no_leading_whitespace',
        'new_with_braces',
        'phpdoc_params',
        'remove_leading_slash_use',
        'remove_lines_between_uses',
        'return',
        'single_array_no_trailing_comma',
        'standardize_not_equal',
        'unused_use',
        'whitespacy_lines',
        'align_double_arrow',
        'concat_with_spaces',
    ))
    ->finder($finder)
;

# Selector – Kirby Fileselect Field

This additional panel field for [Kirby 2](http://getkirby.com) allows you to use an intuitive alternative file selection field in your blueprints.

**Authors**: [digital storytelling pioneers](https://github.com/storypioneers) feat. [Jonas Doebertin](https://github.com/JonasDoebertin)

**License**: [GNU GPL v3.0](http://opensource.org/licenses/GPL-3.0)

![Screenshot](https://raw.githubusercontent.com/storypioneers/kirby-selector/master/screenshot.png)

## Installation

Copy or link the `selector` directory to `site/plugins/` **or** use the [Kirby CLI](https://github.com/getkirby/cli) `kirby plugin:install storypioneers/kirby-selector`.


## Usage

### Within your blueprints

Post installation simply add `selector` fields to your blueprints and set some options (where applicable).

```yaml
fields:
	postimage:
		label: Main Post Image
		type:  selector
		mode:  single
		types:
			- image
```
```yaml
fields:
	attachments:
		label: Post Attachments
		type:  selector
		mode:  multiple
		types:
			- all
```

### Within your templates / controllers / models

As per design, the selector field stores the *filenames* of the selected files, only. If you need access to the files full path or to other properties / functions of the file object, you must convert the filename into a full file object first.

**Single Mode**

When you're using the Selector field in Single Mode, gaining access to the full file object is quite easy. Just replace `yourselectorfield` with the name of your Selector-based field.

```php
	// Convert the filename to a full file object
	$file = $page->yourselectorfield()->toFile();

	// Use the file object
	echo $file->url();
```

**Multiple Mode**

In multiple mode, the Selector field stores a comma-separated list of filenames, based on how many files you selected. To convert this list into a fully-featured file collection (just like `$page->files()`), you need a bit more code.

```php

	// Transform the comma-separated list of filenames into a file collection
	$filenames = $page->yourselectorfield()->split(',');
	if(count($filenames) < 2) $filenames = array_pad($filenames, 2, '');
	$files = call_user_func_array(array($page->files(), 'find'), $filenames);

	// Use the file collection
	foreach($files as $file)
	{
		echo $file->url();
	}

```

## Options

The field offers some options that can be set on a per field basis directly from your blueprints.

### mode

Define a mode the field will work in. Possible values are `single` and `multiple`.

* **single**: With the `single` mode, the fields checkboxes will work like a set of radio buttons, letting you select a single file only. This is useful if you want a way to specify a posts main image.

* **multiple**: This option allows you to select multiple files in a single file selector field. The selected files will be stored as a comma separated list.

### types

Define the files types the file selector field shows. Possible values are `all`, `image`, `video`, `audio`, `document`, `archive`, `code`, `unknown`. You may specify as many of these types as you like.

```yaml
fields:
	attachments:
		label: Post Attachments
		type:  selector
		mode:  multiple
		types:
			- image
			- video
			- audio
			- document
```

### sort

Files will be shown sorted by their filename in ascending order (a-z). However, this option let's you change the default sort behavior. You can sort files by filesize, dimensions, type and many more. Some of the countless possible values are `sort`, `filename`, `size`, `width`, `height`, `type`, `modified`, `ratio`. You can also sort by any of your custom [file fields](http://getkirby.com/docs/panel/blueprints/file-settings#file-fields). The value `sort` will make sure the files are presented in the exact order you specified in the panels file section via [drag and drop](http://getkirby.com/docs/panel/blueprints/file-settings#sortable-files).

```yaml
fields:
	featured:
		label: Featured Image
		type:  selector
		mode:  single
		sort:  size
		types:
			- image
```

### flip

This options allows you to reverse the sort order you specified with the `sort` option. You may set this to `true` or `false`.

### autoselect

This options allows you to tell the Selector to auto select the first, last or all files of the list, if no other file is selected, yet. Possible values are `none` (default), `first`, `last` and `all`.

```yaml
fields:
	featured:
		label:      Featured Image
		type:       selector
		mode:       single
		sort:       filename
		autoselect: first
		types:
			- image
```

### filter

This options allows you to set a filename filter. This can be either a simple string or a fully featured regular expression. Only files with filenames matching the filter string or regular expression will be shown in the Selector field. You may set this to any string like `background`, `.min.js` or `large` or a regular expression like `/\.((png)|(jpe?g))/i`.

```yaml
fields:
	featured:
		label:  Page Background Image
		type:   selector
		mode:   single
		filter: background
		types:
			- image
```
Showing only image files with the term *background* in their filename.

```yaml
fields:
	featured:
		label:  Page Background Image
		type:   selector
		mode:   single
		filter: /\.((png)|(jpe?g))/i
```
Using a regular expression to show only *.jpg*, *.jpeg* and *.png* files.

### size

The `size` option lets you limit the height of the selector field and makes it scrollable. Only the specified number of files will be shown initially. This can be set either to a *number* or to `auto` (the Selector field will adapt to the height of the complete list of files).

```yaml
fields:
	featured:
		label: Page Background Image
		type:  selector
		mode:  single
		size:  4
```

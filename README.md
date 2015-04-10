# Selector – Kirby Fileselect Field

[![Release](https://img.shields.io/github/release/storypioneers/kirby-selector.svg)](https://github.com/storypioneers/kirby-selector/releases)  [![Issues](https://img.shields.io/github/issues/storypioneers/kirby-selector.svg)](https://github.com/storypioneers/kirby-selector/issues) [![License](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://raw.githubusercontent.com/storypioneers/kirby-selector/master/LICENSE)

This additional panel field for [Kirby 2](http://getkirby.com) allows you to use an intuitive alternative file selection field in your blueprints.

**Concept**: [@storypioneers](https://github.com/storypioneers)

**Authors**: [@JonasDoebertin](https://github.com/JonasDoebertin/) for [@storypioneers](https://github.com/storypioneers)

**License**: [GNU GPL v3.0](http://opensource.org/licenses/GPL-3.0)

![Screenshot](https://raw.githubusercontent.com/storypioneers/kirby-selector/master/screenshot.jpg)

## Installation

### Copy & Pasting

If not already existing, add a new `fields` folder to your `site` directory. Then copy or link this repositories whole content in a new `selector` folder there. Afterwards, your directory structure should look like this:

```
site/
	fields/
		selector/
			assests/
			selector.php
			template.php
```

### Git Submodule

If you are an advanced user and know your way around Git and you already use Git to manage you project, you can make updating this field extension to newer releases a breeze by adding it as a Git submodule.

```bash
$ cd your/project/root
$ git submodule add git@github.com:storypioneers/kirby-selector.git site/fields/selector
```

Updating all your Git submodules (eg. the Kirby core modules and any extensions added as submodules) to their latest version, all you need to do is to run these two Git commands.

```bash
$ cd your/project/root
$ git submodule foreach --recursive git checkout master
$ git submodule foreach --recursive git pull
```

## Usage

As soon as you dropped the field extension into your fields folder you can use it in your blueprints: simply add `selector` fields to your blueprints and set some options (where applicable).

```
fields:
	postimage:
		label: Main Post Image
		type:  selector
		mode:  single
		types:
			- image
```
```
fields:
	attachments:
		label: Post Attachments
		type:  selector
		mode:  multiple
		types:
			- all
```

## Options

The field offers some options that can be set on a per field basis directly from your blueprints.

### mode

Define a mode the field will work in. Possible values are `single` and `multiple`.

* **single**: With the `single` mode, the fields checkboxes will work like a set of radio buttons, letting you select a single file only. This is useful if you want a way to specify a posts main image.

* **multiple**: This option allows you to select multiple files in a single file selector field. The selected files will be stored as a comma separated list.

### types

Define the files types the file selector field shows. Possible values are `all`, `image`, `video`, `audio`, `document`, `archive`, `code`, `unknown`. You may specify as many of these types as you like.

```
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

```
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

```
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

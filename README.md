# Selector – Kirby Fileselect Field

![Release](https://img.shields.io/github/release/storypioneers/kirby-selector.svg)  ![Issues](https://img.shields.io/github/issues/storypioneers/kirby-selector.svg) ![License](https://img.shields.io/badge/license-GPLv3-blue.svg)

This additional panel field for [Kirby 2](http://getkirby.com) allows you to use an intuitive alternative file selection field in your blueprints.

**Version**: 1.0.0

**Authors**: [@JonasDoebertin](https://github.com/JonasDoebertin/), [@storypioneers](https://github.com/storypioneers)

**License**: [GNU GPL v3.0](http://opensource.org/licenses/GPL-3.0)

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

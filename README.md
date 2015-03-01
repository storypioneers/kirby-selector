# Selector – Kirby Fileselect Field

This additional panel field for [Kirby 2](http://getkirby.com) allows you to use an intuitive alternative file selection field in your blueprints.

**Version**: 1.0.0

**Authors**: [@storypioneers/kirby](https://github.com/orgs/storypioneers/teams/kirby)

**License**: [GNU GPL v3.0](http://opensource.org/licenses/GPL-3.0)


## Installation

If not already existing, add a new `fields` folder to your `site` directory. Then copy or link the entire `selector` folder there. Afterwards, your directory structure should look like this:

```
site/
	fields/
		selector/
			assests/
			selector.php
			template.php
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
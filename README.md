# formulize
formula UI generator

[![npm version](https://badge.fury.io/js/jquery-formula.svg)](https://badge.fury.io/js/jquery-formula) [![Bower version](https://badge.fury.io/bo/jquery-formula.svg)](https://badge.fury.io/bo/jquery-formula) [![ghit.me](https://ghit.me/badge.svg?repo=KennethanCeyer/Formula)](https://ghit.me/repo/KennethanCeyer/Formula) [![Join the chat at https://gitter.im/KennethanCeyer/PIGNOSE](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/KennethanCeyer/PIGNOSE?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
----

### Getting started

This plugin helps you to make formulas.

It's a stable version on IE8 higher and any most browsers.

[Check demo page](http://www.pigno.se/barn/PIGNOSE-Formula)

![Sample screen](http://www.pigno.se/barn/PIGNOSE-Formula/demo/img/screenshot_main.png)

----

### Usage

This plugin has a dependency on jQuery library.

So first of all, you need to import formula css, js file (check src or dist folder in this repository) after jQuery imported.

And try to write this snippet in your html file.

```html
<head>
	...
	<script type="text/javascript">
		$(function() {
			var $formula = $('.formula').formula();
		});
	</script>
</head>
<body>
	<div class="formula"></div>
</body>
```

----

#### Advanced usage

If you want get javascript object from the formula, you can call getFormula() method.

Check the sample below.

```html
<head>
	...
	<script type="text/javascript">
		$(function() {
			var $formula = $('.formula').formula();
			$formula.data('formula').getFormula(); // Get formula as a string type.
			
			//=====================================
			
			var $formulaCustom = $('.formula-custom').formula({
				filter: function(data) {
				// filter option is called when getFormula() method is called.
				// this option helps you to customize the formula data.
				// data parameter on this function are about formula (object type).
					return data;
				}
			});
			
			// if filter option is used, getFormula() will return data as an object type. 
			console.log($formulaCustom.data('formula').getFormula());
		});
	</script>
</head>
<body>
	<div class="formula"></div>
	<div class="formula-custom"></div>
</body>
```

----

### Installation

#### Zip file download

[Latest zip file link](https://github.com/KennethanCeyer/Formula/archive/master.zip)

#### Git

```bash
git clone git@github.com:KennethanCeyer/Formula.git --recursive
```

#### Bower

```bash
bower install jquery-formula
```

#### NPM

```bash
npm install jquery-formula
```

----

### Notes

The purpose of this plugin is as follows. 

1. The textarea can be edited with HTML markup. 
2. It must support the validation check of formula expressions.
3. The UI of numbers or other operators in formula should be cool and easy.

----

### Library

This project is related with https://github.com/KennethanCeyer/FormulaParser (built-in)

----

### Question

If you found something problem of this plugin, or you have some question.

Please send me a message to use either [gitter](https://gitter.im/KennethanCeyer/PIGNOSE) or [Github issue](https://github.com/KennethanCeyer/Formula/issues). (gitter url is on the top of the manual)

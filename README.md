# formulize
formula UI generator

[![NPM](https://nodei.co/npm/formulize.png)](https://nodei.co/npm/formulize/)

[![npm version](https://badge.fury.io/js/formulize.svg)](https://badge.fury.io/js/formulize) [![Join the chat at https://gitter.im/KennethanCeyer/PIGNOSE](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/KennethanCeyer/PIGNOSE?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Build Status](https://travis-ci.org/KennethanCeyer/formulize.svg?branch=master)](https://travis-ci.org/KennethanCeyer/formulize) [![codecov](https://codecov.io/gh/KennethanCeyer/formulize/branch/master/graph/badge.svg)](https://codecov.io/gh/KennethanCeyer/formulize) [![Coverage Status](https://coveralls.io/repos/github/KennethanCeyer/formulize/badge.svg?branch=master)](https://coveralls.io/github/KennethanCeyer/formulize?branch=master) [![Test Coverage](https://api.codeclimate.com/v1/badges/e8bbc8a49edebf28cb2a/test_coverage)](https://codeclimate.com/github/KennethanCeyer/formulize/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/e8bbc8a49edebf28cb2a/maintainability)](https://codeclimate.com/github/KennethanCeyer/formulize/maintainability) [![CodeFactor](https://www.codefactor.io/repository/github/kennethanceyer/formulize/badge)](https://www.codefactor.io/repository/github/kennethanceyer/formulize) 

----

### Getting started

This plugin helps you to make formulas.

It's a stable version on IE8 higher and any most browsers.

[Check demo page](http://www.pigno.se/barn/PIGNOSE-Formula)

![Sample screen](http://www.pigno.se/barn/PIGNOSE-Formula/demo/img/screenshot_main.png)

----

### Example

This plugin has a dependency on jQuery library.

So first of all, you need to import formula css, js file (check src or dist folder in this repository) after jQuery imported.

And try to write this snippet in your html file.

```html
<head>
	...
	<script type="text/javascript">
		$(function() {
			var $formula = $('.formula').formulize();
		});
	</script>
</head>
<body>
	<div class="formula"></div>
</body>
```

----

### Installation

#### git

```bash
$ git clone git@github.com:KennethanCeyer/formulize
```

#### npm

```bash
$ npm install formulize
```

### yarn

```bash
$ yarn add formulize
```

----

### License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

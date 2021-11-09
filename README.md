<h1 align="center">formulize :waxing_crescent_moon:</h1>

<p align="center">formula UI generator</p>

<p align="center"><a href="https://nodei.co/npm/formulize/"><img src="https://nodei.co/npm/formulize.png" alt="NPM"></a></p>

<p align="center">
    <a href="https://badge.fury.io/js/formulize"><img src="https://badge.fury.io/js/formulize.svg" alt="npm version"></a>
    <a href="https://gitter.im/KennethanCeyer/PIGNOSE?utm_source=badge&amp;utm_medium=badge&amp;utm_campaign=pr-badge&amp;utm_content=badge"><img src="https://badges.gitter.im/Join%20Chat.svg" alt="Join the chat at https://gitter.im/KennethanCeyer/PIGNOSE"></a>
    <a href="https://github.com/KennethanCeyer/formulize/network"><img src="https://img.shields.io/github/stars/KennethanCeyer/formulize.svg" alt="GitHub stars"></a>
    <a href="https://github.com/KennethanCeyer/formulize/blob/master/LICENSE"><img src="https://img.shields.io/github/license/KennethanCeyer/formulize.svg" alt="GitHub license"></a>
</p>

<p align="center">
    <a href="https://travis-ci.org/KennethanCeyer/formulize"><img src="https://travis-ci.org/KennethanCeyer/formulize.svg?branch=master" alt="Build Status"></a>
    <a href="https://codecov.io/gh/KennethanCeyer/formulize"><img src="https://codecov.io/gh/KennethanCeyer/formulize/branch/master/graph/badge.svg" alt="codecov"></a>
    <a href="https://coveralls.io/github/KennethanCeyer/formulize?branch=master"><img src="https://coveralls.io/repos/github/KennethanCeyer/formulize/badge.svg?branch=master" alt="Coverage Status"></a>
    <a href="https://codeclimate.com/github/KennethanCeyer/formulize/test_coverage"><img src="https://api.codeclimate.com/v1/badges/e8bbc8a49edebf28cb2a/test_coverage" alt="Test Coverage"></a>
</p>

<p align="center">
    <a href="https://codeclimate.com/github/KennethanCeyer/formulize/maintainability"><img src="https://api.codeclimate.com/v1/badges/e8bbc8a49edebf28cb2a/maintainability" alt="Maintainability"></a>
    <a href="https://www.codefactor.io/repository/github/kennethanceyer/formulize"><img src="https://www.codefactor.io/repository/github/kennethanceyer/formulize/badge" alt="CodeFactor"></a>
</p>

## :package: Installation

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

## :clap: Getting started

This plugin helps you to make formulas WYSWYG UI

> this plugin is based [metric-parser](https://github.com/KennethanCeyer/metric-parser)

[demo page](http://www.pigno.se/barn/PIGNOSE-Formula)

![Sample screen](http://www.pigno.se/barn/PIGNOSE-Formula/demo/img/screenshot_main.png)

## :page_with_curl: Example (basic)


```html
<div id="formulize"></div>
```

If you want to make UI into `#formulize`

#### typescript

```typescript
import { UI } from 'formulize';

const target = document.getElementById('formulize');
const formulize = new UI(target, {
    ...options
});

const data: Tree = {
    operator: '*',
    operand1: { value: { type: 'unit', unit: 1 } },
    operand2: { value: { type: 'unit', unit: 2 } }
};

formulize.setData(data);
```  

#### javascript (ES6)

```javascript
import { UI } from 'formulize';

const target = document.getElementById('formulize');
const formulize = new UI(target, {
    ...options
});

const data = {
    operator: '*',
    operand1: { value: { type: 'unit', unit: 1 } },
    operand2: { value: { type: 'unit', unit: 2 } }
};

formulize.setData(data);
```

#### jQuery

```javascript
$(function() {
    $('#formulize').formulize({
        ...options
    });

    const formulize = $('#formulize').data('$formulize');
    const data = {
        operator: '*',
        operand1: { value: { type: 'unit', unit: 1 } },
        operand2: { value: { type: 'unit', unit: 2 } }
    };

    formulize.setData(data);

    // unrecommended way
    $('#formulize').setData(data);
});
```

## :triangular_flag_on_post: Roadmap

- [x] support typescript
- [x] update formula tree parser
- [x] support reference docs
- [x] follow clean code philosophy
- [x] follow object based implementation
- [x] support UMD module
- [x] support code qualify tool
- [x] support automation test environment
- [x] support scss style file
- [ ] support multiple themes
- [ ] support unit code to achieve coverage over 90%
- [ ] support integration testing with mocking dom in the code-level 
- [ ] support e2e testing
- [ ] add guideline in Github WIKI
- [ ] add guideline snippet gist and jsfiddle
- [ ] add contributor guidelines
- [ ] support cdn

## :mag: License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FKennethanCeyer%2Fformulize.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FKennethanCeyer%2Fformulize?ref=badge_large)

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

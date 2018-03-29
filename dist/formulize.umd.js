(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.formulize = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    var FormulizeHelper = /** @class */ (function () {
        function FormulizeHelper() {
        }
        FormulizeHelper.getDataValue = function (elem) {
            var jQueryElem = $(elem);
            var value = jQueryElem.data('value');
            return value !== undefined
                ? value
                : $(elem).text();
        };
        FormulizeHelper.isOverDistance = function (position, targetPosition, distance) {
            return Math.abs(position.x - targetPosition.x) <= distance &&
                Math.abs(position.y - targetPosition.y) <= distance;
        };
        FormulizeHelper.getDragElement = function (id) {
            return $("<div class=\"" + id + "-drag\"></div>")[0];
        };
        FormulizeHelper.getCursorElement = function (id) {
            return $("<div class=\"" + id + "-cursor\"></div>")[0];
        };
        return FormulizeHelper;
    }());

    var defaultOptions = {
        id: 'formulize',
        cursor: {
            time: {
                animate: 160,
                delay: 500
            }
        },
        text: {
            formula: 'formula',
            error: 'error',
            pass: 'passed'
        },
        export: function (elem) { return FormulizeHelper.getDataValue(elem); }
    };

    var Key;
    (function (Key) {
        Key[Key["Backspace"] = 8] = "Backspace";
        Key[Key["Tab"] = 9] = "Tab";
        Key[Key["Enter"] = 13] = "Enter";
        Key[Key["Shift"] = 16] = "Shift";
        Key[Key["Ctrl"] = 17] = "Ctrl";
        Key[Key["Alt"] = 18] = "Alt";
        Key[Key["PauseBreak"] = 19] = "PauseBreak";
        Key[Key["CapsLock"] = 20] = "CapsLock";
        Key[Key["Escape"] = 27] = "Escape";
        Key[Key["Space"] = 32] = "Space";
        Key[Key["PageUp"] = 33] = "PageUp";
        Key[Key["PageDown"] = 34] = "PageDown";
        Key[Key["End"] = 35] = "End";
        Key[Key["Home"] = 36] = "Home";
        Key[Key["LeftArrow"] = 37] = "LeftArrow";
        Key[Key["UpArrow"] = 38] = "UpArrow";
        Key[Key["RightArrow"] = 39] = "RightArrow";
        Key[Key["DownArrow"] = 40] = "DownArrow";
        Key[Key["Insert"] = 45] = "Insert";
        Key[Key["Delete"] = 46] = "Delete";
        Key[Key["Zero"] = 48] = "Zero";
        Key[Key["ClosedParen"] = 48] = "ClosedParen";
        Key[Key["One"] = 49] = "One";
        Key[Key["ExclamationMark"] = 49] = "ExclamationMark";
        Key[Key["Two"] = 50] = "Two";
        Key[Key["AtSign"] = 50] = "AtSign";
        Key[Key["Three"] = 51] = "Three";
        Key[Key["PoundSign"] = 51] = "PoundSign";
        Key[Key["Hash"] = 51] = "Hash";
        Key[Key["Four"] = 52] = "Four";
        Key[Key["DollarSign"] = 52] = "DollarSign";
        Key[Key["Five"] = 53] = "Five";
        Key[Key["PercentSign"] = 53] = "PercentSign";
        Key[Key["Six"] = 54] = "Six";
        Key[Key["Caret"] = 54] = "Caret";
        Key[Key["Hat"] = 54] = "Hat";
        Key[Key["Seven"] = 55] = "Seven";
        Key[Key["Ampersand"] = 55] = "Ampersand";
        Key[Key["Eight"] = 56] = "Eight";
        Key[Key["Star"] = 56] = "Star";
        Key[Key["Asterik"] = 56] = "Asterik";
        Key[Key["Nine"] = 57] = "Nine";
        Key[Key["OpenParen"] = 57] = "OpenParen";
        Key[Key["A"] = 65] = "A";
        Key[Key["B"] = 66] = "B";
        Key[Key["C"] = 67] = "C";
        Key[Key["D"] = 68] = "D";
        Key[Key["E"] = 69] = "E";
        Key[Key["F"] = 70] = "F";
        Key[Key["G"] = 71] = "G";
        Key[Key["H"] = 72] = "H";
        Key[Key["I"] = 73] = "I";
        Key[Key["J"] = 74] = "J";
        Key[Key["K"] = 75] = "K";
        Key[Key["L"] = 76] = "L";
        Key[Key["M"] = 77] = "M";
        Key[Key["N"] = 78] = "N";
        Key[Key["O"] = 79] = "O";
        Key[Key["P"] = 80] = "P";
        Key[Key["Q"] = 81] = "Q";
        Key[Key["R"] = 82] = "R";
        Key[Key["S"] = 83] = "S";
        Key[Key["T"] = 84] = "T";
        Key[Key["U"] = 85] = "U";
        Key[Key["V"] = 86] = "V";
        Key[Key["W"] = 87] = "W";
        Key[Key["X"] = 88] = "X";
        Key[Key["Y"] = 89] = "Y";
        Key[Key["Z"] = 90] = "Z";
        Key[Key["LeftWindowKey"] = 91] = "LeftWindowKey";
        Key[Key["RightWindowKey"] = 92] = "RightWindowKey";
        Key[Key["SelectKey"] = 93] = "SelectKey";
        Key[Key["Numpad0"] = 96] = "Numpad0";
        Key[Key["Numpad1"] = 97] = "Numpad1";
        Key[Key["Numpad2"] = 98] = "Numpad2";
        Key[Key["Numpad3"] = 99] = "Numpad3";
        Key[Key["Numpad4"] = 100] = "Numpad4";
        Key[Key["Numpad5"] = 101] = "Numpad5";
        Key[Key["Numpad6"] = 102] = "Numpad6";
        Key[Key["Numpad7"] = 103] = "Numpad7";
        Key[Key["Numpad8"] = 104] = "Numpad8";
        Key[Key["Numpad9"] = 105] = "Numpad9";
        Key[Key["Multiply"] = 106] = "Multiply";
        Key[Key["Add"] = 107] = "Add";
        Key[Key["Subtract"] = 109] = "Subtract";
        Key[Key["DecimalPoint"] = 110] = "DecimalPoint";
        Key[Key["Divide"] = 111] = "Divide";
        Key[Key["F1"] = 112] = "F1";
        Key[Key["F2"] = 113] = "F2";
        Key[Key["F3"] = 114] = "F3";
        Key[Key["F4"] = 115] = "F4";
        Key[Key["F5"] = 116] = "F5";
        Key[Key["F6"] = 117] = "F6";
        Key[Key["F7"] = 118] = "F7";
        Key[Key["F8"] = 119] = "F8";
        Key[Key["F9"] = 120] = "F9";
        Key[Key["F10"] = 121] = "F10";
        Key[Key["F11"] = 122] = "F11";
        Key[Key["F12"] = 123] = "F12";
        Key[Key["NumLock"] = 144] = "NumLock";
        Key[Key["ScrollLock"] = 145] = "ScrollLock";
        Key[Key["SemiColon"] = 186] = "SemiColon";
        Key[Key["Equals"] = 187] = "Equals";
        Key[Key["Comma"] = 188] = "Comma";
        Key[Key["Dash"] = 189] = "Dash";
        Key[Key["Period"] = 190] = "Period";
        Key[Key["UnderScore"] = 189] = "UnderScore";
        Key[Key["PlusSign"] = 187] = "PlusSign";
        Key[Key["ForwardSlash"] = 191] = "ForwardSlash";
        Key[Key["Tilde"] = 192] = "Tilde";
        Key[Key["GraveAccent"] = 192] = "GraveAccent";
        Key[Key["OpenBracket"] = 219] = "OpenBracket";
        Key[Key["ClosedBracket"] = 221] = "ClosedBracket";
        Key[Key["Quote"] = 222] = "Quote";
    })(Key || (Key = {}));

    var FormulizeKeyHelper = /** @class */ (function () {
        function FormulizeKeyHelper() {
        }
        FormulizeKeyHelper.isReload = function (keyCode, pressedCtrl) {
            return keyCode === Key.F5 || pressedCtrl && keyCode === Key.R;
        };
        FormulizeKeyHelper.isSelectAll = function (keyCode, pressedCtrl) {
            return keyCode === Key.A && pressedCtrl;
        };
        FormulizeKeyHelper.isBackspace = function (keyCode) {
            return keyCode === Key.Backspace;
        };
        FormulizeKeyHelper.isDelete = function (keyCode) {
            return keyCode === Key.Delete;
        };
        FormulizeKeyHelper.isLeft = function (keyCode) {
            return keyCode === Key.LeftArrow;
        };
        FormulizeKeyHelper.isUp = function (keyCode) {
            return keyCode === Key.UpArrow;
        };
        FormulizeKeyHelper.isRight = function (keyCode) {
            return keyCode === Key.RightArrow;
        };
        FormulizeKeyHelper.isDown = function (keyCode) {
            return keyCode === Key.DownArrow;
        };
        FormulizeKeyHelper.isHome = function (keyCode) {
            return keyCode === Key.Home;
        };
        FormulizeKeyHelper.isEnd = function (keyCode) {
            return keyCode === Key.End;
        };
        FormulizeKeyHelper.doReload = function () {
            location.reload();
        };
        FormulizeKeyHelper.doAction = function (action) {
            return action;
        };
        return FormulizeKeyHelper;
    }());

    var Helper = /** @class */ (function () {
        function Helper() {
        }
        Helper.toDecimal = function (value) {
            var splitValue = value.split('.');
            var prefix = splitValue[0]
                .replace(/[^\d.]*/gi, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            var suffix = (splitValue[1] || '').replace(/[^\d.]*/gi, '');
            return [prefix, suffix].join('.');
        };
        Helper.getKeyCodeValue = function (keyCode, pressedShift) {
            if (pressedShift === void 0) { pressedShift = false; }
            if (keyCode === Key.Multiply)
                return 'x';
            if (((keyCode === Key.PlusSign || keyCode === 61) && pressedShift) || keyCode === Key.Add)
                return '+';
            if (keyCode === Key.Dash || keyCode === 173 || keyCode === Key.Subtract)
                return '-';
            if (keyCode === Key.Period || keyCode === Key.DecimalPoint)
                return '.';
            if (keyCode === Key.ForwardSlash || keyCode === Key.Divide)
                return '/';
            return String.fromCharCode(keyCode);
        };
        return Helper;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends$1(d, b) {
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    var Token;
    (function (Token) {
        var Type;
        (function (Type) {
            Type[Type["Unknown"] = 0] = "Unknown";
            Type[Type["Value"] = 1] = "Value";
            Type[Type["Dot"] = 2] = "Dot";
            Type[Type["Operator"] = 3] = "Operator";
            Type[Type["Bracket"] = 4] = "Bracket";
            Type[Type["Function"] = 5] = "Function";
            Type[Type["WhiteSpace"] = 6] = "WhiteSpace";
            Type[Type["CompareToken"] = 7] = "CompareToken";
        })(Type = Token.Type || (Token.Type = {}));
        var SubType;
        (function (SubType) {
            SubType[SubType["Group"] = 0] = "Group";
        })(SubType = Token.SubType || (Token.SubType = {}));
        Token.literal = {
            Addition: '+',
            Subtraction: '-',
            Multiplication: '*',
            MultiplicationLiteral: 'x',
            Division: '/',
            Mod: '%',
            Pow: '^',
            BracketOpen: '(',
            BracketClose: ')',
            Dot: '.'
        };
        Token.addition = [Token.literal.Addition];
        Token.subtraction = [Token.literal.Subtraction];
        Token.multiplication = [Token.literal.Multiplication, Token.literal.MultiplicationLiteral];
        Token.division = [Token.literal.Division];
        Token.mod = [Token.literal.Mod];
        Token.pow = [Token.literal.Pow];
        Token.bracketOpen = Token.literal.BracketOpen;
        Token.bracketClose = Token.literal.BracketClose;
        Token.bracket = [Token.bracketOpen, Token.bracketClose];
        Token.precedence = Token.addition.concat(Token.subtraction, Token.multiplication, Token.division, Token.pow, Token.mod, Token.bracket);
        Token.operators = Token.addition.concat(Token.subtraction, Token.multiplication, Token.division, Token.mod, Token.pow);
        Token.symbols = Token.operators.concat(Token.bracket);
        Token.whiteSpace = [
            ' ',
            '',
            null,
            undefined,
        ];
    })(Token || (Token = {}));

    var TokenTypeHelper = /** @class */ (function () {
        function TokenTypeHelper() {
        }
        TokenTypeHelper.isNumeric = function (value) {
            return (/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/).test(String(value));
        };
        TokenTypeHelper.isArray = function (token) {
            return Array.isArray(token);
        };
        TokenTypeHelper.isString = function (token) {
            return typeof token === 'string';
        };
        TokenTypeHelper.isObject = function (token) {
            return typeof token === 'object';
        };
        TokenTypeHelper.isValue = function (token) {
            return TokenTypeHelper.isObject(token) || TokenTypeHelper.isNumeric(token);
        };
        return TokenTypeHelper;
    }());

    var TokenHelperBase = /** @class */ (function (_super) {
        __extends$1(TokenHelperBase, _super);
        function TokenHelperBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TokenHelperBase.isToken = function (token) {
            var validators = [
                TokenHelperBase.isNumeric,
                TokenHelperBase.isSymbol,
                TokenHelperBase.isObject
            ];
            return token && validators.some(function (validator) { return validator(token); });
        };
        TokenHelperBase.isUnkown = function (token) {
            return token === undefined || token === null;
        };
        TokenHelperBase.isLineEscape = function (token) {
            return token === '\n';
        };
        TokenHelperBase.isWhiteSpace = function (token) {
            return Token.whiteSpace.includes(String(token));
        };
        TokenHelperBase.isDot = function (token) {
            return token === Token.literal.Dot;
        };
        TokenHelperBase.isAddition = function (token) {
            return Token.addition.includes(token);
        };
        TokenHelperBase.isSubtraction = function (token) {
            return Token.subtraction.includes(token);
        };
        TokenHelperBase.isMultiplication = function (token) {
            return Token.multiplication.includes(token);
        };
        TokenHelperBase.isDivision = function (token) {
            return Token.division.includes(token);
        };
        TokenHelperBase.isMod = function (token) {
            return Token.mod.includes(token);
        };
        TokenHelperBase.isPow = function (token) {
            return Token.pow.includes(token);
        };
        TokenHelperBase.isBracket = function (token) {
            return Token.bracket.includes(token);
        };
        TokenHelperBase.isBracketOpen = function (token) {
            return token === Token.bracketOpen;
        };
        TokenHelperBase.isBracketClose = function (token) {
            return token === Token.bracketClose;
        };
        TokenHelperBase.isSymbol = function (token) {
            return Token.symbols.includes(String(token));
        };
        TokenHelperBase.isOperator = function (token) {
            return Token.operators.includes(String(token));
        };
        return TokenHelperBase;
    }(TokenTypeHelper));

    var TokenHelper = /** @class */ (function (_super) {
        __extends$1(TokenHelper, _super);
        function TokenHelper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TokenHelper.isHigher = function (source, target) {
            return TokenHelper.getPrecedence(source) - TokenHelper.getPrecedence(target) > 0;
        };
        TokenHelper.induceType = function (token) {
            var typeInducers = [
                { predicate: TokenHelper.isUnkown, type: Token.Type.Unknown },
                { predicate: TokenHelper.isWhiteSpace, type: Token.Type.WhiteSpace },
                { predicate: TokenHelper.isOperator, type: Token.Type.Operator },
                { predicate: TokenHelper.isBracket, type: Token.Type.Bracket },
                { predicate: TokenHelper.isDot, type: Token.Type.Dot },
                { predicate: TokenHelper.isValue, type: Token.Type.Value }
            ];
            var extractedToken = typeInducers.find(function (inducer) { return inducer.predicate(token); });
            return extractedToken
                ? extractedToken.type
                : Token.Type.Unknown;
        };
        TokenHelper.getPrecedence = function (token) {
            return [
                [TokenHelper.isAddition, TokenHelper.isSubtraction],
                [TokenHelper.isMultiplication, TokenHelper.isDivision],
                [TokenHelper.isMod, TokenHelper.isPow],
                [TokenHelper.isBracket]
            ].findIndex(function (predicate) { return predicate.some(function (func) { return func(token); }); });
        };
        return TokenHelper;
    }(TokenHelperBase));

    var BuilderHelper = /** @class */ (function () {
        function BuilderHelper() {
        }
        BuilderHelper.isOperand = function (data) {
            return !!data.value;
        };
        BuilderHelper.isTree = function (value) {
            return TokenHelper.isObject(value) && !TokenHelper.isArray(value);
        };
        BuilderHelper.needParse = function (value) {
            return !BuilderHelper.isTree(value);
        };
        BuilderHelper.needUnparse = function (value) {
            return BuilderHelper.isTree(value);
        };
        return BuilderHelper;
    }());

    var StringHelper = /** @class */ (function () {
        function StringHelper() {
        }
        StringHelper.format = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var targetValue = value;
            if (args)
                args.forEach(function (match, index) { return targetValue = StringHelper.replaceArg(index, targetValue, match); });
            return targetValue;
        };
        StringHelper.replaceArg = function (match, target, value) {
            return target.replace(new RegExp("\\{" + match + "\\}", 'g'), value);
        };
        return StringHelper;
    }());

    var success = 0;
    var ParserError = /** @class */ (function (_super) {
        __extends$1(ParserError, _super);
        function ParserError(error) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.error = error;
            Object.setPrototypeOf(_this, ParserError.prototype);
            if (args.length)
                _this.error = __assign$1({}, _this.error, { text: StringHelper.format.apply(StringHelper, [_this.error.text].concat(args)) });
            _this.code = _this.error.code;
            _this.text = _this.error.text;
            _this.message = _this.text;
            return _this;
        }
        ParserError.prototype.withStack = function (stack) {
            this.parserStack = stack;
            return this;
        };
        ParserError.defaultParserStack = { line: 0, col: 0 };
        return ParserError;
    }(Error));

    var Packer = /** @class */ (function () {
        function Packer() {
        }
        Packer.makeData = function (data, code) {
            if (code === void 0) { code = success; }
            return { code: code, data: data };
        };
        Packer.makeError = function (error) {
            return __assign$1({}, this.makeData(error.text, error.code), { stack: error.parserStack || __assign$1({}, ParserError.defaultParserStack) });
        };
        return Packer;
    }());

    /* tslint:disable:max-line-length */
    var BuilderError;
    (function (BuilderError) {
        BuilderError.id = 0x0300;
        BuilderError.emptyData = { code: 0x0300, text: 'data is empty' };
    })(BuilderError || (BuilderError = {}));
    /* tslint:enable:max-line-length */

    /* tslint:disable:max-line-length */
    var TokenError;
    (function (TokenError) {
        TokenError.id = 0x0100;
        TokenError.invalidToken = { code: 0x0100, text: '`{0}` token is invalid token type' };
        TokenError.invalidTwoOperator = { code: 0x0101, text: 'two operators `{0}`, `{1}` can not come together' };
        TokenError.invalidNonNumericValue = { code: 0x0102, text: 'non-numeric token `{0}` can not be consecutive' };
        TokenError.missingOperator = { code: 0x0112, text: 'the operator is missing after `{0}`' };
        TokenError.missingOpenBracket = { code: 0x0120, text: 'missing open bracket, you cannot close the bracket' };
        TokenError.missingCloseBracket = { code: 0x0121, text: 'missing close bracket, the bracket must be closed' };
        TokenError.emptyToken = { code: 0x0150, text: 'token is empty' };
    })(TokenError || (TokenError = {}));
    /* tslint:enable:max-line-length */

    var AbstractSyntaxTreeNode = /** @class */ (function () {
        function AbstractSyntaxTreeNode(value) {
            if (value)
                this.value = value;
        }
        Object.defineProperty(AbstractSyntaxTreeNode.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = TokenHelper.isNumeric(value)
                    ? Number(value)
                    : value;
                this._type = TokenHelper.induceType(this.value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSyntaxTreeNode.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSyntaxTreeNode.prototype, "subType", {
            get: function () {
                return this._subType;
            },
            set: function (value) {
                this._subType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSyntaxTreeNode.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSyntaxTreeNode.prototype, "leftNode", {
            get: function () {
                return this._leftNode;
            },
            set: function (node) {
                if (!node)
                    return;
                this._leftNode = node;
                node.parent = this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSyntaxTreeNode.prototype, "rightNode", {
            get: function () {
                return this._rightNode;
            },
            set: function (node) {
                if (!node)
                    return;
                this._rightNode = node;
                node.parent = this;
            },
            enumerable: true,
            configurable: true
        });
        return AbstractSyntaxTreeNode;
    }());

    var AbstractSyntaxTreeBase = /** @class */ (function (_super) {
        __extends$1(AbstractSyntaxTreeBase, _super);
        function AbstractSyntaxTreeBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AbstractSyntaxTreeBase.prototype.findRoot = function () {
            if (this.isRoot())
                return this.value !== undefined || !this.leftNode
                    ? this
                    : this.leftNode;
            return this._parent.findRoot();
        };
        AbstractSyntaxTreeBase.prototype.isRoot = function () {
            return !this._parent;
        };
        AbstractSyntaxTreeBase.prototype.isValid = function () {
            return this.value && (!this.leftNode && !this.rightNode) || (!!this.leftNode && !!this.rightNode);
        };
        AbstractSyntaxTreeBase.prototype.hasOpenBracket = function () {
            if (TokenHelper.isBracketOpen(this.value))
                return true;
            var leftNodeHasOpenBracket = this.leftNode ? this.leftNode.hasOpenBracket() : false;
            var rightNodeHasOpenBracket = this.rightNode ? this.rightNode.hasOpenBracket() : false;
            return leftNodeHasOpenBracket || rightNodeHasOpenBracket;
        };
        AbstractSyntaxTreeBase.prototype.findOpenedBracket = function () {
            if (this.isRoot())
                return undefined;
            if (TokenHelper.isBracketOpen(this._value))
                return this;
            return this._parent.findOpenedBracket();
        };
        AbstractSyntaxTreeBase.prototype.removeRootBracket = function () {
            var rootNode = this.findRoot();
            if (TokenHelper.isBracketOpen(rootNode.value))
                rootNode.leftNode.removeParent();
            return this === rootNode
                ? rootNode.leftNode
                : this;
        };
        AbstractSyntaxTreeBase.prototype.removeClosestBracket = function () {
            var node = this.findOpenedBracket();
            if (!node)
                throw new ParserError(TokenError.missingOpenBracket);
            var targetNode = node.leftNode;
            targetNode.subType = Token.SubType.Group;
            if (!node.parent) {
                targetNode.removeParent();
                return targetNode;
            }
            if (node.parent.leftNode === node)
                node.parent.leftNode = targetNode;
            else
                node.parent.rightNode = targetNode;
            return node.parent;
        };
        AbstractSyntaxTreeBase.prototype.climbUp = function (token) {
            return this.isClimbTop(token)
                ? this
                : this._parent.climbUp(token);
        };
        AbstractSyntaxTreeBase.prototype.isClimbTop = function (token) {
            return this.isTokenHighest(token) ||
                !this.parent ||
                TokenHelper.isBracketOpen(this.value);
        };
        AbstractSyntaxTreeBase.prototype.isTokenHighest = function (token) {
            return TokenHelper.isHigher(token, this.value) && this.subType !== Token.SubType.Group;
        };
        AbstractSyntaxTreeBase.prototype.createChildNode = function (value) {
            var node = new this.constructor(value);
            node.parent = this;
            return node;
        };
        AbstractSyntaxTreeBase.prototype.createParentNode = function (value) {
            var node = new this.constructor(value);
            this.parent = node;
            return node;
        };
        AbstractSyntaxTreeBase.prototype.insertOperatorNode = function (value) {
            var rootNode = this.climbUp(value);
            if (TokenHelper.isBracketOpen(rootNode.value))
                return rootNode.insertJointNodeToLeft(value);
            if (this.needJointRight(rootNode, value))
                return rootNode.insertJointNodeToRight(value);
            var newNode = rootNode.createParentNode(value);
            newNode.leftNode = rootNode;
            return newNode;
        };
        AbstractSyntaxTreeBase.prototype.needJointRight = function (rootNode, value) {
            return rootNode.isTokenHighest(value) && rootNode.parent || this === rootNode;
        };
        AbstractSyntaxTreeBase.prototype.insertNode = function (value) {
            if (TokenHelper.isSymbol(value))
                if (!this.value) {
                    this.value = value;
                    return this;
                }
            if (TokenHelper.isOperator(value))
                return this.insertOperatorNode(value);
            var valueNode = this.createChildNode(value);
            if (!this.leftNode)
                this.leftNode = valueNode;
            else
                this.rightNode = valueNode;
            return valueNode;
        };
        AbstractSyntaxTreeBase.prototype.insertJointNodeToLeft = function (value) {
            var jointNode = this.createChildNode(value);
            jointNode.leftNode = this.leftNode;
            jointNode.rightNode = this.rightNode;
            this.leftNode = jointNode;
            return jointNode;
        };
        AbstractSyntaxTreeBase.prototype.insertJointNodeToRight = function (value) {
            var jointNode = this.createChildNode(value);
            jointNode.leftNode = this.rightNode;
            this.rightNode = jointNode;
            return jointNode;
        };
        AbstractSyntaxTreeBase.prototype.removeLeftNode = function () {
            this._leftNode.removeParent();
            this._leftNode = undefined;
        };
        AbstractSyntaxTreeBase.prototype.removeRightNode = function () {
            this._rightNode.removeParent();
            this._rightNode = undefined;
        };
        AbstractSyntaxTreeBase.prototype.removeParent = function () {
            this._parent = undefined;
        };
        return AbstractSyntaxTreeBase;
    }(AbstractSyntaxTreeNode));

    var AbstractSyntaxTree = /** @class */ (function (_super) {
        __extends$1(AbstractSyntaxTree, _super);
        function AbstractSyntaxTree() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(AbstractSyntaxTree.prototype, "expression", {
            get: function () {
                return this.makeExpression();
            },
            enumerable: true,
            configurable: true
        });
        AbstractSyntaxTree.prototype.getParentOperator = function () {
            if (this.isRoot())
                return undefined;
            return this.parent.findOperator();
        };
        AbstractSyntaxTree.prototype.findOperator = function () {
            if (this.type === Token.Type.Operator)
                return this;
            return this.parent.findOperator();
        };
        AbstractSyntaxTree.prototype.makeExpression = function () {
            return this.type === Token.Type.Operator
                ? this.makeOperatorExpression()
                : this.makeValueExpression();
        };
        AbstractSyntaxTree.prototype.makeOperatorExpression = function () {
            var expression = (this.leftNode ? this.leftNode.expression : []).concat([
                this.value
            ], this.rightNode ? this.rightNode.expression : []);
            var parentOperator = this.getParentOperator();
            return parentOperator && TokenHelper.isHigher(parentOperator.value, this.value)
                ? [Token.literal.BracketOpen].concat(expression, [Token.literal.BracketClose]) : expression;
        };
        AbstractSyntaxTree.prototype.makeValueExpression = function () {
            return [this.value];
        };
        return AbstractSyntaxTree;
    }(AbstractSyntaxTreeBase));

    var TokenValidateLevel;
    (function (TokenValidateLevel) {
        TokenValidateLevel[TokenValidateLevel["Pass"] = 0] = "Pass";
        TokenValidateLevel[TokenValidateLevel["Escape"] = 1] = "Escape";
        TokenValidateLevel[TokenValidateLevel["Fatal"] = 2] = "Fatal";
    })(TokenValidateLevel || (TokenValidateLevel = {}));
    var TokenValidator = /** @class */ (function () {
        function TokenValidator() {
        }
        TokenValidator.validateToken = function (token) {
            var level = TokenValidator.extractTokenLevel(token);
            if (level === TokenValidateLevel.Fatal)
                return new ParserError(TokenError.invalidToken, token);
        };
        TokenValidator.validateValueToken = function (token, prevToken) {
            if (!prevToken)
                return undefined;
            if (TokenHelper.isValue(prevToken))
                return new ParserError(TokenError.missingOperator, prevToken);
            if (!TokenHelper.isBracketOpen(prevToken) && !TokenHelper.isOperator(prevToken))
                return new ParserError(TokenError.missingOperator, prevToken);
        };
        TokenValidator.extractTokenLevel = function (token) {
            var levelExtractors = [
                { predicate: TokenHelper.isUnkown, level: TokenValidateLevel.Fatal },
                { predicate: TokenHelper.isToken, level: TokenValidateLevel.Pass }
            ];
            var extractedLevel = levelExtractors.find(function (extractor) { return extractor.predicate(token); });
            return extractedLevel
                ? extractedLevel.level
                : TokenValidateLevel.Fatal;
        };
        return TokenValidator;
    }());

    var TokenEnumerable = /** @class */ (function () {
        function TokenEnumerable(token) {
            this.token = token;
            this.tokenStack = [];
            this.cursor = 0;
            this._nextStack = {
                line: 0,
                col: 0
            };
        }
        Object.defineProperty(TokenEnumerable.prototype, "stack", {
            get: function () {
                return this._stack || this._nextStack;
            },
            set: function (value) {
                this._stack = this._nextStack;
                this._nextStack = value;
            },
            enumerable: true,
            configurable: true
        });
        TokenEnumerable.prototype.rewind = function () {
            this.cursor = 0;
            this.currentToken = undefined;
            this._stack = undefined;
            this._nextStack = {
                col: 0,
                line: 0
            };
            this.tokenStack = [];
        };
        TokenEnumerable.prototype.calculateStack = function (token) {
            if (TokenHelper.isLineEscape(token)) {
                this.stack = {
                    line: this._nextStack.line + 1,
                    col: 0
                };
                return;
            }
            this.stack = {
                line: this._nextStack.line,
                col: this._nextStack.col + 1
            };
        };
        TokenEnumerable.prototype.finalizeStack = function () {
            this.stack = undefined;
        };
        TokenEnumerable.prototype.addStack = function (token) {
            this.tokenStack.push(token);
        };
        TokenEnumerable.prototype.popStack = function () {
            return this.tokenStack.length
                ? this.tokenStack[this.tokenStack.length - 1]
                : undefined;
        };
        TokenEnumerable.prototype.next = function () {
            var tokenStack = [];
            if (this.cursor >= this.token.length)
                return undefined;
            do {
                this.currentToken = this.findToken();
                if (!TokenHelper.isUnkown(this.currentToken))
                    tokenStack.push(this.currentToken);
            } while (this.proceedNext());
            var token = this.makeToken(tokenStack);
            var error = TokenValidator.validateToken(token);
            if (error)
                throw error;
            return token;
        };
        TokenEnumerable.prototype.proceedNext = function () {
            var token = this.currentToken;
            var nextToken = this.token[this.cursor];
            return this.isSequentialValue(token, nextToken);
        };
        TokenEnumerable.prototype.isSequentialValue = function (token, nextToken) {
            var tokenType = TokenHelper.induceType(token);
            var nextTokenType = TokenHelper.induceType(nextToken);
            return tokenType === Token.Type.Value && TokenHelper.isNumeric(token) && tokenType === nextTokenType ||
                tokenType === Token.Type.Value && TokenHelper.isNumeric(token) && nextTokenType === Token.Type.Dot ||
                tokenType === Token.Type.Dot && TokenHelper.isNumeric(nextToken) && nextTokenType === Token.Type.Value;
        };
        TokenEnumerable.prototype.findToken = function () {
            while (this.cursor < this.token.length) {
                var token = this.token[this.cursor];
                this.cursor += 1;
                this.calculateStack(token);
                if (!TokenHelper.isWhiteSpace(token))
                    return token;
            }
        };
        TokenEnumerable.prototype.isTokenArrayNumeric = function (tokens) {
            return tokens.every(function (token) { return TokenHelper.isNumeric(token) || TokenHelper.isDot(token); });
        };
        TokenEnumerable.prototype.makeToken = function (tokens) {
            if (!tokens.length)
                return undefined;
            if (this.isTokenArrayNumeric(tokens))
                return tokens.join('');
            if (tokens.length > 1)
                throw new ParserError(TokenError.invalidNonNumericValue, this.makeTokenString(tokens));
            return tokens[0];
        };
        TokenEnumerable.prototype.makeTokenString = function (tokens) {
            return tokens.map(function (token) { return typeof token === 'object' ? JSON.stringify(token) : token; }).join('');
        };
        return TokenEnumerable;
    }());

    var GeneralError;
    (function (GeneralError) {
        GeneralError.id = 0x1000;
        GeneralError.unknownError = { code: 0x1000, text: 'unknown error is occurred' };
        GeneralError.methodNotImplemented = { code: 0x1001, text: 'method not implemented' };
    })(GeneralError || (GeneralError = {}));

    var TokenAnalyzer = /** @class */ (function (_super) {
        __extends$1(TokenAnalyzer, _super);
        function TokenAnalyzer(token) {
            return _super.call(this, token) || this;
        }
        TokenAnalyzer.prototype.parse = function () {
            var _this = this;
            this.try(function () { return _this.preValidate(); });
            this.initialize();
            this.try(function () { return _this.makeAst(); });
            this.try(function () { return _this.postValidate(); });
            return this.ast;
        };
        TokenAnalyzer.prototype.initialize = function () {
            this.ast = new AbstractSyntaxTree(Token.literal.BracketOpen);
            this.ast.leftNode = new AbstractSyntaxTree();
            this.currentTree = this.ast.leftNode;
            this.rewind();
        };
        TokenAnalyzer.prototype.getAst = function () {
            return this.ast;
        };
        TokenAnalyzer.prototype.makeAst = function () {
            var _this = this;
            var token;
            while (token = this.next()) {
                this.try(function () { return _this.doAnalyzeToken(token); });
            }
            this.finalizeStack();
            this.ast = this.ast.removeRootBracket().findRoot();
        };
        TokenAnalyzer.prototype.try = function (tryFunction) {
            try {
                return tryFunction();
            }
            catch (error) {
                this.handleError(error);
            }
        };
        TokenAnalyzer.prototype.preValidate = function () {
            if (!this.token || !this.token.length)
                throw new ParserError(TokenError.emptyToken);
        };
        TokenAnalyzer.prototype.postValidate = function () {
            if (this.ast.hasOpenBracket())
                throw new ParserError(TokenError.missingCloseBracket);
        };
        TokenAnalyzer.prototype.handleError = function (error) {
            if (error instanceof ParserError)
                throw error.withStack(this.stack);
            throw new ParserError(GeneralError.unknownError).withStack(this.stack);
        };
        TokenAnalyzer.prototype.doAnalyzeToken = function (token) {
            this.analyzeToken(token);
            this.addStack(token);
        };
        TokenAnalyzer.prototype.analyzeToken = function (token) {
            var lastToken = this.popStack();
            if (TokenHelper.isBracket(token)) {
                this.analyzeBracketToken(token);
                return;
            }
            if (TokenHelper.isOperator(token)) {
                this.analyzeOperatorToken(token);
                return;
            }
            var error = TokenValidator.validateValueToken(token, lastToken);
            if (error)
                throw error;
            this.currentTree.insertNode(token);
        };
        TokenAnalyzer.prototype.analyzeBracketToken = function (token) {
            var lastToken = this.popStack();
            if (TokenHelper.isBracketOpen(token)) {
                if (lastToken && !TokenHelper.isSymbol(lastToken))
                    this.insertImplicitMultiplication();
                this.currentTree = this.currentTree.insertNode(token);
                return;
            }
            if (TokenHelper.isBracketClose(token)) {
                this.currentTree = this.currentTree.removeClosestBracket();
                this.ast = this.currentTree.findRoot();
                return;
            }
        };
        TokenAnalyzer.prototype.analyzeOperatorToken = function (token) {
            var lastToken = this.popStack();
            if (TokenHelper.isOperator(lastToken))
                throw new ParserError(TokenError.invalidTwoOperator, lastToken, token);
            if (!this.currentTree.value)
                this.currentTree.value = token;
            else {
                if (!TokenHelper.isBracket(this.currentTree.value) && !this.currentTree.rightNode)
                    throw new ParserError(TokenError.invalidTwoOperator, lastToken, token);
                this.currentTree = this.currentTree.insertNode(token);
                this.ast = this.ast.findRoot();
            }
        };
        TokenAnalyzer.prototype.insertImplicitMultiplication = function () {
            this.analyzeToken(Token.literal.Multiplication);
            this.addStack(Token.literal.Multiplication);
        };
        return TokenAnalyzer;
    }(TokenEnumerable));

    var ParserHelper = /** @class */ (function () {
        function ParserHelper() {
        }
        ParserHelper.getArray = function (data) {
            return typeof data === 'string'
                ? this.stringToArray(data)
                : data;
        };
        ParserHelper.stringToArray = function (value) {
            return value.split('');
        };
        return ParserHelper;
    }());

    var Parser = /** @class */ (function () {
        function Parser() {
        }
        Parser.parse = function (data) {
            var analyzer = new TokenAnalyzer(ParserHelper.getArray(data));
            return analyzer.parse();
        };
        Parser.unparse = function (ast) {
            return ast.expression;
        };
        return Parser;
    }());

    var BuilderBase = /** @class */ (function () {
        function BuilderBase(treeBuilder) {
            this.treeBuilder = treeBuilder;
        }
        BuilderBase.prototype.build = function (data) {
            var _this = this;
            return this.try(function () { return _this.doBuild(data); });
        };
        BuilderBase.prototype.parse = function (data) {
            var _this = this;
            return this.try(function () { return _this.doParse(data); });
        };
        BuilderBase.prototype.unparse = function (data) {
            var _this = this;
            return this.try(function () { return _this.doUnparse(data); });
        };
        BuilderBase.prototype.handleError = function (error) {
            return Packer.makeError(error);
        };
        BuilderBase.prototype.try = function (tryFunc) {
            try {
                return tryFunc();
            }
            catch (error) {
                return this.handleError(error);
            }
        };
        BuilderBase.prototype.doBuild = function (data) {
            throw new ParserError(GeneralError.methodNotImplemented);
        };
        BuilderBase.prototype.doParse = function (data) {
            throw new ParserError(GeneralError.methodNotImplemented);
        };
        BuilderBase.prototype.doUnparse = function (data) {
            throw new ParserError(GeneralError.methodNotImplemented);
        };
        return BuilderBase;
    }());

    var Builder = /** @class */ (function (_super) {
        __extends$1(Builder, _super);
        function Builder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Builder.prototype.doBuild = function (data) {
            if (!data)
                throw new ParserError(BuilderError.emptyData);
            if (BuilderHelper.needParse(data))
                return this.parse(data);
            if (BuilderHelper.needUnparse(data))
                return this.unparse(data);
        };
        Builder.prototype.doParse = function (data) {
            var ast = Parser.parse(data);
            var tree = this.treeBuilder.makeTree(ast);
            return Packer.makeData(tree);
        };
        Builder.prototype.doUnparse = function (data) {
            var ast = this.treeBuilder.makeAst(data);
            var expression = Parser.unparse(ast);
            return Packer.makeData(expression);
        };
        return Builder;
    }(BuilderBase));

    /* tslint:disable:max-line-length */
    var TreeError;
    (function (TreeError) {
        TreeError.id = 0x0200;
        TreeError.emptyAst = { code: 0x0200, text: 'AST is empty' };
        TreeError.emptyTree = { code: 0x0201, text: 'tree is empty' };
        TreeError.invalidParserTree = { code: 0x0220, text: 'invalid parser tree' };
    })(TreeError || (TreeError = {}));
    /* tslint:enable:max-line-length */

    var TreeBuilderBase = /** @class */ (function () {
        function TreeBuilderBase() {
        }
        TreeBuilderBase.prototype.makeTree = function (ast) {
            throw new ParserError(GeneralError.methodNotImplemented);
        };
        TreeBuilderBase.prototype.makeAst = function (tree) {
            throw new ParserError(GeneralError.methodNotImplemented);
        };
        return TreeBuilderBase;
    }());

    var TreeBuilder = /** @class */ (function (_super) {
        __extends$1(TreeBuilder, _super);
        function TreeBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TreeBuilder.prototype.makeTree = function (ast) {
            if (!ast)
                throw new ParserError(TreeError.emptyAst);
            var tree = this.makeNode(ast);
            if (!TreeBuilder.isValid(tree))
                throw new ParserError(TreeError.invalidParserTree);
            return tree;
        };
        TreeBuilder.prototype.makeAst = function (tree) {
            if (!tree)
                throw new ParserError(TreeError.emptyTree);
            var ast = this.makeAstNode(tree);
            if (!ast.isValid())
                throw new ParserError(TreeError.invalidParserTree);
            return ast;
        };
        TreeBuilder.prototype.makeNode = function (node) {
            if (!node)
                return undefined;
            return node.type === Token.Type.Operator
                ? this.makeOperatorNode(node)
                : this.makeValueNode(node);
        };
        TreeBuilder.prototype.makeOperatorNode = function (sourceNode) {
            return {
                operator: sourceNode.value,
                operand1: this.makeNode(sourceNode.leftNode),
                operand2: this.makeNode(sourceNode.rightNode)
            };
        };
        TreeBuilder.prototype.makeValueNode = function (sourceNode) {
            return {
                value: this.makeOperandValue(sourceNode)
            };
        };
        TreeBuilder.prototype.makeOperandValue = function (sourceNode) {
            var type = TokenHelper.isObject(sourceNode.value)
                ? 'item'
                : 'unit';
            return _a = {
                    type: type
                }, _a[type] = sourceNode.value, _a;
            var _a;
        };
        TreeBuilder.prototype.makeAstNode = function (node) {
            if (!node)
                return undefined;
            if (TreeBuilder.isTree(node)) {
                var tree = node;
                var ast = new AbstractSyntaxTree(tree.operator);
                ast.leftNode = this.makeAstNode(tree.operand1);
                ast.rightNode = this.makeAstNode(tree.operand2);
                return ast;
            }
            var operand = node;
            return new AbstractSyntaxTree(TreeBuilder.getValue(operand));
        };
        TreeBuilder.isTree = function (node) {
            return !!node.operator;
        };
        TreeBuilder.getValue = function (operand) {
            if (!TreeBuilder.isValidOperand(operand))
                throw new ParserError(TreeError.invalidParserTree);
            return operand.value.type === 'item'
                ? operand.value.item
                : operand.value.unit;
        };
        TreeBuilder.isValid = function (node) {
            var tree = node;
            var operand = node;
            return !!(tree.operator && tree.operand1 && tree.operand2) || operand.value !== undefined;
        };
        TreeBuilder.isValidOperand = function (operand) {
            return operand && operand.value && operand.value.type && operand.value[operand.value.type] !== undefined;
        };
        return TreeBuilder;
    }(TreeBuilderBase));
    function convert(data) {
        var builder = new Builder(new TreeBuilder());
        return builder.build(data);
    }
    function valid(data) {
        var builder = new Builder(new TreeBuilder());
        return builder.build(data).code === success;
    }

    var specialCharacters = [')', '!', '@', '#', '$', '%', '^', '&', 'x', '('];
    var supportedCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'x', '*', '/', '.', '+', '-', '%', '^', '(', ')'];

    var FormulizeBase = /** @class */ (function () {
        function FormulizeBase(elem, options) {
            this._options = __assign({}, defaultOptions);
            this._position = { x: 0, y: 0 };
            this.prevCursorIndex = 0;
            this._elem = elem;
            this._options = __assign({}, this._options, options);
            this.container = $(this._elem);
            this.container.addClass(this._options.id + "-container");
            this.container.wrap("<div class=\"" + this._options.id + "-wrapper\"></div>");
            this.statusBox = $("<div class=\"" + this._options.id + "-alert\">" + this._options.text.formula + "</div>");
            this.statusBox.insertBefore(this.container);
            this.textBox = $("\n            <textarea\n              id=\"" + this._options.id + "-text\"\n              name=\"" + this._options.id + "-text\"\n              class=\"" + this._options.id + "-text\"\n                ></textarea>\n        ");
            this.textBox.insertAfter(this.container);
            this.textBox.trigger('focus');
            this.attachEvents();
        }
        Object.defineProperty(FormulizeBase.prototype, "dragElem", {
            get: function () {
                return this.container
                    .find("." + this._options.id + "-drag");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormulizeBase.prototype, "cursorIndex", {
            get: function () {
                return this.cursor
                    ? this.cursor.index()
                    : 0;
            },
            enumerable: true,
            configurable: true
        });
        FormulizeBase.prototype.attachEvents = function () {
            throw new Error('method not implemented');
        };
        FormulizeBase.prototype.analyzeKey = function (keyCode, pressedCtrl, pressedShift) {
            throw new Error('method not implemented');
        };
        FormulizeBase.prototype.startDrag = function (position) {
            this.dragged = true;
            this.moved = false;
            this._position = position;
        };
        FormulizeBase.prototype.endDrag = function (position) {
            this.dragged = false;
            if (this.moved) {
                return;
            }
            this.moved = false;
            this.pick(position);
        };
        FormulizeBase.prototype.moveDrag = function (position) {
            if (!this.dragged)
                return;
            if (!FormulizeHelper.isOverDistance(this._position, position, 5))
                return;
            this.moved = true;
            this.removeDrag();
            var cursorIndex = this.cursorIndex;
            this.pick(position);
            var positions = [this.prevCursorIndex, cursorIndex];
            positions.sort();
            var startPosition = positions[0];
            var endPosition = positions[1];
            if (startPosition === endPosition) {
                this.prevCursorIndex = cursorIndex;
                return;
            }
            var dragElem = $(FormulizeHelper.getDragElement(this._options.id));
            if (cursorIndex >= this.prevCursorIndex)
                dragElem.insertBefore(this.cursor);
            else
                dragElem.insertAfter(this.cursor);
            this.selectRange(startPosition, endPosition);
            this.prevCursorIndex = cursorIndex;
        };
        FormulizeBase.prototype.setCursorValue = function (elem, value) {
            if (!value)
                return;
            $(elem).empty();
            var decimalValue = Helper.toDecimal(value);
            var split = decimalValue.split('.');
            var prefix = $("<span class=\"" + this._options.id + "-prefix " + this._options.id + "-decimal-highlight\">" + split[0] + "</span>");
            prefix.appendTo($(elem));
            if (!split[1])
                return;
            var suffix = $("<span class=\"" + this._options.id + "-surfix " + this._options.id + "-decimal-highlight\">.'" + split[1] + "</span>");
            suffix.appendTo($(elem));
        };
        FormulizeBase.prototype.pick = function (position) {
            if (position === void 0) { position = { x: 0, y: 0 }; }
            this.removeCursor();
            this.cursor = $(FormulizeHelper.getCursorElement(this._options.id));
            this.cursor.appendTo(this.container);
            var closestUnitElem = this.findClosestUnit(position);
            if (closestUnitElem)
                this.cursor.insertAfter(closestUnitElem);
            else
                this.cursor.prependTo(this.container);
            this.removeDrag();
        };
        FormulizeBase.prototype.findClosestUnit = function (position) {
            var containerPosition = {
                x: this.container.offset().left,
                y: this.container.offset().top
            };
            var parentPadding = {
                x: Number(this.container.css('padding-left').replace(/[^\d.]/gi, '')),
                y: Number(this.container.css('padding-top').replace(/[^\d.]/gi, ''))
            };
            var unitPositions = this.container
                .children("*:not(\"." + this._options.id + "-cursor\")")
                .toArray()
                .map(function (elem) { return ({
                elem: elem,
                x: $(elem).offset().left - containerPosition.x + parentPadding.x,
                y: $(elem).offset().top - containerPosition.y
            }); });
            var maxY = 0;
            var closestUnitPositions = unitPositions
                .filter(function (unitPosition) { return unitPosition.x <= position.x; })
                .map(function (unitPosition) {
                if (unitPosition.y < maxY * 0.5)
                    return undefined;
                var diffX = Math.abs(position.x - unitPosition.x);
                var diffY = Math.abs(position.y - unitPosition.y);
                return __assign({}, unitPosition, { diff: { x: diffX, y: diffY } });
            })
                .filter(function (unitPosition) { return !!unitPosition; });
            var filteredUnitPositions = closestUnitPositions.filter(function (unitPosition) { return unitPosition.y === maxY; }).length
                ? closestUnitPositions.filter(function (unitPosition) { return unitPosition.y === maxY; })
                : closestUnitPositions.filter(function (unitPosition) { return unitPosition.y <= position.y; });
            filteredUnitPositions.sort(function (a, b) { return a.diff.x - b.diff.x || a.diff.y - b.diff.y; });
            var closestUnitPosition = filteredUnitPositions.shift();
            return closestUnitPosition
                ? closestUnitPosition.elem
                : undefined;
        };
        FormulizeBase.prototype.selectRange = function (start, end) {
            var _this = this;
            if (!this.dragElem.length)
                return;
            this.container
                .children(":not(\"." + this._options.id + "-cursor\")")
                .filter(":gt(\"" + start + "\")")
                .filter(":lt(\"" + (end - start) + "\")")
                .add(this.container.children(":not(\"." + this._options.id + "-cursor\")").eq(start))
                .toArray()
                .forEach(function (elem) { return function () { return $(elem).appendTo(_this.dragElem); }; });
        };
        FormulizeBase.prototype.hookKeyDown = function (event) {
            event.preventDefault();
            if (!this.cursor || !this.cursor.length)
                return;
            var keyCode = event.which >= Key.Numpad0 && event.which <= Key.Numpad9
                ? event.which - Key.Zero
                : event.which;
            this.analyzeKey(keyCode, event.ctrlKey, event.shiftKey);
            var key = Helper.getKeyCodeValue(keyCode, event.shiftKey);
            var realKey = event.shiftKey && /[0-9]/.test(key) && specialCharacters[Number(key)]
                ? specialCharacters[Number(key)]
                : key;
            this.insertKey(realKey);
            this.validate();
        };
        FormulizeBase.prototype.hookUpdate = function () {
            this.validate();
            $(this._elem)
                .triggerHandler(this._options.id + ".input", this.getData());
        };
        FormulizeBase.prototype.removeBefore = function () {
            if (this.dragElem.length) {
                this.cursor.insertBefore(this.dragElem);
                this.dragElem.remove();
                this.hookUpdate();
                return;
            }
            var prevCursorElem = this.cursor.prev();
            if (!this.cursor.length || !prevCursorElem.length)
                return;
            if (prevCursorElem.hasClass(this._options.id + "-unit") &&
                prevCursorElem.text().length > 1) {
                var text = prevCursorElem.text();
                this.setCursorValue(prevCursorElem.get(0), text.substring(0, text.length - 1));
            }
            else
                prevCursorElem.remove();
            this.hookUpdate();
        };
        FormulizeBase.prototype.removeAfter = function () {
            if (this.dragElem.length) {
                this.cursor.insertAfter(this.dragElem);
                this.dragElem.remove();
                this.hookUpdate();
                return;
            }
            var nextCursorElem = this.cursor.next();
            if (!this.cursor.length || nextCursorElem.length)
                return;
            if (nextCursorElem.hasClass(this._options.id + "-unit") &&
                nextCursorElem.text().length > 1) {
                var text = nextCursorElem.text();
                this.setCursorValue(nextCursorElem.get(0), text.substring(1, text.length));
            }
            else
                nextCursorElem.remove();
            this.hookUpdate();
        };
        FormulizeBase.prototype.removeCursor = function () {
            this.container
                .find("." + this._options.id + "-cursor")
                .remove();
        };
        FormulizeBase.prototype.removeUnit = function () {
            this.container
                .find(":not(\"." + this._options.id + "-cursor\")")
                .remove();
        };
        FormulizeBase.prototype.moveCursorBefore = function (elem) {
            if (!$(elem).length)
                return;
            this.cursor.insertBefore($(elem));
        };
        FormulizeBase.prototype.moveCursorAfter = function (elem) {
            if (!$(elem).length)
                return;
            this.cursor.insertAfter($(elem));
        };
        FormulizeBase.prototype.moveLeftCursor = function (dragMode) {
            if (dragMode === void 0) { dragMode = false; }
            var prevCursorElem = this.cursor.prev();
            if (!this.cursor.length || !prevCursorElem.length || !dragMode) {
                this.removeDrag();
                this.moveCursorBefore(prevCursorElem.get(0));
                return;
            }
            if (!this.dragElem.length) {
                var dragElem = $(FormulizeHelper.getDragElement(this._options.id));
                dragElem.insertBefore(this.cursor);
                prevCursorElem.prependTo(this.dragElem);
                return;
            }
            if (prevCursorElem.hasClass(this._options.id + "-drag")) {
                var draggedUnit = this.dragElem.children();
                if (!draggedUnit.length) {
                    this.dragElem.remove();
                    return;
                }
                draggedUnit.last().insertAfter(this.dragElem);
                this.moveCursorAfter(this.dragElem.get(0));
                return;
            }
        };
        FormulizeBase.prototype.moveUpCursor = function () {
            if (!this.cursor.length)
                return;
            this.pick({
                x: this.cursor.position().left + this.cursor.outerWidth(),
                y: this.cursor.position().top - this.cursor.outerHeight() / 2
            });
        };
        FormulizeBase.prototype.moveRightCursor = function (dragMode) {
            if (dragMode === void 0) { dragMode = false; }
            var nextCursorElem = this.cursor.next();
            if (!this.cursor.length || !nextCursorElem.length || !dragMode) {
                this.removeDrag();
                this.moveCursorAfter(nextCursorElem.get(0));
                return;
            }
            if (!this.dragElem.length) {
                var dragElem = $(FormulizeHelper.getDragElement(this._options.id));
                dragElem.insertBefore(this.cursor);
                nextCursorElem.appendTo(this.dragElem);
                return;
            }
            if (nextCursorElem.hasClass(this._options.id + "-drag")) {
                var draggedUnit = this.dragElem.children();
                if (!draggedUnit.length) {
                    this.dragElem.remove();
                    return;
                }
                draggedUnit.first().insertBefore(this.dragElem);
                this.moveCursorBefore(this.dragElem.get(0));
                return;
            }
        };
        FormulizeBase.prototype.moveDownCursor = function () {
            if (!this.cursor.length)
                return;
            this.pick({
                x: this.cursor.position().left + this.cursor.outerWidth(),
                y: this.cursor.position().top + this.cursor.outerHeight() * 1.5
            });
        };
        FormulizeBase.prototype.moveFirstCursor = function (dragMode) {
            var _this = this;
            if (dragMode === void 0) { dragMode = false; }
            var firstCursorElem = this.container.children(':first');
            if (!this.cursor.length || !firstCursorElem.length || !dragMode) {
                this.removeDrag();
                this.moveCursorBefore(firstCursorElem.get(0));
                return;
            }
            if (!this.dragElem.length) {
                var dragElem = $(FormulizeHelper.getDragElement(this._options.id));
                dragElem.insertAfter(this.cursor);
            }
            this.cursor
                .prevAll()
                .toArray()
                .forEach(function (elem) { return $(elem).prependTo(_this.dragElem); });
        };
        FormulizeBase.prototype.moveLastCursor = function (dragMode) {
            if (dragMode === void 0) { dragMode = false; }
            var lastCursorElem = this.container.children(':last');
            if (!this.cursor.length || !lastCursorElem.length || !dragMode) {
                this.removeDrag();
                this.moveCursorAfter(lastCursorElem.get(0));
                return;
            }
            if (!this.dragElem.length) {
                var dragElem = $(FormulizeHelper.getDragElement(this._options.id));
                dragElem.insertBefore(this.cursor);
            }
            this.cursor
                .nextAll()
                .appendTo(this.dragElem);
        };
        FormulizeBase.prototype.clear = function () {
            this.removeCursor();
            this.removeUnit();
            this.hookUpdate();
        };
        FormulizeBase.prototype.blur = function () {
            if (!this.cursor)
                return;
            this.cursor.remove();
            this.removeDrag();
        };
        FormulizeBase.prototype.removeDrag = function () {
            var _this = this;
            this.dragElem
                .children('*')
                .toArray()
                .forEach(function (elem) { return $(elem).insertBefore(_this.dragElem); });
            this.dragElem.remove();
            this.hookUpdate();
        };
        FormulizeBase.prototype.selectAll = function () {
            this.removeDrag();
            var dragElem = $(FormulizeHelper.getDragElement(this._options.id));
            dragElem.prependTo(this.container);
            this.container
                .children(":not(\"." + this._options.id + "-cursor\")")
                .toArray()
                .forEach(function (elem) { return $(elem).appendTo(dragElem); });
        };
        FormulizeBase.prototype.validate = function (extractor) {
            var data = this.getData();
            if (!data)
                return;
            var isValid = valid(data);
            console.log('isValid', isValid, this.statusBox, this._options);
            if (isValid) {
                this.statusBox
                    .text(this._options.text.pass)
                    .addClass(this._options.id + "-alert-good")
                    .removeClass(this._options.id + "-alert-error");
            }
            else {
                this.statusBox
                    .text(this._options.text.error)
                    .removeClass(this._options.id + "-alert-good")
                    .addClass(this._options.id + "-alert-error");
            }
            if (extractor)
                extractor(isValid);
        };
        FormulizeBase.prototype.isValidKey = function (key) {
            return this.isNumberTokenKey(key) || supportedCharacters.includes(key);
        };
        FormulizeBase.prototype.isNumberTokenKey = function (key) {
            return /[0-9]/.test(key) || key === '.';
        };
        FormulizeBase.prototype.getExpression = function () {
            return this.container
                .find('.formulize-item')
                .toArray()
                .map(function (elem) { return FormulizeHelper.getDataValue(elem); });
        };
        FormulizeBase.prototype.setData = function (data) {
            this.clear();
            var result = convert(data);
            if (!result.code)
                this.insertData(result.data);
        };
        FormulizeBase.prototype.getData = function (extractor) {
            var expression = this.getExpression();
            console.log('expression', expression);
            var result = convert(expression);
            if (extractor)
                extractor(result.data);
            return result.data;
        };
        FormulizeBase.prototype.insert = function (obj, position) {
            if (!obj)
                return;
            if (!this.cursor || !this.cursor.length || position)
                this.pick(position);
            if (typeof obj === 'string' || typeof obj === 'number') {
                this.insertKey(obj);
                return;
            }
            if (!(obj instanceof HTMLElement))
                return;
            $(obj).addClass(this._options.id + "-item");
            $(obj).insertBefore(this.cursor);
            this.hookUpdate();
        };
        FormulizeBase.prototype.insertKey = function (key) {
            var _this = this;
            if (!this.isValidKey(key))
                return;
            if (this.isNumberTokenKey(key)) {
                var unitElem = $("<div class=\"" + this._options.id + "-item " + this._options.id + "-unit\">" + key + "</div>");
                if (this.dragElem.length) {
                    this.cursor.insertBefore(this.dragElem);
                    this.dragElem.remove();
                }
                if (this.cursor && this.cursor.length)
                    this.cursor.before(unitElem);
                else
                    this.container.append(unitElem);
                var prevUnitElem = unitElem.prevUntil(":not(." + this._options.id + "-cursor)");
                var nextUnitElem = unitElem.nextUntil(":not(." + this._options.id + "-cursor)");
                var targetUnitElem = [prevUnitElem, nextUnitElem]
                    .find(function (elem) { return elem.length && elem.hasClass(_this._options.id + "-unit"); });
                if (!targetUnitElem)
                    return;
                if (targetUnitElem === prevUnitElem)
                    targetUnitElem.append(unitElem[0].innerHTML);
                if (targetUnitElem === nextUnitElem)
                    targetUnitElem.prepend(unitElem[0].innerHTML);
                var text = targetUnitElem.text();
                this.setCursorValue(targetUnitElem.get(0), text);
                unitElem.remove();
                this.hookUpdate();
                return;
            }
            if (!key)
                return;
            var operatorElem = $("<div class=\"" + this._options.id + "-item " + this._options.id + "-operator\">" + key.toLowerCase() + "</div>");
            if (this.cursor && this.cursor.length)
                this.cursor.before(operatorElem);
            else
                this.container.append(operatorElem);
            if (key === '(' || key === ')')
                operatorElem.addClass(this._options.id + "-bracket");
        };
        FormulizeBase.prototype.insertData = function (data) {
            var _this = this;
            var arrayData = typeof data === 'string'
                ? data.split('')
                : data;
            arrayData
                .forEach(function (value) {
                var inputValue = typeof value === 'string' || !_this._options.import
                    ? value
                    : _this._options.import(value);
                _this.insert(inputValue);
            });
            this.hookUpdate();
        };
        return FormulizeBase;
    }());

    var Formulize = /** @class */ (function (_super) {
        __extends(Formulize, _super);
        function Formulize() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Formulize.prototype.analyzeKey = function (keyCode, pressedCtrl, pressedShift) {
            var _this = this;
            var behaviors = [
                { predicate: FormulizeKeyHelper.isReload, doBehavior: FormulizeKeyHelper.doReload },
                { predicate: FormulizeKeyHelper.isSelectAll, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.selectAll(); }) },
                { predicate: FormulizeKeyHelper.isBackspace, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.removeBefore(); }) },
                { predicate: FormulizeKeyHelper.isDelete, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.removeAfter(); }) },
                { predicate: FormulizeKeyHelper.isLeft, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.moveLeftCursor(pressedShift); }) },
                { predicate: FormulizeKeyHelper.isUp, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.moveUpCursor(); }) },
                { predicate: FormulizeKeyHelper.isRight, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.moveRightCursor(pressedShift); }) },
                { predicate: FormulizeKeyHelper.isDown, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.moveDownCursor(); }) },
                { predicate: FormulizeKeyHelper.isHome, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.moveFirstCursor(pressedShift); }) },
                { predicate: FormulizeKeyHelper.isEnd, doBehavior: FormulizeKeyHelper.doAction(function () { return _this.moveLastCursor(pressedShift); }) }
            ];
            var behavior = behaviors.find(function (behavior) { return behavior.predicate(keyCode, pressedCtrl, pressedShift); });
            if (behavior)
                return behavior.doBehavior();
        };
        Formulize.prototype.attachEvents = function () {
            var _this = this;
            this.textBox
                .off('blur')
                .on('blur', function () { return _this.blur(); });
            this.textBox
                .off("dblclick." + this._options.id + "Handler")
                .on("dblclick." + this._options.id + "Handler", this.selectAll);
            this.textBox
                .off("mousedown." + this._options.id + "Handler")
                .on("mousedown." + this._options.id + "Handler", function (event) { return _this.startDrag({ x: event.offsetX, y: event.offsetY }); });
            this.textBox
                .off("mouseup." + this._options.id + "Handler")
                .on("mouseup." + this._options.id + "Handler", function (event) { return _this.endDrag({ x: event.offsetX, y: event.offsetY }); });
            this.textBox
                .off("mousemove." + this._options.id + "Handler")
                .on("mousemove." + this._options.id + "Handler", function (event) { return _this.moveDrag({ x: event.offsetX, y: event.offsetY }); });
            this.textBox
                .off("keydown." + this._options.id + "Handler")
                .on("keydown." + this._options.id + "Handler", function (event) {
                _this.hookKeyDown(event);
            });
        };
        return Formulize;
    }(FormulizeBase));

    var _MODULE_VERSION_$1 = '0.0.1';
    function getVersion$1() {
        return _MODULE_VERSION_$1;
    }
    $.fn.formulize = Object.assign(function (options) {
        this
            .toArray()
            .forEach(function (elem) {
            new Formulize(elem, options);
        });
        return this;
    }, __assign({}, defaultOptions));

    exports.getVersion = getVersion$1;
    exports.Formulize = Formulize;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=formulize.umd.js.map

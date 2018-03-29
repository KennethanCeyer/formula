import { Position, Option } from './option.interface';
import { FormulizeHelper } from './formulize.helper';
import { convert, valid } from 'metric-parser';
import { Tree } from 'metric-parser/dist/types/tree';
import { ParserResult } from 'metric-parser/dist/types/parser/parser.result';
import { Key } from '../key.enum';
import { Helper } from '../helper';
import { FormulizeKeyHelper } from './formulize.key.helper';

export namespace Formulize {
    const defaultOption: Option = {
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
            passed: 'passed'
        },
        export: {
            filter: data => data,
            node: (elem: Element) => FormulizeHelper.getDataValue(elem)
        }
    };

    export class Formulize {
        private _elem: Element;
        private _option: Option = { ...defaultOption };
        private _offset: Position = { x: 0, y :0 };
        private dragging: boolean;
        private container: JQuery;
        private statusBox: JQuery;
        private textBox: JQuery;
        private cursor: JQuery;
        private get draggerElem(): JQuery {
            return this.container
                .find(`.${this._option.id}-drag`);
        }

        public constructor(elem: Element, option?: Option) {
            this._elem = elem;
            this._option = { ...this._option, ...option};

            this.init();
            this.attachEvents();
        }

        public init() {
            this.container = $(this._elem);
            this.container.addClass(`${}this._option.id}-container`);
            this.container.wrap(`<div class="${this._optionion.id}-wrapper"></div>`);

            this.statusBox = $(`<div class="${this._option.id}-alert">${_opt.strings.formula}</div>`);
            this.statusBox.insertBefore(this.container);

            this.textBox = $(`
                <textarea id="${this._option.id}-text" name="${this._option.id}-text" class="${this._option.id}-text"
                    ></textarea>
            `);
            this.textBox.insertAfter(this.container);
            this.textBox.trigger('focus');
        }

        private blurTextBox() {
            if (!this.cursor)
                return;

            this.cursor.remove();
            this.removeDrag();
        }

        private startDragging(offset: Position): void {
            this.dragging = true;
            this._offset = offset;
        }

        private endDragging(offset: Position): void {
            const currentDragging = this.dragging;
            this.dragging = false;

            if (currentDragging)
                return;

            this.click(offset);
        }

        private moveDragging(offset: Position): void {
            if (!this.dragging)
                return;

            if (
                Math.abs(this._offset.x - offset.x) <= 5 &&
                Math.abs(this._offset.y - offset.y) <= 5
            )
                return;

            if (this.container.hasClass('formula-active'))
                this.click(offset);

            const draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
            this.removeDrag();
            const prevPosition = this.cursor.index();
            this.click(offset);
            const nextPosition = this.cursor.index();

            if (!this.container.find(`.${this._option.id}-drag`).length) {
                draggerElem.insertAfter(this.cursor);
                return;
            }

            const positions = [prevPosition, nextPosition];
            positions.sort();
            const startPosition = positions[0];
            const endPosition = positions[1];

            if (prevPosition > nextPosition)
                draggerElem.insertBefore(this.cursor);
            else
                draggerElem.insertAfter(this.cursor);

            if (prevPosition === nextPosition)
                return;

            this.container
                .children(`:not(".${this._option.id}-cursor")`)
                .filter(`:gt("${startPosition}")`)
                .filter(`:lt("${endPosition - startPosition}")`)
                .add(this.container.children(`:not(".${this._option.id}-cursor")`).eq(startPosition))
                .each((_, elem) => $(elem).appendTo(draggerElem));

            if (prevPosition > nextPosition)
                draggerElem.insertAfter(this.cursor);
            else
                draggerElem.insertBefore(this.cursor);
        }

        private eventKeyDown(event: KeyboardEvent) {
            event.preventDefault();

            if (!this.cursor || !this.cursor.length)
                return;

            const keyCode = event.which >= Key.Numpad0 && event.which <= Key.Numpad9
                ? event.which - Key.Zero
                : event.which;

            this.analyzeKey(keyCode, event.ctrlKey, event.shiftKey);
            this.keyDown(Helper.keyCodeToString(keyCode, event.shiftKey), event.shiftKey);
            this.check();
        }

        private removeBefore(): void {
            if (this.draggerElem.length) {
                this.cursor.insertBefore(this.draggerElem);
                this.draggerElem.remove();
            } else if (this.cursor.length && this.cursor.prev().length) {
                $prev = this.cursor.prev();
                if ($prev.hasClass(this._option.id + '-unit') && $prev.text().length > 1) {
                    text = $prev.text();
                    this.setDecimal($prev, text.substring(0, text.length - 1).toFormulaDecimal());
                } else {
                    $prev.remove();
                }
            }
            this.check();
            $this.triggerHandler('formula.input', this.getFormula());
        }

        private removeAfter(): void {
            if (this.draggerElem.length) {
                this.cursor.insertAfter(this.draggerElem);
                this.draggerElem.remove();
            } else {
                if (this.cursor.length && this.cursor.next().length) {
                    $next = this.cursor.next();
                    if ($next.hasClass(this._option.id + '-unit') && $next.text().length > 1) {
                        text = $next.text();
                        this.setDecimal($next, text.substring(1, text.length).toFormulaDecimal());
                    } else {
                        $next.remove();
                    }
                }
            }
            this.check();
            $this.triggerHandler('formula.input', this.getFormula());
        }

        private moveLeftCursor(draggingMode: boolean = false): void {
            if (!this.cursor.length || !this.cursor.prev().length) {
                this.removeDrag();
                return;
            }

            if (!draggingMode) {
                this.removeDrag();
                this.cursor.insertBefore(this.cursor.prev());
                return;
            }

            if (!this.draggerElem.length) {
                const draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
                draggerElem.insertAfter(this.cursor);
            } else {
                if (!draggerElem.data('active')) {
                    this.removeDrag();
                    draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
                    draggerElem.insertAfter(this.cursor);
                }
            }
            draggerElem.data('active', true);

            $prev = this.cursor.prev();
            if ($prev.hasClass(this._option.id + '-drag')) {
                draggerElemItem = draggerElem.children('*');
                if (draggerElemItem.length < 1) {
                    draggerElem.remove();
                } else {
                    draggerElemItem.last().insertAfter(draggerElem);
                    this.cursor.insertAfter(draggerElem);
                }
            } else {
                this.cursor.prev().prependTo(draggerElem);
            }
        }

        private moveUpCursor(): void {
            if (!this.cursor.prev().length && !this.cursor.next().length)
                return;

            parentPadding = {
                x: parseFloat(this.container.css('padding-left').replace(/[^\d.]/gi, '')),
                y: parseFloat(this.container.css('padding-top').replace(/[^\d.]/gi, ''))
            };

            $item = this.cursor.prev();
            if (!$item.length) {
                $item = this.cursor.next();
            }
            this.click({
                x: this.cursor.position().left + $item.outerWidth(),
                y: this.cursor.position().top - $item.outerHeight() / 2
            });
        }

        private moveRightCursor(draggingMode: boolean = false): void {
            if (!this.cursor.length || !this.cursor.next().length) {
                this.removeDrag();
                return;
            }

            if (!draggingMode) {
                this.removeDrag();
                this.cursor.insertAfter(this.cursor.next());
            }

            if (!this.draggerElem.length) {
                const draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
                draggerElem.insertBefore(this.cursor);
            } else {
                if (!this.draggerElem.data('active')) {
                    this.removeDrag();
                    const draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
                    draggerElem.insertBefore(this.cursor);
                }
            }
            this.draggerElem.data('active', true);

            const nextCursorElem = this.cursor.next();
            if (nextCursorElem.hasClass(`${this._option.id}-drag`)) {
                const draggedUnit = this.draggerElem.children();
                if (!draggedUnit.length)
                    draggerElem.remove();
                else {
                    draggedUnit.first().insertBefore(draggerElem);
                    this.cursor.insertBefore(draggerElem);
                }
            } else
                this.cursor.next().appendTo(draggerElem);
        }

        private moveDownCursor(): void {
            if (!this.cursor.prev().length && this.cursor.next().length)
                return;

            parentPadding = {
                x: parseFloat(this.container.css('padding-left').replace(/[^\d.]/gi, '')),
                y: parseFloat(this.container.css('padding-top').replace(/[^\d.]/gi, ''))
            };

            $item = this.cursor.prev();
            if (!$item.length)
                $item = this.cursor.next();

            this.click({
                x: this.cursor.position().left + $item.outerWidth(),
                y: this.cursor.position().top + $item.outerHeight() * 1.5
            });
        }

        private moveFirstCursor(): void {
            if (this.cursor.length && this.container.children(':first').length) {
                if (pressedShift) {
                    if (this.draggerElem.length < 1) {
                        const draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
                        draggerElem.insertAfter(this.cursor);
                    } else {
                        if (!this.draggerElem.data('active')) {
                            this.removeDrag();
                            const draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
                            draggerElem.insertAfter(this.cursor);
                        }
                    }
                    this.draggerElem.data('active', true);
                    this.cursor
                        .prevAll()
                        .each((_, elem) => $(elem).prependTo(draggerElem));
                } else {
                    this.removeDrag();
                    this.cursor.insertBefore(this.container.children(':first'));
                }
            }
        }

        private moveLastCursor(): void {
            if (this.cursor.length && this.container.children(':last').length) {
                if (pressedShift) {
                    draggerElem = this.container.find('.${this._option.id}-drag');
                    if (draggerElem.length < 1) {
                        draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
                        draggerElem.insertBefore(this.cursor);
                    } else {
                        if (!draggerElem.data('active')) {
                            this.removeDrag();
                            draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
                            draggerElem.insertBefore(this.cursor);
                        }
                    }
                    draggerElem.data('active', true);
                    this.cursor.nextAll().appendTo(draggerElem);
                } else {
                    this.removeDrag();
                    this.cursor.insertAfter(this.container.children(':last'));
                }
            }
        }

        private analyzeKey(keyCode: number, pressedCtrl: boolean, pressedShift: boolean) {
            const behaviors = [
                { predicate: FormulizeKeyHelper.isReload, doBehavior: FormulizeKeyHelper.doReload },
                { predicate: FormulizeKeyHelper.isSelectAll, doBehavior: FormulizeKeyHelper.doAction(this.selectAll) },
                { predicate: FormulizeKeyHelper.isBackspace, doBehavior: FormulizeKeyHelper.doAction(this.removeBefore) },
                { predicate: FormulizeKeyHelper.isDelete, doBehavior: FormulizeKeyHelper.doAction(this.removeAfter) },
                { predicate: FormulizeKeyHelper.isLeft, doBehavior: FormulizeKeyHelper.doAction(this.moveLeftCursor(pressedShift)) },
                { predicate: FormulizeKeyHelper.isUp, doBehavior: FormulizeKeyHelper.doAction(this.moveUpCursor) },
                { predicate: FormulizeKeyHelper.isRight, doBehavior: FormulizeKeyHelper.doAction(this.moveRightCursor(pressedShift)) },
                { predicate: FormulizeKeyHelper.isDown, doBehavior: FormulizeKeyHelper.doAction(this.moveDownCursor) },
                { predicate: FormulizeKeyHelper.isHome, doBehavior: FormulizeKeyHelper.doAction(this.moveFirstCursor(pressedShift)) },
                { predicate: FormulizeKeyHelper.isEnd, doBehavior: FormulizeKeyHelper.doAction(this.moveLastCursor(pressedShift)) },
            ];

            const behavior = behaviors.find(behavior => behavior.predicate(keyCode, pressedCtrl, pressedShift));
            if (behavior)
                return behavior.doBehavior();
        }

        private attachEvents(): void {
            this.textBox
                .off('blur').on('blur', this.blurTextBox);

            this.textBox
                .off(`dblclick.${this._option.id}Handler`)
                .on(`dblclick.${this._option.id}Handler`, this.selectAll);

            this.textBox
                .off(`mousedown.${this._option.id}Handler`)
                .on(`mousedown.${this._option.id}Handler`,
                    event => this.startDragging({ x: event.offsetX, y: event.offsetY });

            this.textBox
                .off(`mouseup.${this._option.id}Handler`)
                .on(`mouseup.${this._option.id}Handler`,
                    event => this.endDragging({ x: event.offsetX, y: event.offsetY });

            this.textBox
                .off(`mousemove.${this._option.id}Handler`)
                .on(`mousemove.${this._option.id}Handler`,
                    event => this.moveDragging({ x: event.offsetX, y: event.offsetY }));

            this.textBox
                .off(`keydown.${this._option.id}Handler`)
                .on(`keydown.${this._option.id}Handler`,
                    event => this.eventKeyDown);
        }

        check(extractor?: (valid: boolean) => void) {
            const data = this.getFormula().data;

            if (!data)
                return;

            const isValid = valid(data);
            if (isValid) {
                this.statusBox
                    .text(this._option.strings.validationPassed)
                    .addClass(`${this._option.id}-alert-good`)
                    .removeClass(`${this._option.id}-alert-error`);
            }
            else {
                this.statusBox
                    .text(this._option.strings.validationError)
                    .removeClass(`${this._option.id}-alert-good`)
                    .addClass(`${this._option.id}-alert-error`);
            }

            if (extractor)
                extractor(isValid);
        }

        removeDrag() {
            const draggerElem = this.container.find(`.${this._option.id}-drag`);
            draggerElem
                .children('*')
                .each((_, elem) => $(elem).insertBefore(draggerElem));
            draggerElem.remove();
            this.hookUpdate();
        }

        selectAll() {
            this.removeDrag();
            const draggerElem = $(`<div class="${this._option.id}-drag"></div>`);
            draggerElem.prependTo(this.container);
            this.container
                .children(':not(".${this._option.id}-cursor")')
                .each((_, elem) => $(elem).appendTo(draggerElem));
        }

        click(position: Position = { x: 0, y: 0 }) {
            this.container
                .find(`.${this._option.id}-cursor`)
                .remove();

            this.cursor = $(`<div class="${this._option.id}-cursor"></div>`);
            this.cursor.appendTo(this.container);

            // TODO: belows code is suck, no hope, refactor right now
            const parentPos = {
                x: this.container.offset().left,
                y: this.container.offset().top
            };

            const parentPadding = {
                x: parseFloat(this.container.css('padding-left').replace(/[^\d.]/gi, '')),
                y: parseFloat(this.container.css('padding-top').replace(/[^\d.]/gi, ''))
            };

            const checkArea = [];

            // TODO: do you lost your fucking mind past me? where did the key name come from?
            this.container.children('*:not(".${this._option.id}-cursor")').each(function () {
                const $this = $(this);
                checkArea.push({
                    x: $this.offset().left - parentPos.x + parentPadding.x,
                    y: $this.offset().top - parentPos.y,
                    e: $this
                });
            });

            const $pointer = null;
            const maxY = 0, maxDiff = 10000;
            for (idx in checkArea) {
                check = checkArea[idx];
                if (check.y <= position.y) {
                    if (check.y >= maxY * 0.5 && check.x <= position.x) {
                        if (check.y >= maxY) {
                            maxY = check.y;
                        }
                        if (position.x - check.x <= maxDiff) {
                            maxDiff = position.x - check.x;
                            $pointer = check.e;
                        }
                    }
                }
            }

            if ($pointer === null) {
                maxY = 0;
                maxDiff = 10000;
                for (idx in checkArea) {
                    check = checkArea[idx];
                    if (check.y >= maxY * 0.5 && check.x <= position.x) {
                        if (check.y >= maxY) {
                            maxY = check.y;
                        }
                        if (position.x - check.x < maxDiff) {
                            maxDiff = position.x - check.x;
                            $pointer = check.e;
                        }
                    }
                }
            }

            if (checkArea.length && $pointer !== null && maxY + checkArea[0].e.outerHeight() >= position.y) {
                this.cursor.insertAfter($pointer);
            } else {
                if (checkArea.length && position.x > checkArea[0].x) {
                    this.cursor.appendTo(this.container);
                } else {
                    this.cursor.prependTo(this.container);
                }
            }

            const loop = function () {
                setTimeout(function () {
                    if (cursorElem.hasClass('inactive')) {
                        cursorElem.removeClass('inactive');
                        cursorElem.stop().animate({ opacity: 1 }, this._option.cursorAnimTime);
                    } else {
                        cursorElem.addClass('inactive');
                        cursorElem.stop().animate({ opacity: 0 }, this._option.cursorAnimTime);
                    }

                    if (cursorElem.length) {
                        loop();
                    }
                }, this._option.cursorDelayTime);
            };
            loop();

            this.removeDrag();
        };

        keyDown(key: number, pressedShift: boolean) {
            const realKey = pressedShift && key >= 0 && key <= 9
                ? [')', '!', '@', '#', '$', '%', '^', '&', 'x', '('][key]
                : key;

            this.insertChar(realKey);
        }

        insert(item, position) {
            if (!this.cursor || !this.cursor.length || typeof position === 'object')
                this.click(position);

            if (typeof item === 'string') {
                item = $(item);
            }

            item.addClass(`${this._option.id}-item`);
            item.insertBefore(this.cursor);

            this.textBox.trigger('focus');
            this.check();
            this.hookUpdate();
        };

        insertChar(key) {
            // TODO: need refactor
            if ((key >= 0 && key <= 9) || $.inArray(key.toLowerCase(), this.permitedKey) != -1) {
                if ((key >= 0 && key <= 9) || key === '.') {
                    const $unit = $(`<div class="${this._option.id}-item ${this._option.id}-unit">${key}</div>`);
                    const $item = null;
                    const decimal = '', merge = false;

                    draggerElem = this.container.find('.${this._option.id}-drag');

                    if (draggerElem.length) {
                        this.cursor.insertBefore(draggerElem);
                        draggerElem.remove();
                    }

                    if (this.cursor !== null && this.cursor.length) {
                        this.cursor.before($unit);
                    } else {
                        this.container.append($unit);
                    }

                    const $prev = $unit.prev();
                    const $next = $unit.next();

                    if ($prev.length && $prev.hasClass(this._option.id + '-cursor')) {
                        $prev = $prev.prev();
                    }

                    if ($next.length && $next.hasClass(this._option.id + '-cursor')) {
                        $next = $next.next();
                    }

                    if ($prev.length && $prev.hasClass(this._option.id + '-unit')) {
                        merge = true;
                        $item = $prev;
                        $item.append($unit[0].innerHTML);
                    } else if ($next.length && $next.hasClass(this._option.id + '-unit')) {
                        merge = true;
                        $item = $next;
                        $item.prepend($unit[0].innerHTML);
                    }

                    if (merge) {
                        decimal = $item.text().toFormulaDecimal();
                        this.setDecimal($item, decimal);
                        $unit.remove();
                    }
                } else if (key !== '') {
                    const $operator = $('<div class="${this._option.id}-item ${this._option.id}-operator">' + key.toLowerCase() + '</div>');
                    if (this.cursor !== null && this.cursor.length) {
                        this.cursor.before($operator);
                    } else {
                        this.container.append($operator);
                    }
                    if (key === '(' || key === ')') {
                        $operator.addClass(this._option.id + '-bracket');
                    }
                }

                this.hookUpdate();
            }
        }

        insertFormula(data) {
            // TODO: need refactor
            if (typeof data === 'string') {
                const splitData = data.split('');
                for (idx in splitData) {
                    this.insertChar.call(context, splitData[idx]);
                }

                this.check();
                this.hookUpdate();
            }

            for (idx in data) {
                const item = data[idx];
                if (typeof item !== 'object') {
                    const data_splited = item.toString().split('');
                    for (const key in data_splited) {
                        this.insertChar.call(context, data_splited[key]);
                    }
                } else {
                    if (typeof this._option.import.item === 'function') {
                        const $e = this._option.import.item.call(context, item);
                        if (typeof $e !== 'undefined' && $e !== null) {
                            this.insert($e);
                        }
                    }
                }
            }

            this.check();
            this.hookUpdate();
        }

        private hookUpdate(): void {
            $(this._elem)
                .triggerHandler(`${this._option.id}.input`, this.getFormula());
        }

        private removeCursor(): void {
            this.container
                .find(`:not(".${this._option.id}-cursor")`)
                .remove();
        }

        empty() {
            this.removeCursor();
            this.hookUpdate();
        }

        setDecimal(elem, decimal: string) {
            if (!decimal)
                return;

            elem.empty();
            const split = decimal.split('.');
            const prefix = $(`<span class="${this._option.id}-prefix ${this._option.id}-decimal-highlight">${split[0]}</span>`);
            prefix.appendTo(elem);

            if (!split[1])
                return;

            const suffix = $(`<span class="${this._option.id}-surfix ${this._option.id}-decimal-highlight">.'${split[1]}</span>`);
            suffix.appendTo(elem);
        }

        setFormula(data) {
            this.empty();
            const objectData = typeof data !== 'object'
                ? JSON.parse(data)
                : data;

            const result = convert(objectData);
            if (!result.code)
                this.insertFormula(result.data);
        }

        getFormula(extractor?: (data: ParserResult<Tree>) => void): ParserResult<Tree> {
            if (this._option.export.filter) {
                this.container
                    .find('.formula-item')
                    .each((_, elem) => {
                        const value = $(elem).data('value')
                            ? $(elem).data('value')
                            : $(elem).text();
                        const item = { value };

                        if ($(elem).hasClass(`${this._option.id}-unit`)) {
                            item.type = 'unit';
                            item.value = value.toFormulaDecimal();
                            data.push(item);
                            return;
                        }

                        if ($(elem).hasClass(this._option.id + '-custom')) {
                            item.type = 'item';
                            if (typeof this._option.export !== 'undefined' && typeof this._option.export.item === 'function') {
                                try {
                                    item.value = this._option.export.item.call(context, $(elem));
                                } catch (e) {
                                    item.value = '0';
                                }
                            } else {
                                item.value = '0';
                            }
                            data.push(item);
                            return;
                        }

                        if ($(elem).hasClass(this._option.id + '-operator')) {
                            item = item.value === 'x' ? '*' : item.value;
                            data.push(item);
                            return;
                        }
                    });

                const convertResult = convert(data);
                convertResult.data = this._option.export.filter(convertResult.data);

                const result = {
                    data: data,
                    filterData: convertResult
                };

                if (extractor)
                    extractor(result);

                return result;
            }

            this.container
                .find('.formula-item')
                .each((_, elem) => {
                    const value = $(elem).data('value')
                        ? $(elem).data('value')
                        : $(elem).text();

                    if ($(elem).hasClass(this._option.id + '-unit')) {
                        value = value.toFormulaDecimal();
                    } else if ($(elem).hasClass(this._option.id + '-operator') && value === 'x') {
                        value = '*';
                    } else if ($(elem).hasClass(this._option.id + '-custom')) {
                        if (typeof this._option.export !== 'undefined' && typeof this._option.export.item === 'function') {
                            try {
                                value = this._option.export.call(context, $(elem));
                            } catch (e) {
                                value = '0';
                            }
                        } else {
                            value = '0';
                        }
                    }
                    data.push(value);
                });

            const result = {
                data: data.join(' '),
                filterData: filterData
            };

            if (extractor)
                extractor(result);

            return result;
        }
    }
}

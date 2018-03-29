import { Option } from './option.interface';
import { defaultOption } from './option.value';
import { Position } from './formulize.interface';
import { FormulizeHelper } from './formulize.helper';
import { Key } from '../key.enum';
import { Helper } from '../helper';
import { convert, valid } from 'metric-parser';
import { specialCharacters, supportedCharacters } from './formulize.value';
import { Tree } from 'metric-parser/dist/types/tree/simple.tree/type';

export abstract class FormulizeBase {
    protected _elem: Element;
    protected _option: Option = { ...defaultOption };
    protected _position: Position = { x: 0, y :0 };
    protected dragged: boolean;
    protected container: JQuery;
    protected statusBox: JQuery;
    protected textBox: JQuery;
    protected cursor: JQuery;

    protected get dragElem(): JQuery {
        return this.container
            .find(`.${this._option.id}-drag`);
    }

    protected get cursorIndex(): number {
        return this.cursor.index();
    }

    public constructor(elem: Element, option?: Option) {
        this._elem = elem;
        this._option = { ...this._option, ...option};

        this.container = $(this._elem);
        this.container.addClass(`${this._option.id}-container`);
        this.container.wrap(`<div class="${this._option.id}-wrapper"></div>`);

        this.statusBox = $(`<div class="${this._option.id}-alert">${this._option.text.formula}</div>`);
        this.statusBox.insertBefore(this.container);

        this.textBox = $(`
            <textarea id="${this._option.id}-text" name="${this._option.id}-text" class="${this._option.id}-text"
                ></textarea>
        `);
        this.textBox.insertAfter(this.container);
        this.textBox.trigger('focus');

        this.attachEvents();
    }

    protected attachEvents() {
        throw new Error('method not implemented');
    }

    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): T {
        throw new Error('method not implemented');
    }

    protected startDrag(position: Position): void {
        this.dragged = true;
        this._position = position;
    }

    protected endDrag(position: Position): void {
        const isDragged = this.dragged;
        this.dragged = false;

        if (isDragged)
            return;

        this.pick(position);
    }

    protected moveDrag(position: Position): void {
        if (!this.dragged)
            return;

        if (!FormulizeHelper.isOverDistance(this._position, this._position, 5))
            return;

        this.removeDrag();

        const prevPosition = this.cursorIndex;
        this.pick(position);
        const nextPosition = this.cursorIndex;
        const positions = [prevPosition, nextPosition];
        positions.sort();

        const startPosition = positions[0];
        const endPosition = positions[1];

        if (prevPosition === nextPosition)
            return;

        const dragElem = $(FormulizeHelper.getDragElement(this._option.id));
        if (prevPosition > nextPosition)
            dragElem.insertBefore(this.cursor);
        else
            dragElem.insertAfter(this.cursor);

        this.selectRange(startPosition, endPosition);
    }

    protected setCursorValue(elem: Element, value: string) {
        if (!value)
            return;

        $(elem).empty();
        const decimalValue = Helper.toDecimal(value);
        const split = value.split('.');
        const prefix = $(`<span class="${this._option.id}-prefix ${this._option.id}-decimal-highlight">${split[0]}</span>`);
        prefix.appendTo($(elem));

        if (!split[1])
            return;

        const suffix = $(`<span class="${this._option.id}-surfix ${this._option.id}-decimal-highlight">.'${split[1]}</span>`);
        suffix.appendTo($(elem));
    }

    public pick(position: Position = { x: 0, y: 0 }) {
        this.removeCursor();
        this.cursor = $(FormulizeHelper.getCursorElement(this._option.id));
        this.cursor.appendTo(this.container);

        const closestUnitElem = this.findClosestUnit(position);
        if (closestUnitElem)
            this.cursor.insertAfter(closestUnitElem);
        else
            this.cursor.prependTo(this.container);

        this.removeDrag();
    }

    private findClosestUnit(position: Position): Element {
        const containerPosition = {
            x: this.container.offset().left,
            y: this.container.offset().top
        };

        const parentPadding: Position = {
            x: Number(this.container.css('padding-left').replace(/[^\d.]/gi, '')),
            y: Number(this.container.css('padding-top').replace(/[^\d.]/gi, ''))
        };

        const unitPositions = this.container
            .children(`*:not(".${this._option.id}-cursor")`)
            .toArray()
            .map(elem => ({
                elem,
                x: $(elem).offset().left - containerPosition.x + parentPadding.x,
                y: $(elem).offset().top - containerPosition.y
            }));

        let minDiff = 1000;
        let maxY = 0;
        const closestUnitPositions = unitPositions
            .filter(unitPosition => unitPosition.x <= position.x)
            .map(unitPosition => {
                if (unitPosition.y < maxY * 0.5)
                    return undefined;

                const diff = position.x - unitPosition.x;
                maxY = Math.max(unitPosition.y, maxY);
                minDiff = Math.min(diff, minDiff);
                if (diff === minDiff)
                    return unitPosition;

                return undefined;
            })
            .filter(unitPosition => !!unitPosition);
        const closestUnit = (
            closestUnitPositions.find(unitPosition => unitPosition.y <= position.y) ||
            closestUnitPositions.find(unitPosition => unitPosition.y === maxY)
        );
        return closestUnit
            ? closestUnit.elem
            : undefined;
    }

    protected selectRange(start: number, end: number): void {
        if (!this.dragElem.length)
            return;

        this.container
            .children(`:not(".${this._option.id}-cursor")`)
            .filter(`:gt("${start}")`)
            .filter(`:lt("${end - start}")`)
            .add(this.container.children(`:not(".${this._option.id}-cursor")`).eq(start))
            .toArray()
            .forEach(elem => () => $(elem).appendTo(this.dragElem));
    }

    protected hookKeyDown(event: KeyboardEvent) {
        event.preventDefault();

        if (!this.cursor || !this.cursor.length)
            return;

        const keyCode = event.which >= Key.Numpad0 && event.which <= Key.Numpad9
            ? event.which - Key.Zero
            : event.which;

        this.analyzeKey(keyCode, event.ctrlKey, event.shiftKey);

        const key = Helper.getKeyCodeValue(keyCode, event.shiftKey);
        const realKey = event.shiftKey && /[0-9]/.test(key) && specialCharacters[key]
            ? specialCharacters[key]
            : key;
        this.insertKey(realKey);
        this.validate();
    }

    protected hookUpdate(): void {
        this.validate();
        $(this._elem)
            .triggerHandler(`${this._option.id}.input`, this.getData());
    }

    protected removeBefore(): void {
        if (this.dragElem.length) {
            this.cursor.insertBefore(this.dragElem);
            this.dragElem.remove();
            this.hookUpdate();
            return;
        }

        const prevCursorElem = this.cursor.prev();
        if (!this.cursor.length || !prevCursorElem.length)
            return;

        if (
            prevCursorElem.hasClass(`${this._option.id}-unit`) &&
            prevCursorElem.text().length > 1
        ) {
            const text = prevCursorElem.text();
            this.setCursorValue(prevCursorElem.get(0), text.substring(0, text.length - 1));
        } else
            prevCursorElem.remove();

        this.hookUpdate();
    }

    protected removeAfter(): void {
        if (this.dragElem.length) {
            this.cursor.insertAfter(this.dragElem);
            this.dragElem.remove();
            this.hookUpdate();
            return;
        }

        const nextCursorElem = this.cursor.next();
        if (!this.cursor.length || nextCursorElem.length)
            return;

        if (
            nextCursorElem.hasClass(`${this._option.id}-unit`) &&
            nextCursorElem.text().length > 1
        ) {
            const text = nextCursorElem.text();
            this.setCursorValue(nextCursorElem.get(0), text.substring(1, text.length));
        } else
            nextCursorElem.remove();

        this.hookUpdate();
    }

    protected removeCursor(): void {
        this.container
            .find(`.${this._option.id}-cursor`)
            .remove();
    }

    protected removeUnit(): void {
        this.container
            .find(`:not(".${this._option.id}-cursor")`)
            .remove();
    }

    private moveCursorBefore(elem: Element) {
        if (!$(elem).length)
            return;

        this.cursor.insertBefore($(elem));
    }

    private moveCursorAfter(elem: Element) {
        if (!$(elem).length)
            return;

        this.cursor.insertAfter($(elem));
    }

    protected moveLeftCursor(dragMode: boolean = false): void {
        const prevCursorElem = this.cursor.prev();

        if (!this.cursor.length || !this.cursor.prev().length || !dragMode) {
            this.removeDrag();
            this.moveCursorBefore(prevCursorElem.get(0));
            return;
        }

        if (!this.dragElem.length) {
            const dragElem = $(FormulizeHelper.getDragElement(this._option.id));
            dragElem.insertAfter(this.cursor);
        }

        if (prevCursorElem.hasClass(`${this._option.id}-drag`)) {
            const draggedUnit = this.dragElem.children();
            if (!draggedUnit.length) {
                this.dragElem.remove();
                return;
            }

            draggedUnit.last().insertAfter(this.dragElem);
            this.moveCursorAfter(this.dragElem.get(0));
            return;
        }

         this.cursor.prev().prependTo(this.dragElem);
    }

    protected moveUpCursor(): void {
        if (!this.cursor.length)
            return;

        this.pick({
            x: this.cursor.position().left + this.cursor.outerWidth(),
            y: this.cursor.position().top - this.cursor.outerHeight() / 2
        });
    }

    protected moveRightCursor(dragMode: boolean = false): void {
        const nextCursorElem = this.cursor.next();

        if (!this.cursor.length || !nextCursorElem.length || !dragMode) {
            this.removeDrag();
            this.moveCursorAfter(nextCursorElem.get(0));
            return;
        }

        if (!this.dragElem.length) {
            const dragElem = $(FormulizeHelper.getDragElement(this._option.id));
            dragElem.insertBefore(this.cursor);
        }

        if (nextCursorElem.hasClass(`${this._option.id}-drag`)) {
            const draggedUnit = this.dragElem.children();
            if (!draggedUnit.length) {
                this.dragElem.remove();
                return;
            }

            draggedUnit.first().insertBefore(this.dragElem)
            this.moveCursorBefore(this.dragElem.get(0));
            return;
        }

        this.cursor.next().appendTo(this.dragElem);
    }

    protected moveDownCursor(): void {
        if (!this.cursor.length)
            return;

        this.pick({
            x: this.cursor.position().left + this.cursor.outerWidth(),
            y: this.cursor.position().top + this.cursor.outerHeight() * 1.5
        });
    }

    protected moveFirstCursor(dragMode: boolean = false): void {
        const firstCursorElem = this.container.children(':first');
        if (!this.cursor.length || !firstCursorElem.length || !dragMode) {
            this.removeDrag();
            this.moveCursorBefore(firstCursorElem.get(0));
            return;
        }

        if (!this.dragElem.length) {
            const dragElem = $(FormulizeHelper.getDragElement(this._option.id));
            dragElem.insertAfter(this.cursor);
        }

        this.cursor
            .prevAll()
            .toArray()
            .forEach(elem => $(elem).prependTo(this.dragElem));
    }

    protected moveLastCursor(dragMode: boolean = false): void {
        const lastCursorElem = this.container.children(':last');
        if (!this.cursor.length || !lastCursorElem.length || !dragMode) {
            this.removeDrag();
            this.moveCursorAfter(lastCursorElem.get(0));
            return;
        }

        if (!this.dragElem.length) {
            const dragElem = $(FormulizeHelper.getDragElement(this._option.id));
            dragElem.insertBefore(this.cursor);
        }

        this.cursor
            .nextAll()
            .appendTo(this.dragElem);
    }

    public clear() {
        this.removeCursor();
        this.removeUnit();
        this.hookUpdate();
    }

    public blur() {
        if (!this.cursor)
            return;

        this.cursor.remove();
        this.removeDrag();
    }

    public removeDrag() {
        this.dragElem
            .children('*')
            .toArray()
            .forEach(elem => $(elem).insertBefore(this.dragElem));
        this.dragElem.remove();
        this.hookUpdate();
    }

    public selectAll() {
        this.removeDrag();
        const dragElem = $(FormulizeHelper.getDragElement(this._option.id));
        dragElem.prependTo(this.container);
        this.container
            .children(`:not(".${this._option.id}-cursor")`)
            .toArray()
            .forEach(elem => $(elem).appendTo(dragElem));
    }

    public validate(extractor?: (valid: boolean) => void) {
        const data = this.getData();

        if (!data)
            return;

        const isValid = valid(data);
        if (isValid) {
            this.statusBox
                .text(this._option.text.pass)
                .addClass(`${this._option.id}-alert-good`)
                .removeClass(`${this._option.id}-alert-error`);
        }
        else {
            this.statusBox
                .text(this._option.text.error)
                .removeClass(`${this._option.id}-alert-good`)
                .addClass(`${this._option.id}-alert-error`);
        }

        if (extractor)
            extractor(isValid);
    }

    protected isValidKey(key: string): boolean {
        return this.isNumberTokenKey(key) || supportedCharacters.includes(key);
    }

    protected isNumberTokenKey(key: string): boolean {
        return /[0-9]/.test(key) || key === '.';
    }

    private getExpression(): string[] {
        this.container
            .find('.formula-item')
            .toArray()
            .map(elem => FormulizeHelper.getDataValue(elem));
    }

    public setData(data: Tree): void {
        this.clear();
        const result = convert(data);
        if (!result.code)
            this.insertData(result.data);
    }

    public getData(extractor?: (data: Tree) => void): Tree {
        const expression = this.getExpression();
        const result = convert(expression);

        if (extractor)
            extractor(result.data);

        return result.data;
    }

    public insert(obj: string | number | Element, position?: Position) {
        if(!obj)
            return;

        if (!this.cursor || !this.cursor.length || position)
            this.pick(position);

        if (typeof obj === 'string' || typeof obj === 'number') {
            this.insertKey(<string>obj);
            return;
        }

        if (!(obj instanceof Element))
            return;

        $(obj).addClass(`${this._option.id}-item`);
        $(obj).insertBefore(this.cursor);

        this.hookUpdate();
    }

    public insertKey(key: string) {
        // TODO: need refactor
        if (this.isValidKey(key)) {
            if (this.isNumberTokenKey(key)) {
                const $unit = $(`<div class="${this._option.id}-item ${this._option.id}-unit">${key}</div>`);

                if (this.dragElem.length) {
                    this.cursor.insertBefore(this.dragElem);
                    this.dragElem.remove();
                }

                if (this.cursor && this.cursor.length)
                    this.cursor.before($unit);
                else
                    this.container.append($unit);

                const $prev = $unit.prev();
                const $next = $unit.next();

                if ($prev.length && $prev.hasClass(`${this._option.id}-cursor`)) {
                    $prev = $prev.prev();
                }

                if ($next.length && $next.hasClass(`${this._option.id}-cursor`)) {
                    $next = $next.next();
                }

                if ($prev.length && $prev.hasClass(`${this._option.id}-unit`)) {
                    merge = true;
                    $item = $prev;
                    $item.append($unit[0].innerHTML);
                } else if ($next.length && $next.hasClass(`${this._option.id}-unit`)) {
                    merge = true;
                    $item = $next;
                    $item.prepend($unit[0].innerHTML);
                }

                if (merge) {
                    decimal = $item.text().toFormulaDecimal();
                    this.setCursorValue($item, decimal);
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

    public insertData(data: string | string[] | any[]) {
        const arrayData = typeof data === 'string'
            ? data.split('')
            : data;

        arrayData
            .forEach(value => {
                const inputValue = typeof value === 'string' || !this._option.import
                    ? value
                    : this._option.import(value);
                this.insert(inputValue);
            });
        this.hookUpdate();
    }
}

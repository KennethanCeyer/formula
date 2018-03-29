import { FormulizeOptions } from './option.interface';
import { defaultOptions } from './option.value';
import { ElementPosition, Position } from './formulize.interface';
import { FormulizeHelper } from './formulize.helper';
import { Key } from '../key.enum';
import { Helper } from '../helper';
import { convert, valid } from 'metric-parser';
import { specialCharacters, supportedCharacters } from './formulize.value';
import { Tree } from 'metric-parser/dist/types/tree/simple.tree/type';

export abstract class FormulizeBase {
    protected _elem: HTMLElement;
    protected _options: FormulizeOptions = <FormulizeOptions>{ ...defaultOptions };
    protected _position: Position = { x: 0, y: 0 };
    protected dragged: boolean;
    protected moved: boolean;
    protected container: JQuery;
    protected statusBox: JQuery;
    protected textBox: JQuery;
    protected cursor: JQuery;

    protected get dragElem(): JQuery {
        return this.container
            .find(`.${this._options.id}-drag`);
    }

    protected get cursorIndex(): number {
        return this.cursor
            ? this.cursor.index()
            : 0;
    }

    public constructor(elem: HTMLElement, options?: FormulizeOptions) {
        this._elem = elem;
        this._options = <FormulizeOptions>{ ...this._options, ...options };

        this.container = $(this._elem);
        this.container.addClass(`${this._options.id}-container`);
        this.container.wrap(`<div class="${this._options.id}-wrapper"></div>`);

        this.statusBox = $(`<div class="${this._options.id}-alert">${this._options.text.formula}</div>`);
        this.statusBox.insertBefore(this.container);

        this.textBox = $(`
            <textarea
              id="${this._options.id}-text"
              name="${this._options.id}-text"
              class="${this._options.id}-text"
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
        this.moved = false;
        this._position = position;
    }

    protected endDrag(position: Position): void {
        this.dragged = false;

        if (this.moved) {
            return;
        }

        this.moved = false;
        this.pick(position);
    }

    private prevCursorIndex = 0;
    protected moveDrag(position: Position): void {
        if (!this.dragged)
            return;

        if (!FormulizeHelper.isOverDistance(this._position, position, 5))
            return;

        this.moved = true;
        this.removeDrag();

        const cursorIndex = this.cursorIndex;
        this.pick(position);
        const positions = [this.prevCursorIndex, cursorIndex];
        positions.sort();

        const startPosition = positions[0];
        const endPosition = positions[1];

        if (startPosition === endPosition) {
            this.prevCursorIndex = cursorIndex;
            return;
        }

        const dragElem = $(FormulizeHelper.getDragElement(this._options.id));
        if (cursorIndex >= this.prevCursorIndex)
            dragElem.insertBefore(this.cursor);
        else
            dragElem.insertAfter(this.cursor);

        this.selectRange(startPosition, endPosition);
        this.prevCursorIndex = cursorIndex;
    }

    protected setCursorValue(elem: HTMLElement, value: string) {
        if (!value)
            return;

        $(elem).empty();
        const decimalValue = Helper.toDecimal(value);
        const split = decimalValue.split('.');
        const prefix = $(`<span class="${this._options.id}-prefix ${this._options.id}-decimal-highlight">${split[0]}</span>`);
        prefix.appendTo($(elem));

        if (!split[1])
            return;

        const suffix = $(`<span class="${this._options.id}-surfix ${this._options.id}-decimal-highlight">.'${split[1]}</span>`);
        suffix.appendTo($(elem));
    }

    public pick(position: Position = { x: 0, y: 0 }) {
        this.removeCursor();
        this.cursor = $(FormulizeHelper.getCursorElement(this._options.id));
        this.cursor.appendTo(this.container);

        const closestUnitElem = this.findClosestUnit(position);
        if (closestUnitElem)
            this.cursor.insertAfter(closestUnitElem);
        else
            this.cursor.prependTo(this.container);

        this.removeDrag();
    }

    private findClosestUnit(position: Position): HTMLElement {
        const containerPosition = {
            x: this.container.offset().left,
            y: this.container.offset().top
        };

        const parentPadding: Position = {
            x: Number(this.container.css('padding-left').replace(/[^\d.]/gi, '')),
            y: Number(this.container.css('padding-top').replace(/[^\d.]/gi, ''))
        };

        const unitPositions: ElementPosition[] = this.container
            .children(`*:not(".${this._options.id}-cursor")`)
            .toArray()
            .map(elem => ({
                elem,
                x: $(elem).offset().left - containerPosition.x + parentPadding.x,
                y: $(elem).offset().top - containerPosition.y
            }));

        let maxY = 0;
        const closestUnitPositions = unitPositions
            .filter(unitPosition => unitPosition.x <= position.x)
            .map(unitPosition => {
                if (unitPosition.y < maxY * 0.5)
                    return undefined;

                const diffX = Math.abs(position.x - unitPosition.x);
                const diffY = Math.abs(position.y - unitPosition.y);
                return {
                    ...unitPosition,
                    diff: { x: diffX, y: diffY }
                };
            })
            .filter(unitPosition => !!unitPosition);
        const filteredUnitPositions = closestUnitPositions.filter(unitPosition => unitPosition.y === maxY).length
            ? closestUnitPositions.filter(unitPosition => unitPosition.y === maxY)
            : closestUnitPositions.filter(unitPosition => unitPosition.y <= position.y);
        filteredUnitPositions.sort((a, b) => a.diff.x - b.diff.x || a.diff.y - b.diff.y);
        const closestUnitPosition = filteredUnitPositions.shift();
        return closestUnitPosition
            ? closestUnitPosition.elem
            : undefined;
    }

    protected selectRange(start: number, end: number): void {
        if (!this.dragElem.length)
            return;

        this.container
            .children(`:not(".${this._options.id}-cursor")`)
            .filter(`:gt("${start}")`)
            .filter(`:lt("${end - start}")`)
            .add(this.container.children(`:not(".${this._options.id}-cursor")`).eq(start))
            .toArray()
            .forEach(elem => () => $(elem).appendTo(this.dragElem));
    }

    protected hookKeyDown(event: JQuery.Event<KeyboardEvent>): void {
        event.preventDefault();

        if (!this.cursor || !this.cursor.length)
            return;

        const keyCode = event.which >= Key.Numpad0 && event.which <= Key.Numpad9
            ? event.which - Key.Zero
            : event.which;

        this.analyzeKey(keyCode, event.ctrlKey, event.shiftKey);

        const key = Helper.getKeyCodeValue(keyCode, event.shiftKey);
        const realKey = event.shiftKey && /[0-9]/.test(key) && specialCharacters[Number(key)]
            ? specialCharacters[Number(key)]
            : key;
        this.insertKey(realKey);
        this.validate();
    }

    protected hookUpdate(): void {
        this.validate();
        $(this._elem)
            .triggerHandler(`${this._options.id}.input`, this.getData());
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
            prevCursorElem.hasClass(`${this._options.id}-unit`) &&
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
            nextCursorElem.hasClass(`${this._options.id}-unit`) &&
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
            .find(`.${this._options.id}-cursor`)
            .remove();
    }

    protected removeUnit(): void {
        this.container
            .find(`:not(".${this._options.id}-cursor")`)
            .remove();
    }

    private moveCursorBefore(elem: HTMLElement) {
        if (!$(elem).length)
            return;

        this.cursor.insertBefore($(elem));
    }

    private moveCursorAfter(elem: HTMLElement) {
        if (!$(elem).length)
            return;

        this.cursor.insertAfter($(elem));
    }

    protected moveLeftCursor(dragMode: boolean = false): void {
        const prevCursorElem = this.cursor.prev();

        if (!this.cursor.length || !prevCursorElem.length || !dragMode) {
            this.removeDrag();
            this.moveCursorBefore(prevCursorElem.get(0));
            return;
        }

        if (!this.dragElem.length) {
            const dragElem = $(FormulizeHelper.getDragElement(this._options.id));
            dragElem.insertBefore(this.cursor);
            prevCursorElem.prependTo(this.dragElem);
            return;
        }

        if (prevCursorElem.hasClass(`${this._options.id}-drag`)) {
            const draggedUnit = this.dragElem.children();
            if (!draggedUnit.length) {
                this.dragElem.remove();
                return;
            }

            draggedUnit.last().insertAfter(this.dragElem);
            this.moveCursorAfter(this.dragElem.get(0));
            return;
        }
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
            const dragElem = $(FormulizeHelper.getDragElement(this._options.id));
            dragElem.insertBefore(this.cursor);
            nextCursorElem.appendTo(this.dragElem);
            return;
        }

        if (nextCursorElem.hasClass(`${this._options.id}-drag`)) {
            const draggedUnit = this.dragElem.children();
            if (!draggedUnit.length) {
                this.dragElem.remove();
                return;
            }

            draggedUnit.first().insertBefore(this.dragElem)
            this.moveCursorBefore(this.dragElem.get(0));
            return;
        }

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
            const dragElem = $(FormulizeHelper.getDragElement(this._options.id));
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
            const dragElem = $(FormulizeHelper.getDragElement(this._options.id));
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
        const dragElem = $(FormulizeHelper.getDragElement(this._options.id));
        dragElem.prependTo(this.container);
        this.container
            .children(`:not(".${this._options.id}-cursor")`)
            .toArray()
            .forEach(elem => $(elem).appendTo(dragElem));
    }

    public validate(extractor?: (valid: boolean) => void) {
        const data = this.getData();

        if (!data)
            return;

        const isValid = valid(data);
        console.log('isValid', isValid, this.statusBox, this._options);
        if (isValid) {
            this.statusBox
                .text(this._options.text.pass)
                .addClass(`${this._options.id}-alert-good`)
                .removeClass(`${this._options.id}-alert-error`);
        }
        else {
            this.statusBox
                .text(this._options.text.error)
                .removeClass(`${this._options.id}-alert-good`)
                .addClass(`${this._options.id}-alert-error`);
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
        return this.container
            .find('.formulize-item')
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
        console.log('expression', expression);
        const result = convert(expression);

        if (extractor)
            extractor(result.data);

        return result.data;
    }

    public insert(obj: string | number | HTMLElement, position?: Position) {
        if (!obj)
            return;

        if (!this.cursor || !this.cursor.length || position)
            this.pick(position);

        if (typeof obj === 'string' || typeof obj === 'number') {
            this.insertKey(<string>obj);
            return;
        }

        if (!(obj instanceof HTMLElement))
            return;

        $(obj).addClass(`${this._options.id}-item`);
        $(obj).insertBefore(this.cursor);

        this.hookUpdate();
    }

    public insertKey(key: string): void {
        if (!this.isValidKey(key))
            return;

        if (this.isNumberTokenKey(key)) {
            const unitElem = $(`<div class="${this._options.id}-item ${this._options.id}-unit">${key}</div>`);

            if (this.dragElem.length) {
                this.cursor.insertBefore(this.dragElem);
                this.dragElem.remove();
            }

            if (this.cursor && this.cursor.length)
                this.cursor.before(unitElem);
            else
                this.container.append(unitElem);

            const prevUnitElem = unitElem.prevUntil(`:not(.${this._options.id}-cursor)`);
            const nextUnitElem = unitElem.nextUntil(`:not(.${this._options.id}-cursor)`);

            const targetUnitElem = [prevUnitElem, nextUnitElem]
                .find(elem => elem.length && elem.hasClass(`${this._options.id}-unit`));

            if (!targetUnitElem)
                return;

            if (targetUnitElem === prevUnitElem)
                targetUnitElem.append(unitElem[0].innerHTML);

            if (targetUnitElem === nextUnitElem)
                targetUnitElem.prepend(unitElem[0].innerHTML);

            const text = targetUnitElem.text();
            this.setCursorValue(targetUnitElem.get(0), text);
            unitElem.remove();

            this.hookUpdate();
            return;
        }

        if (!key)
            return;

        const operatorElem = $(`<div class="${this._options.id}-item ${this._options.id}-operator">${key.toLowerCase()}</div>`);

        if (this.cursor && this.cursor.length)
            this.cursor.before(operatorElem);
        else
            this.container.append(operatorElem);

        if (key === '(' || key === ')')
            operatorElem.addClass(`${this._options.id}-bracket`);
    }

    public insertData(data: string | string[] | any[]) {
        const arrayData = typeof data === 'string'
            ? data.split('')
            : data;

        arrayData
            .forEach(value => {
                const inputValue = typeof value === 'string' || !this._options.import
                    ? value
                    : this._options.import(value);
                this.insert(inputValue);
            });
        this.hookUpdate();
    }
}

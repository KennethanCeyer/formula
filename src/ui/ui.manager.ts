import { convert, valid } from 'metric-parser';
import { FormulizeTokenHelper } from '../token.helper';
import { Tree } from 'metric-parser/dist/types/tree/simple.tree/type';
import { UIElementHelper } from './ui.element.helper';
import { ElementPosition, FormulizeData, Position } from './ui.interface';
import { UIHelper } from './ui.helper';
import { UIPipe } from './ui.pipe';
import { ParseData } from 'metric-parser/dist/types/parser/parser';

export abstract class UIManager extends UIPipe {
    protected prevCursorIndex = 0;
    protected prevPosition: Position = { x: 0, y: 0 };
    protected dragged: boolean;
    protected moved: boolean;

    public pick(position: Position = { x: 0, y: 0 }) {
        this.removeCursor();
        this.cursor = $(UIElementHelper.getCursorElement(this.options.id));
        this.cursor.appendTo(this.container);

        const closestUnitElem = this.findClosestUnit(position);
        if (closestUnitElem)
            this.cursor.insertAfter(closestUnitElem);
        else
            this.cursor.prependTo(this.container);

        this.removeDrag();
    }

    public setData(data: Tree): void {
        this.clear();
        const result = convert(data);
        if (!result.code)
            this.insertData(result.data);
    }

    public getData<T extends Tree>(extractor?: (data: T) => void): T {
        const expression = this.getExpression();
        const result = convert(expression);

        if (extractor)
            extractor(result.data);

        return result.data;
    }

    protected triggerUpdate(): void {
        this.validate();
        $(this.elem)
            .triggerHandler(`${this.options.id}.input`, this.getData());
    }

    private getExpression(): FormulizeData[] {
        return this.container
            .find(`.${this.options.id}-item`)
            .toArray()
            .map(elem => this.pipeParse(elem))
            .map(value => UIHelper.getDataValue(value));
    }

    protected startDrag(position: Position): void {
        this.dragged = true;
        this.moved = false;
        this.prevPosition = position;
        this.pick(position);
        this.prevCursorIndex = this.cursorIndex;
    }

    protected endDrag(position: Position): void {
        this.dragged = false;

        if (this.moved)
            return;

        this.moved = false;
        this.pick(position);
    }

    protected moveDrag(position: Position): void {
        if (!this.dragged)
            return;

        if (!this.moved) {
            this.moved = UIHelper.isOverDistance(this.prevPosition, position, 5);
            return;
        }

        this.removeDrag();
        this.pick(position);

        if (this.prevCursorIndex === this.cursorIndex)
            return;

        const positions = [this.prevCursorIndex, this.cursorIndex];
        positions.sort();

        const dragElem = $(UIElementHelper.getDragElement(this.options.id));
        if (this.cursorIndex >= this.prevCursorIndex)
            dragElem.insertBefore(this.cursor);
        else
            dragElem.insertAfter(this.cursor);

        this.selectRange(positions[0], positions[1]);
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
            .children(`*:not(".${this.options.id}-cursor")`)
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

    public selectAll(): void {
        this.removeDrag();
        const dragElem = $(UIElementHelper.getDragElement(this.options.id));
        dragElem.prependTo(this.container);
        this.container
            .children(`:not(".${this.options.id}-cursor")`)
            .appendTo(dragElem);
    }

    public selectRange(start: number, end: number): void {
        if (!this.dragElem.length)
            return;

        this.container
            .children(`:not(".${this.options.id}-cursor")`)
            .filter(`:gt("${start}")`)
            .filter(`:lt("${end - start}")`)
            .add(this.container.children(`:not(".${this.options.id}-cursor")`).eq(start))
            .appendTo(this.dragElem);
    }

    protected removeBefore(): void {
        if (this.dragElem.length) {
            this.cursor.insertBefore(this.dragElem);
            this.dragElem.remove();
            this.triggerUpdate();
            return;
        }

        const prevCursorElem = this.cursor.prev();
        if (!this.cursor.length || !prevCursorElem.length)
            return;

        if (
            prevCursorElem.hasClass(`${this.options.id}-unit`) &&
            prevCursorElem.text().length > 1
        ) {
            const text = prevCursorElem.text();
            UIElementHelper.setUnitValue(this.options.id, prevCursorElem.get(0), text.substring(0, text.length - 1));
        } else
            prevCursorElem.remove();

        this.triggerUpdate();
    }

    protected removeAfter(): void {
        if (this.dragElem.length) {
            this.cursor.insertAfter(this.dragElem);
            this.dragElem.remove();
            this.triggerUpdate();
            return;
        }

        const nextCursorElem = this.cursor.next();
        if (!this.cursor.length || !nextCursorElem.length)
            return;

        if (
            nextCursorElem.hasClass(`${this.options.id}-unit`) &&
            nextCursorElem.text().length > 1
        ) {
            const text = nextCursorElem.text();
            UIElementHelper.setUnitValue(this.options.id, nextCursorElem.get(0), text.substring(1, text.length));
        } else
            nextCursorElem.remove();

        this.triggerUpdate();
    }

    protected dragFirst(): void {
        this.cursor.prevAll().prependTo(this.dragElem);
        this.cursor.insertAfter(this.dragElem);
    }

    protected dragLast(): void {
        this.cursor.nextAll().appendTo(this.dragElem);
        this.cursor.insertBefore(this.dragElem);
    }

    protected dragLeft(): void {
        if (UIElementHelper.isDrag(this.options.id, this.cursor.prev().get(0))) {
            this.dragElem.prev().prependTo(this.dragElem);
            this.moveCursorAfter(this.dragElem.get(0));
            return;
        }

        if (UIElementHelper.isDrag(this.options.id, this.cursor.next().get(0))) {
            const lastDraggedElem = this.dragElem.children().last();
            lastDraggedElem.insertAfter(this.dragElem);

            if (!this.dragElem.children().length)
                this.removeDrag();

            return;
        }
    }

    protected dragRight(): void {
        if (UIElementHelper.isDrag(this.options.id, this.cursor.next().get(0))) {
            this.dragElem.next().appendTo(this.dragElem);
            this.moveCursorBefore(this.dragElem.get(0));
            return;
        }

        if (UIElementHelper.isDrag(this.options.id, this.cursor.prev().get(0))) {
            const firstDraggedElem = this.dragElem.children().first();
            firstDraggedElem.insertBefore(this.dragElem);

            if (!this.dragElem.children().length)
                this.removeDrag();

            return;
        }
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

        if (!this.cursor.length || !dragMode) {
            this.moveCursorBefore(prevCursorElem.get(0));
            this.removeDrag();
            return;
        }

        if (!this.dragElem.length) {
            if (!prevCursorElem.length)
                return;

            const dragElem = $(UIElementHelper.getDragElement(this.options.id));
            dragElem.insertBefore(this.cursor);
            prevCursorElem.prependTo(this.dragElem);
            return;
        }

        this.dragLeft();
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

        if (!this.cursor.length || !dragMode) {
            this.moveCursorAfter(nextCursorElem.get(0));
            this.removeDrag();
            return;
        }

        if (!this.dragElem.length) {
            if (!nextCursorElem.length)
                return;

            const dragElem = $(UIElementHelper.getDragElement(this.options.id));
            dragElem.insertAfter(this.cursor);
            nextCursorElem.appendTo(this.dragElem);
            return;
        }

        this.dragRight();
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
            const dragElem = $(UIElementHelper.getDragElement(this.options.id));
            dragElem.insertAfter(this.cursor);
        }

        this.dragFirst();
    }

    protected moveLastCursor(dragMode: boolean = false): void {
        const lastCursorElem = this.container.children(':last');
        if (!this.cursor.length || !lastCursorElem.length || !dragMode) {
            this.removeDrag();
            this.moveCursorAfter(lastCursorElem.get(0));
            return;
        }

        if (!this.dragElem.length) {
            const dragElem = $(UIElementHelper.getDragElement(this.options.id));
            dragElem.insertBefore(this.cursor);
        }

        this.dragLast();
    }

    public clear(): void {
        this.removeCursor();
        this.removeUnit();
        this.triggerUpdate();
    }

    public blur(): void {
        if (!this.cursor)
            return;

        this.cursor.remove();
        this.removeDrag();
    }

    public removeDrag(): void {
        this.dragElem.children().insertBefore(this.dragElem);
        this.dragElem.remove();
        this.triggerUpdate();
    }

    public insert(data: FormulizeData, position?: Position): void {
        if (!data)
            return;

        const pipedData = this.pipeInsert(data);

        if (!this.cursor || !this.cursor.length || position)
            this.pick(position);

        if (typeof pipedData === 'string' || typeof pipedData === 'number') {
            this.insertValue(String(pipedData));
            return;
        }

        if (!UIHelper.isDOM(pipedData))
            return;

        const insertElem = $(pipedData);
        insertElem.addClass(`${this.options.id}-item`);
        insertElem.insertBefore(this.cursor);

        this.triggerUpdate();
    }

    public insertValue(value: string): void {
        if (!FormulizeTokenHelper.isValid(value))
            return;

        if (FormulizeTokenHelper.isNumeric(value)) {
            const unitElem = $(UIElementHelper.getUnitElement(this.options.id, value));

            if (this.dragElem.length) {
                this.cursor.insertBefore(this.dragElem);
                this.dragElem.remove();
            }

            if (this.cursor && this.cursor.length)
                this.cursor.before(unitElem);
            else
                this.container.append(unitElem);

            this.mergeUnit(unitElem[0]);

            this.triggerUpdate();
            return;
        }

        const operatorElem = $(UIElementHelper.getOperatorElement(this.options.id, value));
        if (this.cursor && this.cursor.length)
            this.cursor.before(operatorElem);
        else
            this.container.append(operatorElem);

        if (FormulizeTokenHelper.isBracket(value))
            operatorElem.addClass(`${this.options.id}-bracket`);
    }

    public insertData(data: string | string[] | any[]): void {
        const arrayData = typeof data === 'string'
            ? data.split('')
            : data;

        arrayData.forEach(value => this.insert(value));
        this.triggerUpdate();
    }

    public validate(extractor?: (valid: boolean) => void): boolean {
        const data = this.getData();

        if (!data)
            return;

        const isValid = valid(data);

        this.updateStatus(isValid);

        if (extractor)
            extractor(isValid);

        return isValid;
    }
}

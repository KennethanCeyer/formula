import { Option } from './option.interface';
import { defaultOption } from './option.value';
import { FormulizeInterface, Position } from './formulize.interface';

export abstract class FormulizeBase implements FormulizeInterface {
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

    public constructor(elem: Element, option?: Option) {
        this._elem = elem;
        this._option = { ...this._option, ...option};

        this.init();
        this.attachEvents();
    }

    public init() {
        throw new Error('method not implemented');
    }

    protected attachEvents() {
        throw new Error('method not implemented');
    }

    protected startDrag(position: Position): void {
        this.dragged = true;
        this._position = position;
    }

    protected endDrag(position: Position): void {
        const currentDrag = this.dragged;
        this.dragged = false;

        if (currentDrag)
            return;

        this.select(position);
    }

    protected moveDrag(offset: Position): void {
        if (!this.dragged)
            return;

        if (
            Math.abs(this._position.x - offset.x) <= 5 &&
            Math.abs(this._position.y - offset.y) <= 5
        )
            return;

        if (this.container.hasClass('formula-active'))
            this.select(offset);

        const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
        this.removeDrag();
        const prevPosition = this.cursor.index();
        this.select(offset);
        const nextPosition = this.cursor.index();

        if (!this.container.find(`.${this._option.id}-drag`).length) {
            dragElem.insertAfter(this.cursor);
            return;
        }

        const positions = [prevPosition, nextPosition];
        positions.sort();
        const startPosition = positions[0];
        const endPosition = positions[1];

        if (prevPosition > nextPosition)
            dragElem.insertBefore(this.cursor);
        else
            dragElem.insertAfter(this.cursor);

        if (prevPosition === nextPosition)
            return;

        this.container
            .children(`:not(".${this._option.id}-cursor")`)
            .filter(`:gt("${startPosition}")`)
            .filter(`:lt("${endPosition - startPosition}")`)
            .add(this.container.children(`:not(".${this._option.id}-cursor")`).eq(startPosition))
            .each((_, elem) => $(elem).appendTo(dragElem));

        if (prevPosition > nextPosition)
            dragElem.insertAfter(this.cursor);
        else
            dragElem.insertBefore(this.cursor);
    }

    public select(position: Position = { x: 0, y: 0 }) {
        this.container
            .find(`.${this._option.id}-cursor`)
            .remove();

        this.cursor = $(`<div class="${this._option.id}-cursor"></div>`);
        this.cursor.appendTo(this.container);

        // TODO: belows code is suck, no hope, refactor right now
        const containerPosition = {
            x: this.container.offset().left,
            y: this.container.offset().top
        };

        const parentPadding = {
            x: parseFloat(this.container.css('padding-left').replace(/[^\d.]/gi, '')),
            y: parseFloat(this.container.css('padding-top').replace(/[^\d.]/gi, ''))
        };

        const unitPositions = this.container
            .children(`*:not(".${this._option.id}-cursor")`)
            .map((_, elem) => (<ElementPosition>{
                elem,
                x: $(elem).offset().left - containerPosition.x + parentPadding.x,
                y: $(elem).offset().top - containerPosition.y
            }));

        // TODO: WTF
        const $pointer = null;
        const maxY = 0, maxDiff = 10000;
        for (idx in unitPositions) {
            check = unitPositions[idx];
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
            for (idx in unitPositions) {
                check = unitPositions[idx];
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

        if (unitPositions.length && $pointer !== null && maxY + unitPositions[0].e.outerHeight() >= position.y) {
            this.cursor.insertAfter($pointer);
        } else {
            if (unitPositions.length && position.x > unitPositions[0].x) {
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
    }

    protected hookKeyDown(event: KeyboardEvent) {
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

    protected removeBefore(): void {
        if (this.dragElem.length) {
            this.cursor.insertBefore(this.dragElem);
            this.dragElem.remove();
        } else if (this.cursor.length && this.cursor.prev().length) {
            $prev = this.cursor.prev();
            if ($prev.hasClass(`${this._option.id}-unit`) && $prev.text().length > 1) {
                text = $prev.text();
                this.setDecimal($prev, text.substring(0, text.length - 1).toFormulaDecimal());
            } else {
                $prev.remove();
            }
        }
        this.hookUpdate();
    }

    protected removeAfter(): void {
        if (this.dragElem.length) {
            this.cursor.insertAfter(this.dragElem);
            this.dragElem.remove();
        } else {
            if (this.cursor.length && this.cursor.next().length) {
                $next = this.cursor.next();
                if ($next.hasClass(`${this._option.id}-unit`) && $next.text().length > 1) {
                    text = $next.text();
                    this.setDecimal($next, text.substring(1, text.length).toFormulaDecimal());
                } else {
                    $next.remove();
                }
            }
        }
        this.hookUpdate();
    }

    protected moveLeftCursor(DragMode: boolean = false): void {
        if (!this.cursor.length || !this.cursor.prev().length) {
            this.removeDrag();
            return;
        }

        if (!DragMode) {
            this.removeDrag();
            this.cursor.insertBefore(this.cursor.prev());
            return;
        }

        if (!this.dragElem.length) {
            const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
            dragElem.insertAfter(this.cursor);
        } else {
            if (!dragElem.data('active')) {
                this.removeDrag();
                dragElem = $(`<div class="${this._option.id}-drag"></div>`);
                dragElem.insertAfter(this.cursor);
            }
        }
        dragElem.data('active', true);

        $prev = this.cursor.prev();
        if ($prev.hasClass(`${this._option.id}-drag`)) {
            dragElemItem = dragElem.children('*');
            if (dragElemItem.length < 1) {
                dragElem.remove();
            } else {
                dragElemItem.last().insertAfter(dragElem);
                this.cursor.insertAfter(dragElem);
            }
        } else {
            this.cursor.prev().prependTo(dragElem);
        }
    }

    protected moveUpCursor(): void {
        if (!this.cursor.length)
            return;

        this.select({
            x: this.cursor.position().left + this.cursor.outerWidth(),
            y: this.cursor.position().top - this.cursor.outerHeight() / 2
        });
    }

    protected moveRightCursor(DragMode: boolean = false): void {
        if (!this.cursor.length || !this.cursor.next().length) {
            this.removeDrag();
            return;
        }

        if (!DragMode) {
            this.removeDrag();
            this.cursor.insertAfter(this.cursor.next());
        }

        if (!this.dragElem.length) {
            const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
            dragElem.insertBefore(this.cursor);
        } else {
            if (!this.dragElem.data('active')) {
                this.removeDrag();
                const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
                dragElem.insertBefore(this.cursor);
            }
        }
        this.dragElem.data('active', true);

        const nextCursorElem = this.cursor.next();
        if (nextCursorElem.hasClass(`${this._option.id}-drag`)) {
            const draggedUnit = this.dragElem.children();
            if (!draggedUnit.length)
                dragElem.remove();
            else {
                draggedUnit.first().insertBefore(dragElem);
                this.cursor.insertBefore(dragElem);
            }
        } else
            this.cursor.next().appendTo(dragElem);
    }

    protected moveDownCursor(): void {
        if (!this.cursor.length)
            return;

        this.select({
            x: this.cursor.position().left + this.cursor.outerWidth(),
            y: this.cursor.position().top + this.cursor.outerHeight() * 1.5
        });
    }

    protected moveFirstCursor(DragMode: boolean = false): void {
        if (!this.cursor.length || this.container.children(':first').length)
            return;

        if (!DragMode) {
            this.removeDrag();
            this.cursor.insertBefore(this.container.children(':first'));
        }

        if (!this.dragElem.length) {
            const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
            dragElem.insertAfter(this.cursor);
        } else {
            if (!this.dragElem.data('active')) {
                this.removeDrag();
                const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
                dragElem.insertAfter(this.cursor);
            }
        }
        this.dragElem.data('active', true);
        this.cursor
            .prevAll()
            .each((_, elem) => $(elem).prependTo(dragElem));
    }

    protected moveLastCursor(DragMode: boolean = false): void {
        if (!this.cursor.length || !this.container.children(':last').length)
            return;

        if (!DragMode) {
            this.removeDrag();
            this.cursor.insertAfter(this.container.children(':last'));
        }

        if (!this.dragElem.length) {
            const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
            dragElem.insertBefore(this.cursor);
        } else {
            if (!this.dragElem.data('active')) {
                this.removeDrag();
                const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
                dragElem.insertBefore(this.cursor);
            }
        }
        this.dragElem.data('active', true);
        this.cursor
            .nextAll()
            .appendTo(dragElem);
    }

    public blur() {
        if (!this.cursor)
            return;

        this.cursor.remove();
        this.removeDrag();
    }

    public removeDrag() {
        const dragElem = this.container.find(`.${this._option.id}-drag`);
        dragElem
            .children('*')
            .each((_, elem) => $(elem).insertBefore(dragElem));
        dragElem.remove();
        this.hookUpdate();
    }

    public selectAll() {
        this.removeDrag();
        const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
        dragElem.prependTo(this.container);
        this.container
            .children(':not(".${this._option.id}-cursor")')
            .each((_, elem) => $(elem).appendTo(dragElem));
    }
}

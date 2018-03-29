import { Option } from './option.interface';
import { defaultOption } from './option.value';

export abstract class FormulizeBase {
    protected _elem: Element;
    protected _option: Option = { ...defaultOption };
    protected _position: Position = { x: 0, y :0 };
    protected Drag: boolean;
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

    protected startDrag(offset: Position): void {
        this.Drag = true;
        this._position = offset;
    }

    protected endDrag(offset: Position): void {
        const currentDrag = this.Drag;
        this.Drag = false;

        if (currentDrag)
            return;

        this.click(offset);
    }

    protected moveDrag(offset: Position): void {
        if (!this.Drag)
            return;

        if (
            Math.abs(this._position.x - offset.x) <= 5 &&
            Math.abs(this._position.y - offset.y) <= 5
        )
            return;

        if (this.container.hasClass('formula-active'))
            this.click(offset);

        const dragElem = $(`<div class="${this._option.id}-drag"></div>`);
        this.removeDrag();
        const prevPosition = this.cursor.index();
        this.click(offset);
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

    protected eventKeyDown(event: KeyboardEvent) {
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

        this.click({
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

        this.click({
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

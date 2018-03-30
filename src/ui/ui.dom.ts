import { FormulizeOptions } from '../formulize.interface';
import { defaultOptions } from '../option.value';
import { UIElementHelper } from './ui.element.helper';

export abstract class UIDom {
    protected container: JQuery;
    protected statusBox: JQuery;
    protected textBox: JQuery;
    protected cursor: JQuery;

    protected get cursorIndex(): number {
        return this.cursor
            ? this.cursor.index()
            : 0;
    }

    protected get dragElem(): JQuery {
        return this.container
            .find(`.${this.options.id}-drag`);
    }

    constructor(protected elem: HTMLElement, protected options: FormulizeOptions = { ...defaultOptions }) {
        this.container = $(this.elem);
        this.container.addClass(`${this.options.id}-container`);
        this.container.wrap(`<div class="${this.options.id}-wrapper"></div>`);

        this.statusBox = $(`<div class="${this.options.id}-alert">${this.options.text.formula}</div>`);
        this.statusBox.insertBefore(this.container);

        this.textBox = $(UIElementHelper.getTextBoxElement(this.options.id));
        this.textBox.insertAfter(this.container);
        this.textBox.trigger('focus');
    }

    protected attachEvents() {
        throw new Error('method not implemented');
    }

    protected removeCursor(): void {
        this.container
            .find(`.${this.options.id}-cursor`)
            .remove();
    }

    protected removeUnit(): void {
        this.container
            .find(`:not(".${this.options.id}-cursor")`)
            .remove();
    }
}

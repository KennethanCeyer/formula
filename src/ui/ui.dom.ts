import { FormulizeOptions } from '../formulize.interface';
import { defaultOptions } from '../option.value';
import { UIElementHelper } from './ui.element.helper';
import { FormulizeTokenHelper } from '../token.helper';

export abstract class UIDom {
    protected container: JQuery;
    protected statusBox: JQuery;
    protected textBox: JQuery;
    protected cursor: JQuery;
    protected elem: HTMLElement;
    protected options: FormulizeOptions;

    protected get cursorIndex(): number {
        return this.cursor
            ? this.cursor.index()
            : 0;
    }

    protected get dragElem(): JQuery {
        return this.container
            .find(`.${this.options.id}-drag`);
    }

    protected initializeDOM() {
        this.container = $(this.elem);
        this.container.addClass(`${this.options.id}-container`);
        this.container.wrap(`<div class="${this.options.id}-wrapper"></div>`);

        this.statusBox = $(`<div class="${this.options.id}-alert">${this.options.text.formula}</div>`);
        this.statusBox.insertBefore(this.container);

        this.textBox = $(UIElementHelper.getTextBoxElement(this.options.id));
        this.textBox.insertAfter(this.container);
        this.textBox.trigger('focus');
    }

    protected isAlreadyInitialized(): boolean {
        const selfAndContainer = $(this.elem)
            .closest(`.${this.options.id}-container`)
            .add(this.elem);
        return !!selfAndContainer.filter(`.${this.options.id}-container`).length;
    }

    protected attachEvents() {
        throw new Error('method not implemented');
    }

    protected getPrevUnit(elem: HTMLElement): HTMLElement {
        const prevElement = $(elem).prev();
        return UIElementHelper.isCursor(this.options.id, prevElement.get(0))
            ? prevElement.prev().get(0)
            : prevElement.get(0);
    }

    protected getNextUnit(elem: HTMLElement): HTMLElement {
        const nextElem = $(elem).next();
        return UIElementHelper.isCursor(this.options.id, nextElem.get(0))
            ? nextElem.next().get(0)
            : nextElem.get(0);
    }

    protected mergeUnit(baseElem: HTMLElement): void {
        const prevElem = $(this.getPrevUnit(baseElem));
        const nextElem = $(this.getNextUnit(baseElem));

        const unitElem = [prevElem, nextElem]
            .find(elem => UIElementHelper.isUnit(this.options.id, elem.get(0)));

        if (!unitElem)
            return;

        if (unitElem === prevElem) {
            prevElem.prependTo(baseElem);
            this.cursor.insertAfter(baseElem);
        } else if (unitElem === nextElem) {
            nextElem.appendTo(baseElem);
            this.cursor.insertBefore(baseElem);
        }

        const text = $(baseElem).text();
        this.setUnitValue(baseElem, text);
    }

    protected setUnitValue(elem: HTMLElement, value: string) {
        if (value === undefined)
            return;

        $(elem).empty();
        const decimalValue = FormulizeTokenHelper.toDecimal(value);
        const split = decimalValue.split('.');
        const prefix = $(UIElementHelper.getUnitDecimalElement(this.options.id, 'prefix', split[0]));
        prefix.appendTo($(elem));

        if (split[1] === undefined)
            return;

        const suffix = $(UIElementHelper.getUnitDecimalElement(this.options.id, 'suffix', `.${split[1]}`));
        suffix.appendTo($(elem));
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

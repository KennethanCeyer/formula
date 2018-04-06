import { FormulizeTokenHelper } from '../token.helper';

export class UIElementHelper {
    public static getDragElement(id: string): HTMLElement {
        return $(`<div class="${id}-drag"></div>`)[0];
    }

    public static getCursorElement(id: string): HTMLElement {
        return $(`<div class="${id}-cursor"></div>`)[0];
    }

    public static getUnitElement(id: string, value: string): HTMLElement {
        const unitElem = $(`<div class="${id}-item ${id}-unit"></div>`);
        UIElementHelper.setUnitValue(id, unitElem[0], value);
        return unitElem[0];
    }

    public static getUnitDecimalElement(id: string, side: 'prefix' | 'suffix', value: string): HTMLElement {
        return $(`<span class="${id}-${side} ${id}-decimal-highlight">${value || ''}</span>`)[0];
    }

    public static getOperatorElement(id: string, value: string): HTMLElement {
        return $(`<div class="${id}-item ${id}-operator">${(value || '').toLowerCase()}</div>`)[0];
    }

    public static getTextBoxElement(id: string): HTMLElement {
        return $(`<textarea id="${id}-text" name="${id}-text" class="${id}-text"></textarea>`)[0];
    }

    public static setUnitValue(id: string, elem: HTMLElement, value: string): void {
        if (value === undefined)
            return;

        $(elem).empty();
        const decimalValue = FormulizeTokenHelper.toDecimal(value);
        const split = decimalValue.split('.');
        const prefix = $(UIElementHelper.getUnitDecimalElement(id, 'prefix', split[0]));
        prefix.appendTo($(elem));

        if (split[1] === undefined)
            return;

        const suffix = $(UIElementHelper.getUnitDecimalElement(id, 'suffix', `.${split[1]}`));
        suffix.appendTo($(elem));
    }

    public static isElementType(id: string, type: string, elem: HTMLElement): boolean {
        return elem
            ? $(elem).hasClass(`${id}-${type}`)
            : false;
    }

    public static isDrag(id: string, elem: HTMLElement): boolean {
        return UIElementHelper.isElementType(id, 'drag', elem);
    }

    public static isCursor(id: string, elem: HTMLElement): boolean {
        return UIElementHelper.isElementType(id, 'cursor', elem);
    }

    public static isUnit(id: string, elem: HTMLElement): boolean {
        return UIElementHelper.isElementType(id, 'unit', elem);
    }

    public static isOperator(id: string, elem: HTMLElement): boolean {
        return UIElementHelper.isElementType(id, 'operator', elem);
    }
}

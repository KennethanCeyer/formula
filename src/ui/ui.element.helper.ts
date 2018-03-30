export class UIElementHelper {
    public static getDragElement(id: string): HTMLElement {
        return $(`<div class="${id}-drag"></div>`)[0];
    }

    public static getCursorElement(id: string): HTMLElement {
        return $(`<div class="${id}-cursor"></div>`)[0];
    }

    public static getUnitElement(id: string, value: string): HTMLElement {
        return $(`<div class="${id}-item ${id}-unit">${value}</div>`)[0];
    }

    public static getUnitDecimalElement(id: string, side: 'prefix' | 'suffix', value: string): HTMLElement {
        return $(`<span class="${id}-${side} ${id}-decimal-highlight">${value}</span>`)[0];
    }

    public static getOperatorElement(id: string, value: string): HTMLElement {
        return $(`<div class="${id}-item ${id}-operator">${value.toLowerCase()}</div>`)[0];
    }

    public static getTextBoxElement(id: string): HTMLElement {
        return $(`<textarea id="${id}-text" name="${id}-text" class="${id}-text"></textarea>`)[0];
    }

    public static isElementType(id: string, type: string, elem: HTMLElement): boolean {
        if (!elem)
            return;

        return $(elem).hasClass(`${id}-${type}`);
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

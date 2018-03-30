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

    public static getOperatorElement(id: string, value: string): HTMLElement {
        return $(`<div class="${id}-item ${id}-operator">${value.toLowerCase()}</div>`)[0];
    }

    public static getTextBoxElement(id: string): HTMLElement {
        return $(`<textarea id="${id}-text" name="${id}-text" class="${id}-text"></textarea>`)[0];
    }

    public static isUnit(id: string, elem: HTMLElement): boolean {
        if (!elem)
            return false;

        return $(elem).hasClass(`${id}-unit`);
    }
}

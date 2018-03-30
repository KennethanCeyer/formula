export class UIElementHelper {
    public static getDragElement(id: string): HTMLElement {
        return $(`<div class="${id}-drag"></div>`)[0];
    }

    public static getCursorElement(id: string): HTMLElement {
        return $(`<div class="${id}-cursor"></div>`)[0];
    }

    public static getUnitElement(id: string, text: string): HTMLElement {
        return $(`<div class="${id}-item ${id}-unit">${text}</div>`)[0];
    }

    public static getTextBoxElement(id: string): HTMLElement {
        return $(`<textarea id="${id}-text" name="${id}-text" class="${id}-text"></textarea>`)[0];
    }

    public static isUnit(id: string, elem: HTMLElement): boolean {
        return $(elem).hasClass(`${id}-unit`);
    }
}

export class UIElementHelper {
    public static getDragElement(id: string): HTMLElement {
        return $(`<div class="${id}-drag"></div>`)[0];
    }

    public static getCursorElement(id: string): HTMLElement {
        return $(`<div class="${id}-cursor"></div>`)[0];
    }

    public static getTextBoxElement(id: string): HTMLElement {
        return $(`<textarea id="${id}-text" name="${id}-text" class="${id}-text"></textarea>`)[0];
    }
}

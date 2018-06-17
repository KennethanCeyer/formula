export declare class UIElementHelper {
    static getDragElement(id: string): HTMLElement;
    static getCursorElement(id: string): HTMLElement;
    static getUnitElement(id: string, value: string): HTMLElement;
    static getUnitDecimalElement(id: string, side: 'prefix' | 'suffix', value: string): HTMLElement;
    static getOperatorElement(id: string, value: string): HTMLElement;
    static getTextBoxElement(id: string): HTMLElement;
    static setUnitValue(id: string, elem: HTMLElement, value: string): void;
    static isElementType(id: string, type: string, elem: HTMLElement): boolean;
    static isDrag(id: string, elem: HTMLElement): boolean;
    static isCursor(id: string, elem: HTMLElement): boolean;
    static isUnit(id: string, elem: HTMLElement): boolean;
    static isOperator(id: string, elem: HTMLElement): boolean;
}

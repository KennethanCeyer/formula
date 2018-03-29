import { Position } from './formulize.interface';

export class FormulizeHelper {
    public static getDataValue(elem: HTMLElement): string {
        const jQueryElem = $(elem);
        const value = jQueryElem.data('value');
        return value !== undefined
            ? value
            : $(elem).text();
    }

    public static isOverDistance(position: Position, targetPosition: Position, distance: number): boolean {
        return Math.abs(position.x - targetPosition.x) <= distance &&
        Math.abs(position.y - targetPosition.y) <= distance;
    }

    public static getDragElement(id: string): HTMLElement {
        return $(`<div class="${id}-drag"></div>`)[0];
    }

    public static getCursorElement(id: string): HTMLElement {
        return $(`<div class="${id}-cursor"></div>`)[0];
    }
}

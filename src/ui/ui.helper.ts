import { Position } from './ui.interface';

export class UIHelper {
    public static getDataValue(elem: HTMLElement): string {
        return $(elem).data('value') || $(elem).text();
    }

    public static isOverDistance(position: Position, targetPosition: Position, distance: number): boolean {
        return Math.abs(position.x - targetPosition.x) <= distance &&
        Math.abs(position.y - targetPosition.y) <= distance;
    }
}

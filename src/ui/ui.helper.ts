import { Position } from './ui.interface';
import { StringHelper } from '../string.helper';

export class UIHelper {
    public static getDataValue(elem: HTMLElement): string {
        const value = $(elem).data('value') || $(elem).text();
        return StringHelper.isNumeric(value)
            ? StringHelper.toNumber(String(value))
            : value;
    }

    public static isOverDistance(position: Position, targetPosition: Position, distance: number): boolean {
        return Math.abs(position.x - targetPosition.x) > distance ||
            Math.abs(position.y - targetPosition.y) > distance;
    }
}

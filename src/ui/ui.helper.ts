import { FormulizeData, Position } from './ui.interface';
import { StringHelper } from '../string.helper';

export class UIHelper {
    public static getDataValue(data: FormulizeData): string {
        if (!UIHelper.isDOM(data))
            return String(data);

        const value = $(<HTMLElement | JQuery>data).data('value') || $(<HTMLElement | JQuery>data).text();
        return StringHelper.isNumeric(value)
            ? StringHelper.toNumber(String(value))
            : value;
    }

    public static isOverDistance(position: Position, targetPosition: Position, distance: number): boolean {
        return Math.abs(position.x - targetPosition.x) > distance ||
            Math.abs(position.y - targetPosition.y) > distance;
    }

    public static isDOM(data: FormulizeData): boolean {
        return data instanceof HTMLElement || data instanceof jQuery;
    }
}

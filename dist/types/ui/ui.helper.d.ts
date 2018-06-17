import { FormulizeData, Position } from './ui.interface';
export declare class UIHelper {
    static getDataValue(data: FormulizeData): string;
    static isOverDistance(position: Position, targetPosition: Position, distance: number): boolean;
    static isDOM(data: FormulizeData): boolean;
    static getDOM(elem: HTMLElement | JQuery): HTMLElement;
}

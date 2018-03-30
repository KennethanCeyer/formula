import { UIBase } from './ui.base';
export declare class UI extends UIBase {
    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): boolean;
    protected attachEvents(): void;
}

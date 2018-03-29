import { FormulizeBase } from './formulize.base';
export declare class Formulize extends FormulizeBase {
    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): T;
    protected attachEvents(): void;
}

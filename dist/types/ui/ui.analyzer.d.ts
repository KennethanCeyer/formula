import { UIDom } from './ui.dom';
export declare abstract class UIAnalyzer extends UIDom {
    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): boolean;
}

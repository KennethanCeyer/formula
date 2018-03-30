import { UIDom } from './ui.dom';
export declare abstract class UiAnalyzer extends UIDom {
    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): boolean;
}

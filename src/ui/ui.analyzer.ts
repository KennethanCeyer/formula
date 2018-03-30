import { UIDom } from './ui.dom';

export abstract class UiAnalyzer extends UIDom {
    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): boolean {
        throw new Error('method not implemented');
    }
}

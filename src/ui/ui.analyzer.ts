import { UIDom } from './ui.dom';

export abstract class UiAnalyzer extends UIDom {
    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): T {
        throw new Error('method not implemented');
    }
}

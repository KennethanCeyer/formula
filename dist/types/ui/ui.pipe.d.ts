import { UIAnalyzer } from './ui.analyzer';
import { FormulizeData, FormulizeEvent } from './ui.interface';
export declare class UIPipe extends UIAnalyzer {
    protected pipeInsert(data: FormulizeData): any;
    protected pipeParse(elem: HTMLElement): any;
    protected pipeTrigger(name: FormulizeEvent, value: any): void;
}

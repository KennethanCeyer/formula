import { UIAnalyzer } from './ui.analyzer';
import { FormulizeData } from './ui.interface';
export declare class UIPipe extends UIAnalyzer {
    protected pipeInsert(data: FormulizeData): any;
    protected pipeParse(elem: HTMLElement): any;
}

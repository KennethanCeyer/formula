import { UIAnalyzer } from './ui.analyzer';
import { FormulizeData } from './ui.interface';
export declare class UIPipe extends UIAnalyzer {
    protected pipeImport(data: FormulizeData): FormulizeData;
    protected pipeExport(data: FormulizeData): any;
    private getElem(data);
}

import { UIAnalyzer } from './ui.analyzer';
import { FormulizeData } from './ui.interface';
import { UIHelper } from './ui.helper';

export class UIPipe extends UIAnalyzer {
    protected pipeImport(data: FormulizeData): FormulizeData {
        if (!this.options.import || !UIHelper.isDOM(data))
            return data;

        return this.options.import(this.getElem(<HTMLElement | JQuery>data));
    }

    protected pipeExport(data: FormulizeData): any {
        if (!this.options.export || !UIHelper.isDOM(data))
            return data;

        return this.options.export(this.getElem(<HTMLElement | JQuery>data));
    }

    private getElem(data: JQuery | HTMLElement): HTMLElement {
        return data instanceof jQuery
            ? (<JQuery>data).get(0)
            : <HTMLElement>data;
    }
}

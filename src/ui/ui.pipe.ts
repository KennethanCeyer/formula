import { UIAnalyzer } from './ui.analyzer';
import { FormulizeData } from './ui.interface';
import { UIHelper } from './ui.helper';

export class UIPipe extends UIAnalyzer {
    protected pipeInsert(data: FormulizeData): any {
        if (!this.options.pipe || !this.options.pipe.insert)
            return data;

        const insertData = UIHelper.isDOM(data)
            ? UIHelper.getDOM(data)
            : data;

        return this.options.pipe.insert(insertData);
    }

    protected pipeParse(elem: HTMLElement): any {
        if (!this.options.pipe || !this.options.pipe.parse)
            return UIHelper.getDataValue(elem);

        return this.options.pipe.parse(elem);
    }
}

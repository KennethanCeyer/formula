import { UIHelper } from './ui/ui.helper';
import { FormulizeOptions } from './formulize.interface';

export const defaultOptions: FormulizeOptions = {
    id: 'formulize',
    text: {
        formula: 'formula',
        error: 'error',
        pass: 'passed'
    },
    export: (elem: HTMLElement) => UIHelper.getDataValue(elem)
};

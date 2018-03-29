import { FormulizeOptions } from './option.interface';
import { FormulizeHelper } from './formulize.helper';

export const defaultOptions: FormulizeOptions = {
    id: 'formulize',
    cursor: {
        time: {
            animate: 160,
            delay: 500
        }
    },
    text: {
        formula: 'formula',
        error: 'error',
        pass: 'passed'
    },
    export: (elem: HTMLElement) => FormulizeHelper.getDataValue(elem)
};

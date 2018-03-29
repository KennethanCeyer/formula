import { Option } from './option.interface';
import { FormulizeHelper } from './formulize.helper';

export const defaultOption: Option = {
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
        passed: 'passed'
    },
    export: {
        filter: data => data,
        node: (elem: Element) => FormulizeHelper.getDataValue(elem)
    }
};

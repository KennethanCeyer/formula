import { FormulizeOptions } from './formulize/option.interface';

interface FormulizeFunction {
    (options: FormulizeOptions): JQuery;
}

interface FormulizePlugin extends FormulizeFunction { }

declare global {
    interface JQuery {
        formulize: FormulizePlugin;
    }
}

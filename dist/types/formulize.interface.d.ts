import { OptionCursor, OptionExporter, OptionImporter, OptionText } from './option.interface';
export interface FormulizeOptions {
    id: string;
    cursor?: OptionCursor;
    text?: OptionText;
    import?: OptionImporter;
    export?: OptionExporter;
}
export interface FormulizeFunction {
    (options: FormulizeOptions): JQuery;
}
export interface FormulizePlugin extends FormulizeFunction {
}
declare global  {
    interface JQuery {
        formulize: FormulizePlugin;
    }
}
